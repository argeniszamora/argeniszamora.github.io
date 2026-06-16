import { useEffect, useRef, useState } from "react";
import { cvData } from "./cvData";
import "./App.css";

/* ---------- Efecto máquina de escribir ---------- */
function TypeWriter({ words }) {
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const full = words[i % words.length];
    let t;
    if (!del && txt === full) {
      t = setTimeout(() => setDel(true), 1600);
    } else if (del && txt === "") {
      setDel(false);
      setI((p) => p + 1);
    } else {
      t = setTimeout(() => {
        setTxt(full.substring(0, txt.length + (del ? -1 : 1)));
      }, del ? 45 : 80);
    }
    return () => clearTimeout(t);
  }, [txt, del, i, words]);

  return (
    <span className="typed">
      {txt}
      <span className="caret" />
    </span>
  );
}

/* ---------- Contador animado ---------- */
function CountUp({ raw }) {
  const ref = useRef(null);
  const done = useRef(false);
  const [val, setVal] = useState(0);
  const m = String(raw).match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  const prefix = m ? m[1] : "";
  const target = m ? parseFloat(m[2]) : 0;
  const decimals = m && m[2].includes(".") ? 1 : 0;
  const suffix = m ? m[3] : raw;

  useEffect(() => {
    if (!ref.current || done.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !done.current) {
          done.current = true;
          io.disconnect();
          const dur = 1300;
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(target * eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
    // solo depende del valor objetivo (primitivo), no del objeto match
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  if (!m) return <>{raw}</>;
  return (
    <span ref={ref}>
      {prefix}{val.toFixed(decimals)}{suffix}
    </span>
  );
}

/* ---------- Fondo "plexus": red de puntos que se conectan ---------- */
function ParticleNetwork() {
  const ref = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let w, h, dpr, particles, raf;
    const mouse = { x: -9999, y: -9999 };
    const LINK = 140; // distancia máx. para dibujar línea entre puntos

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // densidad según área (menos en móvil), con tope
      const isMobile = w < 768;
      const count = Math.min(isMobile ? 40 : 110, Math.floor((w * h) / 13000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        // rebote suave en los bordes
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // líneas entre puntos cercanos
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK) {
            const a = (1 - dist / LINK) * 0.5;
            ctx.strokeStyle = `rgba(52, 211, 153, ${a})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }

        // conexión + brillo con el mouse
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const md = Math.hypot(mdx, mdy);
        const near = md < 180;
        if (near) {
          const a = (1 - md / 180) * 0.6;
          ctx.strokeStyle = `rgba(34, 211, 238, ${a})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        // punto
        ctx.fillStyle = near ? "rgba(34, 211, 238, 0.95)" : "rgba(52, 211, 153, 0.85)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, near ? 2.4 : 1.7, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    if (reduce) {
      draw();              // un solo frame estático
      cancelAnimationFrame(raf);
    } else {
      draw();
    }

    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    const onResize = () => resize();
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);

    // pausa cuando la pestaña no está visible (ahorra batería)
    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else if (!reduce) raf = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} className="bg-canvas" aria-hidden="true" />;
}

/* ---------- Luz que sigue el cursor en tarjetas ---------- */
const spot = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

/* ---------- Hooks de scroll ---------- */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      setP((h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="progress" style={{ width: `${p}%` }} />;
}

/* ---------- Glow ambiental que persigue el mouse ---------- */
function CursorGlow() {
  const ref = useRef(null);
  useEffect(() => {
    let raf;
    const move = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (ref.current)
          ref.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      });
    };
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}

/* ---------- Toast "¿Sabías que...?" (aparece a los 5s) ---------- */
function SabiasQue({ facts, email }) {
  const [show, setShow] = useState(false);
  const [closed, setClosed] = useState(false);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 5000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!show) return;
    const r = setInterval(() => setIdx((p) => (p + 1) % facts.length), 6500);
    return () => clearInterval(r);
  }, [show, facts.length]);

  if (!facts?.length || closed) return null;

  return (
    <div className={`toast ${show ? "toast-in" : ""}`} role="status">
      <button className="toast-close" onClick={() => setClosed(true)} aria-label="Cerrar">×</button>
      <div className="toast-head">💡 ¿Sabías que…?</div>
      <p key={idx} className="toast-body">{facts[idx]}</p>
      <div className="toast-foot">
        <a href={`mailto:${email}`} className="toast-cta">Hablemos →</a>
        <div className="toast-dots">
          {facts.map((_, i) => (
            <span key={i} className={`dot ${i === idx ? "on" : ""}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Logo animado: solo el símbolo "a" (hero / favicon) ---------- */
function LogoMark({ size = 96, className = "" }) {
  return (
    <svg
      className={`logo-mark ${className}`}
      width={size} height={size}
      viewBox="0 0 120 120"
      role="img" aria-label="Argenis Zamora"
    >
      <rect className="lm-badge" x="10" y="10" width="100" height="100" rx="34" fill="#19E08E" />
      <text className="lm-letter" x="60" y="86" textAnchor="middle"
        fontFamily="'Quicksand', sans-serif" fontWeight="700" fontSize="64" fill="#06231A">a</text>
    </svg>
  );
}

/* ---------- Logo animado: wordmark completo (nav) ---------- */
function LogoWordmark() {
  // Cambiar `run` remonta el SVG y reinicia la animación (al cargar y al hover)
  const [run, setRun] = useState(0);
  return (
    <svg
      key={run}
      className="logo-word" width="180" height="47" viewBox="0 0 320 84"
      role="img" aria-label="argenis · growing together"
      onMouseEnter={() => setRun((r) => r + 1)}
    >
      <rect className="lw-badge" x="4" y="14" width="56" height="56" rx="20" fill="#19E08E" />

      {/* letra "a" (se desvanece cuando entra la métrica) */}
      <text className="lw-a" x="32" y="56" textAnchor="middle"
        fontFamily="'Quicksand', sans-serif" fontWeight="700" fontSize="40" fill="#06231A">a</text>

      {/* métrica que brota dentro del cuadro */}
      <g fill="#06231A">
        <circle className="lw-dot" cx="18" cy="56" r="4.5" />
        <rect className="lw-b1" x="28" y="40" width="9" height="18" rx="4.5" />
        <rect className="lw-b2" x="43" y="28" width="9" height="30" rx="4.5" />
      </g>

      {/* "argenis" (se borra de retroceso) */}
      <text className="lw-text" x="74" y="57"
        fontFamily="'Quicksand', sans-serif" fontWeight="700" fontSize="42" letterSpacing="-1">argenis</text>

      {/* tagline que entra de izquierda a derecha */}
      <text className="lw-tag" x="74" y="53"
        fontFamily="'Quicksand', sans-serif" fontWeight="700" fontSize="26" letterSpacing="-0.3" fill="#19E08E">growing together</text>
    </svg>
  );
}

/* ---------- Easter egg en la consola del navegador ---------- */
function useConsoleEgg(email) {
  useEffect(() => {
    console.log(
      "%c👋 ¿Curioseando el código?",
      "color:#34d399;font-size:20px;font-weight:bold;font-family:monospace"
    );
    console.log(
      "%cEste CV lo construí dirigiendo a Claude Code (IA): datos reales extraídos por API y todo automatizado.\nSi buscas a alguien que combine growth + tech, hablemos 👇",
      "color:#93a39b;font-size:13px;line-height:1.5"
    );
    console.log(`%c📧 ${email}`, "color:#22d3ee;font-size:14px;font-weight:bold");
  }, [email]);
}

function App() {
  useScrollReveal();
  useConsoleEgg(cvData.contacto.email);
  const {
    nombre, titulo, roles, resumen, contacto, sabiasQue,
    logros, experiencia, educacion, certificaciones, habilidades,
  } = cvData;

  return (
    <div className="cv">
      {/* Fondo animado high-tech (red de puntos + orbes), detrás de todo */}
      <div className="bg-tech" aria-hidden="true">
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <ParticleNetwork />
      </div>

      <ScrollProgress />
      <CursorGlow />
      <SabiasQue facts={sabiasQue} email={contacto.email} />

      {/* ---------- NAV ---------- */}
      <nav className="nav">
        <a href="#top" className="nav-brand" aria-label="Inicio"><LogoWordmark /></a>
        <div className="nav-links">
          <a href="#experiencia">Experiencia</a>
          <a href="#skills">Skills</a>
          <a href="#educacion">Educación</a>
          <a href={`mailto:${contacto.email}`} className="nav-cta">Contacto</a>
        </div>
      </nav>

      {/* ---------- HERO ---------- */}
      <header id="top" className="hero">
        <div className="hero-glow" />
        <div className="hero-content">
          <div className="avatar"><LogoMark size={96} /></div>

          <div className="status">
            <span className="status-dot" /> Disponible para nuevos proyectos
          </div>

          <h1 className="hero-name">{nombre}</h1>
          {roles?.length > 0 && (
            <p className="hero-roles">
              <span className="hero-roles-pre">&gt;</span> <TypeWriter words={roles} />
            </p>
          )}
          <h2 className="hero-title">{titulo}</h2>
          <p className="hero-summary">{resumen}</p>

          <div className="hero-links">
            {contacto.email && (
              <a href={`mailto:${contacto.email}`} className="btn btn-primary">✉ Contáctame</a>
            )}
            {contacto.linkedin && (
              <a href={contacto.linkedin} target="_blank" rel="noreferrer" className="btn">LinkedIn</a>
            )}
            {contacto.github && (
              <a href={contacto.github} target="_blank" rel="noreferrer" className="btn">GitHub</a>
            )}
          </div>

          <div className="hero-meta">
            {contacto.ubicacion && <span>📍 {contacto.ubicacion}</span>}
            {contacto.telefono && <span>📞 {contacto.telefono}</span>}
            {contacto.email && <span>✉ {contacto.email}</span>}
          </div>
        </div>

        {logros?.length > 0 && (
          <div className="stats reveal">
            {logros.map((l, i) => (
              <div key={i} className="stat" onMouseMove={spot}>
                <span className="stat-value"><CountUp raw={l.valor} /></span>
                <span className="stat-text">{l.texto}</span>
              </div>
            ))}
          </div>
        )}
      </header>

      <main className="container">
        {/* ---------- EXPERIENCIA ---------- */}
        {experiencia?.length > 0 && (
          <section id="experiencia" className="section reveal">
            <h3 className="section-title"><span className="hash">#</span> Experiencia</h3>
            <div className="timeline">
              {experiencia.map((job, i) => (
                <article key={i} className="card timeline-item" onMouseMove={spot}>
                  <div className="timeline-dot" />
                  <div className="card-head">
                    <h4>{job.puesto}</h4>
                    <span className="badge">{job.periodo}</span>
                  </div>
                  <p className="company">{job.empresa}</p>
                  <ul className="bullets">
                    {job.descripcion.map((d, j) => <li key={j}>{d}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ---------- HABILIDADES ---------- */}
        {habilidades?.length > 0 && (
          <section id="skills" className="section reveal">
            <h3 className="section-title"><span className="hash">#</span> Habilidades y herramientas</h3>
            <div className="skill-groups">
              {habilidades.map((grupo, i) => (
                <div key={i} className="skill-group">
                  <h4 className="skill-cat">{grupo.categoria}</h4>
                  <div className="skills">
                    {grupo.items.map((s, j) => <span key={j} className="chip">{s}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ---------- EDUCACIÓN ---------- */}
        {educacion?.length > 0 && (
          <section id="educacion" className="section reveal">
            <h3 className="section-title"><span className="hash">#</span> Formación académica</h3>
            <div className="timeline">
              {educacion.map((e, i) => (
                <article key={i} className="card timeline-item" onMouseMove={spot}>
                  <div className="timeline-dot" />
                  <div className="card-head">
                    <h4>{e.titulo}</h4>
                    <span className="badge">{e.periodo}</span>
                  </div>
                  <p className="company">{e.institucion}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ---------- CERTIFICACIONES ---------- */}
        {certificaciones?.length > 0 && (
          <section id="certificaciones" className="section reveal">
            <h3 className="section-title"><span className="hash">#</span> Certificaciones</h3>
            <div className="skills">
              {certificaciones.map((c, i) => <span key={i} className="chip chip-cert">✓ {c}</span>)}
            </div>
          </section>
        )}

        {/* ---------- CTA FINAL ---------- */}
        <section className="cta reveal" onMouseMove={spot}>
          <h3>¿Conversamos?</h3>
          <p>Estoy abierto a nuevos retos de growth, performance y marketing data-driven.</p>
          <div className="hero-links">
            {contacto.email && (
              <a href={`mailto:${contacto.email}`} className="btn btn-primary">✉ Escríbeme</a>
            )}
            {contacto.linkedin && (
              <a href={contacto.linkedin} target="_blank" rel="noreferrer" className="btn">LinkedIn</a>
            )}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p className="footer-credit">
          Diseñado y construido por <strong>{nombre}</strong>
          <span className="footer-x">×</span>
          <span className="footer-claude">Claude Code 🤖</span>
        </p>
        <p className="footer-sub">
          © {new Date().getFullYear()} · React + Vite · Datos reales vía API · Abre la consola 👀
        </p>
      </footer>
    </div>
  );
}

export default App;

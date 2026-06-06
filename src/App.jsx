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
  const [val, setVal] = useState(0);
  const m = String(raw).match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  const prefix = m ? m[1] : "";
  const target = m ? parseFloat(m[2]) : 0;
  const decimals = m && m[2].includes(".") ? 1 : 0;
  const suffix = m ? m[3] : raw;

  useEffect(() => {
    if (!m) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          const dur = 1300;
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(target * eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [m, target]);

  if (!m) return <>{raw}</>;
  return (
    <span ref={ref}>
      {prefix}{val.toFixed(decimals)}{suffix}
    </span>
  );
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

const initials = (name) =>
  name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();

function App() {
  useScrollReveal();
  const {
    nombre, titulo, roles, resumen, contacto,
    logros, experiencia, educacion, certificaciones, habilidades,
  } = cvData;

  return (
    <div className="cv">
      <ScrollProgress />
      <CursorGlow />

      {/* ---------- NAV ---------- */}
      <nav className="nav">
        <a href="#top" className="nav-brand">{initials(nombre)}</a>
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
          <div className="avatar"><span>{initials(nombre)}</span></div>

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
        <p>© {new Date().getFullYear()} {nombre} · Hecho con React + Vite</p>
      </footer>
    </div>
  );
}

export default App;

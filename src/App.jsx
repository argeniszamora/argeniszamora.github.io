import { useEffect, useState } from "react";
import { cvData } from "./cvData";
import "./App.css";

// Hook: revela elementos al hacer scroll
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

// Barra de progreso de scroll
function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
      setP(scrolled * 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="progress" style={{ width: `${p}%` }} />;
}

const initials = (name) =>
  name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();

function App() {
  useScrollReveal();
  const {
    nombre, titulo, resumen, contacto,
    logros, experiencia, educacion, certificaciones, habilidades,
  } = cvData;

  return (
    <div className="cv">
      <ScrollProgress />

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
          <div className="avatar">
            <span>{initials(nombre)}</span>
          </div>

          <div className="status">
            <span className="status-dot" /> Disponible para nuevos proyectos
          </div>

          <h1 className="hero-name">{nombre}</h1>
          <h2 className="hero-title">{titulo}</h2>
          <p className="hero-summary">{resumen}</p>

          <div className="hero-links">
            {contacto.email && (
              <a href={`mailto:${contacto.email}`} className="btn btn-primary">
                ✉ Contáctame
              </a>
            )}
            {contacto.linkedin && (
              <a href={contacto.linkedin} target="_blank" rel="noreferrer" className="btn">
                LinkedIn
              </a>
            )}
            {contacto.github && (
              <a href={contacto.github} target="_blank" rel="noreferrer" className="btn">
                GitHub
              </a>
            )}
          </div>

          <div className="hero-meta">
            {contacto.ubicacion && <span>📍 {contacto.ubicacion}</span>}
            {contacto.telefono && <span>📞 {contacto.telefono}</span>}
            {contacto.email && <span>✉ {contacto.email}</span>}
          </div>
        </div>

        {/* Logros como banda de stats */}
        {logros?.length > 0 && (
          <div className="stats reveal">
            {logros.map((l, i) => (
              <div key={i} className="stat">
                <span className="stat-value">{l.valor}</span>
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
                <article key={i} className="card timeline-item">
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
                <article key={i} className="card timeline-item">
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
        <section className="cta reveal">
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

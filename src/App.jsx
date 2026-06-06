import { cvData } from "./cvData";
import "./App.css";

function App() {
  const {
    nombre, titulo, resumen, contacto,
    logros, experiencia, educacion, certificaciones, habilidades,
  } = cvData;

  return (
    <div className="cv">
      {/* ---------- HERO ---------- */}
      <header className="hero">
        <div className="hero-glow" />
        <div className="hero-content">
          <p className="hero-greet">Hola, soy</p>
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
      </header>

      <main className="container">
        {/* ---------- LOGROS DESTACADOS ---------- */}
        {logros?.length > 0 && (
          <section className="section">
            <h3 className="section-title"><span className="hash">#</span> Logros destacados</h3>
            <div className="stats">
              {logros.map((l, i) => (
                <div key={i} className="stat">
                  <span className="stat-value">{l.valor}</span>
                  <span className="stat-text">{l.texto}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ---------- EXPERIENCIA ---------- */}
        {experiencia?.length > 0 && (
          <section className="section">
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
          <section className="section">
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
          <section className="section">
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
          <section className="section">
            <h3 className="section-title"><span className="hash">#</span> Certificaciones</h3>
            <div className="skills">
              {certificaciones.map((c, i) => <span key={i} className="chip">{c}</span>)}
            </div>
          </section>
        )}
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} {nombre} · Hecho con React + Vite</p>
      </footer>
    </div>
  );
}

export default App;

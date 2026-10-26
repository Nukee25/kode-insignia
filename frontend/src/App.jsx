import { useState } from 'react'
import { Link, NavLink, Route, Routes } from 'react-router-dom'
import './App.css'

function HomePage() {
  return (
    <>
      <header className="site-header">
        <nav className="site-nav shell">
          <Link to="/" className="wordmark">
            Kode Insignia
          </Link>
          <ul className="nav-links">
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#team">Team</a>
            </li>
            <li>
              <a href="#workshops">Workshops</a>
            </li>
          </ul>
          <NavLink to="/contact" className="cta-pill">
            GET IN TOUCH
          </NavLink>
        </nav>
      </header>

      <main>
        <section className="hero panel-dark">
          <svg className="hero-graphic" viewBox="0 0 1400 800" aria-hidden="true">
            <g stroke="currentColor" strokeOpacity="0.22" strokeWidth="1">
              <path d="M120 120L380 230L620 170L920 290L1260 200" />
              <path d="M70 350L300 410L560 360L880 460L1180 420" />
              <path d="M200 640L460 560L740 620L980 520L1320 610" />
              <path d="M160 160L200 640" />
              <path d="M620 170L740 620" />
              <path d="M920 290L980 520" />
            </g>
            <g fill="currentColor" fillOpacity="0.3">
              <circle cx="120" cy="120" r="3" />
              <circle cx="380" cy="230" r="3" />
              <circle cx="620" cy="170" r="3" />
              <circle cx="920" cy="290" r="3" />
              <circle cx="1260" cy="200" r="3" />
              <circle cx="70" cy="350" r="3" />
              <circle cx="560" cy="360" r="3" />
              <circle cx="980" cy="520" r="3" />
            </g>
          </svg>

          <div className="shell hero-grid">
            <h1>
              SYSTEMS.
              <br />
              ARCHITECTURE.
              <br />
              INTELLIGENCE.
            </h1>
            <div className="hero-copy">
              <p>
                We handle the entire engineering lifecycle—from low-level system
                optimization to full-stack architectures and AI integration.
              </p>
              <a className="outline-button" href="#projects">
                VIEW PROJECTS
              </a>
            </div>
          </div>
        </section>

        <section className="panel-light">
          <div className="shell domain-grid">
            <div>
              <p className="section-index">/01</p>
              <h2>Engineering</h2>
            </div>
            <div className="card-grid">
              <article>
                <h3>Full-Stack Applications</h3>
                <p>
                  Scalable product deployments using React, Django, Docker, and
                  Nginx across secure and high-availability environments.
                </p>
              </article>
              <article>
                <h3>AI/ML Solutions</h3>
                <p>
                  Local LLM orchestration, YOLOv8 pipelines, and OpenCV computer
                  vision systems engineered for practical operations.
                </p>
              </article>
              <article>
                <h3>Low-Level Systems</h3>
                <p>
                  C/C++ services, POSIX sockets, and microservice backplanes for
                  performance-critical architecture.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="team" className="panel-dark">
          <div className="shell team-grid">
            <h2>The Team</h2>
            <div className="metric-grid">
              <article className="metric-card">
                <p>Foundation</p>
                <strong>Since 2025</strong>
              </article>
              <article className="metric-card">
                <p>Core Team</p>
                <strong>8 Core Engineers</strong>
              </article>
              <article className="metric-card">
                <p>Delivery</p>
                <strong>4 Major Systems Shipped</strong>
              </article>
            </div>
            <ul className="name-grid">
              <li>Kshitij</li>
              <li>Richa</li>
              <li>Akshay</li>
              <li>Priya</li>
              <li>Shivanshu</li>
              <li>Trisha</li>
              <li>Diamond</li>
              <li>Rashi</li>
            </ul>
          </div>
        </section>

        <section id="projects" className="panel-gradient">
          <div className="shell project-grid">
            <h2>Project Vaidya</h2>
            <p className="project-subtitle">
              A privacy-focused clinical decision support architecture.
            </p>
            <div className="mockup-shell">
              <div className="mockup-screen">
                <div className="dot-row">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="stat-grid">
                  <div>
                    <p>Model Confidence</p>
                    <strong>97.3%</strong>
                  </div>
                  <div>
                    <p>Inference Latency</p>
                    <strong>63ms</strong>
                  </div>
                  <div>
                    <p>Risk Flagging</p>
                    <strong>Real-Time</strong>
                  </div>
                </div>
                <div className="chart-grid">
                  <div />
                  <div />
                </div>
              </div>
            </div>
            <ul id="workshops" className="project-list">
              <li>Project Vaidya</li>
              <li>Swaraj Setu</li>
              <li>Chitralekha</li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="site-footer panel-dark">
        <div className="shell">
          <h2>Get in touch</h2>
          <div className="footer-grid">
            <a href="mailto:team@kodeinsignia.com">Email</a>
            <a href="https://github.com/Nukee25" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}

function ContactPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  const apiBase = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch(`${apiBase}/api/contact/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const payload = await response.json()

      if (!response.ok) {
        const emailError = payload?.email?.[0]
        throw new Error(emailError || payload?.detail || 'Submission failed.')
      }

      setStatus('success')
      setMessage('Thanks. Your email has been received by Kode Insignia.')
      setEmail('')
    } catch (error) {
      setStatus('error')
      setMessage(error.message)
    }
  }

  return (
    <main className="contact-page panel-dark">
      <div className="shell contact-shell">
        <div className="contact-heading">
          <p className="section-index">/CONTACT</p>
          <h1>Contact us</h1>
          <p>
            Drop your email and our engineering team will reach out for project
            discussions, workshops, or collaboration.
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="contact-email">Email address</label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@company.com"
          />
          <button type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'SENDING...' : 'SUBMIT'}
          </button>
          {message ? (
            <p className={`form-status ${status === 'success' ? 'ok' : 'error'}`}>
              {message}
            </p>
          ) : null}
        </form>

        <NavLink to="/" className="outline-button back-link">
          BACK TO HOME
        </NavLink>
      </div>
    </main>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  )
}

export default App

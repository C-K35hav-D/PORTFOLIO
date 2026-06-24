import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Contact from './components/Contact'
import ServiceHeading from './components/ServiceHeading'
import Work from './components/Work'

function App() {
  return (
    <div className="noise">

      <Navbar />

      {/* HERO */}
      <Hero />

      {/* WORK */}
      <Work />

      {/* ABOUT */}
      <About />

      {/* SERVICES */}
      <section
        id="services"
        style={{
          minHeight: '100vh',
          padding: '6rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#070B1A',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '0.25em',
            color: 'var(--blue)',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
            filter: 'brightness(2.2)',
          }}
        >
          Services
        </p>

        <ServiceHeading text="Coming Soon" />

        <p
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '1rem',
            color: 'rgba(240,237,228,0.5)',
            maxWidth: '420px',
          }}
        >
          Building out something worth showing. Check back soon.
        </p>
      </section>

      {/* CONTACT */}
      <Contact />

      {/* FOOTER */}
      <footer
        style={{
          padding: "2rem",
          background: "var(--black)",
          borderTop: "1px solid rgba(255,61,0,0.3)",
          color: "var(--white)",
          textAlign: "center",
          fontFamily: "Space Grotesk, sans-serif",
          fontSize: "13px",
          letterSpacing: "0.05em",
        }}
      >
        © Channakeshav 2026
      </footer>

    </div>
  )
}

export default App

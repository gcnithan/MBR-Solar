import Scene3DAccent from './Scene3DAccent'
import Card3D from './Card3D'
import logo from '../assets/logo.png'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer
      className="footer-section relative border-t pt-20 pb-10 px-6 overflow-hidden"
      style={{ background: '#FFFFFF', borderColor: 'var(--border-card)' }}
    >
      <Scene3DAccent variant="energy" className="scene-accent--footer" opacity={0.32} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <Card3D className="footer-brand-card" maxTilt={8} glowColor="rgba(153, 194, 77, 0.25)">
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollTo('#home') }}
              className="flex items-center gap-3 mb-4"
            >
              <img
                src={logo}
                alt="MBR Solar"
                className="logo-img"
                width={40}
                height={40}
                style={{ filter: 'drop-shadow(0 0 12px rgba(153,194,77,.4))' }}
              />
              <div>
                <span className="brand-lockup__mbr brand-lockup__mbr--footer block">
                  MBR
                </span>
                <span className="brand-lockup__sub brand-lockup__sub--footer block">
                  Solar Solutions
                </span>
              </div>
            </a>
            <p className="text-sm italic mb-2" style={{ fontFamily: 'var(--font-sans)', color: 'var(--brand-blue-secondary)' }}>
              Switchin&apos; on the sunshine
            </p>
            <p className="text-sm leading-relaxed" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)' }}>
              Powering Bangalore with affordable, efficient solar and electrical solutions for a sustainable future.
            </p>
          </Card3D>

          <Card3D className="footer-links-card" maxTilt={6} glowColor="rgba(39, 168, 224, 0.2)">
            <h4 className="font-semibold mb-4" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.href)}
                    data-cursor
                    className="text-sm hover:text-emerald-600 transition-colors"
                    style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)' }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </Card3D>

          <Card3D className="footer-contact-card" maxTilt={6} glowColor="rgba(59, 130, 246, 0.18)">
            <h4 className="font-semibold mb-4" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>
              Contact
            </h4>
            <ul className="space-y-2 text-sm" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)' }}>
              <li>+91 98765 43210</li>
              <li>info@mbrsolar.com</li>
              <li>Bangalore, Karnataka</li>
            </ul>
          </Card3D>
        </div>

        <div className="section-divider mb-6" />
        <p className="text-center text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>
          © {new Date().getFullYear()} MBR Solar and Electricals. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

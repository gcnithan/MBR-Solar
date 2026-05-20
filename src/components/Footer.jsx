import { Phone, Mail, MapPin } from 'lucide-react'
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

const contactLines = [
  { icon: Phone, text: '+91 98765 43210', href: 'tel:+919876543210' },
  { icon: Mail, text: 'info@mbrsolar.com', href: 'mailto:info@mbrsolar.com' },
  { icon: MapPin, text: 'Bangalore, Karnataka', href: null },
]

export default function Footer() {
  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="footer-section relative overflow-hidden">
      <div className="footer-section__bg" aria-hidden />
      <Scene3DAccent variant="energy" className="scene-accent--footer" opacity={0.28} />

      <div className="footer-section__inner max-w-7xl mx-auto relative z-10 px-4 sm:px-6 pt-14 pb-10 sm:pt-16 sm:pb-12 md:pt-20 md:pb-14">
        <div className="footer-grid">
          <Card3D className="footer-brand-card footer-grid__brand" maxTilt={6} glowColor="rgba(153, 194, 77, 0.22)">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault()
                scrollTo('#home')
              }}
              className="footer-brand-lockup flex items-start gap-4 mb-5"
            >
              <div className="footer-brand-lockup__logo shrink-0 rounded-2xl bg-white/90 p-2 shadow-sm border border-[rgba(153,194,77,0.2)]">
                <img
                  src={logo}
                  alt="MBR Solar"
                  className="logo-img"
                  width={44}
                  height={44}
                  style={{ filter: 'drop-shadow(0 0 10px rgba(153,194,77,.35))' }}
                />
              </div>
              <div className="min-w-0 pt-0.5">
                <span className="brand-lockup__mbr brand-lockup__mbr--footer block">MBR</span>
                <span className="brand-lockup__sub brand-lockup__sub--footer block">Solar Solutions</span>
              </div>
            </a>
            <p className="footer-tagline">Switchin&apos; on the sunshine</p>
            <p className="footer-blurb">
              Powering Bangalore with affordable, efficient solar and electrical solutions for a sustainable future.
            </p>
          </Card3D>

          <Card3D className="footer-links-card footer-grid__links" maxTilt={5} glowColor="rgba(39, 168, 224, 0.18)">
            <h4 className="footer-card-heading">Explore</h4>
            <ul className="footer-link-list">
              {links.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.href)}
                    data-cursor
                    className="footer-link-btn"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </Card3D>

          <Card3D className="footer-contact-card footer-grid__contact" maxTilt={5} glowColor="rgba(46, 49, 146, 0.12)">
            <h4 className="footer-card-heading">Get in touch</h4>
            <ul className="footer-contact-list">
              {contactLines.map(({ icon: Icon, text, href }) => (
                <li key={text}>
                  {href ? (
                    <a href={href} className="footer-contact-row" data-cursor>
                      <span className="footer-contact-row__icon" aria-hidden>
                        <Icon size={18} strokeWidth={2} />
                      </span>
                      <span className="footer-contact-row__text">{text}</span>
                    </a>
                  ) : (
                    <span className="footer-contact-row footer-contact-row--static">
                      <span className="footer-contact-row__icon" aria-hidden>
                        <Icon size={18} strokeWidth={2} />
                      </span>
                      <span className="footer-contact-row__text">{text}</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </Card3D>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} MBR Solar and Electricals. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

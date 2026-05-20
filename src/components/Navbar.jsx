import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map((l) =>
        l.href.replace("#", "")
      );

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);

        if (
          el &&
          window.scrollY >= el.offsetTop - 120
        ) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  const handleNavClick = (href) => {
    setMenuOpen(false);

    document
      .querySelector(href)
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(255,255,255,0.92)"
            : "rgba(255,255,255,0.6)",

          backdropFilter: scrolled
            ? "blur(16px)"
            : "blur(8px)",

          borderBottom: scrolled
            ? "1px solid rgba(153,194,77,0.12)"
            : "1px solid transparent",

          padding: scrolled
            ? "0.5rem 0"
            : "0.875rem 0",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#home");
            }}
            className="flex items-center gap-3 group"
          >
            <div className="relative shrink-0 w-10 h-10 overflow-hidden flex items-center justify-center">
              <img
                src={logo}
                alt="MBR Solar Logo"
                className="logo-img"
                width={40}
                height={40}
                style={{
                  filter:
                    "drop-shadow(0 0 12px rgba(153,194,77,.5))",
                }}
              />
            </div>

            <div>
              <span className="brand-lockup__mbr brand-lockup__mbr--nav block">
                MBR
              </span>
              <span className="brand-lockup__sub brand-lockup__sub--nav block">
                Solar Solutions
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map(
              ({ label, href }) => {
                const id =
                  href.replace("#", "");

                const isActive =
                  activeSection === id;

                return (
                  <li key={label}>
                    <button
                      onClick={() =>
                        handleNavClick(
                          href
                        )
                      }
                      className="relative text-sm transition-all"
                      style={{
                        color:
                          isActive
                            ? "var(--brand-blue)"
                            : "var(--text-secondary)",
                      }}
                    >
                      {label}

                      <span
                        className="absolute left-0 -bottom-1 h-[2px] transition-all duration-300"
                        style={{
                          width:
                            isActive
                              ? "100%"
                              : "0%",
                          background:
                            "linear-gradient(90deg,var(--brand-green),var(--brand-blue))",
                        }}
                      />
                    </button>
                  </li>
                );
              }
            )}
          </ul>

          <div className="flex items-center gap-4">

            {/* Desktop CTA */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(
                  "#contact"
                );
              }}
              className="hidden md:block px-5 py-2 rounded-full text-white font-semibold transition-all"
              style={{
                background:
                  "linear-gradient(135deg,var(--brand-green),var(--brand-green-dark))",

                boxShadow:
                  "0 0 16px rgba(153,194,77,.25)",
              }}
            >
              Free Consultation
            </a>

            {/* Mobile button */}
            <button
              className="md:hidden"
              style={{ color: 'var(--text-primary)' }}
              onClick={() =>
                setMenuOpen(
                  !menuOpen
                )
              }
            >
              {menuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen mobile menu */}

      <div
        className="fixed inset-0 z-40 flex flex-col justify-center items-center transition-all duration-500"
        style={{
          background:
            "rgba(10,15,30,.96)",

          backdropFilter:
            "blur(30px)",

          opacity: menuOpen
            ? 1
            : 0,

          pointerEvents:
            menuOpen
              ? "all"
              : "none",
        }}
      >
        <ul className="flex flex-col gap-8 items-center">
          {navLinks.map(
            (
              { label, href },
              i
            ) => (
              <li
                key={label}
                style={{
                  transform:
                    menuOpen
                      ? "translateY(0)"
                      : "translateY(20px)",

                  opacity:
                    menuOpen
                      ? 1
                      : 0,

                  transition: `all .4s ease ${
                    i * .07
                  }s`,
                }}
              >
                <button
                  onClick={() =>
                    handleNavClick(
                      href
                    )
                  }
                  className="text-3xl font-bold"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    color: 'var(--text-primary)',
                  }}
                >
                  {label}
                </button>
              </li>
            )
          )}
        </ul>

        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();

            handleNavClick(
              "#contact"
            );
          }}
          className="mt-12 px-8 py-3 rounded-full text-white font-semibold"
          style={{
            background:
              "linear-gradient(135deg,#99C24D,#7DA83A)",

            boxShadow:
              "0 0 30px rgba(153,194,77,.4)",
          }}
        >
          Free Consultation
        </a>
      </div>
    </>
  );
}
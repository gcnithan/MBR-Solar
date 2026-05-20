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
        className="fixed top-0 left-0 right-0 z-50 w-full max-w-[100vw] transition-all duration-500"
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
        <div
          className="max-w-7xl mx-auto flex items-center justify-between gap-2 px-3 sm:px-5 md:px-6"
          style={{
            paddingLeft: "max(0.75rem, env(safe-area-inset-left, 0px))",
            paddingRight: "max(0.75rem, env(safe-area-inset-right, 0px))",
          }}
        >

          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#home");
            }}
            className="flex min-w-0 items-center gap-2 sm:gap-3 group"
          >
            <div className="relative shrink-0 w-9 h-9 sm:w-10 sm:h-10 overflow-hidden flex items-center justify-center">
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

            <div className="min-w-0 leading-tight">
              <span className="brand-lockup__mbr brand-lockup__mbr--nav block truncate">
                MBR
              </span>
              <span className="brand-lockup__sub brand-lockup__sub--nav block truncate">
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

          <button
            type="button"
            className="md:hidden flex items-center justify-center p-1"
            style={{ color: 'var(--text-primary)' }}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
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

          paddingTop: "max(2rem, env(safe-area-inset-top))",
          paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
          paddingLeft: "max(1rem, env(safe-area-inset-left))",
          paddingRight: "max(1rem, env(safe-area-inset-right))",
        }}
      >
        <ul className="flex flex-col gap-6 sm:gap-8 items-center px-4 w-full max-w-md">
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
                  className="text-2xl sm:text-3xl font-bold max-w-full"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    color: '#f8fafc',
                  }}
                >
                  {label}
                </button>
              </li>
            )
          )}
        </ul>
      </div>
    </>
  );
}
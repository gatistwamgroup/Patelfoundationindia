import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import "../../styles/layout/navbar.css";
import Container from "../common/Container";
import PremiumButton from "../common/PremiumButton";
import { navMenu, siteContact } from "../../data/siteConfig";
import {
  FiMenu,
  FiX,
  FiChevronDown,
  FiPhoneCall,
  FiMail,
  FiMapPin,
  FiPlus,
  FiMinus,
  FiHome,
  FiUsers,
  FiFileText,
  FiBookOpen,
  FiHeart,
  FiGlobe,
  FiUserPlus,
} from "react-icons/fi";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const socialLinks = [
  { icon: <FaFacebookF />, href: "https://www.facebook.com/profile.php?id=61574684506372", label: "Facebook" },
  { icon: <FaInstagram />, href: "https://www.instagram.com/patelfoundation_borsad/", label: "Instagram" },
  { icon: <FaLinkedinIn />, href: "https://www.linkedin.com/in/patel-foundation-ind-8836473aa/", label: "LinkedIn" },
  { icon: <FaYoutube />, href: "https://www.youtube.com/@PatelFoundationBorsad", label: "YouTube" },
];

const getMenuIcon = (iconName) => {
  const icons = {
    home: <FiHome />,
    users: <FiUsers />,
    team: <FiUsers />,
    file: <FiFileText />,
    education: <FiBookOpen />,
    health: <FiHeart />,
    activity: <FiGlobe />,
    contact: <FiMail />,
    volunteer: <FiUserPlus />,
  };

  return icons[iconName] || <FiHome />;
};

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openMobileMenus, setOpenMobileMenus] = useState({});

  const isHome = location.pathname === "/";
  const isOverlay = isHome && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  const headerStyles = useMemo(() => {
    if (isOverlay) {
      return {
        background: "transparent",
        borderBottom: "1px solid transparent",
        boxShadow: "none",
        padding: "1.15rem 0",
      };
    }

    return {
      background: "rgba(255,255,255,0.82)",
      borderBottom: "1px solid rgba(17, 24, 39, 0.08)",
      boxShadow: "0 10px 30px rgba(17,24,39,0.05)",
      padding: isScrolled ? "0.8rem 0" : "1rem 0",
    };
  }, [isOverlay, isScrolled]);

  const getTopLevelActive = (item) => {
    if (item.path === "/" && location.pathname === "/") return true;

    if (item.children?.some((child) => child.path === location.pathname)) return true;

    return location.pathname === item.path;
  };

  const isChildActive = (path) => location.pathname === path;

  const toggleMobileMenu = (label) => {
    setOpenMobileMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const currentLogo = isOverlay ? "/logo-light.png" : "/logo-dark.png";

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1200,
          transition: "var(--transition-base)",
          backdropFilter: !isOverlay ? "blur(16px)" : "none",
          WebkitBackdropFilter: !isOverlay ? "blur(16px)" : "none",
          ...headerStyles,
        }}
      >
        <Container>
          <div className="navbar-grid">
            {/* Logo */}
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                minWidth: "fit-content",
                position: "relative",
                zIndex: 3,
              }}
            >
              <img
                src={currentLogo}
                alt="Patel Foundation"
                className="navbar-logo"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="premium-nav-desktop">
              {navMenu.map((item) => {
                const isActive = getTopLevelActive(item);
                const hasChildren = !!item.children?.length;

                return (
                  <div
                    key={item.label}
                    className="nav-item-wrap"
                    onMouseEnter={() => hasChildren && setOpenDropdown(item.label)}
                    onMouseLeave={() => hasChildren && setOpenDropdown(null)}
                  >
                    <Link
                      to={item.path}
                      className="premium-nav-link"
                      style={{
                        color: isOverlay
                          ? isActive
                            ? "#fff"
                            : "rgba(255,255,255,0.86)"
                          : isActive
                          ? "var(--color-primary)"
                          : "var(--color-dark)",
                        background:
                          isActive && isOverlay
                            ? "rgba(255,255,255,0.08)"
                            : isActive && !isOverlay
                            ? "rgba(215,38,56,0.08)"
                            : "transparent",
                        border:
                          isActive && isOverlay
                            ? "1px solid rgba(255,255,255,0.08)"
                            : isActive && !isOverlay
                            ? "1px solid rgba(215,38,56,0.1)"
                            : "1px solid transparent",
                      }}
                    >
                      <span>{item.label}</span>
                      {hasChildren && <FiChevronDown size={16} />}
                    </Link>

                    {/* Desktop Dropdown */}
                    <AnimatePresence>
                      {hasChildren && openDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.22 }}
                          className="desktop-dropdown"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              to={child.path}
                              className="desktop-dropdown-link"
                              style={{
                                background: isChildActive(child.path)
                                  ? "rgba(215,38,56,0.08)"
                                  : "transparent",
                                color: isChildActive(child.path)
                                  ? "var(--color-primary)"
                                  : "var(--color-dark)",
                              }}
                            >
                              <span className="desktop-dropdown-icon">
                                {getMenuIcon(child.icon)}
                              </span>
                              <span>{child.label}</span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            {/* Right Side */}
            <div className="navbar-right">
              <div className="navbar-cta">
                <PremiumButton href="/donate">Donate Now</PremiumButton>
              </div>

              <button
                onClick={() => setIsOpen(true)}
                className="mobile-menu-btn"
                aria-label="Open Menu"
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  border: isOverlay
                    ? "1px solid rgba(255,255,255,0.12)"
                    : "1px solid var(--color-border)",
                  background: isOverlay
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(255,255,255,0.85)",
                  display: "none",
                  alignItems: "center",
                  justifyContent: "center",
                  color: isOverlay ? "#fff" : "var(--color-dark)",
                  boxShadow: isOverlay ? "none" : "var(--shadow-soft)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                }}
              >
                <FiMenu size={22} />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1400,
            }}
          >
            <div
              onClick={() => setIsOpen(false)}
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(17, 24, 39, 0.5)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="mobile-drawer"
            >
              {/* Top */}
              <div className="mobile-drawer-top">
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="/logo-dark.png"
                    alt="Patel Foundation"
                    className="mobile-drawer-logo"
                  />
                </Link>

                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close Menu"
                  className="mobile-close-btn"
                >
                  <FiX size={22} />
                </button>
              </div>

              {/* Mobile Nav */}
              <div className="mobile-nav-wrap">
                {navMenu.map((item) => {
                  const hasChildren = !!item.children?.length;
                  const isActive = getTopLevelActive(item);
                  const isExpanded = !!openMobileMenus[item.label];

                  return (
                    <div key={item.label}>
                      <div className="mobile-menu-item">
                        <Link
                          to={item.path}
                          onClick={() => !hasChildren && setIsOpen(false)}
                          className="mobile-menu-main-link"
                          style={{
                            background: isActive
                              ? "rgba(215,38,56,0.08)"
                              : "rgba(255,255,255,0.75)",
                            color: isActive
                              ? "var(--color-primary)"
                              : "var(--color-dark)",
                            border: isActive
                              ? "1px solid rgba(215,38,56,0.12)"
                              : "1px solid var(--color-border)",
                          }}
                        >
                          <span className="mobile-link-inner">
                            <span>{getMenuIcon(item.icon)}</span>
                            <span>{item.label}</span>
                          </span>
                        </Link>

                        {hasChildren && (
                          <button
                            onClick={() => toggleMobileMenu(item.label)}
                            className="mobile-menu-toggle"
                          >
                            {isExpanded ? <FiMinus /> : <FiPlus />}
                          </button>
                        )}
                      </div>

                      <AnimatePresence>
                        {hasChildren && isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            style={{ overflow: "hidden" }}
                          >
                            <div className="mobile-submenu">
                              {item.children.map((child) => {
                                const childActive = isChildActive(child.path);

                                return (
                                  <Link
                                    key={child.label}
                                    to={child.path}
                                    onClick={() => setIsOpen(false)}
                                    className="mobile-submenu-link"
                                    style={{
                                      background: childActive
                                        ? "rgba(215,38,56,0.08)"
                                        : "transparent",
                                      color: childActive
                                        ? "var(--color-primary)"
                                        : "var(--color-dark)",
                                    }}
                                  >
                                    <span className="mobile-link-inner">
                                      <span>{getMenuIcon(child.icon)}</span>
                                      <span>{child.label}</span>
                                    </span>
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Contact */}
              <div className="mobile-card-box">
                <p className="mobile-card-title">Contact Details</p>

                <div style={{ display: "grid", gap: "0.8rem" }}>
                  <a href={siteContact.phoneHref} className="mobile-contact-link">
                    <span className="mobile-contact-icon"><FiPhoneCall /></span>
                    <span>{siteContact.phone}</span>
                  </a>

                  <a href={siteContact.emailHref} className="mobile-contact-link">
                    <span className="mobile-contact-icon"><FiMail /></span>
                    <span>{siteContact.email}</span>
                  </a>

                  <a href="/contact" className="mobile-contact-link">
                    <span className="mobile-contact-icon"><FiMapPin /></span>
                    <span>{siteContact.address}</span>
                  </a>
                </div>
              </div>

              {/* Social */}
              <div className="mobile-card-box" style={{ marginTop: "1rem" }}>
                <p className="mobile-card-title">Follow Us</p>

                <div className="mobile-social-wrap">
                  {socialLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      aria-label={item.label}
                      target="_blank"
                      rel="noreferrer"
                      className="mobile-social-link"
                    >
                      {item.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div style={{ marginTop: "auto", paddingTop: "1rem" }}>
                <PremiumButton href="/donate" className="mobile-full-btn">
                  Make a Donation
                </PremiumButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    
    </>
  );
};

export default Navbar;
import { Link } from "react-router-dom";

const PremiumButton = ({
  children,
  href = "#",
  variant = "primary",
  className = "",
  onClick,
}) => {
  const isPrimary = variant === "primary";
  const isExternal = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

  const sharedStyles = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.65rem",
    padding: "0.95rem 1.4rem",
    borderRadius: "var(--radius-pill)",
    fontSize: "0.98rem",
    fontWeight: 700,
    transition: "var(--transition-base)",
    border: isPrimary
      ? "1px solid transparent"
      : "1px solid var(--color-border-strong)",
    background: isPrimary ? "var(--color-primary)" : "rgba(255,255,255,0.75)",
    color: isPrimary ? "#fff" : "var(--color-dark)",
    boxShadow: isPrimary ? "var(--shadow-button)" : "none",
    backdropFilter: !isPrimary ? "blur(12px)" : "none",
    WebkitBackdropFilter: !isPrimary ? "blur(12px)" : "none",
    cursor: "pointer",
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = "translateY(-2px)";
    e.currentTarget.style.boxShadow = isPrimary
      ? "0 16px 34px rgba(215, 38, 56, 0.28)"
      : "0 10px 25px rgba(17,24,39,0.08)";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = isPrimary
      ? "var(--shadow-button)"
      : "none";
  };

  if (isExternal) {
    return (
      <a
        href={href}
        className={className}
        style={sharedStyles}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      to={href}
      className={className}
      style={sharedStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default PremiumButton;
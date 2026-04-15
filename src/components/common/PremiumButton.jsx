const PremiumButton = ({
  children,
  href = "#",
  variant = "primary",
  className = "",
}) => {
  const isPrimary = variant === "primary";

  return (
    <a
      href={href}
      className={className}
      style={{
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
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = isPrimary
          ? "0 16px 34px rgba(215, 38, 56, 0.28)"
          : "0 10px 25px rgba(17,24,39,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = isPrimary
          ? "var(--shadow-button)"
          : "none";
      }}
    >
      {children}
    </a>
  );
};

export default PremiumButton;
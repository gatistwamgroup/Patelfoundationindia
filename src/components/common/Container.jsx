const Container = ({ children, narrow = false, className = "" }) => {
  return (
    <div
      className={className}
      style={{
        width: "100%",
        maxWidth: narrow ? "var(--container-narrow)" : "var(--container-width)",
        margin: "0 auto",
        padding: "0 clamp(1rem, 3vw, 2rem)",
      }}
    >
      {children}
    </div>
  );
};

export default Container;
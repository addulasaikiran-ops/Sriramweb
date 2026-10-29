export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a
      href="#home"
      className={footer ? "brand footer-brand" : "brand"}
      aria-label="Sriram Travels home"
    >
      <img
        className="brand-logo"
        src="/images/sriram-travels-logo.svg"
        alt="Sriram Travels — Hanuman carrying the Sanjeevani mountain"
        width={150}
        height={72}
        loading="eager"
      />
    </a>
  );
}

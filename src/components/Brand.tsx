export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a
      href="#home"
      className={footer ? "brand footer-brand" : "brand"}
      aria-label="Sriram Travels home"
    >
      <img
        className="brand-logo"
        src="/Hanuman%20Flight%20Sriram%20Travels%20Logo.png"
        alt="Sriram Travels — flying Lord Hanuman carrying the Sanjeevani mountain, with the Sriram Travels wordmark and flag"
        width={220}
        height={110}
        loading="eager"
      />
    </a>
  );
}

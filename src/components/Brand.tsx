import Image from "next/image";

export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a
      href="#home"
      className={footer ? "brand footer-brand" : "brand"}
      aria-label="Sriram Travels home"
    >
      <Image
        className="brand-logo"
        src="/sriram-travels-logo-transparent%20(1).png"
        alt="Sriram Travels — flying Lord Hanuman carrying the Sanjeevani mountain, with the Sriram Travels wordmark and flag"
        width={220}
        height={110}
        sizes={footer ? "220px" : "(max-width: 600px) 160px, 220px"}
        priority={!footer}
      />
    </a>
  );
}

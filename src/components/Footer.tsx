import { Brand } from "./Brand";
export function Footer() {
  return <footer className="site-footer">
    <Brand footer />
    <span className="footer-tagline">TAKE THE SCENIC ROUTE.</span>
    <span className="footer-copy">© {new Date().getFullYear()} Sriram Travels. Made for the road ahead.</span>
    <nav className="footer-legal" aria-label="Legal"><a href="/privacy-policy">Privacy Policy</a><a href="/terms">Terms</a></nav>
    <a className="back-top" href="#home">BACK TO TOP ↑</a>
  </footer>;
}

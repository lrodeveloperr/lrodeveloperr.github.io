import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  DownloadSimple,
  EnvelopeSimple,
  Info,
  Shield,
  Target,
  Wrench,
  X,
} from "@phosphor-icons/react";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";

const SUPPORT_EMAIL = "info@worksbienstudios.com";

const apps = [
  {
    id: "pressbench",
    name: "PressBench",
    description: "Press operations.",
    image: "/assets/pressbench.png",
    accent: "pressbench",
  },
  {
    id: "welding-gas-wallet",
    name: "Welding Gas Wallet",
    description: "Cylinder records.",
    image: "/assets/welding-gas-wallet.png",
    accent: "welding",
  },
  {
    id: "grocery-benefits-tracker",
    name: "Grocery Benefits Tracker",
    description: "Grocery planning.",
    image: "/assets/grocery-benefits.png",
    accent: "grocery",
  },
];

const pageTitles = {
  "/": "WorksBien Studios",
  "/apps": "Apps · WorksBien Studios",
  "/about": "About · WorksBien Studios",
  "/customerservice": "Customer service · WorksBien Studios",
};

function normalizePath(path) {
  const normalized = `/${String(path || "").replace(/^\/+|\/+$/g, "")}`;
  return normalized === "//" ? "/" : normalized;
}

function currentPath() {
  if (window.location.protocol === "file:") {
    const hashPath = window.location.hash.replace(/^#/, "");
    return hashPath ? normalizePath(hashPath) : "/";
  }
  return normalizePath(window.location.pathname);
}

function routeHref(path) {
  return window.location.protocol === "file:" ? `#${path.replace(/^\//, "")}` : path;
}

function navigate(path) {
  const nextPath = normalizePath(path);
  if (window.location.protocol === "file:") {
    window.location.hash = nextPath === "/" ? "" : nextPath.slice(1);
  } else {
    window.history.pushState({}, "", nextPath);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }
  window.scrollTo({ top: 0, behavior: "instant" });
}

function SiteLink({ to, onClick, children, ...props }) {
  return (
    <a
      href={routeHref(to)}
      onClick={(event) => {
        event.preventDefault();
        onClick?.(event);
        navigate(to);
      }}
      {...props}
    >
      {children}
    </a>
  );
}

function Brand({ compact = false }) {
  return (
    <SiteLink className={`brand ${compact ? "brand--compact" : ""}`} to="/" aria-label="WorksBien Studios home">
      <strong>WorksBien</strong><span>Studios</span>
    </SiteLink>
  );
}

function Header({ path, onMenu }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          <SiteLink to="/apps" aria-current={path === "/apps" ? "page" : undefined}>Apps</SiteLink>
          <SiteLink to="/about" aria-current={path === "/about" ? "page" : undefined}>About</SiteLink>
          <SiteLink to="/customerservice" aria-current={path === "/customerservice" ? "page" : undefined}>Customer service</SiteLink>
        </nav>
        <button className="menu-button" type="button" onClick={onMenu} aria-label="Open menu">Menu</button>
      </div>
    </header>
  );
}

function MobileMenu({ path, onClose }) {
  return (
    <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu">
      <div className="mobile-menu__panel">
        <div className="mobile-menu__top"><Brand compact /><button className="text-button" type="button" onClick={onClose}>Close</button></div>
        <nav aria-label="Mobile navigation">
          <SiteLink to="/apps" onClick={onClose} aria-current={path === "/apps" ? "page" : undefined}>Apps</SiteLink>
          <SiteLink to="/about" onClick={onClose} aria-current={path === "/about" ? "page" : undefined}>About</SiteLink>
          <SiteLink to="/customerservice" onClick={onClose} aria-current={path === "/customerservice" ? "page" : undefined}>Customer service</SiteLink>
        </nav>
      </div>
    </div>
  );
}

function DownloadModal({ app, onClose }) {
  const closeRef = useRef(null);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    closeRef.current?.focus();
    const onKeyDown = (event) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const showStoreNotice = (store) => {
    setNotice(`${app.name} is not public on ${store} yet. Its direct store link will be added at release.`);
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="download-modal" role="dialog" aria-modal="true" aria-labelledby="download-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="modal-topline">
          <span className="eyebrow">Download</span>
          <button ref={closeRef} className="icon-button" type="button" onClick={onClose} aria-label="Close download dialog"><X size={22} weight="bold" aria-hidden="true" /></button>
        </div>
        <div className="modal-product">
          <img src={app.image} alt="" />
          <div><h2 id="download-title">{app.name}</h2><p>Choose the store used on your phone.</p></div>
        </div>
        <div className="store-choices">
          <button className="store-badge-button" type="button" onClick={() => showStoreNotice("the App Store")} aria-label={`Download ${app.name} on the App Store`}>
            <img src="/assets/download-on-app-store.svg" alt="Download on the App Store" />
          </button>
          <button className="store-badge-button" type="button" onClick={() => showStoreNotice("Google Play")} aria-label={`Get ${app.name} on Google Play`}>
            <img src="/assets/get-it-on-google-play.png" alt="Get it on Google Play" />
          </button>
        </div>
        {notice ? <p className="modal-notice" role="status"><Info size={18} weight="fill" aria-hidden="true" />{notice}</p> : <p className="modal-hint">The store badges will open the exact listing when each release is public.</p>}
      </section>
    </div>
  );
}

function AppCard({ app, onDownload }) {
  return (
    <article className={`app-card app-card--${app.accent}`}>
      <div className="app-image-wrap"><img src={app.image} alt={`${app.name} app icon`} /></div>
      <h2>{app.name}</h2>
      <p>{app.description}</p>
      <button className="download-button" type="button" onClick={() => onDownload(app)}><DownloadSimple size={20} weight="bold" aria-hidden="true" />Download app</button>
    </article>
  );
}

function AppGrid({ onDownload }) {
  return <div className="apps-grid">{apps.map((app) => <AppCard key={app.id} app={app} onDownload={onDownload} />)}</div>;
}

function HomePage({ onDownload }) {
  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <p className="eyebrow">WorksBien Studios</p>
        <h1 id="hero-title">Small apps. Real utility.</h1>
        <p className="hero-copy">Independent software for everyday work.</p>
        <SiteLink className="primary-button" to="/apps">Explore the apps<ArrowRight size={20} weight="bold" aria-hidden="true" /></SiteLink>
      </section>
      <section className="apps-section" aria-labelledby="featured-apps-title">
        <h2 className="sr-only" id="featured-apps-title">Featured WorksBien apps</h2>
        <AppGrid onDownload={onDownload} />
      </section>
    </main>
  );
}

function AppsPage({ onDownload }) {
  return (
    <main className="content-page apps-page">
      <section className="page-hero">
        <SiteLink className="back-link" to="/"><ArrowLeft size={16} weight="bold" aria-hidden="true" />Home</SiteLink>
        <p className="eyebrow">Apps</p>
        <h1>Focused tools for real tasks.</h1>
        <p>Choose the app that fits the job.</p>
      </section>
      <section className="apps-catalog" aria-label="WorksBien apps">
        <AppGrid onDownload={onDownload} />
      </section>
    </main>
  );
}

function AboutPage() {
  const principles = [
    { icon: Target, title: "One job, done well.", body: "Each app is built around a clear task—from press runs and gas cylinders to grocery-benefit planning." },
    { icon: Shield, title: "Private by default.", body: "Core records stay on your device. Accounts, cloud storage and tracking are avoided when the product does not need them." },
    { icon: Wrench, title: "Built for real use.", body: "Clear workflows, dependable controls and offline access matter more than feature count." },
  ];

  return (
    <main className="content-page about-page">
      <section className="page-hero about-hero">
        <SiteLink className="back-link" to="/"><ArrowLeft size={16} weight="bold" aria-hidden="true" />Home</SiteLink>
        <p className="eyebrow">About</p>
        <h1>Useful software, without the noise.</h1>
        <p>WorksBien Studios builds focused tools for practical work and everyday essentials.</p>
      </section>
      <section className="about-content" aria-label="About WorksBien Studios">
        <div className="about-intro">
          <p className="eyebrow">The studio</p>
          <h2>Independent software shaped around the task.</h2>
          <p>WorksBien Studios Inc. creates mobile and desktop utilities for people who value clarity, privacy and reliability. Every product starts with a specific problem and removes the steps that get in the way.</p>
        </div>
        <div className="principles-grid">
          {principles.map(({ icon: Icon, title, body }) => (
            <article className="principle-card" key={title}>
              <Icon size={25} weight="duotone" aria-hidden="true" />
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
        <div className="about-contact">
          <div><p className="eyebrow">Questions or feedback?</p><h2>Talk directly to the studio.</h2></div>
          <SiteLink className="secondary-button" to="/customerservice">Customer service<ArrowRight size={18} weight="bold" aria-hidden="true" /></SiteLink>
        </div>
      </section>
    </main>
  );
}

function CustomerServicePage() {
  const [app, setApp] = useState(apps[0].name);

  const submit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const topic = form.get("topic");
    const email = form.get("email");
    const message = form.get("message");
    const subject = `Support request — ${app}`;
    const body = [`App: ${app}`, `Topic: ${topic}`, `Customer email: ${email}`, "", "Message:", message].join("\n");
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <main className="support-page">
      <section className="support-hero">
        <SiteLink className="back-link" to="/"><ArrowLeft size={16} weight="bold" aria-hidden="true" />Home</SiteLink>
        <p className="eyebrow">Customer service</p>
        <h1>How can we help?</h1>
        <p>Choose the app and tell us what happened.</p>
      </section>
      <section className="support-layout" aria-label="Customer support form">
        <form className="support-form" onSubmit={submit}>
          <label>App<select value={app} onChange={(event) => setApp(event.target.value)}>{apps.map((item) => <option key={item.id}>{item.name}</option>)}</select></label>
          <label>What do you need help with?<select name="topic" defaultValue="Download or installation"><option>Download or installation</option><option>Billing or subscription</option><option>The app is not working</option><option>Something else</option></select></label>
          <label>Your email<input type="email" name="email" autoComplete="email" placeholder="you@example.com" required /></label>
          <label>Message<textarea name="message" rows="5" placeholder="Tell us what happened" required /></label>
          <button className="primary-button support-submit" type="submit"><EnvelopeSimple size={19} weight="bold" aria-hidden="true" />Email support</button>
          <p className="form-note">This opens your email app with the request addressed to {SUPPORT_EMAIL}.</p>
        </form>
        <aside className="support-aside">
          <EnvelopeSimple className="support-aside__icon" size={28} weight="duotone" aria-hidden="true" />
          <p className="eyebrow">Direct email</p>
          <h2>Your query reaches WorksBien Studios.</h2>
          <p>Include your device, what you tapped and what happened next.</p>
          <a className="support-email" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
        </aside>
      </section>
    </main>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand"><Brand compact /><p>Small apps. Real utility.</p></div>
      <nav aria-label="Footer navigation">
        <SiteLink to="/apps">Apps</SiteLink>
        <SiteLink to="/about">About</SiteLink>
        <SiteLink to="/customerservice">Customer service</SiteLink>
      </nav>
    </footer>
  );
}

export function App() {
  const [path, setPath] = useState(currentPath());
  const [selectedApp, setSelectedApp] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onPopState = () => setPath(currentPath());
    window.addEventListener("popstate", onPopState);
    window.addEventListener("hashchange", onPopState);
    return () => {
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("hashchange", onPopState);
    };
  }, []);

  useEffect(() => {
    document.title = pageTitles[path] || pageTitles["/"];
    document.body.style.overflow = selectedApp || menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [path, selectedApp, menuOpen]);

  let page = <HomePage onDownload={setSelectedApp} />;
  if (path === "/apps") page = <AppsPage onDownload={setSelectedApp} />;
  if (path === "/about") page = <AboutPage />;
  if (path === "/customerservice") page = <CustomerServicePage />;

  return (
    <div className="site-shell">
      <Header path={path} onMenu={() => setMenuOpen(true)} />
      {page}
      <Footer />
      {selectedApp && <DownloadModal app={selectedApp} onClose={() => setSelectedApp(null)} />}
      {menuOpen && <MobileMenu path={path} onClose={() => setMenuOpen(false)} />}
    </div>
  );
}

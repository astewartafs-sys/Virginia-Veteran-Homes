import React, { useEffect, useMemo, useRef, useState } from "react";

const useInView = (threshold = 0.12) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
};

const Reveal = ({ children, delay = 0, y = 28, style = {} }) => {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const SITE = {
  brand: "Furnace Ridge Property Group",
  tagline: "Where Luxury Meets Nature",
  subtag: "You Served. Now Find Your Peace.",
  broker: "Allen Stewart · Managing Broker · eXp Realty Virginia",
  phone: "(540) 555-0187",
  email: "hello@furnaceridge.com",
};

const NAV = [
  { slug: "home", label: "Home" },
  { slug: "relo-guide", label: "Relo Guide" },
  { slug: "best-places", label: "Best Places" },
  { slug: "va-land", label: "VA + Land" },
  { slug: "pcs-guide", label: "PCS Guide" },
  { slug: "quantico-nova", label: "Quantico" },
  { slug: "hampton-roads", label: "Hampton Roads" },
  { slug: "shenandoah-valley", label: "Shenandoah Valley" },
  { slug: "about", label: "About" },
  { slug: "contact", label: "Contact" },
];

const BEST_PLACES = [
  {
    title: "Hampton Roads",
    body: "For families tied to Navy, Air Force, Coast Guard, shipbuilding, and defense careers, Hampton Roads delivers deep military infrastructure, strong relocation familiarity, and coastal living.",
  },
  {
    title: "Stafford / Fredericksburg",
    body: "A practical move for Quantico-connected households who want access to Northern Virginia while maintaining more breathing room, strong neighborhoods, and commuter flexibility.",
  },
  {
    title: "Central Virginia",
    body: "For veterans seeking scenic terrain, quieter communities, and a measured pace without giving up access to major Virginia destinations, Central Virginia offers balance.",
  },
  {
    title: "Shenandoah Valley",
    body: "For buyers who define success as peace, privacy, land, views, and long-term belonging, the Valley offers one of the most compelling post-service lifestyles in Virginia.",
  },
];

const REGIONS = [
  {
    name: "Quantico & Northern Virginia",
    slug: "quantico-nova",
    audience: "Marines, Pentagon professionals, federal and contractor households",
    bullets: ["Stafford", "Fredericksburg", "Woodbridge", "Dumfries", "Commuter strategy"],
    intro:
      "This corridor serves households balancing career access with sanity. The closer you move toward Northern Virginia, the more commute and cost shape the decision. The farther south you go, the more lifestyle and space begin to return.",
  },
  {
    name: "Hampton Roads & Coastal Virginia",
    slug: "hampton-roads",
    audience: "Navy, Air Force, Coast Guard, shipyard and defense families",
    bullets: ["Norfolk", "Virginia Beach", "Chesapeake", "Yorktown", "Suffolk"],
    intro:
      "One of the strongest military relocation ecosystems in the country. Buyers here need help evaluating commute realities, flood awareness, school options, resale durability, and neighborhood personality.",
  },
  {
    name: "Central Virginia & Fort Walker",
    slug: "central-virginia",
    audience: "Buyers seeking practicality, land access, and quieter living",
    bullets: ["Bowling Green", "Caroline County", "Spotsylvania", "King George", "Rural options"],
    intro:
      "For many relocating households, this region opens the door to more house, more land, and more peace. It also creates a better entry point for acreage-minded buyers using veteran financing strategies.",
  },
  {
    name: "Shenandoah Valley Veteran Lifestyle",
    slug: "shenandoah-valley",
    audience: "Veterans seeking land, privacy, mountain views, and a reset",
    bullets: ["Staunton", "Waynesboro", "Lexington", "Harrisonburg", "Woodstock"],
    intro:
      "This is where the Furnace Ridge brand becomes fully itself. The Valley is not just a search area. It is a philosophy of living: room to breathe, land to hold, and a life that feels reclaimed.",
  },
];

const SEO_PAGES = [
  "Best Realtor for Veterans in Virginia",
  "PCS Relocation Guide to Virginia",
  "Can Veterans Buy Land with VA Loans?",
  "Best Places for Veterans to Live in Virginia",
  "Veteran Land & Ranch Properties in Virginia",
  "Retire to the Shenandoah Valley After Service",
  "Quantico Relocation Guide for Military Families",
  "Hampton Roads Veteran Home Search Guide",
];

const FAQS = [
  {
    q: "Can veterans use a VA loan to buy land in Virginia?",
    a: "Usually the VA loan works best when the land purchase includes a primary residence or a plan that fits lender and VA occupancy expectations. Raw land by itself is typically a different financing conversation.",
  },
  {
    q: "Is Furnace Ridge only for veterans?",
    a: "No. The brand is intentionally veteran-centered, but it also serves military families, service-minded buyers, relocation households, and people drawn to Virginia land and lifestyle property.",
  },
  {
    q: "Is this website statewide or local?",
    a: "Both. The positioning is statewide for reach and search visibility, while the most differentiated local strength lives in the Shenandoah Valley, land, lifestyle, and broker-level guidance.",
  },
  {
    q: "What should be added before launch?",
    a: "A real CRM-connected contact form, full Virginia brokerage disclosures, fair housing language, privacy language, approved branding assets, and actual contact details.",
  },
];

function useRoute() {
  const getRoute = () => window.location.hash.replace("#/", "") || "home";
  const [route, setRoute] = useState(getRoute());

  useEffect(() => {
    const onHash = () => setRoute(getRoute());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = (slug) => {
    window.location.hash = `#/${slug}`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return { route, navigate };
}

function Layout({ children, navigate, route }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [route]);

  return (
    <div style={{ background: "var(--iron)", color: "var(--cream)", minHeight: "100vh" }}>
      <style>{globalCss}</style>

      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 200,
          background: scrolled ? "rgba(18,15,12,0.94)" : "rgba(18,15,12,0.45)",
          backdropFilter: "blur(16px)",
          borderBottom: scrolled ? "1px solid rgba(212,113,58,0.15)" : "1px solid rgba(255,255,255,0.04)",
          transition: "all 0.35s ease",
          padding: "0 28px",
        }}
      >
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 78 }}>
          <button onClick={() => navigate("home")} className="brand-btn">
            <div className="label" style={{ fontSize: "0.58rem" }}>{SITE.brand}</div>
            <div className="brand-sub">{SITE.tagline}</div>
          </button>

          <nav className="desktop-nav">
            {NAV.slice(0, 6).map((item) => (
              <button
                key={item.slug}
                className={`nl ${route === item.slug ? "active" : ""}`}
                onClick={() => navigate(item.slug)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button className="btn-fire desktop-cta" onClick={() => navigate("contact")}>Consult</button>
            <button className="menu-btn" onClick={() => setMobileOpen((s) => !s)}>
              {mobileOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="mobile-panel">
            {NAV.map((item) => (
              <button key={item.slug} className="mobile-link" onClick={() => navigate(item.slug)}>
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {children}

      <footer className="footer">
        <div className="wrap footer-grid">
          <div>
            <div className="label">Furnace Ridge Property Group</div>
            <h3 className="display" style={{ fontSize: "1.7rem", marginTop: 16, color: "var(--paper)" }}>
              {SITE.tagline}
            </h3>
            <p className="body-f muted" style={{ marginTop: 16, maxWidth: 430 }}>
              A veteran-centered Virginia real estate website framework built for relocation, land, lifestyle, and long-term trust.
            </p>
          </div>

          <div>
            <div className="label">Site Pages</div>
            <div className="footer-links">
              {NAV.map((item) => (
                <button key={item.slug} className="footer-link" onClick={() => navigate(item.slug)}>
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="label">Launch Notes</div>
            <p className="body-f muted" style={{ marginTop: 16, lineHeight: 1.9 }}>
              Add licensed brokerage disclosures, fair housing language, privacy policy, CRM form integration, and approved eXp / Virginia advertising language before publishing live.
            </p>
          </div>
        </div>

        <div className="footer-bottom wrap">
          <div className="tiny">© {new Date().getFullYear()} Furnace Ridge Property Group · Virginia</div>
          <div className="tiny">{SITE.broker}</div>
        </div>
      </footer>
    </div>
  );
}

function HomePage({ navigate }) {
  return (
    <>
      <section className="hero">
        <div className="hero-bg-word">FORGE</div>
        <div className="diag-line" style={{ right: "14%", top: "10%", height: "42%" }} />
        <div className="diag-line" style={{ right: "18%", top: "22%", height: "28%", opacity: 0.18 }} />
        <div className="diag-line" style={{ left: "6%", top: "30%", height: "35%", opacity: 0.12 }} />

        <div className="wrap hero-grid">
          <div>
            <Reveal>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 26 }}>
                <span className="label">eXp Land & Ranch · Virginia</span>
                <div className="rule-line" />
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="display hero-title">You Served.</h1>
            </Reveal>
            <Reveal delay={0.16}>
              <h1 className="display hero-title ember-text" style={{ fontStyle: "italic" }}>
                Now Find Your Peace.
              </h1>
            </Reveal>

            <Reveal delay={0.24}>
              <p className="body-f hero-copy">
                A full Virginia real estate website built for veterans, military families, relocation households, and land-minded buyers seeking peace, place, and long-term belonging.
              </p>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="btn-row" style={{ marginTop: 42 }}>
                <button className="btn-fire" onClick={() => navigate("relo-guide")}>Explore the Guide</button>
                <button className="btn-ghost" onClick={() => navigate("best-places")}>Best Places in Virginia</button>
                <button className="btn-ghost" onClick={() => navigate("contact")}>Book Consultation</button>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="stats-row">
                {[["8", "Core Pages"], ["4", "Regional Guides"], ["1", "Veteran-Centered Brand"]].map(([n, l]) => (
                  <div key={l}>
                    <div className="display stat-num">{n}</div>
                    <div className="cond stat-label">{l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.18}>
            <div className="card-warm hero-card">
              <div className="side-accent" />
              <div className="label">Brand Story</div>
              <span className="rule" />
              <h2 className="display" style={{ fontSize: "1.9rem", color: "var(--paper)", lineHeight: 1.2, fontStyle: "italic" }}>
                Forged by service. Rooted in Virginia.
              </h2>
              <p className="body-f muted" style={{ marginTop: 18, lineHeight: 1.95 }}>
                The Furnace Ridge identity is built around transformation: duty into wisdom, movement into home, and raw ground into rooted belonging. This site gives that story a true structure.
              </p>
              <div style={{ marginTop: 28, display: "grid", gap: 12 }}>
                {[
                  "Homepage built for first impression and search intent",
                  "Regional pages for military and veteran traffic",
                  "Land + VA page for differentiated niche positioning",
                  "Contact funnel ready for HubSpot or CRM integration",
                ].map((text) => (
                  <div key={text} className="feature-line">
                    <div className="mini-rule" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <SectionShell
        label="Core Website Architecture"
        title={<>A real site structure,<br /><em style={{ color: "var(--ember)" }}>not just a hero page.</em></>}
        intro="This build includes the homepage, veteran relocation content, best-places positioning, a VA + land education page, a PCS guide, regional landing pages, an about page, and a contact conversion page."
      >
        <div className="grid-4">
          {[
            "Home",
            "Relocation Guide",
            "Best Places",
            "VA + Land",
            "PCS Guide",
            "Regional Pages",
            "About Allen",
            "Contact Funnel",
          ].map((item, i) => (
            <Reveal key={item} delay={i * 0.05}>
              <div className="card pad-28">
                <div className="label" style={{ fontSize: "0.56rem" }}>Page {String(i + 1).padStart(2, "0")}</div>
                <h3 className="display" style={{ marginTop: 14, fontSize: "1.2rem", color: "var(--paper)" }}>{item}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionShell>
    </>
  );
}

function ReloGuidePage({ navigate }) {
  return (
    <PageShell
      label="Virginia Veteran Relocation Guide"
      title={<>Finding your next chapter in the <em style={{ color: "var(--ember)", fontStyle: "italic" }}>Commonwealth</em></>}
      intro="Virginia is not one market. It is a network of military corridors, historic communities, rural options, and long-view lifestyle regions. A relocation website must interpret that, not flatten it."
    >
      <div className="grid-4">
        {REGIONS.map((region, i) => (
          <Reveal key={region.slug} delay={i * 0.08}>
            <button className="card pad-30 card-button" onClick={() => navigate(region.slug)}>
              <div className="label" style={{ fontSize: "0.58rem" }}>Region {String(i + 1).padStart(2, "0")}</div>
              <h3 className="display" style={{ marginTop: 14, fontSize: "1.45rem", lineHeight: 1.15, color: "var(--paper)" }}>{region.name}</h3>
              <p className="body-f muted" style={{ marginTop: 16, lineHeight: 1.8 }}>{region.intro}</p>
            </button>
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
}

function BestPlacesPage() {
  return (
    <PageShell
      label="Best Places for Veterans"
      title={<>Virginia is a series of <em style={{ color: "var(--ember)", fontStyle: "italic" }}>lifestyle decisions.</em></>}
      intro="The right place depends on service history, budget, commute, schools, pace of life, privacy needs, and long-term goals. This page turns broad search intent into meaningful categories."
    >
      <div className="grid-2">
        {BEST_PLACES.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.08}>
            <div className="card pad-32">
              <div style={{ width: 32, height: 2, background: "var(--ember)", marginBottom: 16 }} />
              <h3 className="display" style={{ fontSize: "1.4rem", color: "var(--paper)" }}>{item.title}</h3>
              <p className="body-f muted" style={{ marginTop: 14, lineHeight: 1.9 }}>{item.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
}

function VaLandPage() {
  return (
    <PageShell
      label="VA Loans & Virginia Land"
      title={<>The question that separates generalists from <em style={{ color: "var(--ember)", fontStyle: "italic" }}>specialists.</em></>}
      intro="Veterans searching for acreage, homestead property, small farms, or mountain retreats need more than a generic mortgage conversation. They need a site that understands why land is the dream."
    >
      <div className="split-grid">
        <div style={{ display: "grid", gap: 14 }}>
          {[
            "VA financing generally works best when the property includes or supports a qualifying primary residence.",
            "Land transactions require attention to access, septic, water, easements, zoning, and appraisal realities.",
            "Acreage can still fit the dream, but it has to be matched with the right lender strategy and property profile.",
            "This page is one of the strongest differentiators in the whole site because it aligns directly with Furnace Ridge's land identity.",
          ].map((text, i) => (
            <Reveal key={text} delay={i * 0.08}>
              <div className="card pad-24 list-card">
                <span className="cond list-num">0{i + 1}</span>
                <p className="body-f muted" style={{ lineHeight: 1.85 }}>{text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.18}>
          <div className="card-warm pad-36 sticky-panel">
            <div className="label">Positioning Advantage</div>
            <span className="rule" />
            <h3 className="display" style={{ color: "var(--paper)", fontSize: "1.8rem", lineHeight: 1.2, fontStyle: "italic" }}>
              Where Luxury Meets Nature becomes a search category, not just a slogan.
            </h3>
            <p className="body-f muted" style={{ marginTop: 18, lineHeight: 1.9 }}>
              Most veteran real estate websites stop at suburban relocation. This one extends into acreage, land, privacy, and lifestyle property — exactly where your brand becomes memorable.
            </p>
          </div>
        </Reveal>
      </div>
    </PageShell>
  );
}

function PcsGuidePage() {
  return (
    <PageShell
      label="PCS Guide to Virginia"
      title={<>Built for military families arriving on <em style={{ color: "var(--ember)", fontStyle: "italic" }}>orders.</em></>}
      intro="This page is the practical conversion page for active-duty and transitional military families. It should feel calm, competent, and operational."
    >
      <div className="grid-4">
        {[
          ["01", "Pre-Approval", "Get lender clarity early and know your financing path before the timeline compresses."],
          ["02", "Target Area", "Compare commute, schools, neighborhood rhythm, and long-term fit before falling in love with inventory."],
          ["03", "Lifestyle Fit", "Choose whether you want convenience, history, acreage, privacy, or a blend of all four."],
          ["04", "Coordination", "Align showings, inspections, temporary housing, travel, and closings with military reality."],
        ].map(([n, title, text], i) => (
          <Reveal key={title} delay={i * 0.08}>
            <div className="card pad-30 step-card">
              <div className="step-num">{n}</div>
              <div className="label">Step {n}</div>
              <h3 className="cond" style={{ marginTop: 16, fontSize: "1.25rem", color: "var(--ember)" }}>{title}</h3>
              <p className="body-f muted" style={{ marginTop: 14, lineHeight: 1.85 }}>{text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
}

function RegionPage({ region }) {
  return (
    <PageShell
      label="Regional Landing Page"
      title={<>{region.name}</>}
      intro={region.intro}
    >
      <div className="split-grid">
        <Reveal>
          <div className="card pad-34">
            <div className="label">Ideal Audience</div>
            <span className="rule" />
            <h3 className="display" style={{ fontSize: "1.5rem", color: "var(--paper)", lineHeight: 1.2 }}>{region.audience}</h3>
            <p className="body-f muted" style={{ marginTop: 18, lineHeight: 1.9 }}>
              This page should ultimately include neighborhood guidance, buyer personas, commute logic, school and lifestyle talking points, property search links, and a direct consultation CTA.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="card-warm pad-34">
            <div className="label">Key Topics</div>
            <span className="rule" />
            <div style={{ display: "grid", gap: 12, marginTop: 6 }}>
              {region.bullets.map((item) => (
                <div key={item} className="feature-line">
                  <div className="mini-rule" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </PageShell>
  );
}

function AboutPage() {
  return (
    <PageShell
      label="About Allen Stewart"
      title={<>Broker-level trust with a <em style={{ color: "var(--ember)", fontStyle: "italic" }}>human center.</em></>}
      intro="The About page should establish Allen as more than an agent. It should communicate broker experience, veteran sensitivity, statewide perspective, land positioning, and a calm, steady presence."
    >
      <div className="split-grid">
        <Reveal>
          <div className="card pad-34">
            <div className="label">Positioning</div>
            <span className="rule" />
            <p className="body-f muted" style={{ lineHeight: 1.95 }}>
              Allen Stewart leads the Furnace Ridge Property Group identity with broker-level experience, long real estate perspective, and a differentiated Virginia land and lifestyle voice. This page should ultimately include your actual bio, service philosophy, Virginia focus, and veteran-facing language that feels respectful rather than performative.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gap: 16 }}>
          {[
            "Managing Broker · eXp Realty Virginia",
            "Land & Ranch positioning",
            "Statewide veteran relocation focus",
            "Luxury, land, and lifestyle branding",
            "Built for trust, not noise",
            "Human conversations over generic scripts",
          ].map((item, i) => (
            <Reveal key={item} delay={i * 0.06}>
              <div className="card pad-22">
                <p className="cond" style={{ color: "rgba(232,223,208,0.78)", letterSpacing: "0.05em" }}>{item}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </PageShell>
  );
}

function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    status: "",
    area: "",
    goal: "",
    timeline: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <PageShell
      label="Contact & Conversion"
      title={<>Start your Virginia relocation <em style={{ color: "var(--ember)", fontStyle: "italic" }}>conversation.</em></>}
      intro="This is the lead capture page. It should convert veteran buyers, PCS households, and land-minded inquiries into real conversations."
    >
      <div className="split-grid">
        <Reveal>
          <div className="card pad-38">
            <div className="label">Consultation Form · Prototype</div>
            <span className="rule" />
            <div style={{ display: "grid", gap: 12 }}>
              {[
                ["name", "Name"],
                ["email", "Email"],
                ["phone", "Phone"],
                ["status", "Current duty or veteran status"],
                ["area", "Target Virginia area"],
                ["goal", "Buying home, land, farm, or relocation help"],
                ["timeline", "Desired move timeframe"],
              ].map(([key, placeholder]) => (
                <input
                  key={key}
                  className="fi"
                  value={form[key]}
                  onChange={(e) => update(key, e.target.value)}
                  placeholder={placeholder}
                />
              ))}
              <button className="btn-fire" style={{ width: "100%", justifyContent: "center", marginTop: 10 }} onClick={() => setSubmitted(true)}>
                Submit Inquiry
              </button>
              {submitted && (
                <p className="cond" style={{ color: "var(--ember)", fontSize: "0.8rem", letterSpacing: "0.06em", lineHeight: 1.7 }}>
                  Prototype captured. Connect this to HubSpot, Zapier, or your preferred form handler for live delivery.
                </p>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="card-warm pad-38" style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div className="label">Brand Close</div>
              <span className="rule" />
              <h3 className="display" style={{ color: "var(--paper)", fontSize: "2.5rem", lineHeight: 1.15, fontStyle: "italic" }}>
                {SITE.tagline}
              </h3>
              <p className="display" style={{ marginTop: 18, fontSize: "1.3rem", color: "rgba(232,223,208,0.78)", fontStyle: "italic", lineHeight: 1.65 }}>
                {SITE.subtag}
              </p>
            </div>

            <div style={{ marginTop: 42, paddingTop: 28, borderTop: "1px solid rgba(212,113,58,0.18)" }}>
              <p className="cond" style={{ color: "rgba(212,113,58,0.75)", letterSpacing: "0.09em", textTransform: "uppercase", lineHeight: 1.8 }}>
                Serving veterans and military families across Virginia.
              </p>
              <p className="body-f muted" style={{ marginTop: 14, lineHeight: 1.8 }}>{SITE.broker}</p>
              <p className="body-f muted" style={{ marginTop: 10, lineHeight: 1.8 }}>
                Placeholder contact details: {SITE.phone} · {SITE.email}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </PageShell>
  );
}

function SeoArchitecturePage() {
  return (
    <PageShell
      label="Search Visibility Architecture"
      title={<>Pages designed for Google, AI search, and <em style={{ color: "var(--ember)", fontStyle: "italic" }}>high-intent queries.</em></>}
      intro="These are the topic pages and search hooks this site is built to support as you expand it into a real production property."
    >
      <div className="grid-2">
        {SEO_PAGES.map((item, i) => (
          <Reveal key={item} delay={i * 0.05}>
            <div className="card pad-24 seo-card">
              <div className="seo-dot" />
              <span className="cond" style={{ color: "rgba(232,223,208,0.82)", letterSpacing: "0.04em" }}>{item}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
}

function FaqPage() {
  return (
    <PageShell
      label="Frequently Asked Questions"
      title={<>Questions this site should answer <em style={{ color: "var(--ember)", fontStyle: "italic" }}>immediately.</em></>}
      intro="FAQ content helps both buyers and search engines understand how this brand thinks."
    >
      <div style={{ display: "grid", gap: 16 }}>
        {FAQS.map((faq, i) => (
          <Reveal key={faq.q} delay={i * 0.05}>
            <div className="card pad-30">
              <h3 className="display" style={{ color: "var(--paper)", fontSize: "1.28rem", lineHeight: 1.2 }}>{faq.q}</h3>
              <p className="body-f muted" style={{ marginTop: 14, lineHeight: 1.9 }}>{faq.a}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
}

function PageShell({ label, title, intro, children }) {
  return (
    <section className="page-section">
      <div className="wrap">
        <Reveal>
          <div className="label">{label}</div>
          <span className="rule" />
          <h1 className="display page-title">{title}</h1>
          <p className="body-f page-intro">{intro}</p>
        </Reveal>
        <div style={{ marginTop: 54 }}>{children}</div>
      </div>
    </section>
  );
}

function SectionShell({ label, title, intro, children }) {
  return (
    <section className="section-shell">
      <div className="wrap">
        <Reveal>
          <div className="label">{label}</div>
          <span className="rule" />
          <h2 className="display page-title">{title}</h2>
          <p className="body-f page-intro">{intro}</p>
        </Reveal>
        <div style={{ marginTop: 54 }}>{children}</div>
      </div>
    </section>
  );
}

export default function FurnaceRidgeFullSite() {
  const { route, navigate } = useRoute();

  const regionMap = useMemo(() => {
    const map = {};
    REGIONS.forEach((region) => {
      map[region.slug] = region;
    });
    return map;
  }, []);

  let page = null;

  if (route === "home") page = <HomePage navigate={navigate} />;
  else if (route === "relo-guide") page = <ReloGuidePage navigate={navigate} />;
  else if (route === "best-places") page = <BestPlacesPage />;
  else if (route === "va-land") page = <VaLandPage />;
  else if (route === "pcs-guide") page = <PcsGuidePage />;
  else if (route === "about") page = <AboutPage />;
  else if (route === "contact") page = <ContactPage />;
  else if (route === "seo-architecture") page = <SeoArchitecturePage />;
  else if (route === "faq") page = <FaqPage />;
  else if (regionMap[route]) page = <RegionPage region={regionMap[route]} />;
  else page = <HomePage navigate={navigate} />;

  return <Layout navigate={navigate} route={route}>{page}</Layout>;
}

const globalCss = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Barlow+Condensed:wght@300;400;500;600;700&family=Barlow:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { min-height: 100%; }
  body {
    background: #1c1a17;
    color: #e8dfd0;
    font-family: 'Barlow', sans-serif;
  }

  :root {
    --ink: #0d0b09;
    --paper: #f2ede4;
    --iron: #1c1a17;
    --rust: #9b4a1e;
    --ember: #d4713a;
    --gold: #c9993c;
    --ash: #6b6056;
    --smoke: #2e2a25;
    --cream: #e8dfd0;
  }

  ::selection { background: var(--ember); color: var(--ink); }
  .display { font-family: 'Playfair Display', Georgia, serif; }
  .cond { font-family: 'Barlow Condensed', sans-serif; }
  .body-f { font-family: 'Barlow', sans-serif; }
  .muted { color: rgba(232,223,208,0.66); }

  .wrap { width: 100%; max-width: 1320px; margin: 0 auto; }

  .label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 0.65rem;
    letter-spacing: 0.34em;
    text-transform: uppercase;
    color: var(--ember);
  }

  .rule {
    display: block;
    width: 48px;
    height: 1.5px;
    background: var(--ember);
    margin: 18px 0;
  }

  .rule-line {
    flex: 1;
    max-width: 120px;
    height: 1px;
    background: linear-gradient(90deg, rgba(212,113,58,0.5), transparent);
  }

  .brand-btn {
    background: none;
    border: none;
    text-align: left;
    cursor: pointer;
  }

  .brand-sub {
    font-size: 0.78rem;
    color: rgba(232,223,208,0.45);
    font-style: italic;
    font-family: 'Playfair Display', serif;
    margin-top: 2px;
  }

  .desktop-nav {
    display: flex;
    gap: 30px;
    align-items: center;
  }

  .nl {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(232,223,208,0.58);
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.2s ease;
  }

  .nl:hover, .nl.active { color: var(--ember); }

  .menu-btn {
    display: none;
    background: transparent;
    color: var(--cream);
    border: 1px solid rgba(232,223,208,0.2);
    padding: 10px 16px;
    font-family: 'Barlow Condensed', sans-serif;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    cursor: pointer;
  }

  .mobile-panel {
    display: none;
  }

  .mobile-link {
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    color: var(--cream);
    padding: 14px 0;
    font-family: 'Barlow Condensed', sans-serif;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    cursor: pointer;
    border-top: 1px solid rgba(255,255,255,0.05);
  }

  .btn-fire {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    background: var(--ember);
    color: var(--ink);
    border: none;
    cursor: pointer;
    padding: 15px 34px;
    clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%);
    transition: background 0.25s, transform 0.2s;
  }

  .btn-fire:hover { background: var(--gold); transform: translateY(-2px); }

  .btn-ghost {
    display: inline-flex;
    align-items: center;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    background: transparent;
    color: var(--cream);
    border: 1px solid rgba(232,223,208,0.3);
    cursor: pointer;
    padding: 15px 34px;
    transition: border-color 0.25s, color 0.25s, background 0.25s;
  }

  .btn-ghost:hover { border-color: var(--ember); color: var(--ember); background: rgba(212,113,58,0.06); }

  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 90px 28px;
    position: relative;
    overflow: hidden;
    background:
      radial-gradient(ellipse 90% 60% at 50% -5%, rgba(155,74,30,0.22) 0%, transparent 65%),
      radial-gradient(ellipse 50% 50% at 85% 85%, rgba(201,153,60,0.08) 0%, transparent 50%),
      linear-gradient(180deg, #141008 0%, #1c1a17 50%, #0f0e0c 100%);
  }

  .hero-grid {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 90px;
    align-items: center;
  }

  .hero-title {
    font-size: clamp(3.2rem, 6.6vw, 6.3rem);
    font-weight: 900;
    line-height: 0.98;
    letter-spacing: -0.02em;
    color: var(--paper);
  }

  .hero-copy {
    margin-top: 34px;
    max-width: 600px;
    font-size: 1.08rem;
    line-height: 1.9;
    color: rgba(232,223,208,0.72);
  }

  .btn-row {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
  }

  .stats-row {
    margin-top: 56px;
    display: flex;
    gap: 46px;
    flex-wrap: wrap;
    padding-top: 34px;
    border-top: 1px solid rgba(232,223,208,0.08);
  }

  .stat-num {
    font-size: 2.55rem;
    color: var(--ember);
    line-height: 1;
    font-weight: 900;
  }

  .stat-label {
    margin-top: 6px;
    font-size: 0.7rem;
    letter-spacing: 0.18em;
    color: rgba(232,223,208,0.45);
    text-transform: uppercase;
  }

  .hero-card, .sticky-panel { position: relative; }
  .side-accent {
    position: absolute;
    top: 0;
    right: 0;
    width: 3px;
    height: 100%;
    background: linear-gradient(180deg, transparent, var(--ember), transparent);
  }

  .hero-bg-word {
    position: absolute;
    bottom: -60px;
    right: -20px;
    font-size: clamp(200px,22vw,320px);
    font-family: 'Playfair Display', serif;
    font-weight: 900;
    line-height: 1;
    color: rgba(212,113,58,0.04);
    pointer-events: none;
    user-select: none;
    letter-spacing: -0.04em;
  }

  .diag-line {
    position: absolute;
    width: 1px;
    background: linear-gradient(180deg, transparent, var(--ember), transparent);
    opacity: 0.35;
    pointer-events: none;
  }

  .ember-text {
    color: var(--ember);
    text-shadow: 0 0 70px rgba(212,113,58,0.32);
  }

  .page-section, .section-shell {
    padding: 100px 28px;
    background: #14120f;
    border-top: 1px solid rgba(212,113,58,0.08);
  }

  .page-title {
    font-size: clamp(2.25rem, 4.7vw, 4.2rem);
    font-weight: 900;
    line-height: 1.08;
    color: var(--paper);
    max-width: 920px;
  }

  .page-intro {
    margin-top: 24px;
    max-width: 760px;
    font-size: 1rem;
    line-height: 1.9;
    color: rgba(232,223,208,0.62);
  }

  .grid-4 {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }

  .grid-2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 22px;
  }

  .split-grid {
    display: grid;
    grid-template-columns: 1.08fr 0.92fr;
    gap: 28px;
    align-items: start;
  }

  .card, .card-warm {
    background: rgba(255,255,255,0.035);
    border: 1px solid rgba(232,223,208,0.08);
    transition: border-color 0.35s, background 0.35s, transform 0.35s;
  }

  .card:hover, .card-warm:hover {
    border-color: rgba(212,113,58,0.32);
    background: rgba(212,113,58,0.05);
    transform: translateY(-3px);
  }

  .card-warm {
    background: linear-gradient(145deg, rgba(155,74,30,0.12), rgba(212,113,58,0.04));
    border: 1px solid rgba(212,113,58,0.22);
  }

  .card-button {
    text-align: left;
    cursor: pointer;
    width: 100%;
  }

  .pad-22 { padding: 22px; }
  .pad-24 { padding: 24px; }
  .pad-28 { padding: 28px; }
  .pad-30 { padding: 30px; }
  .pad-32 { padding: 32px; }
  .pad-34 { padding: 34px; }
  .pad-36 { padding: 36px; }
  .pad-38 { padding: 38px; }

  .list-card {
    display: flex;
    gap: 18px;
    align-items: flex-start;
  }

  .list-num {
    color: var(--ember);
    font-size: 0.7rem;
    letter-spacing: 0.22em;
    margin-top: 4px;
    flex-shrink: 0;
  }

  .step-card { position: relative; overflow: hidden; border-top: 2px solid var(--ember); }
  .step-num {
    position: absolute;
    top: 8px;
    right: 12px;
    font-size: 5rem;
    line-height: 1;
    color: rgba(212,113,58,0.09);
    font-family: 'Playfair Display', serif;
    font-weight: 900;
  }

  .feature-line {
    display: flex;
    gap: 14px;
    align-items: flex-start;
    font-family: 'Barlow Condensed', sans-serif;
    letter-spacing: 0.04em;
    color: rgba(232,223,208,0.78);
    line-height: 1.6;
  }

  .mini-rule {
    width: 22px;
    height: 1.5px;
    background: var(--ember);
    margin-top: 11px;
    flex-shrink: 0;
  }

  .seo-card {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .seo-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--ember);
    flex-shrink: 0;
  }

  .fi {
    background: rgba(13,11,9,0.42);
    border: 1px solid rgba(232,223,208,0.1);
    color: var(--cream);
    padding: 13px 16px;
    font-family: 'Barlow', sans-serif;
    font-size: 0.9rem;
    width: 100%;
    outline: none;
  }

  .fi:focus { border-color: rgba(212,113,58,0.5); }
  .fi::placeholder { color: rgba(232,223,208,0.3); }

  .footer {
    background: #0b0908;
    border-top: 1px solid rgba(212,113,58,0.12);
    padding: 50px 28px 24px;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr 1fr;
    gap: 36px;
    align-items: start;
  }

  .footer-links {
    display: grid;
    gap: 10px;
    margin-top: 16px;
  }

  .footer-link {
    background: none;
    border: none;
    color: rgba(232,223,208,0.62);
    text-align: left;
    cursor: pointer;
    font-family: 'Barlow Condensed', sans-serif;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-size: 0.82rem;
  }

  .footer-link:hover { color: var(--ember); }

  .footer-bottom {
    display: flex;
    justify-content: space-between;
    gap: 18px;
    flex-wrap: wrap;
    margin-top: 28px;
    padding-top: 20px;
    border-top: 1px solid rgba(255,255,255,0.05);
  }

  .tiny {
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(232,223,208,0.24);
    font-family: 'Barlow Condensed', sans-serif;
  }

  @media (max-width: 1100px) {
    .hero-grid, .split-grid, .footer-grid, .grid-4, .grid-2 {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 820px) {
    .desktop-nav, .desktop-cta { display: none; }
    .menu-btn { display: inline-flex; }
    .mobile-panel {
      display: grid;
      padding: 8px 0 16px;
    }
    .hero-grid, .split-grid, .footer-grid, .grid-4, .grid-2 {
      grid-template-columns: 1fr;
    }
    .btn-row { flex-direction: column; align-items: stretch; }
    .btn-fire, .btn-ghost { justify-content: center; }
    .hero { padding: 70px 20px; }
    .page-section, .section-shell, .footer { padding-left: 20px; padding-right: 20px; }
  }
`;}]}】【：】【“】【canmore.update_textdoc】【”】【Success

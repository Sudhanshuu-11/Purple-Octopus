import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { ArrowUpRight, Play, Sparkles, Menu, X, Instagram, Linkedin, Twitter } from "lucide-react";
import logoImage from "./assets/icon.png";
import "./styles.css";


gsap.registerPlugin(ScrollTrigger);

const MEDIA = {
  heroVideo: new URL("./assets/hero.mp4", import.meta.url).href,
  team: "https://images.pexels.com/photos/3184436/pexels-photo-3184436.jpeg?auto=compress&cs=tinysrgb&w=1600",
  creative: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1600",
  strategy: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1600",
  desk: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1400",
  portrait: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1000",
  campaign: "https://images.pexels.com/photos/38862869/pexels-photo-38862869.jpeg"
};

const services = [
  ["01", "Brand Strategy", "Positioning, messaging and a distinct visual language that makes your brand feel inevitable."],
  ["02", "Social & Content", "Scroll-stopping concepts, creator campaigns and content systems built for consistency."],
  ["03", "Performance", "Paid social, search and landing-page optimization engineered around measurable growth."],
  ["04", "Web Experiences", "Fast, expressive digital experiences with motion that supports the story — never distracts."],
];

const work = [
  { client: "NOVA", type: "Brand launch", metric: "+184%", image: MEDIA.campaign },
  { client: "KINDA", type: "Social growth", metric: "3.2×", image: MEDIA.creative },
  { client: "ARC / 01", type: "Digital experience", metric: "+71%", image: MEDIA.strategy },
];

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { y: 70, opacity: 0, rotateX: 8 },
        {
          y: 0, opacity: 1, rotateX: 0, duration: 1.05, delay, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 86%", once: true }
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [delay]);
  return <div ref={ref} className={className}>{children}</div>;
}

function App() {
  const root = useRef(null);
  const [menu, setMenu] = React.useState(false);

  useEffect(() => {
    const lenis = new Lenis({ autoRaf: false, smoothWheel: true, lerp: 0.075 });
    const raf = (time) => { lenis.raf(time); ScrollTrigger.update(); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      gsap.to(".hero-orb", {
        yPercent: 35, xPercent: 8, rotate: 22, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
      });
      gsap.to(".hero-media", {
        scale: 1.14, yPercent: 12, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
      });
      gsap.utils.toArray(".float-card").forEach((card, i) => {
        gsap.to(card, {
          y: i % 2 ? -35 : 28, rotate: i % 2 ? 2 : -2, ease: "none",
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.4 }
        });
      });

      gsap.utils.toArray(".service-card").forEach((card, i) => {
        gsap.fromTo(card, { y: 80, opacity: 0 }, {
          y: 0, opacity: 1, duration: .9, delay: i * .08, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%", once: true }
        });
      });

      gsap.to(".work-track", {
        xPercent: -38, ease: "none",
        scrollTrigger: {
          trigger: ".work-pin", start: "top top", end: "+=1500", pin: true, scrub: 1
        }
      });

      gsap.to(".manifesto-word", {
        color: "#8b5cf6", stagger: .08,
        scrollTrigger: { trigger: ".manifesto", start: "top 65%", end: "bottom 40%", scrub: true }
      });

      gsap.utils.toArray(".parallax-img").forEach((img) => {
        gsap.to(img, {
          yPercent: -12, ease: "none",
          scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: true }
        });
      });

      gsap.fromTo(".number", { innerText: 0 }, {
        innerText: 98, duration: 2, snap: { innerText: 1 }, ease: "power2.out",
        scrollTrigger: { trigger: ".stats", start: "top 78%", once: true }
      });
    }, root);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  const scrollTo = (id) => {
    setMenu(false);
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={root} className="site">
      <header className="nav">
        <button className="logo" onClick={() => scrollTo("#top")} aria-label="Purple Octopus home">
          <img className="logo-image" src={logoImage} alt="" />
          <span className="logo-name"><strong>PURPLE</strong><strong>OCTOPUS</strong></span>
        </button>
        <nav className={menu ? "nav-links open" : "nav-links"}>
          <button onClick={() => scrollTo("#services")}>Services</button>
          <button onClick={() => scrollTo("#work")}>Work</button>
          <button onClick={() => scrollTo("#about")}>About</button>
          <button className="nav-cta" onClick={() => scrollTo("#contact")}>Let's talk <ArrowUpRight size={15} /></button>
        </nav>
        <button className="menu-btn" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-grid"></div>
          <div className="hero-media"><video autoPlay muted loop playsInline src={MEDIA.heroVideo} /></div>
          <div className="hero-shade"></div>
          <div className="hero-orb"></div>
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles size={14} /> DIGITAL GROWTH STUDIO · EST. 2026</div>
            <h1>Make your<br /><span>brand</span> impossible<br />to ignore.</h1>
            <p>Strategy, creative and performance marketing for ambitious brands that are ready to move differently.</p>
            <div className="hero-actions">
              <button className="button primary" onClick={() => scrollTo("#contact")}>Start a project <ArrowUpRight size={18} /></button>
              <button className="button ghost" onClick={() => scrollTo("#work")}><Play size={16} fill="currentColor" /> See our work</button>
            </div>
          </div>
          <div className="float-card card-one"><small>REACH</small><strong>2.8M+</strong><span>monthly impressions</span></div>
          <div className="float-card card-two"><span className="pulse"></span><small>LIVE CAMPAIGN</small><strong>+184%</strong><span>conversion lift</span></div>
          <div className="hero-bottom"><span>SCROLL TO EXPLORE</span><span className="line"></span><span>01 / 06</span></div>
        </section>

        <section className="ticker"><div className="ticker-inner">
          <span>STRATEGY</span><i>✦</i><span>CREATIVE</span><i>✦</i><span>PERFORMANCE</span><i>✦</i><span>EXPERIENCE</span><i>✦</i>
          <span>STRATEGY</span><i>✦</i><span>CREATIVE</span><i>✦</i><span>PERFORMANCE</span><i>✦</i>
        </div></section>

        <section id="about" className="intro section">
          <Reveal className="section-kicker">/ WHO WE ARE</Reveal>
          <Reveal><h2 className="huge">We turn attention<br />into <em>action.</em></h2></Reveal>
          <div className="intro-bottom">
            <Reveal><p className="lead">Purple Octopus is a digital marketing agency built for brands that don't want to blend in. We combine sharp strategy, obsessive creativity and performance thinking to create work people remember — and results businesses can measure.</p></Reveal>
            <Reveal delay=".12"><img className="parallax-img rounded" src={MEDIA.team} alt="Creative team collaborating" /></Reveal>
          </div>
        </section>

        <section id="services" className="services section dark-section">
          <div className="section-head"><div className="section-kicker">/ WHAT WE DO</div><span>BUILT FOR MOMENTUM →</span></div>
          <div className="services-list">
            {services.map(([num, title, desc]) => (
              <article className="service-card" key={num}>
                <span className="service-num">{num}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
                <ArrowUpRight className="service-arrow" />
              </article>
            ))}
          </div>
        </section>

        <section className="manifesto section">
          <div className="section-kicker">/ OUR POV</div>
          <h2>
            <span className="manifesto-word">People</span>{" "}
            <span className="manifesto-word">don't</span>{" "}
            <span className="manifesto-word">remember</span>{" "}
            <span className="manifesto-word">ads.</span><br />
            <span className="manifesto-word">They</span>{" "}
            <span className="manifesto-word">remember</span>{" "}
            <span className="manifesto-word">how</span>{" "}
            <span className="manifesto-word">you</span>{" "}
            <span className="manifesto-word">made</span>{" "}
            <span className="manifesto-word">them</span>{" "}
            <span className="manifesto-word">feel.</span>
          </h2>
        </section>

        <section id="work" className="work-pin">
          <div className="work-wrap">
            <div className="work-heading">
              <div><div className="section-kicker">/ SELECTED WORK</div><h2>Work that<br /><em>moves.</em></h2></div>
              <p>From first impression to final conversion, every detail earns its place.</p>
            </div>
            <div className="work-track">
              {work.map((item, i) => (
                <article className="work-card" key={item.client}>
                  <div className="work-image"><img className="parallax-img" src={item.image} alt={`${item.client} campaign`} /><span>{String(i + 1).padStart(2, "0")}</span></div>
                  <div className="work-meta"><div><small>{item.type}</small><h3>{item.client}</h3></div><strong>{item.metric}</strong></div>
                </article>
              ))}
              <div className="work-end"><span>MORE STORIES</span><ArrowUpRight size={40} /></div>
            </div>
          </div>
        </section>

        <section className="stats section">
          <div className="stat-big"><span className="number">98</span><sup>%</sup></div>
          <div><div className="section-kicker">/ THE DIFFERENCE</div><h2>Creative with a<br /><em>commercial brain.</em></h2><p>We care about beautiful work. We care even more about what it does next.</p></div>
        </section>

        <section className="image-break"><img className="parallax-img" src={MEDIA.desk} alt="Creative workspace" /></section>

        <section id="contact" className="contact section">
          <div className="contact-orb"></div>
          <div className="section-kicker">/ HAVE A CHALLENGE?</div>
          <h2>Let's make<br /><em>something loud.</em></h2>
          <button className="button primary giant">hello@purpleoctopus.agency <ArrowUpRight /></button>
          <div className="contact-foot"><span>New Delhi · Mumbai · Everywhere</span><div className="socials"><Instagram /><Linkedin /><Twitter /></div><span>© 2026 Purple Octopus</span></div>
        </section>
      </main>

      <footer className="footer"><span>PURPLE OCTOPUS</span><span>Digital marketing / Brand / Experience</span><span>Scroll responsibly ↓</span></footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { ArrowLeft, ArrowRight, ArrowUpRight, Facebook, Play, Sparkles, Menu, X, Instagram, Linkedin, Twitter } from "lucide-react";
import heroVideo from "../assets/hero.mp4";
import logoImage from "../assets/icon.png";
import { getProjects } from "../app/api.js";
import { services } from "../data/services.js";
import "../styles.css";


gsap.registerPlugin(ScrollTrigger);

const MEDIA = {
  heroVideo,
  team: "https://images.pexels.com/photos/3184436/pexels-photo-3184436.jpeg?auto=compress&cs=tinysrgb&w=1600",
  creative: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1600",
  strategy: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1600",
  desk: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1400",
  portrait: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1000",
  campaign: "https://images.pexels.com/photos/38862869/pexels-photo-38862869.jpeg"
};

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

export default function HomePage() {
  const root = useRef(null);
  const workScroller = useRef(null);
  const [menu, setMenu] = React.useState(false);
  const [work, setWork] = React.useState([]);
  const [workStatus, setWorkStatus] = React.useState("loading");

  useEffect(() => {
    let active = true;
    getProjects()
      .then((projects) => {
        if (!active) return;
        setWork(projects);
        setWorkStatus("ready");
        requestAnimationFrame(() => ScrollTrigger.refresh());
      })
      .catch(() => active && setWorkStatus("error"));
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const lenis = new Lenis({ autoRaf: false, smoothWheel: true, lerp: 0.075 });
    let rafId;
    const raf = (time) => { lenis.raf(time); ScrollTrigger.update(); rafId = requestAnimationFrame(raf); };
    rafId = requestAnimationFrame(raf);

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
      cancelAnimationFrame(rafId);
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  const scrollTo = (id) => {
    setMenu(false);
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollWork = (direction) => {
    workScroller.current?.scrollBy({ left: direction * 460, behavior: "smooth" });
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
              <a className="button primary" href="/contact" data-nav>Start a project <ArrowUpRight size={18} /></a>
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
            <Reveal><div className="lead"><p>We’re Sudhanshu and Avinash, the founders of Purple Octopus. We started this digital marketing agency to help ambitious brands find their voice, connect with the right people and grow with purpose.</p><p>From social media and content to search and performance campaigns, we bring strategy, creative and data together. We shape clear plans, make useful and memorable work, then keep learning from the results so every next move works harder for the business.</p></div></Reveal>
            <Reveal delay=".12"><img className="parallax-img rounded" src={MEDIA.team} alt="Creative team collaborating" /></Reveal>
          </div>
        </section>

        <section id="services" className="services section dark-section">
          <div className="section-head"><div className="section-kicker">/ WHAT WE DO</div><span>BUILT FOR MOMENTUM →</span></div>
          <div className="services-list">
            {services.map((service) => (
              <a className="service-card" href={service.path} data-nav key={service.path}>
                <span className="service-num">{service.number}</span>
                <h3>{service.name}</h3>
                <p>{service.summary}</p>
                <ArrowUpRight className="service-arrow" />
              </a>
            ))}
          </div>
          <a className="services-all-link" href="/services" data-nav>Explore all services <ArrowUpRight size={16} /></a>
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
              <div className="work-heading-side"><p>From first impression to final conversion, every detail earns its place.</p><div className="work-controls"><button type="button" onClick={() => scrollWork(-1)} aria-label="Show previous work"><ArrowLeft size={20} /></button><button type="button" onClick={() => scrollWork(1)} aria-label="Show next work"><ArrowRight size={20} /></button></div></div>
            </div>
            <div className="work-track" ref={workScroller}>
              {work.map((item, i) => {
                const PlatformIcon = item.platform === "Facebook" ? Facebook : item.platform === "LinkedIn" ? Linkedin : Instagram;
                const platform = item.platform || "Instagram";
                return <article className="work-card" key={item._id || `${item.client}-${i}`}>
                  <div className="instagram-profile">
                    <img className="instagram-avatar" src={item.avatar} alt={`${item.client} profile`} />
                    <div><strong>{item.handle}</strong><span>{item.client} · {platform}</span></div>
                    {item.profileUrl && <a className="work-profile-link" href={item.profileUrl} target="_blank" rel="noreferrer">View ↗</a>}
                  </div>
                  <div className="work-image"><img className="parallax-img" src={item.image} alt={`${item.client} campaign`} /><span>{String(i + 1).padStart(2, "0")}</span></div>
                  <div className="instagram-stats">
                    {item.posts && <span><strong>{Number(item.posts).toLocaleString()}</strong> posts</span>}
                    <span><strong>{Number(item.followers).toLocaleString()}</strong> followers</span>
                    {item.metric && <span><strong>{item.metric}</strong> growth</span>}
                  </div>
                  <div className="work-meta"><div><small>{item.type}</small><h3>{item.client}</h3><p>{item.bio}</p></div><PlatformIcon className="work-platform-icon" size={22} aria-label={platform} /></div>
                </article>;
              })}
              {workStatus === "loading" && <p className="work-empty" role="status">Loading profiles…</p>}
              {workStatus === "error" && <p className="work-empty" role="status">Work is temporarily unavailable.</p>}
              {workStatus === "ready" && work.length === 0 && <p className="work-empty">Profiles added to the portfolio will appear here.</p>}
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
          <a className="button primary giant" href="mailto:purpleoctopus@outlook.in">purpleoctopus@outlook.in <ArrowUpRight /></a>
          <div className="contact-foot"><span>Gorakhpur · Noida · Everywhere</span><div className="socials"><Instagram /><Linkedin /><Twitter /></div><span>© 2026 Purple Octopus</span></div>
        </section>
      </main>

      <footer className="footer"><span>PURPLE OCTOPUS</span><span>Digital marketing / Brand / Experience</span><span>Scroll responsibly ↓</span></footer>
    </div>
  );
}

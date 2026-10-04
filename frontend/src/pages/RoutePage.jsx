import React from "react";
import PageLayout from "../components/layout/PageLayout.jsx";
import { services } from "../data/services.js";

function ServiceCards({ entries, heading, intro }) {
  return (
    <section className="service-discovery">
      <div className="section-kicker">/ KEEP EXPLORING</div>
      <h2>{heading}</h2>
      <p className="service-discovery-intro">{intro}</p>
      <div className="service-route-grid">
        {entries.map((service) => (
          <a className="service-route-card" href={service.path} data-nav key={service.path}>
            <span className="service-route-number">{service.number}</span>
            <h3>{service.name}</h3>
            <p>{service.summary}</p>
            <span className="service-route-link">Explore service <span aria-hidden="true">↗</span></span>
          </a>
        ))}
      </div>
    </section>
  );
}

function ServiceDetails({ page }) {
  return (
    <section className="service-details">
      <div className="section-kicker">/ THE WAY WE WORK</div>
      <h2>{page.detailHeading}</h2>
      <div className="service-detail-grid">
        <article className="service-detail-panel service-approach">
          <h3>How we do it</h3>
          <ol>
            {page.approach.map((step, index) => (
              <li key={step}>
                <span className="service-step-number">0{index + 1}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </article>
        <div className="service-detail-aside">
          <article className="service-detail-panel">
            <h3>How we work with you</h3>
            <p>{page.collaboration}</p>
          </article>
          <article className="service-detail-panel service-growth-panel">
            <h3>How it supports growth</h3>
            <p>{page.growth}</p>
          </article>
        </div>
      </div>
    </section>
  );
}

function AboutDetails() {
  return (
    <section className="about-route-details">
      <div className="about-route-story">
        <div className="section-kicker">/ THE FIRM</div>
        <h2>Strategy, creative<br />and growth in one studio.</h2>
        <p>Purple Octopus is an independent digital marketing studio founded by Sudhanshu and Avinash. We help ambitious brands find their voice, connect with the right people and turn attention into meaningful action.</p>
        <p>We bring brand thinking and practical digital execution together, so the work feels distinctive and supports a clear business goal.</p>
      </div>
      <div className="about-route-principles">
        <article>
          <span>01 / START WITH CLARITY</span>
          <h3>Know what needs to change.</h3>
          <p>We begin with your audience, your offer and the outcome you want. That gives every channel and creative choice a reason to be there.</p>
        </article>
        <article>
          <span>02 / MAKE IT CONNECT</span>
          <h3>Bring the moving parts together.</h3>
          <p>Social, paid campaigns, search, video and content work best when they support the same story and customer journey.</p>
        </article>
        <article>
          <span>03 / KEEP LEARNING</span>
          <h3>Use results to shape the next move.</h3>
          <p>We review what is resonating, what is converting and where people get stuck, then use those learnings to improve the work.</p>
        </article>
      </div>
      <div className="about-route-capabilities">
        <div><div className="section-kicker">/ WHAT WE BRING TOGETHER</div><h2>One partner across the journey.</h2></div>
        <div className="about-capability-list">{services.map((service) => <span key={service.path}>{service.name}</span>)}</div>
      </div>
      <div className="about-route-footnote">
        <span>Based in Gorakhpur and Noida. Working everywhere.</span>
        <a href="/contact" data-nav>Tell us what you’re building <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}

export default function RoutePage({ page }) {
  const suggestions = page.kind === "service"
    ? services.filter((service) => service.path !== page.path)
    : services;

  return (
    <PageLayout>
      <section className={`route-hero${page.kind === "service" ? " service-detail-hero" : ""}`}>
        <div className="section-kicker">/ {page.eyebrow}</div>
        <h1>{page.title.split("\n").map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</h1>
        <p>{page.description}</p>
        {page.items.length > 0 && <ul>{page.items.map((item) => <li key={item}>{item.includes("@") ? <a href={`mailto:${item}`}>{item}</a> : item}</li>)}</ul>}
        <a className="button primary" href="/contact" data-nav>Start a project <span aria-hidden="true">↗</span></a>
      </section>
      {page.kind === "service" && <ServiceDetails page={page} />}
      {page.kind === "about" && <AboutDetails />}
      {page.kind === "directory" && <ServiceCards entries={suggestions} heading="Find the right way forward." intro="Explore each service to see what we do and how it can support your next stage of growth." />}
      {page.kind === "service" && <ServiceCards entries={suggestions} heading="More ways to move your brand forward." intro="A strong growth plan connects the channels. Explore another service and see how we can work together." />}
    </PageLayout>
  );
}

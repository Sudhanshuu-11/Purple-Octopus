import React from "react";

const navItems = [
  ["Home", "/"],
  ["Services", "/services"],
  ["Work", "/work"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

export default function PageLayout({ children }) {
  return (
    <div className="route-site">
      <header className="route-nav">
        <a className="route-brand" href="/" data-nav>PURPLE <span>OCTOPUS</span></a>
        <nav aria-label="Main navigation">
          {navItems.map(([label, path]) => <a href={path} data-nav key={path}>{label}</a>)}
        </nav>
      </header>
      <main className="route-content">{children}</main>
      <footer className="route-footer"><span>PURPLE OCTOPUS</span><span>Digital marketing / Brand / Experience</span></footer>
    </div>
  );
}

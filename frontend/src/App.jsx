import React, { useEffect, useState } from "react";
import HomePage from "./pages/HomePage.jsx";
import EnquiryPage from "./pages/EnquiryPage.jsx";
import RoutePage from "./pages/RoutePage.jsx";
import ProfileAdminPage from "./pages/ProfileAdminPage.jsx";
import { routes } from "./app/routes.js";

export default function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const navigate = (event) => {
      const link = event.target.closest("a[data-nav]");
      if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const url = new URL(link.href, window.location.origin);
      if (url.origin !== window.location.origin) return;
      event.preventDefault();
      if (url.pathname !== window.location.pathname) {
        window.history.pushState({}, "", url.pathname);
        setPath(url.pathname);
        window.scrollTo(0, 0);
      }
    };
    const back = () => setPath(window.location.pathname);
    document.addEventListener("click", navigate);
    window.addEventListener("popstate", back);
    return () => {
      document.removeEventListener("click", navigate);
      window.removeEventListener("popstate", back);
    };
  }, []);

  if (path === "/") return <HomePage />;
  if (path === "/contact") return <EnquiryPage />;
  if (path === "/private/profile-manager") return <ProfileAdminPage />;
  if (routes[path]) return <RoutePage page={routes[path]} />;
  return <RoutePage page={{ eyebrow: "NOT FOUND", title: "This page\nwent wandering.", description: "The page you’re looking for doesn’t exist.", items: [] }} />;
}

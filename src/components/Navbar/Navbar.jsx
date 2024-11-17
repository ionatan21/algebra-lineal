import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Theme from "../Utils/Theme";

const Navbar = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDarkScheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (prefersDarkScheme) {
        setTheme("dark");
      }
    }
  }, []);

  useEffect(() => {
    document.body.classList.remove("light-theme", "dark-theme");
    document.body.classList.add(theme === "dark" ? "dark-theme" : "light-theme");
  }, [theme]);

  return (
    <section className="navbar-container">
      <nav className="navbar">
        <a
          className="Logo"
          href="https://portfolio-jonatan-barrios.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
        <div className="options">
          <Link to="/">Calculadora</Link>
          <Link to="/propiedades">Propiedades</Link>
          <Link to="/ejemplos">Ejemplos</Link>
        </div>
        <Theme toggleTheme={toggleTheme} theme={theme} />
      </nav>
    </section>
  );
};

export default Navbar;
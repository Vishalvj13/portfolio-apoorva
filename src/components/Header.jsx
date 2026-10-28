import { useEffect, useState } from "react";
import { navigation } from "../data.js";
function Header({ theme, onToggleTheme, onOpenResume }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  useEffect(() => {
    let frame;
    function update() {
      let current = "home";
      for (const [id] of navigation) {
        if (document.getElementById(id).getBoundingClientRect().top <= Math.max(180, innerHeight * 0.3)) current = id;
      }
      const contact = document.getElementById("contact").getBoundingClientRect();
      const visible = Math.max(0, Math.min(contact.bottom, innerHeight) - Math.max(contact.top, 100));
      if (contact.top < innerHeight * 0.6 && visible >= Math.min(240, contact.height / 2)) current = "contact";
      setActive(current);
    }
    function schedule() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    }
    function onEscape(event) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    addEventListener("keydown", onEscape);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      removeEventListener("keydown", onEscape);
    };
  }, []);
  return <header className="site-header"><nav aria-label="Main navigation" className="nav wrap">
    <a className="brand" href="#home" aria-label="Apoorva Lambat home" onClick={() => setMenuOpen(false)}>AL</a>
    <button className="menu-toggle icon-button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="nav-links" onClick={() => setMenuOpen((value) => !value)}>☰</button>
    <div id="nav-links" className={`nav-links ${menuOpen ? "open" : ""}`}>
      {navigation.map(([id, label]) => <a key={id} href={`#${id}`} className={active === id ? "active" : ""} aria-current={active === id ? "location" : void 0} onClick={() => setMenuOpen(false)}>{label}</a>)}
    </div>
    <div className="nav-actions">
      <button className="icon-button theme-toggle" aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} onClick={onToggleTheme}><span aria-hidden="true">{theme === "dark" ? "\u263C" : "\u263E"}</span></button>
      <button className="button small" onClick={onOpenResume}>Resume ↗</button>
    </div>
  </nav></header>;
}
export {
  Header as default
};

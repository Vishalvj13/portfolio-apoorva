import { useTypewriter } from "../hooks.js";
function Hero({ onOpenResume }) {
  const text = useTypewriter(["environmental research", "air quality", "sustainable materials"]);
  return <section id="home" className="hero">
<div className="hero-copy"><p className="eyebrow">HELLO, I’M</p><h1>Apoorva Lambat<span>.</span></h1><p className="role">Engineering <span>·</span> Environmental Research</p><p className="hero-description">Exploring the connection between the built environment, environmental challenges, and practical engineering.</p><p className="specializing">Exploring <span id="typewriter" aria-hidden="true">{text}</span><span className="sr-only">environmental research, air quality, and sustainable materials.</span><span className="cursor" aria-hidden="true">|</span></p><div className="actions"><a className="button" href="#projects">Explore Projects <span>↗</span></a><a className="button secondary" href="#contact">Connect</a><button className="text-button resume-trigger" onClick={onOpenResume}>View resume ↗</button></div><p className="hero-footnote"><span className="location-dot" /> Mumbai, Maharashtra, India</p></div>
<div className="portrait-area"><div className="portrait-frame"><img className="portrait-photo" src="assets/apoorva-portrait.jpg" alt="Apoorva Lambat" width="984" height="900" fetchPriority="high" /></div><div className="portrait-caption"><span>ACADEMIC FOUNDATION</span><strong>IIT Bombay · 2021–2023</strong></div></div>
<a className="scroll-link" href="#about">↓ <span>Get to know me</span></a>
</section>;
}
export {
  Hero as default
};

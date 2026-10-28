function Contact({ onOpenResume }) {
  return <section id="contact" className="section-card"><div className="contact-grid"><div><p className="eyebrow">CONTACT</p><h2>Let’s connect.</h2><p className="contact-description">For professional conversations, research connections, and opportunities to collaborate.</p><a className="button" href="https://www.linkedin.com/in/apoorva-lambat-871611204/" target="_blank" rel="noopener noreferrer">Connect on LinkedIn ↗</a></div><div className="placeholder"><span className="placeholder-label">ADD PREFERRED CONTACT DETAILS</span><h3>Make it easy to reach you</h3><p>Add an email address you want displayed publicly, your preferred location, and the opportunities you’re open to.</p><button className="text-button resume-trigger" onClick={onOpenResume}>Add a resume PDF ↗</button></div></div></section>;
}
export {
  Contact as default
};

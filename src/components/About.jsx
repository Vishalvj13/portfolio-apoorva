import { useState } from "react";
function About() {
  const [activeTab, setActiveTab] = useState("story");
  const ids = ["story", "interests", "personal"];
  function onTabKey(event, id) {
    let next;
    const index = ids.indexOf(id);
    if (event.key === "ArrowRight") next = (index + 1) % ids.length;
    if (event.key === "ArrowLeft") next = (index + ids.length - 1) % ids.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = ids.length - 1;
    if (next === void 0) return;
    event.preventDefault();
    setActiveTab(ids[next]);
    document.getElementById(`tab-${ids[next]}`)?.focus();
  }
  return <section id="about" className="section-card"><header className="section-heading"><p className="eyebrow">ABOUT</p><h2>The person behind the work</h2><p>A foundation in engineering, with an interest in environmental questions.</p></header><div className="about-layout"><div><div className="tabs" role="tablist" aria-label="About Apoorva"><button role="tab" id="tab-story" aria-controls="panel-story" onClick={() => setActiveTab("story")} onKeyDown={(event) => onTabKey(event, "story")} aria-selected={activeTab === "story"} tabIndex={activeTab === "story" ? 0 : -1}>The journey</button><button role="tab" id="tab-interests" aria-controls="panel-interests" onClick={() => setActiveTab("interests")} onKeyDown={(event) => onTabKey(event, "interests")} aria-selected={activeTab === "interests"} tabIndex={activeTab === "interests" ? 0 : -1}>Research interests</button><button role="tab" id="tab-personal" aria-controls="panel-personal" onClick={() => setActiveTab("personal")} onKeyDown={(event) => onTabKey(event, "personal")} aria-selected={activeTab === "personal"} tabIndex={activeTab === "personal" ? 0 : -1}>Beyond work</button></div><div className="tab-panel" id="panel-story" role="tabpanel" aria-labelledby="tab-story" tabIndex={0} hidden={activeTab !== "story"}><h3>From academic enquiry to industry.</h3><p>Apoorva’s public background includes study at IIT Bombay during 2021–2023 and experience at Black &amp; Veatch in Mumbai.</p><p>The listed academic work spans urban particulate pollution, industrial waste, construction materials, and structural design. Together, these projects offer a starting point for a portfolio about engineering and the environment.</p><div className="placeholder inline"><span className="placeholder-label">ADD PERSONAL INTRODUCTION</span><p>Describe your journey, what drew you to this field, and the kind of work you want to pursue.</p></div></div><div className="tab-panel" id="panel-interests" role="tabpanel" aria-labelledby="tab-interests" tabIndex={0} hidden={activeTab !== "interests"}><h3>Questions about our environment.</h3><p>Public project listings cover fine particulate matter, waste in sugar industries, plastic-containing bricks, and prestressed concrete design.</p><div className="placeholder inline"><span className="placeholder-label">CONFIRM CURRENT FOCUS</span><p>Which areas matter most to you today? Add your research interests, preferred methods, and future direction.</p></div></div><div className="tab-panel" id="panel-personal" role="tabpanel" aria-labelledby="tab-personal" tabIndex={0} hidden={activeTab !== "personal"}><h3>A little more than a professional profile.</h3><div className="placeholder"><span className="placeholder-label">ADD YOUR PERSONAL SIDE</span><p>Share two or three interests, a favourite way to spend a weekend, or a small detail you’d like people to know.</p></div></div></div><aside className="snapshot"><p className="eyebrow">AT A GLANCE</p><dl><div><dt>Industry connection</dt><dd>Black &amp; Veatch</dd></div><div><dt>Academic connection</dt><dd>IIT Bombay</dd></div><div><dt>Project themes</dt><dd>Air quality · Waste · Materials</dd></div></dl><a href="https://www.linkedin.com/in/apoorva-lambat-871611204/" target="_blank" rel="noopener noreferrer" className="text-link">View LinkedIn profile ↗</a></aside></div></section>;
}
export {
  About as default
};

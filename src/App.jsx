import { useState } from "react";
import { useTheme } from "./hooks.js";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import DraftNotice from "./components/DraftNotice.jsx";
import About from "./components/About.jsx";
import Experience from "./components/Experience.jsx";
import Projects from "./components/Projects.jsx";
import Expertise from "./components/Expertise.jsx";
import Education from "./components/Education.jsx";
import Contact from "./components/Contact.jsx";
import SourceNotes from "./components/SourceNotes.jsx";
import Footer from "./components/Footer.jsx";
import ProjectDialog from "./components/ProjectDialog.jsx";
import ResumeDialog from "./components/ResumeDialog.jsx";
function App() {
  const [theme, toggleTheme] = useTheme();
  const [highlighted, setHighlighted] = useState(false);
  const [projectId, setProjectId] = useState(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const openResume = () => setResumeOpen(true);
  return <div className={highlighted ? "highlight-placeholders" : ""}>
    <a className="skip" href="#main">Skip to content</a>
    <Header theme={theme} onToggleTheme={toggleTheme} onOpenResume={openResume} />
    <main id="main" className="wrap">
      <Hero onOpenResume={openResume} />
      <DraftNotice highlighted={highlighted} onToggle={() => setHighlighted((value) => !value)} />
      <About /><Experience /><Projects onOpenProject={setProjectId} /><Expertise /><Education />
      <Contact onOpenResume={openResume} /><SourceNotes />
    </main>
    <Footer />
    {projectId && <ProjectDialog projectId={projectId} onClose={() => setProjectId(null)} />}
    {resumeOpen && <ResumeDialog onClose={() => setResumeOpen(false)} />}
  </div>;
}
export {
  App as default
};

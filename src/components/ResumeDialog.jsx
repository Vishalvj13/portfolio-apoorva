import Modal from "./Modal.jsx";
function ResumeDialog({ onClose }) {
  return <Modal onClose={onClose} label="Resume placeholder"><span className="tag">RESUME PLACEHOLDER</span><h2>A resume belongs here.</h2><p>Add Apoorva’s approved PDF resume to this project, then replace this notice with a preview and download link.</p><a className="button secondary" href="https://www.linkedin.com/in/apoorva-lambat-871611204/" target="_blank" rel="noopener noreferrer">View LinkedIn instead ↗</a></Modal>;
}
export {
  ResumeDialog as default
};

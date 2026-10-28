import Modal from "./Modal.jsx";
import { projectInfo } from "../data.js";
function ProjectDialog({ projectId, onClose }) {
  const project = projectInfo[projectId];
  return <Modal onClose={onClose} labelledBy="dialog-title"><span className="tag" id="dialog-category">{project.category}</span><h2 id="dialog-title">{project.title}</h2><p id="dialog-description">{project.description}</p><div className="placeholder"><span className="placeholder-label">COMPLETE THIS CASE STUDY</span><div className="case-grid"><div><h3>Question &amp; context</h3><p>What problem did the project address, and why did it matter?</p></div><div><h3>Your contribution</h3><p>What did you personally investigate, design, or deliver?</p></div><div><h3>Methods &amp; tools</h3><p>Add your approach, software, sampling, or testing methods.</p></div><div><h3>Findings &amp; evidence</h3><p>Add supported results, limitations, and an original image or report link.</p></div></div></div><p className="visual-note">Project topic sourced from the public profile. Detailed methodology and results still need to be supplied.</p></Modal>;
}
export {
  ProjectDialog as default
};

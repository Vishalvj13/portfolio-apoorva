function DraftNotice({ highlighted, onToggle }) {
  return <div className="draft-note"><span className="draft-icon">✎</span><div><strong>A portfolio in progress</strong><p>Public professional details are included below. Dashed areas mark information to add or confirm.</p></div><button className="text-button" id="placeholder-toggle" onClick={onToggle} aria-pressed={highlighted}>{highlighted ? "Stop highlighting" : "Highlight placeholders"}</button></div>;
}
export {
  DraftNotice as default
};

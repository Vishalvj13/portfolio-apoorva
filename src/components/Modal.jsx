import { useEffect, useRef } from "react";
function Modal({ children, onClose, label, labelledBy }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);
  return <dialog
    ref={dialogRef}
    aria-label={label}
    aria-labelledby={labelledBy}
    onCancel={(event) => {
      event.preventDefault();
      closeRef.current();
    }}
    onClick={(event) => {
      if (event.target !== event.currentTarget) return;
      const rect = event.currentTarget.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeRef.current();
    }}
  >
      <button className="dialog-close icon-button" aria-label="Close dialog" onClick={onClose}>×</button>
      {children}
    </dialog>;
}
export {
  Modal as default
};

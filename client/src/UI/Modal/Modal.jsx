import cl from "./Modal.module.css";

export default function Modal({ children, onClose = () => {}, showClose }) {
  return (
    <div className={cl.overlay} onClick={() => onClose()}>
      <div
        className="modal"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {showClose && <p onClick={() => onClose()}>Close</p>}
        {children}
      </div>
    </div>
  );
}

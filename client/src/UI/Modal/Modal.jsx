import cl from "./Modal.module.css";

export default function Modal({ children, onClose }) {
  return (
    <div className={cl.overlay} onClick={() => onClose()}>
      <div
        className={cl.modal}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <p onClick={() => onClose()}>Close</p>
        {children}
      </div>
    </div>
  );
}

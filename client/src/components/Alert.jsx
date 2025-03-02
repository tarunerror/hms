function Alert({ type, message, onClose }) {
  if (!message) return null;

  return (
    <div className={`alert alert-${type}`}>
      <span>{message}</span>
      {onClose && (
        <button 
          className="alert-close" 
          onClick={onClose}
          aria-label="Close alert"
        >
          &times;
        </button>
      )}
    </div>
  );
}

export default Alert;

import '../assets/css/ConfirmationModal.css';

/**
 * ConfirmationModal component - A modal dialog that asks for user confirmation.
 *
 * @param {Object} props - The component props
 * @param {boolean} props.isOpen - Whether the modal is currently visible
 * @param {string} props.message - The confirmation message to display
 * @param {Function} props.onConfirm - Callback function when user confirms the action
 * @param {Function} props.onCancel - Callback function when user cancels the action
 * @returns {JSX.Element|null} The modal component or null when closed
 */
const ConfirmationModal = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;

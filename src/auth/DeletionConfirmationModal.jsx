import PropTypes from 'prop-types';
import React, { useState } from 'react';

export const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(password);
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="modal-title">Confirm Deletion</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="form-input fs-3"
            required
          />
          <div className="form-actions">
            <button className="btn btn-danger modal-btn fs-2" type="submit">
              Confirm Delete
            </button>
            <button className="btn btn-primary modal-btn fs-2" type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// PropTypes Validation
DeleteConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  error: PropTypes.string,
};

// Default Props
DeleteConfirmationModal.defaultProps = {
  error: null,
};

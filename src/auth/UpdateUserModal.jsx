import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './UpdateUserModal.css'; // Importing the CSS file

const UpdateUserModal = ({ isOpen, onClose, onUpdate, error }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username && !newPassword) {
      alert("Please fill either username and/or new password to update.");
      return;
    }

    if (username && !password) {
      alert("Password is required to update username.");
      return;
    }

    if (newPassword && !password) {
      alert("Old password is required to update password.");
      return;
    }

    const updateData = {};
    updateData.newUsername = username;
    updateData.password = password;
    updateData.newPassword = newPassword;
    console.log(updateData);
    onUpdate(updateData);
  };

  return (
    <div className="modal">
      <div className="modal-content-update text-light">
        <h2>Update User Information</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className='me-2 fs-4'>New Username:</label>
            <input
              type="username" 
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className='my-2'>
            <label htmlFor="password" className='fs-4'>Current Password (Required for username and/or password change):</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='my-2'>
            <label htmlFor="newPassword" className='fs-4'>New Password (if changing password):</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <button type="submit" className='btn btn-secondary fs-3 me-3 mt-3'>Update</button>
          <button type="button" className='btn btn-secondary fs-3 mt-3' onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

// PropTypes Validation
UpdateUserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired, // Required boolean to determine if modal is open
  onClose: PropTypes.func.isRequired, // Required function to handle closing the modal
  onUpdate: PropTypes.func.isRequired, // Required function to handle updates
  error: PropTypes.string, // Optional string for error messages
};

// Default Props
UpdateUserModal.defaultProps = {
  error: null, // Default error to null if not provided
};

export default UpdateUserModal;
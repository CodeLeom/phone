/* eslint-disable react/prop-types */
import { useState } from 'react';
import './OtpModal.css';

const OtpModal = ({ isOpen, closeModal, validateOtp }) => {
  const [otp, setOtp] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    validateOtp(otp);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Enter OTP</h2>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button onClick={handleSubmit}>Validate OTP</button>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default OtpModal;

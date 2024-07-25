/* eslint-disable react/prop-types */
import { useState } from "react";

const PhoneNumberInput = ({ phoneNumber, setPhoneNumber, requestOtp, username, setUsername }) => {
  const [error, setError] = useState('');

  const handlePhoneNumberChange = (e) => {
    const { value } = e.target;
    const phoneNumberRegex = /^[+\d\s-]*$/;
    if (phoneNumberRegex.test(value) || value === '') {
      setPhoneNumber(value);
      if (!value.startsWith('+')) {
        setError('Phone number must start with your country code. e.g +234');
      } else if (value.replace(/\D/g, '').length < 9) {
        setError('Phone number must be at least 9 digits long.');
      } else {
        setError('');
      }
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleRequestOtp = () => {
    if (username && phoneNumber.startsWith('+') && phoneNumber.replace(/\D/g, '').length >= 9) {
      requestOtp();
    } else {
      setError('Please provide a valid username and phone number.');
    }
  };

  return (
    <div>
      <h1>OTP Verification</h1>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={handleUsernameChange}
        required
      />
      <input
        type="tel"
        placeholder="Enter phone number (e.g., +2341234567890)"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        required
      />
      <button onClick={handleRequestOtp}>Request OTP</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default PhoneNumberInput;
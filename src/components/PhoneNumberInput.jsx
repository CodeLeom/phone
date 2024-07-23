/* eslint-disable react/prop-types */
const PhoneNumberInput = ({ phoneNumber, setPhoneNumber, requestOtp }) => {
    
    const handleChange = (e) => {
      const { value } = e.target;
      const phoneNumberRegex = /^[+\d]?[\d\s-]{7,15}$/;
      if (phoneNumberRegex.test(value) || value === '') {
        setPhoneNumber(value);
      }
    };
  
    return (
      <div>
        <h1>OTP Verification</h1>
        <input
          type="tel"
          placeholder="Enter phone number (e.g., +1234567890)"
          value={phoneNumber}
          onChange={handleChange}
        />
        <button onClick={requestOtp}>Request OTP</button>
      </div>
    );
  };
  
  export default PhoneNumberInput;
import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import PhoneNumberInput from "./components/PhoneNumberInput";
import OtpModal from "./components/layout/OtpModal";
import Home from "./components/pages/Home";

const App = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const BASE_URL = import.meta.env.VITE_BASE_URL;
    
  const navigate = useNavigate();

  const requestOtp = async () => {
    try {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      // Send OTP to the mock backend
      await fetch('http://localhost:4000/otps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phoneNumber, otp })
      });

      // Call the Autogon API to read the OTP to the user
      const response = await fetch(`${BASE_URL}/api/v1/phone/make-call`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-AUG-KEY': import.meta.env.VITE_API_KEY
        },
        body: JSON.stringify({
          phone_number: phoneNumber,
          prompt: [`Your OTP is ${otp}`],
          response_required: false
        })
      });

      if (response.ok) {
        setMessage('OTP sent successfully!');
        setIsOtpModalOpen(true);
      } else {
        const errorData = await response.json();
        setMessage(`Failed to send OTP: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setMessage(`Failed to send OTP: ${error.message || 'Unknown error'}`);
    }
  };

  const validateOtp = async (otp) => {
    try {
      const response = await fetch(`http://localhost:4000/otps?phoneNumber=${phoneNumber}&otp=${otp}`);
      const data = await response.json();
      if (data.length > 0) {
        setMessage('OTP validated successfully!');
        setUserName('User'); // Replace this with actual user data
        setIsOtpModalOpen(false);
        navigate('/welcome');
      } else {
        setMessage('Invalid OTP.');
      }
    } catch (error) {
      setMessage('Failed to validate OTP.');
    }
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <PhoneNumberInput
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            requestOtp={requestOtp}
          />
        } />
        <Route path="/welcome" element={<Home userName={userName} />} />
      </Routes>
      <OtpModal
        isOpen={isOtpModalOpen}
        closeModal={() => setIsOtpModalOpen(false)}
        validateOtp={validateOtp}
      />
      <p>{message}</p>
    </div>
  );
};

export default App;

import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import PhoneNumberInput from "./components/PhoneNumberInput";
import OtpModal from "./components/layout/OtpModal";
import Home from "./components/pages/Home";

const App = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [userName, setUserName] = useState('');

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const navigate = useNavigate();

  const requestOtp = async () => {
    try {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      // Join the OTP digits with spaces
      const otpDigits = otp.split('').join(' '); 
  
      // Send OTP to the mock backend
      await fetch('http://localhost:4000/otps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phoneNumber, otp })
      });
     
      // Save user details in the mock backend if not already present
      const userResponse = await fetch(`http://localhost:4000/users?phoneNumber=${phoneNumber}`);
      const userData = await userResponse.json();
      if (userData.length === 0) {
        await fetch('http://localhost:4000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ phoneNumber, username })
        });
      }
  
      // Call the Autogon API to read the OTP to the user twice
      const callResponse = await fetch(`${BASE_URL}/api/v1/phone/make-call`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-AUG-KEY': import.meta.env.VITE_API_KEY
        },
        body: JSON.stringify({
          phone_number: phoneNumber,
          prompt: [`Your OTP is ${otpDigits}`, `Your OTP is ${otpDigits}`], // Repeat the OTP twice
          response_required: false
        })
      });
  
      if (callResponse.ok) {
        setMessage('OTP sent successfully!');
        setIsOtpModalOpen(true);
      } else {
        const errorData = await callResponse.json();
        setMessage(`Failed to send OTP: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setMessage(`Failed to send OTP: ${error.message || 'Unknown error'}`);
    }
  };
  

  const validateOtp = async (otp) => {
    try {
      // Fetch all OTPs and filter in JavaScript
      const response = await fetch('http://localhost:4000/otps');
      const data = await response.json();
      
      // Find the OTP matching the phone number and the OTP entered by the user
      const validOtp = data.find(item => item.phoneNumber === phoneNumber && item.otp === otp);
      if (validOtp) {
        const userResponse = await fetch(`http://localhost:4000/users?phoneNumber=${encodeURIComponent(phoneNumber)}`);
        const userData = await userResponse.json();
        if (userData.length > 0) {
          setUserName(userData[0].username);
        }
        setMessage('OTP validated successfully!');
        setIsOtpModalOpen(false);
        navigate('/welcome');
      } else {
        setMessage('Invalid OTP.');
      }
    } catch (error) {
      console.error('Error validating OTP:', error);
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
            username={username}
            setUsername={setUsername}
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
import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import PhoneNumberInput from './components/PhoneNumberInput';
import OtpModal from './components/OtpModal';
import WelcomePage from './components/WelcomePage';

const App = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [userName, setUserName] = useState('');

  const navigate = useNavigate();

  const requestOtp = async () => {
    try {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      await axios.post('http://localhost:5000/otps', { phoneNumber, otp });

      // Call the Autogon API to read the OTP to the user
      await axios.post('https://devapi.autogon.ai/customer-service/api/v1/phone/make-call', {
        phone_number: phoneNumber,
        prompt: [`Your OTP is ${otp}`],
        response_required: false
      }, {
        headers: {
          'Content-Type': 'application/json',
          'X-AUG-KEY': import.meta.env.VITE_API_KEY
        }
      });

      setMessage('OTP sent successfully!');
      setIsOtpModalOpen(true);
    } catch (error) {
      setMessage('Failed to send OTP.');
    }
  };

  const validateOtp = async (otp) => {
    try {
      const response = await axios.get(`http://localhost:5000/otps?phoneNumber=${phoneNumber}&otp=${otp}`);
      if (response.data.length > 0) {
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
        <Route path="/welcome" element={<WelcomePage userName={userName} />} />
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

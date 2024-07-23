/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';

const Home = ({ userName }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome, {userName}!</h1>
      <button onClick={() => navigate('/')}>Logout</button>
    </div>
  );
};

export default Home;

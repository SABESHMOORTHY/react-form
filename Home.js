import React from 'react';
import { useNavigate } from 'react-router-dom'; 
function Home() {
  const navigate = useNavigate(); 
  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <button onClick={() => navigate('/login')}>Go to Login</button> {/* Button to navigate to Login */}
    </div>
  );
}

export default Home;

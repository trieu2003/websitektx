import React from 'react';
import LoginSection from '../components/LoginForm';
import Notifications from '../components/Notifications';
import Navbar from '../components/Navbar';
import '/src/assets/style/style.css';
const Login = () => {
  return (
    <div className="login">
        
        <div className="container">
            {/* <Notifications /> */}
            
            <LoginSection />
        </div>
    </div>
    
  );
};

export default Login;
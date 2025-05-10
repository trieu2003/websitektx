import React from 'react';
import Navbar_Home from '../components/Navbar_Home';
import Sidebar from '../components/Sidebar';
import '/src/assets/style/style.css';
import NoiQuy from '../HeThong/NoiQuy';
import Navbar from '../components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from '../Pages/Login';
const Home = () => {
  return (
    <div className="home">
    <Login />
       {/* <Router>
        <Navbar />
       
        <div className="container">
        
         
         
          <div className="container">
            <Sidebar />
            <NoiQuy />
        </div>
        </div>
      </Router>
      <Navbar_Home/> */}
   
    </div>      
    
  );
};

export default Home;
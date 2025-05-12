import React from "react";
import '/src/assets/css/navbar.css';
import logo from '../assets/images/logo-navbar.png';
const Navbar = () => {
  return (
    <nav className="navbar w-full bg-[#005ab7] py-2">
      <div className="max-w-screen-md mx-auto flex justify-center items-center">
        <a className="navbar-brand" href="/">
          <img src={logo} alt="Logo HUIT" className="logo-img" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
import React from "react";
import '/src/assets/style/style.css';

const Navbar = () => {
  return (
    <nav className="navbar w-100" style={{ backgroundColor: "#005ab7" }}>
      <div className="container-fluid">
        <div className="d-flex justify-content-center align-items-center w-100">
          <a className="navbar-brand m-0">
            <div
              className="logo-container"
              
            >
              <img
                src="logo-navbar.png"
                alt="Logo HUIT"
                className="logo-img"
                style={{ height: "80px" }}
              />
            </div>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
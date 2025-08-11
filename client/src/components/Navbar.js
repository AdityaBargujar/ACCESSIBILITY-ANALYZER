import React from "react";
import "./Navbar.css";


function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Accessify</div>
      <ul className="navbar-links">
        <li><a href="#upload">Upload</a></li>
        <li><a href="#results">Results</a></li>
        <li><a href="#about">About</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;

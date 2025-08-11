import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="/about">About</a>
        <a href="/tools">Tools</a>
        <a href="/contact">Contact</a>
      </div>
      <p>© {new Date().getFullYear()} Accessibility Analyzer. All rights reserved.</p>
    </footer>
  );
};

export default Footer;

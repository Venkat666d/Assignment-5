// Footer.js
import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-4 mt-5">
      <div className="container">
        <p className="mb-1">&copy; 2025 MiniAmazon. All Rights Reserved.</p>
        <div className="d-flex justify-content-center flex-wrap gap-3">
          <a href="#" className="text-white text-decoration-none">About Us</a>
          <a href="#" className="text-white text-decoration-none">Contact</a>
          <a href="#" className="text-white text-decoration-none">Help</a>
          <a href="#" className="text-white text-decoration-none">Returns</a>
          <a href="#" className="text-white text-decoration-none">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

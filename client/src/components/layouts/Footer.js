import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-3 mb-lg-0">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>
                <i className="fas fa-envelope"></i>
                <Link href="mailto:info@example.com" className="ms-2">info@example.com</Link>
              </li>
              <li>
                <i className="fas fa-phone"></i>
                <Link href="tel:+1234567890" className="ms-2">+1 (234) 567-890</Link>
              </li>
              <li>
                <i className="fas fa-map-marker-alt"></i>
                <span className="ms-2">123 Street Name, City, Country</span>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 mb-3 mb-lg-0">
            <h5>Social Media</h5>
            <ul className="list-unstyled">
              <li><Link to="/"><i className="fab fa-facebook-f"></i></Link></li>
              <li><Link to="/"><i className="fab fa-twitter"></i></Link></li>
              <li><Link to="/"><i className="fab fa-instagram"></i></Link></li>
            </ul>
          </div>
          <div className="col-lg-4">
            <h5>Site Map</h5>
            <ul className="list-unstyled">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/">About</Link></li>
              <li><Link to="/">Services</Link></li>
              <li><Link to="/">Contact</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

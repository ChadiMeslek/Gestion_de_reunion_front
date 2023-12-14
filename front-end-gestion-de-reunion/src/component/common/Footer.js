import React from 'react';
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="container my-5">
      <div className="card-footer text-muted text-center">
        <small>© 2023 - Tous droits réservés</small>
      </div>
      <footer className="bg-dark text-center text-white">
        <div className="container p-4 pb-0">
          <section className="mb-4">
            {/* Facebook */}
            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
              <FaFacebookF />
            </a>

            {/* Twitter */}
            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
              <FaTwitter />
            </a>

            {/* Google */}
            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
              <FaGoogle />
            </a>

            {/* Instagram */}
            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
              <FaInstagram />
            </a>

            {/* Linkedin */}
            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
              <FaLinkedinIn />
            </a>

            {/* Github */}
            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
              <FaGithub />
            </a>
          </section>
          {/* Section: Social media */}
        </div>
        {/* Grid container */}

        {/* Copyright */}
        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          © 2023 Copyright:
          <a className="text-white" href="https://mdbootstrap.com/">-Chadi Meslek-</a>
        </div>
        {/* Copyright */}
      </footer>
    </div>
    /* End of .container */
  );
};

export default Footer;

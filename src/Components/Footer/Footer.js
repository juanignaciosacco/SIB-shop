import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="container">
        <div className="section--nav">
          <h3 className="heading">Navegación</h3>
          <ul className="list">
            <li><Link to={'/'}>Inicio</Link></li>
            <li><Link to={'/tienda'}>Mujeres</Link></li>
            <li><Link to={'/contacto'}>Contacto</Link></li>
          </ul>
        </div>
        <div className="section--redes">
          <h3 className="heading">Redes Sociales</h3>
          <ul className="list--redes">
            <li><a href="https://instagram.com/sibhouse.uy?igshid=MjEwN2IyYWYwYw==" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faInstagram} /></a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

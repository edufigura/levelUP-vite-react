import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faBan,
  faUpLong,
  faPhone,
  faClock,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import "../../assets/styles/Footer.css"; 
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row className="footer-content">
          <Col lg={4} md={6} className="footer-section">
            <div className="footer-brand">
              <h4 className="footer-title">LevelUP <FontAwesomeIcon icon={faUpLong}/></h4>
              <p className="footer-description">
                Tu tienda de confianza para productos gaming de alta calidad.
              </p>
              <div className="footer-contact-info">
                <div className="contact-item">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                  <span>Santiago, Chile</span>
                </div>
                <div className="contact-item">
                  <FontAwesomeIcon icon={faPhone} className="me-2" />
                  <span>+56 9 5197 0729</span>
                </div>
                <div className="contact-item">
                  <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                  <span>correo@dominio.cl</span>
                </div>
                <div className="contact-item">
                  <FontAwesomeIcon icon={faClock} className="me-2" />
                  <span>Lun - Vie: 9:00 - 18:00</span>
                </div>
              </div>
            </div>
          </Col>
          
          <Col lg={2} md={6} className="footer-section">
            <h5 className="footer-subtitle">Productos</h5>
            <ul className="footer-links">
              <li><Link to="/catalogo">Catálogo</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </Col>
                    
          <Col lg={2} md={6} className="footer-section">
            <h5 className="footer-subtitle">Redes sociales</h5>
            <ul className="footer-links">
              <li><a href="https://discord.com/">Discord</a></li>
              <li><a href="https://www.instagram.com">Instagram</a></li>
              <li><a href="https://www.youtube.com/">YouTube</a></li>
            </ul>
          </Col>
        </Row>
        
        <div className="footer-bottom">
          <Row className="align-items-center">
            <Col md={6}>
              <p className="footer-copyright">
                &copy; 2025 - DMCA Level Up Store™. Todos los derechos reservados y no reservados.
              </p>
              <p>
                <FontAwesomeIcon icon={faBan}/> Copiar contenido puede causar consecuencias ilegales.
              </p>
            </Col>
            <Col md={6}>
              <div className="footer-payment-crdits">
                <span className="payment-text">Creado por: Eduardo, Lucia, Rodro</span>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </footer>
  );
}

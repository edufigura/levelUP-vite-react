import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import '../../../styles/Notificacion.css';

export default function Notificacion({ show, onClose, product, quantity = 1 }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); //tiempo para q termine animacion
      }, 3000); // duracion de la animacion

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className={`notification-container ${isVisible ? 'show' : 'hide'}`}>
      <Alert className="notification-alert" variant="success">
        <div className="notification-content">
          <div className="notification-icon">
            <FontAwesomeIcon icon={faCheckCircle} />
          </div>
          <div className="notification-text">
            <strong>¡Producto agregado!</strong>
            <div className="product-info">
              <span>{product?.name}</span>
              {quantity > 1 && <span className="quantity">x{quantity}</span>}
            </div>
            <small>Se agregó al carrito correctamente</small>
          </div>
          <div className="notification-cart-icon">
            <FontAwesomeIcon icon={faShoppingCart} />
          </div>
        </div>
        
        {/* Barra de progreso */}
        <div className="notification-progress">
          <div className="notification-progress-bar"></div>
        </div>
      </Alert>
    </div>
  );
}
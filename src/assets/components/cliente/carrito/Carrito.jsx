// src/components/cliente/carrito/Carrito.jsx
import React from "react";
import { Container, Row, Col, Card, Button, Table, Alert } from "react-bootstrap";
import { useCart } from "./CartContext.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faTrash, 
  faPlus, 
  faMinus, 
  faArrowLeft, 
  faCreditCard,
  faShoppingBag,
  faHeart
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import '../../../styles/Carrito.css';

export default function Carrito() {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getTotalPrice,
    getTotalItems 
  } = useCart();

  const formatPrecioCLP = (precio) =>
    new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(precio);

  const handleCheckout = () => {
    alert('¡Gracias por tu compra! Este es un demo.');
    clearCart();
  };

  if (cartItems.length === 0) {
    return (
      <div className="carrito-page">
        <Container className="py-5">
          <div className="empty-cart text-center">
            <div className="empty-cart-icon mb-4">
              <FontAwesomeIcon icon={faShoppingBag} size="4x" className="text-muted" />
            </div>
            <h2 className="empty-cart-title">Tu carrito está vacío</h2>
            <p className="empty-cart-text mb-4">
              ¡Descubre nuestros increíbles productos gaming!
            </p>
            <div className="empty-cart-actions">
              <Link to="/catalogo" className="gradient-btn btn me-3">
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                Explorar Catálogo
              </Link>
              <Link to="/" className="btn btn-outline-primary">
                <FontAwesomeIcon icon={faHeart} className="me-2" />
                Ver Destacados
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="carrito-page">
      <Container className="py-5">
        <Row>
          <Col>
            {/* Encabezado */}
            <div className="carrito-header text-center mb-5">
              <h1 className="carrito-title">Tu Carrito de Compras</h1>
              <p className="carrito-subtitle">Revisa tus productos antes de proceder al pago</p>
            </div>

            {/* Resumen general */}
            <Alert variant="info" className="summary-alert">
              <div className="d-flex justify-content-between align-items-center">
                <span><strong>{getTotalItems()} producto(s)</strong> en tu carrito</span>
                <Button variant="outline-danger" size="sm" onClick={clearCart}>
                  <FontAwesomeIcon icon={faTrash} className="me-2" />
                  Vaciar Carrito
                </Button>
              </div>
            </Alert>

            {/* Tabla de productos */}
            <Card className="cart-table-card">
              <Card.Body className="p-0">
                <Table responsive className="cart-table mb-0">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Precio Unitario</th>
                      <th>Cantidad</th>
                      <th>Subtotal</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={`${item.id}-${item.quantity}`}>
                        <td data-label="Producto">
                          <div className="product-info d-flex align-items-center">
                            <img 
                              src={item.img} 
                              alt={item.name}
                              className="product-image me-3"
                              onError={(e) => { e.target.src = '/assets/placeholder.jpg'; }}
                            />
                            <div className="product-details">
                              <h6 className="product-name">{item.name}</h6>
                              {item.category && <small className="product-category">{item.category}</small>}
                            </div>
                          </div>
                        </td>
                        <td data-label="Precio Unitario" className="price-cell">
                          <span className="unit-price">{formatPrecioCLP(item.price)}</span>
                        </td>
                        <td data-label="Cantidad">
                          <div className="quantity-controls d-flex align-items-center gap-2">
                            <Button 
                              variant="outline-secondary" 
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <FontAwesomeIcon icon={faMinus} />
                            </Button>
                            <span className="quantity-display">{item.quantity}</span>
                            <Button 
                              variant="outline-secondary" 
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <FontAwesomeIcon icon={faPlus} />
                            </Button>
                          </div>
                        </td>
                        <td data-label="Subtotal" className="price-cell">
                          <span className="subtotal-price">{formatPrecioCLP(item.price * item.quantity)}</span>
                        </td>
                        <td data-label="Acciones">
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="remove-btn"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>

            {/* Resumen total y checkout */}
            <Row className="mt-5">
              <Col md={8}>
                <div className="continue-shopping">
                  <Link to="/catalogo" className="btn btn-outline-primary">
                    <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                    Seguir Comprando
                  </Link>
                </div>
              </Col>
              <Col md={4}>
                <Card className="total-summary">
                  <Card.Body>
                    <h5 className="summary-title">Resumen del Pedido</h5>
                    <div className="summary-row d-flex justify-content-between">
                      <span>Productos ({getTotalItems()}):</span>
                      <span>{formatPrecioCLP(getTotalPrice())}</span>
                    </div>
                    <div className="summary-row d-flex justify-content-between">
                      <span>Envío:</span>
                      <span className="text-success">Gratis</span>
                    </div>
                    <hr />
                    <div className="summary-row total-row d-flex justify-content-between">
                      <strong>Total:</strong>
                      <strong className="total-price">{formatPrecioCLP(getTotalPrice())}</strong>
                    </div>
                    <Button 
                      className="checkout-btn w-100 mt-3" 
                      size="lg"
                      onClick={handleCheckout}
                    >
                      <FontAwesomeIcon icon={faCreditCard} className="me-2" />
                      Proceder al Pago
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

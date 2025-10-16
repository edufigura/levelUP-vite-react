import { Container, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/index.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <section className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="hero-content">
              <div className="hero-badge">
                🔥 Nuevo Lanzamiento
              </div>

              <h1 className="hero-title">
                Eleva tu <span className="hero-highlight">Juego</span> al<br />
                Siguiente Nivel
              </h1>

              <p className="hero-description">
                Descubre equipamiento de alto rendimiento, componentes premium y
                accesorios seleccionados por expertos para gamers exigentes.
              </p>

              <div className="hero-buttons">
                <Button 
                  className="btn-primary-custom"
                  onClick={() => navigate('/catalogo')}
                >
                  Explorar Productos →
                </Button>
                <Button 
                  variant="outline" 
                  className="btn-outline-custom"
                >
                  Ver Ofertas
                </Button>
              </div>

              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-number">5000+</div>
                  <div className="stat-label">Clientes Satisfechos</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">200+</div>
                  <div className="stat-label">Productos Premium</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">Soporte Técnico</div>
                </div>
              </div>
            </Col>

            <Col lg={6} className="hero-image-container">
              <div className="hero-image-wrapper">
                <img 
                  src="https://via.placeholder.com/600x600/1e293b/0ea5e9?text=Gaming+Setup" 
                  alt="Gaming Setup" 
                  className="hero-image"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="featured-section">
        <Container>
          <div className="section-header">
            <h2 className="section-title">Productos Destacados</h2>
            <p className="section-subtitle">
              Los favoritos de nuestra comunidad gamer
            </p>
          </div>

          <Row className="g-4">
            {[1, 2, 3, 4].map((item) => (
              <Col key={item} md={6} lg={3}>
                <div className="product-card">
                  <div className="product-image">
                    <img 
                      src={`https://via.placeholder.com/300x300/1e293b/0ea5e9?text=Producto+${item}`}
                      alt={`Producto ${item}`}
                    />
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">Producto Gaming {item}</h3>
                    <p className="product-description">Descripción del producto premium</p>
                    <div className="product-footer">
                      <span className="product-price">$199.99</span>
                      <Button size="sm" className="btn-add-cart">
                        Agregar
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Home;
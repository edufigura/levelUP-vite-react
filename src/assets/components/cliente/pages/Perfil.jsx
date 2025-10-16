import { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../../styles/Perfil.css'

function Perfil() {
  const navigate = useNavigate();
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingPreferences, setIsEditingPreferences] = useState(false);

  const [personalData, setPersonalData] = useState({
    nombre: 'Alex Gaming',
    email: 'alex@gaming.com',
    telefono: '+56 9 1234 5678',
    fechaNacimiento: '15 Enero 2023',
    biografia: 'Gamer apasionado desde hace más de 10 años. Especializado en FPS y RPGs. Siempre buscando los mejores periféricos para mejorar mi gameplay.'
  });

  const [preferences, setPreferences] = useState({
    juegoFavorito: 'Counter Strike 2',
    plataforma: 'PC (Steam)',
    generos: ['FPS', 'RPG', 'MOBA', 'Battle Royale']
  });

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setPersonalData(prev => ({ ...prev, [name]: value }));
  };

  const handlePreferencesChange = (e) => {
    const { name, value } = e.target;
    setPreferences(prev => ({ ...prev, [name]: value }));
  };

  const handleSavePersonal = () => {
    console.log('Guardando datos personales:', personalData);
    setIsEditingPersonal(false);
    alert('Información personal actualizada');
  };

  const handleSavePreferences = () => {
    console.log('Guardando preferencias:', preferences);
    setIsEditingPreferences(false);
    alert('Preferencias actualizadas');
  };

  return (
    <div className="perfil-simple-container">
      <Container className="py-5">
        <Row className="g-4">
          {/* Sidebar - Avatar y botón editar */}
          <Col lg={3}>
            <Card className="perfil-simple-card text-center">
              <Card.Body>
                <div className="perfil-simple-avatar">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="white">
                    <circle cx="12" cy="12" r="10" fill="url(#gradient1)"/>
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="white"/>
                    <defs>
                      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0ea5e9"/>
                        <stop offset="100%" stopColor="#2563eb"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <h4 className="perfil-simple-name">{personalData.nombre}</h4>
                <Button 
                  className="perfil-simple-btn-edit w-100 mt-3"
                  onClick={() => navigate('/login')}
                >
                  🚪 Cerrar Sesión
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Contenido principal */}
          <Col lg={9}>
            {/* Información Personal */}
            <Card className="perfil-simple-card mb-4">
              <Card.Body>
                <div className="perfil-simple-header">
                  <h5 className="perfil-simple-title">
                    👤 Información Personal
                  </h5>
                  <Button 
                    variant="link" 
                    className="perfil-simple-edit-btn"
                    onClick={() => setIsEditingPersonal(!isEditingPersonal)}
                  >
                    {isEditingPersonal ? '✖' : '✏️'}
                  </Button>
                </div>

                <Row className="g-3">
                  <Col md={6}>
                    <Form.Control
                      type="text"
                      name="nombre"
                      value={personalData.nombre}
                      onChange={handlePersonalChange}
                      disabled={!isEditingPersonal}
                      className="perfil-simple-input"
                      placeholder="Nombre"
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Control
                      type="email"
                      name="email"
                      value={personalData.email}
                      onChange={handlePersonalChange}
                      disabled={!isEditingPersonal}
                      className="perfil-simple-input"
                      placeholder="Email"
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Control
                      type="text"
                      name="telefono"
                      value={personalData.telefono}
                      onChange={handlePersonalChange}
                      disabled={!isEditingPersonal}
                      className="perfil-simple-input"
                      placeholder="Teléfono"
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Control
                      type="text"
                      name="fechaNacimiento"
                      value={personalData.fechaNacimiento}
                      onChange={handlePersonalChange}
                      disabled={!isEditingPersonal}
                      className="perfil-simple-input"
                      placeholder="Fecha de nacimiento"
                    />
                  </Col>
                  <Col md={12}>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="biografia"
                      value={personalData.biografia}
                      onChange={handlePersonalChange}
                      disabled={!isEditingPersonal}
                      className="perfil-simple-input"
                      placeholder="Biografía"
                    />
                  </Col>
                </Row>

                {isEditingPersonal && (
                  <Button 
                    className="perfil-simple-btn-save mt-3"
                    onClick={handleSavePersonal}
                  >
                    💾 Guardar Cambios
                  </Button>
                )}
              </Card.Body>
            </Card>

            {/* Preferencias Gaming */}
            <Card className="perfil-simple-card">
              <Card.Body>
                <div className="perfil-simple-header">
                  <h5 className="perfil-simple-title">
                    🎮 Preferencias Gaming
                  </h5>
                  <Button 
                    variant="link" 
                    className="perfil-simple-edit-btn"
                    onClick={() => setIsEditingPreferences(!isEditingPreferences)}
                  >
                    {isEditingPreferences ? '✖' : '✏️'}
                  </Button>
                </div>

                <Row className="g-3">
                  <Col md={6}>
                    <Form.Control
                      type="text"
                      name="juegoFavorito"
                      value={preferences.juegoFavorito}
                      onChange={handlePreferencesChange}
                      disabled={!isEditingPreferences}
                      className="perfil-simple-input"
                      placeholder="Juego Favorito"
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Control
                      type="text"
                      name="plataforma"
                      value={preferences.plataforma}
                      onChange={handlePreferencesChange}
                      disabled={!isEditingPreferences}
                      className="perfil-simple-input"
                      placeholder="Plataforma"
                    />
                  </Col>
                  <Col md={12}>
                    <div className="perfil-simple-tags">
                      {preferences.generos.map((genero, index) => (
                        <span key={index} className="perfil-simple-tag">
                          {genero}
                        </span>
                      ))}
                    </div>
                  </Col>
                </Row>

                {isEditingPreferences && (
                  <Button 
                    className="perfil-simple-btn-save mt-3"
                    onClick={handleSavePreferences}
                  >
                    💾 Guardar Cambios
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Perfil;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    fechaNacimiento: '',
    password: '',
    confirmPassword: '',
    aceptaTerminos: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación de contraseñas
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Validación de términos
    if (!formData.aceptaTerminos) {
      alert('Debes aceptar los términos y condiciones');
      return;
    }

    // Verificar si es admin
    const isAdmin = formData.email.includes('@admin');
    
    console.log('Registro:', {
      ...formData,
      rol: isAdmin ? 'admin' : 'usuario'
    });

    // Redirigir según el tipo de usuario
    if (isAdmin) {
      alert('¡Cuenta de administrador creada con éxito!');
      navigate('/perfil'); // Ruta del dashboard de admin
    } else {
      alert('¡Cuenta creada con éxito!');
      navigate('/'); // Ruta para usuarios normales
    }
  };

  const handleGoToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="login-page-container">
      <Container className="login-wrapper" style={{ maxWidth: '500px' }}>
        <div className="login-card">
          {/* Logo/Icono */}
          <div className="login-header">
            <div className="login-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                <path d="M19 13h-2v3h-3v2h3v3h2v-3h3v-2h-3z"/>
              </svg>
            </div>
            <h2 className="login-title">Crear Cuenta</h2>
          </div>

          {/* Formulario */}
          <Form onSubmit={handleSubmit}>
            {/* Nombre */}
            <Form.Group className="mb-3">
              <Form.Label className="login-label">
                👤 Nombre
              </Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="login-input"
                placeholder="Tu nombre"
              />
            </Form.Group>

            {/* Email */}
            <Form.Group className="mb-3">
              <Form.Label className="login-label">
                📧 Email
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="login-input"
                placeholder="tu@email.com"
              />
            </Form.Group>

            {/* Fecha de Nacimiento */}
            <Form.Group className="mb-3">
              <Form.Label className="login-label">
                📅 Fecha de Nacimiento
              </Form.Label>
              <Form.Control
                type="date"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleChange}
                required
                className="login-input"
                placeholder="dd-mm-aaaa"
              />
            </Form.Group>

            {/* Contraseñas en dos columnas */}
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="login-label">
                    🔒 Contraseña
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="login-input"
                    placeholder="••••••••"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="login-label">
                    🔐 Confirmar
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="login-input"
                    placeholder="••••••••"
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Términos y Condiciones */}
            <Form.Group className="mb-4">
              <Form.Check
                type="checkbox"
                name="aceptaTerminos"
                checked={formData.aceptaTerminos}
                onChange={handleChange}
                required
                label={
                  <span style={{ color: '#797979ff', fontSize: '13px' }}>
                    ✅ Acepto los{' '}
                    <a 
                      href="/terminos" 
                      style={{ color: '#1e90ff', textDecoration: 'none' }}
                      onClick={(e) => e.preventDefault()}
                    >
                      términos y condiciones
                    </a>
                  </span>
                }
                style={{ marginBottom: '10px' }}
              />
            </Form.Group>

            {/* Botón de Crear Cuenta */}
            <Button
              type="submit"
              className="login-button"
            >
              ✨ Crear Mi Cuenta
            </Button>

            {/* Botón de Iniciar Sesión */}
            <Button
              variant="outline"
              className="create-account-button"
              onClick={handleGoToLogin}
            >
              🔓 Iniciar Sesión
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default Register;
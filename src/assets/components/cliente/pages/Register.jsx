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

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Limpiar error del campo al escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
  };

  const isAdult = (dateString) => {
    const birthDate = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age >= 18;
  };

  const isFutureDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    return date > today;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validar que la fecha no esté vacía
    if (!formData.fechaNacimiento) {
      newErrors.fechaNacimiento = 'La fecha de nacimiento es requerida';
    } else if (!isValidDate(formData.fechaNacimiento)) {
      newErrors.fechaNacimiento = 'Por favor ingresa una fecha válida';
    } else if (isFutureDate(formData.fechaNacimiento)) {
      newErrors.fechaNacimiento = 'La fecha de nacimiento no puede ser en el futuro';
    } else if (!isAdult(formData.fechaNacimiento)) {
      newErrors.fechaNacimiento = 'Debes ser mayor de 18 años para registrarte';
    }

    // Validación de contraseñas
    if (formData.password !== formData.confirmPassword) {
      newErrors.password = 'Las contraseñas no coinciden';
    }

    // Validación de términos
    if (!formData.aceptaTerminos) {
      newErrors.aceptaTerminos = 'Debes aceptar los términos y condiciones';
    }

    // Si hay errores, mostrarlos
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
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
      navigate('/perfil');
    } else {
      alert('¡Cuenta creada con éxito!');
      navigate('/');
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
                className={`login-input ${errors.fechaNacimiento ? 'is-invalid' : ''}`}
                placeholder="dd-mm-aaaa"
              />
              {errors.fechaNacimiento && (
                <div className="login-error-message">
                  {errors.fechaNacimiento}
                </div>
              )}
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
                    className={`login-input ${errors.password ? 'is-invalid' : ''}`}
                    placeholder="••••••••"
                  />
                  {errors.password && (
                    <div className="login-error-message">
                      {errors.password}
                    </div>
                  )}
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
                label={
                  <span style={{ color: '#797979ff', fontSize: '13px' }}>
                    ✅ Acepto los{' '}
                    <a 
                      href="/terminos" 
                      style={{ color: '#667eea', textDecoration: 'none' }}
                      onClick={(e) => e.preventDefault()}
                    >
                      términos y condiciones
                    </a>
                  </span>
                }
                style={{ marginBottom: '10px' }}
              />
              {errors.aceptaTerminos && (
                <div className="login-error-message">
                  {errors.aceptaTerminos}
                </div>
              )}
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
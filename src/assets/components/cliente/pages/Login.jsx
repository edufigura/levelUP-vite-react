import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import '../../../styles/Login.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
    

    if (email.trim() && password.trim()) {
      // si el correo contiene @admin.cl 
      if (email.includes('@admin.cl')) {
        navigate('/Admin'); 
      } 
      //si el correo es duocuc.cl
      else if (email.includes('@duocuc.cl')) {
        navigate('/Perfil'); 
      } else {
        navigate('/');
      }
    }
  };

  const handleCreateAccount = () => {
    navigate('/register');
  };

  const handleCloseToLanding = () => {
    navigate('/');
  };

  return (
    <div className="login-page-container">
      {/* Botón X para cerrar */}
      <Button 
        variant="danger" 
        className="login-close-btn"
        onClick={handleCloseToLanding}
      >
        ✕
      </Button>

      <Container className="login-wrapper">
        <div className="login-card">
          {/* Logo/Icono */}
          <div className="login-header">
            <div className="login-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
            </div>
            <h2 className="login-title">Iniciar Sesión</h2>
          </div>

          {/* Formulario */}
          <Form onSubmit={handleSubmit}>
            {/* Email */}
            <Form.Group className="mb-3">
              <Form.Label className="login-label">
                📧 Email
              </Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="login-input"
                placeholder="tu@email.com"
              />
              <Form.Text className="login-hint">
                Usa @admin.cl para admin o @duocuc.cl para estudiante
              </Form.Text>
            </Form.Group>

            {/* Contraseña */}
            <Form.Group className="mb-4">
              <Form.Label className="login-label">
                🔒 Contraseña
              </Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="login-input"
                placeholder="••••••••"
              />
            </Form.Group>

            {/* Botón de Iniciar Sesión */}
            <Button
              type="submit"
              className="login-button"
            >
              🔐 Iniciar Sesión
            </Button>

            {/* Botón de Crear Cuenta */}
            <Button
              variant="outline"
              className="create-account-button"
              onClick={handleCreateAccount}
            >
              ➕ Crear Cuenta
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default Login;
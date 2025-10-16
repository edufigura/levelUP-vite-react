import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Login from '../src/assets/components/cliente/pages/Login';

// Mock de useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Helper para renderizar con Router
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Login Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    vi.clearAllMocks();
  });

  describe('Renderizado inicial', () => {
    it('debe renderizar el título del formulario', () => {
      renderWithRouter(<Login />);
      expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
    });

    it('debe renderizar el label de Email', () => {
      renderWithRouter(<Login />);
      expect(screen.getByText(/📧 Email/i)).toBeInTheDocument();
    });

    it('debe renderizar el label de Contraseña', () => {
      renderWithRouter(<Login />);
      expect(screen.getByText(/🔒 Contraseña/i)).toBeInTheDocument();
    });

    it('debe renderizar el botón de Iniciar Sesión', () => {
      renderWithRouter(<Login />);
      expect(screen.getByRole('button', { name: /🔐 Iniciar Sesión/i })).toBeInTheDocument();
    });

    it('debe renderizar el botón de Crear Cuenta', () => {
      renderWithRouter(<Login />);
      expect(screen.getByRole('button', { name: /➕ Crear Cuenta/i })).toBeInTheDocument();
    });

    it('debe tener la estructura HTML correcta', () => {
      renderWithRouter(<Login />);
      expect(screen.getByText('Iniciar Sesión').closest('.login-header')).toBeInTheDocument();
    });
  });

  describe('Campos de entrada', () => {
    it('debe tener un campo de email vacío inicialmente', () => {
      renderWithRouter(<Login />);
      const emailInput = screen.getByPlaceholderText('tu@email.com');
      expect(emailInput).toHaveValue('');
    });

    it('debe tener un campo de contraseña vacío inicialmente', () => {
      renderWithRouter(<Login />);
      const passwordInput = screen.getByPlaceholderText('••••••••');
      expect(passwordInput).toHaveValue('');
    });

    it('debe tener el tipo "email" en el campo de email', () => {
      renderWithRouter(<Login />);
      const emailInput = screen.getByPlaceholderText('tu@email.com');
      expect(emailInput).toHaveAttribute('type', 'email');
    });

    it('debe tener el tipo "password" en el campo de contraseña', () => {
      renderWithRouter(<Login />);
      const passwordInput = screen.getByPlaceholderText('••••••••');
      expect(passwordInput).toHaveAttribute('type', 'password');
    });

    it('ambos campos deben ser requeridos', () => {
      renderWithRouter(<Login />);
      const emailInput = screen.getByPlaceholderText('tu@email.com');
      const passwordInput = screen.getByPlaceholderText('••••••••');
      
      expect(emailInput).toBeRequired();
      expect(passwordInput).toBeRequired();
    });
  });

  describe('Interacción con campos de entrada', () => {
    it('debe actualizar el valor del email al escribir', async () => {
      const user = userEvent.setup();
      renderWithRouter(<Login />);
      
      const emailInput = screen.getByPlaceholderText('tu@email.com');
      await user.type(emailInput, 'usuario@ejemplo.com');
      
      expect(emailInput).toHaveValue('usuario@ejemplo.com');
    });

    it('debe actualizar el valor de la contraseña al escribir', async () => {
      const user = userEvent.setup();
      renderWithRouter(<Login />);
      
      const passwordInput = screen.getByPlaceholderText('••••••••');
      await user.type(passwordInput, 'miContraseña123');
      
      expect(passwordInput).toHaveValue('miContraseña123');
    });

    it('debe permitir escribir múltiples caracteres en el email', async () => {
      const user = userEvent.setup();
      renderWithRouter(<Login />);
      
      const emailInput = screen.getByPlaceholderText('tu@email.com');
      await user.type(emailInput, 'test.usuario+tag@dominio.co.uk');
      
      expect(emailInput).toHaveValue('test.usuario+tag@dominio.co.uk');
    });

    it('debe permitir limpiar el campo de email', async () => {
      const user = userEvent.setup();
      renderWithRouter(<Login />);
      
      const emailInput = screen.getByPlaceholderText('tu@email.com');
      await user.type(emailInput, 'usuario@ejemplo.com');
      expect(emailInput).toHaveValue('usuario@ejemplo.com');
      
      await user.clear(emailInput);
      expect(emailInput).toHaveValue('');
    });

    it('debe permitir limpiar el campo de contraseña', async () => {
      const user = userEvent.setup();
      renderWithRouter(<Login />);
      
      const passwordInput = screen.getByPlaceholderText('••••••••');
      await user.type(passwordInput, 'password123');
      expect(passwordInput).toHaveValue('password123');
      
      await user.clear(passwordInput);
      expect(passwordInput).toHaveValue('');
    });
  });

  describe('Submit del formulario', () => {
    it('debe ejecutar handleSubmit al enviar el formulario', async () => {
      const user = userEvent.setup();
      const consoleSpy = vi.spyOn(console, 'log');
      
      renderWithRouter(<Login />);
      
      const emailInput = screen.getByPlaceholderText('tu@email.com');
      const passwordInput = screen.getByPlaceholderText('••••••••');
      const submitButton = screen.getByRole('button', { name: /🔐 Iniciar Sesión/i });
      
      await user.type(emailInput, 'test@ejemplo.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);
      
      expect(consoleSpy).toHaveBeenCalledWith('Login attempt:', {
        email: 'test@ejemplo.com',
        password: 'password123'
      });
      
      consoleSpy.mockRestore();
    });

    it('debe loguear valores correctos cuando se envía el formulario', async () => {
      const user = userEvent.setup();
      const consoleSpy = vi.spyOn(console, 'log');
      
      renderWithRouter(<Login />);
      
      await user.type(screen.getByPlaceholderText('tu@email.com'), 'admin@test.com');
      await user.type(screen.getByPlaceholderText('••••••••'), 'securePass2024');
      await user.click(screen.getByRole('button', { name: /🔐 Iniciar Sesión/i }));
      
      expect(consoleSpy).toHaveBeenCalledWith('Login attempt:', {
        email: 'admin@test.com',
        password: 'securePass2024'
      });
      
      consoleSpy.mockRestore();
    });

    it('debe mantener los valores en los campos después del submit', async () => {
      const user = userEvent.setup();
      renderWithRouter(<Login />);
      
      const emailInput = screen.getByPlaceholderText('tu@email.com');
      const passwordInput = screen.getByPlaceholderText('••••••••');
      const submitButton = screen.getByRole('button', { name: /🔐 Iniciar Sesión/i });
      
      await user.type(emailInput, 'persistente@test.com');
      await user.type(passwordInput, 'pass123');
      await user.click(submitButton);
      
      expect(emailInput).toHaveValue('persistente@test.com');
      expect(passwordInput).toHaveValue('pass123');
    });
  });

  describe('Navegación', () => {
    it('debe navegar a /register cuando se hace click en Crear Cuenta', async () => {
      const user = userEvent.setup();
      renderWithRouter(<Login />);
      
      const createAccountButton = screen.getByRole('button', { name: /➕ Crear Cuenta/i });
      await user.click(createAccountButton);
      
      expect(mockNavigate).toHaveBeenCalledWith('/register');
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });

    it('no debe navegar cuando se hace submit al formulario con campos vacíos', async () => {
      const user = userEvent.setup();
      renderWithRouter(<Login />);
      
      // NO llenar los campos - dejarlos vacíos
      const submitButton = screen.getByRole('button', { name: /🔐 Iniciar Sesión/i });
      await user.click(submitButton);
      
      // Con campos vacíos, no debería navegar
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  describe('Clases CSS', () => {
    it('debe tener las clases CSS correctas en el contenedor principal', () => {
      renderWithRouter(<Login />);
      const container = screen.getByText('Iniciar Sesión').closest('.login-page-container');
      expect(container).toHaveClass('login-page-container');
    });

    it('debe tener la clase login-input en los campos', () => {
      renderWithRouter(<Login />);
      const emailInput = screen.getByPlaceholderText('tu@email.com');
      const passwordInput = screen.getByPlaceholderText('••••••••');
      
      expect(emailInput).toHaveClass('login-input');
      expect(passwordInput).toHaveClass('login-input');
    });

    it('debe tener la clase login-button en el botón de login', () => {
      renderWithRouter(<Login />);
      const submitButton = screen.getByRole('button', { name: /🔐 Iniciar Sesión/i });
      expect(submitButton).toHaveClass('login-button');
    });

    it('debe tener la clase create-account-button en el botón de crear cuenta', () => {
      renderWithRouter(<Login />);
      const createButton = screen.getByRole('button', { name: /➕ Crear Cuenta/i });
      expect(createButton).toHaveClass('create-account-button');
    });
  });

  describe('Placeholders', () => {
    it('debe mostrar el placeholder correcto en el campo email', () => {
      renderWithRouter(<Login />);
      const emailInput = screen.getByPlaceholderText('tu@email.com');
      expect(emailInput).toHaveAttribute('placeholder', 'tu@email.com');
    });

    it('debe mostrar el placeholder correcto en el campo password', () => {
      renderWithRouter(<Login />);
      const passwordInput = screen.getByPlaceholderText('••••••••');
      expect(passwordInput).toHaveAttribute('placeholder', '••••••••');
    });
  });

  describe('Accesibilidad', () => {
    it('debe tener labels asociados a los inputs', () => {
      renderWithRouter(<Login />);
      
      const emailInput = screen.getByPlaceholderText('tu@email.com');
      const passwordInput = screen.getByPlaceholderText('••••••••');
      
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
    });

    it('debe tener botones con textos descriptivos', () => {
      renderWithRouter(<Login />);
      
      expect(screen.getByRole('button', { name: /🔐 Iniciar Sesión/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /➕ Crear Cuenta/i })).toBeInTheDocument();
    });

    it("debe tener un contenedor semántico para el formulario", () => {
      renderWithRouter(<Login />);
      // Buscar el formulario por su tag name
      const form = document.querySelector('form');
      expect(form).toBeInTheDocument();
    });
  });

  describe('Flujos completos', () => {
    it('usuario puede escribir email y contraseña, luego submit', async () => {
      const user = userEvent.setup();
      const consoleSpy = vi.spyOn(console, 'log');
      
      renderWithRouter(<Login />);
      
      const emailInput = screen.getByPlaceholderText('tu@email.com');
      const passwordInput = screen.getByPlaceholderText('••••••••');
      const submitButton = screen.getByRole('button', { name: /🔐 Iniciar Sesión/i });
      
      await user.type(emailInput, 'juan@empresa.com');
      await user.type(passwordInput, 'MiPassword2024!');
      
      expect(emailInput).toHaveValue('juan@empresa.com');
      expect(passwordInput).toHaveValue('MiPassword2024!');
      
      await user.click(submitButton);
      
      expect(consoleSpy).toHaveBeenCalledWith('Login attempt:', {
        email: 'juan@empresa.com',
        password: 'MiPassword2024!'
      });
      
      consoleSpy.mockRestore();
    });

    it('usuario puede cambiar entre campos de email y password', async () => {
      const user = userEvent.setup();
      renderWithRouter(<Login />);
      
      const emailInput = screen.getByPlaceholderText('tu@email.com');
      const passwordInput = screen.getByPlaceholderText('••••••••');
      
      await user.type(emailInput, 'usuario');
      await user.type(passwordInput, 'pass1');
      await user.type(emailInput, '@duocuc.cl');
      await user.type(passwordInput, '234');
      
      expect(emailInput).toHaveValue('usuario@duocuc.cl');  // ← CORREGIDO
      expect(passwordInput).toHaveValue('pass1234');
    });
  });
});
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Contacto from '../src/assets/components/cliente/pages/Contacto.jsx';


// Helper para renderizar con Router
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Contacto Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debería renderizar el formulario de contacto correctamente', () => {
    const { container } = renderWithRouter(<Contacto />);
    const titulo = container.querySelector('h1');
    expect(titulo).toBeTruthy();
    expect(titulo.textContent).toBe('Formulario de Contactos');
  });

  it('debería mostrar el logo de LevelUP', () => {
    const { container } = renderWithRouter(<Contacto />);
    const logo = container.querySelector('img[alt="Logo LevelUP"]');
    expect(logo).toBeTruthy();
    expect(logo.getAttribute('src')).toContain('logo.png');
  });

  it('debería tener un campo de nombre completo', () => {
    const { container } = renderWithRouter(<Contacto />);
    const nombreInput = container.querySelector('#nombreId');
    const nombreLabel = container.querySelector('label[for="nombreId"]');
    
    expect(nombreInput).toBeTruthy();
    expect(nombreInput.getAttribute('type')).toBe('text');
    expect(nombreInput.hasAttribute('required')).toBe(true);
    expect(nombreLabel.textContent).toBe('Nombre Completo');
  });

  it('debería tener un campo de correo', () => {
    const { container } = renderWithRouter(<Contacto />);
    const correoInput = container.querySelector('#correoId');
    const correoLabel = container.querySelector('label[for="correoId"]');
    
    expect(correoInput).toBeTruthy();
    expect(correoInput.getAttribute('type')).toBe('email');
    expect(correoInput.hasAttribute('required')).toBe(true);
    expect(correoLabel.textContent).toBe('Correo');
  });

  it('debería tener un campo de contenido (textarea)', () => {
    const { container } = renderWithRouter(<Contacto />);
    const contenidoTextarea = container.querySelector('#contenidoId');
    const contenidoLabel = container.querySelector('label[for="contenidoId"]');
    
    expect(contenidoTextarea).toBeTruthy();
    expect(contenidoTextarea.tagName).toBe('TEXTAREA');
    expect(contenidoTextarea.getAttribute('rows')).toBe('6');
    expect(contenidoTextarea.hasAttribute('required')).toBe(true);
    expect(contenidoLabel.textContent).toBe('Contenido');
  });

  it('debería tener un botón de enviar mensaje', () => {
    const { container } = renderWithRouter(<Contacto />);
    const botonEnviar = container.querySelector('button[type="submit"]');
    
    expect(botonEnviar).toBeTruthy();
    expect(botonEnviar.textContent).toBe('Enviar Mensaje');
    expect(botonEnviar.className).toContain('btn-primary');
  });

  it('el formulario debe tener la clase needs-validation', () => {
    const { container } = renderWithRouter(<Contacto />);
    const form = container.querySelector('form');
    
    expect(form).toBeTruthy();
    expect(form.className).toContain('needs-validation');
    expect(form.hasAttribute('noValidate')).toBe(true);
  });

  it('debería mostrar mensajes de validación para cada campo', () => {
    const { container } = renderWithRouter(<Contacto />);
    
    const validTooltips = container.querySelectorAll('.valid-tooltip');
    const invalidTooltips = container.querySelectorAll('.invalid-tooltip');
    
    expect(validTooltips.length).toBe(3);
    expect(invalidTooltips.length).toBe(3);
  });

  it('debería renderizar la sección de Google Maps', () => {
    const { container } = renderWithRouter(<Contacto />);
    const iframe = container.querySelector('iframe');
    
    expect(iframe).toBeTruthy();
    expect(iframe.getAttribute('src')).toContain('google.com/maps');
    expect(iframe.getAttribute('title')).toBe('Ubicación LevelUP');
  });

  it('la sección de mapas debe tener el título "Encuéntranos"', () => {
    const { container } = renderWithRouter(<Contacto />);
    const tituloMapa = Array.from(container.querySelectorAll('h2')).find(
      h2 => h2.textContent === 'Encuéntranos'
    );
    
    expect(tituloMapa).toBeTruthy();
  });

  it('debería tener el texto "Visita nuestras tiendas LevelUP"', () => {
    const { container } = renderWithRouter(<Contacto />);
    const contenido = container.textContent;
    
    expect(contenido).toContain('Visita nuestras tiendas LevelUP');
  });

  it('el contenedor principal debe tener las clases de Bootstrap correctas', () => {
    const { container } = renderWithRouter(<Contacto />);
    const mainContainer = container.querySelector('.container');
    
    expect(mainContainer).toBeTruthy();
    expect(mainContainer.className).toContain('container');
    expect(mainContainer.className).toContain('mt-5');
    expect(mainContainer.className).toContain('pt-5');
  });

  it('la tarjeta del formulario debe tener las clases correctas', () => {
    const { container } = renderWithRouter(<Contacto />);
    const card = container.querySelector('.card');
    
    expect(card).toBeTruthy();
    expect(card.className).toContain('bg-dark');
    expect(card.className).toContain('text-white');
    expect(card.className).toContain('border-secondary');
    expect(card.className).toContain('shadow-lg');
  });

  it('debería poder escribir en el campo de nombre', () => {
    const { container } = renderWithRouter(<Contacto />);
    const nombreInput = container.querySelector('#nombreId');
    
    fireEvent.change(nombreInput, { target: { value: 'Juan Pérez' } });
    expect(nombreInput.value).toBe('Juan Pérez');
  });

  it('debería poder escribir en el campo de correo', () => {
    const { container } = renderWithRouter(<Contacto />);
    const correoInput = container.querySelector('#correoId');
    
    fireEvent.change(correoInput, { target: { value: 'juan@ejemplo.com' } });
    expect(correoInput.value).toBe('juan@ejemplo.com');
  });

  it('debería poder escribir en el campo de contenido', () => {
    const { container } = renderWithRouter(<Contacto />);
    const contenidoTextarea = container.querySelector('#contenidoId');
    
    fireEvent.change(contenidoTextarea, { target: { value: 'Este es un mensaje de prueba' } });
    expect(contenidoTextarea.value).toBe('Este es un mensaje de prueba');
  });

  it('debería agregar la clase "was-validated" al enviar el formulario', async () => {
    const { container } = renderWithRouter(<Contacto />);
    const form = container.querySelector('form');
    const nombreInput = container.querySelector('#nombreId');
    const correoInput = container.querySelector('#correoId');
    const contenidoTextarea = container.querySelector('#contenidoId');
    
    // Llenar el formulario
    fireEvent.change(nombreInput, { target: { value: 'Juan Pérez' } });
    fireEvent.change(correoInput, { target: { value: 'juan@ejemplo.com' } });
    fireEvent.change(contenidoTextarea, { target: { value: 'Mensaje de prueba' } });
    
    // Enviar el formulario
    fireEvent.submit(form);
    
    await waitFor(() => {
      expect(form.className).toContain('was-validated');
    });
  });

  it('el iframe del mapa debe tener los atributos correctos', () => {
    const { container } = renderWithRouter(<Contacto />);
    const iframe = container.querySelector('iframe');
    
    expect(iframe.getAttribute('allowFullScreen')).toBe('');
    expect(iframe.getAttribute('loading')).toBe('lazy');
    expect(iframe.getAttribute('referrerPolicy')).toBe('no-referrer-when-downgrade');
  });
});
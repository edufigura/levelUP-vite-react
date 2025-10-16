import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Blog from '../src/assets/components/cliente/pages/Blog.jsx';
import { BrowserRouter } from 'react-router-dom';


// Helper para renderizar con Router
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Blog Component', () => {
  it('debería renderizar el título principal correctamente', () => {
    const { container } = renderWithRouter(<Blog />);
    const titulo = container.querySelector('h1');
    expect(titulo).toBeTruthy();
    expect(titulo.textContent).toBe('Noticias Importantes');
  });

  it('debería mostrar el título de la página como h1', () => {
    const { container } = renderWithRouter(<Blog />);
    const titulo = container.querySelector('h1');
    expect(titulo).toBeTruthy();
    expect(titulo.tagName).toBe('H1');
  });

  it('debería mostrar la primera noticia sobre Stardew Valley', () => {
    const { container } = renderWithRouter(<Blog />);
    const contenido = container.textContent;
    expect(contenido).toContain('Stardew Valley tendrá otra actualización');
    expect(contenido).toContain('tras la actualización 1.6 pensé en que no sabía');
  });

  it('debería mostrar la segunda noticia sobre Kirby', () => {
    const { container } = renderWithRouter(<Blog />);
    const contenido = container.textContent;
    expect(contenido).toContain('Análisis de Kirby y la tierra olvidada');
    expect(contenido).toContain('Lo último que Kirby ha absorbido son tus excusas');
  });

  it('debería tener dos botones "Ver Noticia"', () => {
    const { container } = renderWithRouter(<Blog />);
    const botones = container.querySelectorAll('button');
    const botonesVerNoticia = Array.from(botones).filter(btn => 
      btn.textContent.includes('Ver Noticia')
    );
    expect(botonesVerNoticia.length).toBe(2);
  });

  it('los botones deberían tener los atributos de modal correctos', () => {
    const { container } = renderWithRouter(<Blog />);
    const botones = container.querySelectorAll('button');
    
    botones.forEach(boton => {
      expect(boton.getAttribute('data-bs-toggle')).toBe('modal');
      expect(boton.getAttribute('data-bs-target')).toBe('#loginModal');
      expect(boton.className).toContain('btn-accent');
    });
  });

  it('las tarjetas de noticias deberían tener las clases correctas', () => {
    const { container } = renderWithRouter(<Blog />);
    const cards = container.querySelectorAll('.card');
    
    expect(cards.length).toBe(2);
    cards.forEach(card => {
      expect(card.className).toContain('bg-dark');
      expect(card.className).toContain('text-white');
      expect(card.className).toContain('border-secondary');
      expect(card.className).toContain('shadow-lg');
    });
  });

  it('el contenedor principal debería tener las clases de Bootstrap correctas', () => {
    const { container } = renderWithRouter(<Blog />);
    const mainContainer = container.querySelector('.container');
    
    expect(mainContainer).toBeTruthy();
    expect(mainContainer.className).toContain('container');
    expect(mainContainer.className).toContain('mt-5');
    expect(mainContainer.className).toContain('pt-5');
  });

  it('debería renderizar la estructura con rows', () => {
    const { container } = renderWithRouter(<Blog />);
    const rows = container.querySelectorAll('.row');
    
    expect(rows.length).toBeGreaterThan(0);
  });

  it('cada tarjeta debe tener un título h3', () => {
    const { container } = renderWithRouter(<Blog />);
    const cards = container.querySelectorAll('.card');
    
    cards.forEach(card => {
      const titulo = card.querySelector('h3');
      expect(titulo).toBeTruthy();
    });
  });
});
import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../src/assets/components/navbar";
import { test, expect, vi } from "vitest";

// Test para verificar que la iamgen cargue correctamente
vi.mock("../src/assets/imagenes/logos/logo.png", () => ({
  default: "mock-logo.png"
}));

test("Navbar se renderiza correctamente", () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );

  // Verifciar si el logo esta bien
  expect(screen.getByAltText("Logo")).toBeInTheDocument();

  
  // Verificar nombre de la tienda
  expect(screen.getByText("Level-UP Store")).toBeInTheDocument();
  
  // Verificar apartados de la Navbar
  expect(screen.getByText("Inicio")).toBeInTheDocument();
  expect(screen.getByText("Catálogo")).toBeInTheDocument();
  expect(screen.getByText("Blog")).toBeInTheDocument();
  expect(screen.getByText("Contacto")).toBeInTheDocument();
  
  // Verificar btn de carrito
  const carritoButton = screen.getByRole('link', { name: '' }); 
  expect(carritoButton).toHaveClass('btn-neon');
  
  // Verificar btn Login
  expect(screen.getByText("Login")).toBeInTheDocument();
});
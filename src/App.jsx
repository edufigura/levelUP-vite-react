import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./assets/components/navbar.jsx";
import Landing from './assets/components/cliente/pages/Landing.jsx';
import Dashboard from './assets/components/admin/pages/Dashboard.jsx';
import Products from "./assets/components/admin/pages/Products.jsx";
import Catalogo from './assets/components/cliente/pages/Catalogo.jsx';
import Blog from './assets/components/cliente/pages/Blog.jsx';
import Contacto from './assets/components/cliente/pages/Contacto.jsx';
import Users from "./assets/components/admin/pages/Users.jsx";
import Carrito from "./assets/components/cliente/carrito/Carrito.jsx";
import Notificacion from "./assets/components/cliente/carrito/Notification.jsx"; 
import Register from "./assets/components/cliente/pages/Register.jsx";
import Login from "./assets/components/cliente/pages/Login.jsx";
import Perfil from './assets/components/cliente/pages/Perfil.jsx'

import { CartProvider, useCart } from "./assets/components/cliente/carrito/CartContext.jsx";

import 'bootstrap/dist/css/bootstrap.min.css';


function AppLayout({ children }) {
  const { notification, hideNotification } = useCart();
  
  return (
    <>
      {children}
      <Notificacion 
        show={notification.show}
        onClose={hideNotification}
        product={notification.product}
        quantity={notification.quantity}
      />
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <AppLayout>
          <Routes>
            {/* Acceso Público */}
            <Route path='/' element={
              <>
                <Navbar/>
                <Landing/>
              </>
            } />

            <Route path="/carrito" element={
              <>
                <Navbar/>
                <Carrito />
              </>
            } />

            {/* Ruta del catálogo */}
            <Route path="/catalogo" element={
              <>
                <Navbar/>
                <Catalogo />
              </>
            } />

            {/* Ruta del blog */}
            <Route path="/blog" element={
              <>
                <Navbar/>
                <Blog />
              </>
            } />

            {/* Ruta de contacto */}
            <Route path="/contacto" element={
              <>
                <Navbar/>
                <Contacto />
              </>
            } />
            {/* Ruta de Register */}
            <Route path="/Register" element={
              <>
                <Navbar/>
                <Register />
              </>
            } />


            {/* Ruta de Login */}
            <Route path="/Login" element={
              <>
                <Navbar/>
                <Login />
              </>
            } />

            {/* Perfil para el apartado del Login */}
            <Route path="/Perfil" element={
              <>
                <Navbar/>
                <Perfil />
              </>
            } />


            {/* Acceso de Admin */}
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/admin/users" element={<Users />} />
          </Routes>
        </AppLayout>
      </Router>
    </CartProvider>
  );
}

export default App;

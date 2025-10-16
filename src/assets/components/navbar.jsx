import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Logo from '../imagenes/logos/logo.png';
import '../../assets/styles/Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const deslogearse = () => {
    navigate('/Register');
  }

  return (
    <header>
      <nav className={`dynamic-navbar ${scrolled ? "expanded" : "floating"}`}>
        <div className="logo">
          <img src={Logo} alt="Logo" width="40" height="40" />
          <span className="brand-text">Level-UP Store</span>
        </div>

        <ul className="nav-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/catalogo">Catálogo</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
        </ul>

        <div className="actions">
          <Link to="/carrito" className="btn btn-neon">
            <i className="fa-solid fa-cart-shopping"></i>
          </Link>
          <button className="btn btn-secondary btn-login" onClick={deslogearse}>
            <div className="icon-container">
              <i className="fa-solid fa-user login-icons"></i>
            </div>
            <span className="login-text">Login</span>
            <i className="fa-solid fa-arrow-right login-icon-final"></i>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

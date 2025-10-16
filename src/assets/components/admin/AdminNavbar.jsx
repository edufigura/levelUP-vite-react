import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHome,faUsers, faShoppingBag
} from '@fortawesome/free-solid-svg-icons';
import './AdminNavbar.css';

const AdminNavbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const categories = [
    { id: 1, name: 'Dashboard', icon: faHome, path: '/admin' },
    { id: 2, name: 'Productos', icon: faShoppingBag, path: '/admin/products' },
    { id: 3, name: 'Usuarios', icon: faUsers, path: '/admin/users' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Buscando:', searchQuery);
      if (location.pathname.includes('/admin/products')) {
        console.log('Buscando producto:', searchQuery);
      } else if (location.pathname.includes('/admin/users')) {
        console.log('Buscando usuario:', searchQuery);
      }
    }
  };

  const handleCategoryClick = (path) => {
    navigate(path);
  };

  const isCategoryActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="admin-navbar-container">
      <nav className="floating-navbar">
        <div className="search-section">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-container">
              <i className="search-icon">
                <FontAwesomeIcon icon={faSearch} />
              </i>
              <input
                type="text"
                placeholder="Buscar productos, usuarios..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            <button type="submit" className="search-btn">
              Buscar
            </button>
          </form>
        </div>

        <div className="nav-separator"></div>

        {/* Categorias */}
        <div className="categories-section">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-btn ${isCategoryActive(category.path) ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category.path)}
            >
              <i className="category-icon">
                <FontAwesomeIcon icon={category.icon} />
              </i>
              <span className="category-name">{category.name}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default AdminNavbar;
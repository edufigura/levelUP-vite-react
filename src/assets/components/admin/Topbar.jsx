import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBell, 
  faCog, 
  faSignOutAlt,
  faCircle,
  faMessage,
  faQuestionCircle,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './TopBar.css';

// ruta de la imagen
import profileImage from '../../imagenes/profile.jpg';

const TopBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // dropwdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="topbar-container">
      <div 
        //maneja si el contenedor del perfil esta o no esta expandido (bolean)
        className={`profile-navbar ${isExpanded ? 'expanded' : ''}`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        ref={dropdownRef}
      >
        {/* apartado del avatar */}
        <div className="profile-avatar">
          <div className="avatar-wrapper">
            <img 
              src={profileImage} 
              alt="Hernan Saavedra" 
              className="profile-image"
            />
            <div className="profile-fallback"><span>HS</span></div>
            <div className="online-indicator"></div>
          </div>
        </div>

        {/* menu expandido */}
        <div className="profile-menu-expanded">
          <div className="menu-header">
            <div className="user-info-simple">
              <div className="user-name">Hernan Saavedra</div>
              <div className="user-role">Administrador</div>
            </div>
            <div className="status-indicator">
              <div className="status-dot"></div>
              <span>En línea</span>
            </div>
          </div>

          <div className="menu-divider"></div>

          {/* secciones */}
          <div className="menu-section">
            <button className="menu-item">
              <div className="menu-icon"><FontAwesomeIcon icon={faBell} /></div>
              <div className="menu-content"><span className="menu-title">Notificaciones</span></div>
              <div className="menu-badge">3</div>
              <div className="menu-arrow"><FontAwesomeIcon icon={faChevronRight} /></div>
            </button>

            <button className="menu-item">
              <div className="menu-icon"><FontAwesomeIcon icon={faMessage} /></div>
              <div className="menu-content"><span className="menu-title">Mensajes</span></div>
              <div className="menu-badge">5</div>
              <div className="menu-arrow"><FontAwesomeIcon icon={faChevronRight} /></div>
            </button>
          </div>

          <div className="menu-divider"></div>

          {/* configuracion y ayuda */}
          <div className="menu-section">
            <button className="menu-item">
              <div className="menu-icon"><FontAwesomeIcon icon={faCog} /></div>
              <div className="menu-content"><span className="menu-title">Configuración</span></div>
              <div className="menu-arrow"><FontAwesomeIcon icon={faChevronRight} /></div>
            </button>
          </div>

          <div className="menu-divider"></div>

          {/* Cerrar sesion */}
          <div className="menu-section">
            <button 
              className="menu-item logout"
              onClick={() => navigate('/')}
            >
              <div className="menu-icon"><FontAwesomeIcon icon={faSignOutAlt} /></div>
              <div className="menu-content"><span className="menu-title">Cerrar Sesión</span></div>
              <div className="menu-arrow"><FontAwesomeIcon icon={faChevronRight} /></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

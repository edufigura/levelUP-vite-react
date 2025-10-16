import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faDollarSign, 
  faBox, 
  faUsers,
  faHome
} from '@fortawesome/free-solid-svg-icons';
import AdminLayout from '../Adminlayout';
import '../../../styles/Dashboard.css';

const Dashboard = () => {
  const statsData = [
    { title: 'Ventas Hoy', value: '$1.245.230', icon: faDollarSign },
    { title: 'Pedidos Totales', value: '953k', icon: faBox },
    { title: 'Usuarios Registrados', value: '572k', icon: faUsers }
  ];

  return (
    <AdminLayout>
      <div className="admin-page">
        <div className="page-header">
          <h1>
            <FontAwesomeIcon icon={faHome} style={{marginRight: '10px'}} />
            Dashboard
          </h1>
          <p>Resumen general</p>
        </div>
        <div className="stats-grid-simple">
          {statsData.map((stat, index) => (
            <div key={index} className="stat-card-simple">
              <div className="stat-icon">
                <FontAwesomeIcon icon={stat.icon} />
              </div>
              <div className="stat-content">
                <h3>{stat.value}</h3>
                <p>{stat.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* contenido de bienvenida  */}
        <div className="simple-content">
          <div className="welcome-card">
            <h3>Bienvenido al Panel</h3>
            <p>Gestiona productos y usuarios desde el menú superior.</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
import { useState } from 'react';
import AdminLayout from '../../admin/Adminlayout';
import '../../../styles/Users.css';


const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const users = [
    { id: 1, name: 'Hernán Saavedra ❤️', email: 'Her.saav@profesor.cl', role: 'Admin' },
    { id: 2, name: 'Jeremias Mishter', email: 'Jere.Mish@warhammer.com', role: 'Usuario' },
    { id: 3, name: 'Duke Java', email: 'Duke@class.java', role: 'Usuario' },
    { id: 4, name: 'Josue ', email: 'eazy.y@gmail.com', role: 'Usuario' }
  ];

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="users-page">
        <div className="users-header">
          <h1>Usuarios</h1>
          <button className="btn-primary">+ Agregar</button>
        </div>

        <div className="users-search-box">
          <input
            type="text"
            placeholder="Buscar usuarios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="users-list-simple">
          {filteredUsers.map(user => (
            <div key={user.id} className="user-item-simple">
              <div className="user-info">
                <h4>{user.name}</h4>
                <p>
                  {user.email} 
                  <span className={`user-role-badge ${user.role.toLowerCase()}`}>
                    {user.role}
                  </span>
                </p>
              </div>
              <button className="btn-edit">Editar</button>
            </div>
          ))}
        </div>

        {filteredUsers.length === 0 && searchTerm && (
          <div className="no-users">
            No se encontraron usuarios
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Users;
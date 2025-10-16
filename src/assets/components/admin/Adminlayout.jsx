import { useState } from 'react';
import TopBar from './Topbar';  // 
import AdminNavbar from './AdminNavbar';  // 
import '../admin/admin.css';  // 

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-layout">
      <div className="main-content">
        {/* perfil*/}
        <TopBar />
        
        {/*navbar central */}
        <AdminNavbar />
        
        <div className="content-wrapper">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
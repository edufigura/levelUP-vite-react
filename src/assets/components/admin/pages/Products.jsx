import { useState } from 'react';
import AdminLayout from '../../admin/Adminlayout';
import '../../../styles/Products.css';


const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const products = [
    { id: 1, name: 'PlayStation 5 Slinm', price: '$549.990 CLP', stock: 15 },
    { id: 2, name: 'LEGO Hernan Edition LIMITED', price: '$699.699 CLP', stock: 1 },
    { id: 3, name: 'Silla Gamer Titan', price: '$349.990 CLP', stock: 8 }
  ];

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="products-page">
        <div className="products-header">
          <h1>Productos</h1>
          <button className="btn-primary">+ Agregar</button>
        </div>

        <div className="products-search-box">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="products-list-simple">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-item-simple">
              <div className="product-info">
                <h4>{product.name}</h4>
                <p>{product.price} • Stock: {product.stock}</p>
              </div>
              <button className="btn-edit">Editar</button>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && searchTerm && (
          <div className="no-products">
            No se encontraron productos
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Products;
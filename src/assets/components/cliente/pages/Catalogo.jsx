import React, { useState, useEffect } from 'react';
import { useCart } from '../carrito/CartContext.jsx';
import Notificacion from '../carrito/Notification.jsx';
import '../../../styles/Catalogo.css';

const Catalogo = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todos');
  const [cargando, setCargando] = useState(true);

  const { addToCart, notification, hideNotification } = useCart();

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      // JSON movido a public/assets/data/products.json
      const response = await fetch('/assets/data/products.json'); 
      const data = await response.json();
      setProductos(data);

      const cats = ['todos', ...new Set(data.map(p => p.categoria))];
      setCategorias(cats);
      setCargando(false);
    } catch (error) {
      console.error('Error cargando productos:', error);
      setCargando(false);
    }
  };

  const handleAgregarCarrito = (producto) => {
    const productForCart = {
      id: producto.id,
      name: producto.nombre,
      price: producto.precio,
      img: producto.imagen.startsWith('/assets')
        ? producto.imagen
        : `/assets/productos/${producto.imagen}`,
      category: producto.categoria
    };
    addToCart(productForCart);
  };

  const formatPrecioCLP = (precio) =>
    new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(precio);

  const productosFiltrados =
    categoriaSeleccionada === 'todos'
      ? productos
      : productos.filter(p => p.categoria === categoriaSeleccionada);

  if (cargando) {
    return (
      <div className="container mt-5 pt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="catalogo-container">
      <Notificacion
        show={notification.show}
        onClose={hideNotification}
        product={notification.product}
        quantity={notification.quantity}
      />

      <div className="navbar-spacer"></div>

      <div className="container mt-4">
        <div className="row mb-4">
          <div className="col-12">
            <div className="filtro-categorias">
              <h5 className="mb-3">Filtrar por categoría:</h5>
              <div className="btn-group" role="group">
                {categorias.map(categoria => (
                  <button
                    key={categoria}
                    type="button"
                    className={`btn ${categoriaSeleccionada === categoria ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setCategoriaSeleccionada(categoria)}
                  >
                    {categoria === 'todos' ? 'Todos' : categoria}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {productosFiltrados.length === 0 ? (
            <div className="col-12 text-center">
              <p>No hay productos en esta categoría.</p>
            </div>
          ) : (
            productosFiltrados.map(producto => (
              <div key={producto.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div className="card producto-card h-100">
                  <img
                    src={
                      producto.imagen.startsWith('/assets')
                        ? producto.imagen
                        : `/assets/productos/${producto.imagen}`
                    }
                    className="card-img-top producto-imagen"
                    alt={producto.nombre}
                    onError={(e) => { e.target.src = '/assets/placeholder.jpg'; }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title custom">{producto.nombre}</h5>
                    <p className="card-text flex-grow-1">{producto.descripcion}</p>
                    <div className="mt-auto">
                      <p className="producto-precio">{formatPrecioCLP(producto.precio)}</p>
                      <button
                        className="btn btn-success w-100"
                        onClick={() => handleAgregarCarrito(producto)}
                      >
                        Agregar al Carrito
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalogo;

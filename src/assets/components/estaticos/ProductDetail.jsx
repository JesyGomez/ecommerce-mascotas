import React from 'react';
import { useParams } from 'react-router-dom';
// import data from '../../../../public/data/data.json';

const ProductDetail = (productos) => {
  const { id } = useParams(); // Capturo el ID de la URL
  // const [producto, setProducto] = useState(null);

  // useEffect(() => {
  //   const productoEncontrado = data.find((item) => item.id === parseInt(id));
  //   setProducto(productoEncontrado);
  // }, [id]);
  const producto = productos.find(producto => producto.id == id);
  

  // if (!producto) return <p>Producto no encontrado</p>;

  return (
    <div className="detalle-producto">
      <h2>{producto.nombre}</h2>
      <img src={producto.imagen} alt={producto.nombre} />
      <p>{producto.descripcion}</p>
      <p><strong>Precio:</strong> ${producto.precio}</p>
    </div>
  );
};

export default ProductDetail;

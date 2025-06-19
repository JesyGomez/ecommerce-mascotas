import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { Pagination } from 'react-bootstrap';

const ProductList = ({ productos, onAddToCart, isAuthenticated }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setCurrentPage(1); // Reseteo al aplicar filtros
  }, [productos]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productos.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(productos.length / itemsPerPage);

  return (
    <>
      <div className="product-list">
        {currentItems.map((producto) => (
          <ProductCard
            key={producto.id}
            producto={producto}
            onAddToCart={onAddToCart}
            isAuthenticated={isAuthenticated}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination className="justify-content-center mt-4">
          <Pagination.Prev 
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} 
            disabled={currentPage === 1} 
          />
          {
            Array.from({ length: totalPages }, (_, i) => (
              <Pagination.Item 
                key={i + 1} 
                active={i + 1 === currentPage} 
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))
          }
          <Pagination.Next 
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} 
            disabled={currentPage === totalPages} 
          />
        </Pagination>
      )}
    </>
  );
};

export default ProductList;

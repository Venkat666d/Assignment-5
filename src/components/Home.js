import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

function Home({ category }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => setProducts([]));
  }, []);

  const filteredProducts =
    category === 'all' ? products : products.filter(p => p.category === category);

  return (
    <div className="container mt-4">
      <h3>Products - {category.charAt(0).toUpperCase() + category.slice(1)}</h3>
      <div className="row row-cols-1 row-cols-md-4 g-3 mt-2">
        {filteredProducts.map(product => (
          <div key={product.id} className="col">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

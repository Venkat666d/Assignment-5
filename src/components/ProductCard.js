import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const user = isLoggedIn ? JSON.parse(localStorage.getItem('loggedInUser')) : null;
  const navigate = useNavigate();

  const addToCart = () => {
    if (!isLoggedIn || !user) {
      toast.warn('Please log in to add to cart.');
      navigate('/');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const index = users.findIndex(u => u.email === user.email);
    if (index === -1) {
      toast.error('User not found.');
      return;
    }

    users[index].cart.push(product);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('loggedInUser', JSON.stringify(users[index]));
    toast.success('Added to cart!');
  };

  const handleBuyNow = () => {
    addToCart();
    toast.info('Proceed to cart to place order.');
    navigate('/cart');
  };

  return (
    <div className="card h-100">
      <img src={product.image} className="card-img-top p-3" style={{ height: '200px', objectFit: 'contain' }} alt={product.title} />
      <div className="card-body">
        <h5 className="card-title">{product.title.slice(0, 30)}...</h5>
        <p className="card-text">${product.price}</p>
        <button className="btn btn-warning w-100 mb-2" onClick={addToCart}>Add to Cart</button>
        <button className="btn btn-primary w-100" onClick={handleBuyNow}>Buy Now</button>
      </div>
    </div>
  );
}

export default ProductCard;
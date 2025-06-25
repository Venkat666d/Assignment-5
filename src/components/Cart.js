import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Cart({ toast }) {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) return;

    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    setCartItems(user.cart || []);
  }, []);

  const removeFromCart = productId => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    const userIndex = users.findIndex(u => u.email === user.email);

    if (userIndex === -1) return;

    const updatedCart = users[userIndex].cart.filter(p => p.id !== productId);
    users[userIndex].cart = updatedCart;

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('loggedInUser', JSON.stringify(users[userIndex]));
    setCartItems(updatedCart);
    toast.info('Item removed from cart');
  };

  const checkout = () => {
    if (cartItems.length === 0) {
      toast.warn('Cart is empty');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    const userIndex = users.findIndex(u => u.email === user.email);

    if (userIndex === -1) return;

    const userOrders = users[userIndex].orders || [];
    const updatedOrders = [...userOrders, ...cartItems];

    users[userIndex].orders = updatedOrders;
    users[userIndex].cart = [];

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('loggedInUser', JSON.stringify(users[userIndex]));
    setCartItems([]);

    toast.success('Order placed successfully!');
    navigate('/orders');
  };

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="container mt-4">
      <h3>Your Cart</h3>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cartItems.map(item => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div className="d-flex align-items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ height: 50, width: 50, objectFit: 'contain', marginRight: 10 }}
                  />
                  {item.title}
                </div>
                <div>
                  ${item.price.toFixed(2)}{' '}
                  <button
                    className="btn btn-danger btn-sm ms-3"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <h5>Total: ${total.toFixed(2)}</h5>
          <button className="btn btn-success mt-3" onClick={checkout}>
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;

import React, { useEffect, useState } from 'react';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const allUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = allUsers.findIndex(u => u.email === loggedInUser?.email);

    if (userIndex !== -1) {
      setUserName(allUsers[userIndex].name);
      setOrders(allUsers[userIndex].orders || []);
    }
  }, []);

  return (
    <div className="text-center">
      <h2 className="my-4 text-success">Thank you for shopping with us, {userName}!</h2>
      <h4 className="mb-3">Your Order Summary:</h4>

      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="row justify-content-center">
          {orders.map((item, index) => (
            <div key={index} className="card m-2" style={{ width: '18rem' }}>
              <img src={item.image} className="card-img-top p-3" alt={item.title} style={{ height: '200px', objectFit: 'contain' }} />
              <div className="card-body">
                <h5 className="card-title">{item.title.slice(0, 30)}...</h5>
                <p className="card-text">${item.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
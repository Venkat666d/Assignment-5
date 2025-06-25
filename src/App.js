import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Orders from './components/Orders';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [category, setCategory] = useState('all');

  const RequireAuth = ({ children }) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) return <Navigate to="/" />;
    return children;
  };

  return (
    <>
      <BrowserRouter>
        <Navbar onCategoryChange={setCategory} />
        <div className="container mt-3 mb-5">
          <Routes>
            <Route path="/" element={<Login toast={toast} />} />
            <Route path="/signup" element={<Signup toast={toast} />} />
            <Route
              path="/home"
              element={
                <RequireAuth>
                  <Home category={category} />
                </RequireAuth>
              }
            />
            <Route
              path="/cart"
              element={
                <RequireAuth>
                  <Cart toast={toast} />
                </RequireAuth>
              }
            />
            <Route
              path="/orders"
              element={
                <RequireAuth>
                  <Orders />
                </RequireAuth>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;

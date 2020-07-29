import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';
import LoginScreen from './Screens/LoginScreen';
import { useSelector } from 'react-redux';
import ShippingScreen from './Screens/ShippingScreen';
import DeliveryScreen from './Screens/DeliveryScreen';

function App() {

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  }

  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");

  }



  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>
              &#9776;
          </button>
            <Link to="/" >Wellstar Order App</Link>
          </div>
          <div className="header-links" >
            <a href="/cart">Cart</a>
            {userInfo ? (
              <Link to="/profile">{userInfo.user.name}</Link>
            ) : (
                <Link to="/login">Login</Link>
              )}
          </div>
        </header>
        <aside className="sidebar">
          <h3>Product Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>X</button>
          <ul>
            <li>
              <a href="index.html">Shirt</a>
            </li>
          </ul>
        </aside>
        <main className="main" >
          <div className="content" >
            <Route path="/login" component={LoginScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/delivery" component={DeliveryScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
          </div>
        </main>
        <footer className="footer">by CORE Data Design & Development w/ React</footer>
      </div>
    </BrowserRouter>

  );
}

export default App;

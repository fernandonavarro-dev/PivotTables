import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';
import LoginScreen from './Screens/LoginScreen';
import { useSelector } from 'react-redux';
import ShippingScreen from './Screens/ShippingScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import OrdersScreen from './Screens/OrdersScreen';
import ProfileScreen from './Screens/ProfileScreen';
import FinalizeOrderScreen from './Screens/FinalizeOrderScreen';
import PivotTableScreen from './Screens/PivotTableScreen';

function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // const openMenu = () => {
  //   document.querySelector('.sidebar').classList.add('open');
  // };

  // const closeMenu = () => {
  //   document.querySelector('.sidebar').classList.remove('open');
  // };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            {/* <button onClick={openMenu}>&#9776;</button> */}
            <Link to="/">Wellstar Order App</Link>
          </div>
          <div className="header-links">
            <a href="/cart">Cart</a>
            {userInfo && userInfo.user ? (
              <Link to="/profile">{userInfo.user.name}</Link>
            ) : (
                <Link to="/login">Login</Link>
              )}
            {userInfo && userInfo.user && userInfo.user.isAdmin && (
              <div className="dropdown">
                <a href="#">Admin</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders">Orders</Link>
                  </li>
                  {userInfo && userInfo.user.isTop && (
                    <li>
                      <Link to="/pivottable">Table</Link>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </header>
        {/* <aside className="sidebar">
          <h3>Product Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            X
          </button>
          <ul className="categories">
            <li>
              <Link to="/category/category1">category1</Link>
            </li>
            <li>
              <Link to="/category/category2">category2</Link>
            </li>
          </ul>
        </aside> */}
        <main className="main">
          <div className="content">
            <Route path="/login" component={LoginScreen} />
            <Route path="/orders" component={OrdersScreen} />
            <Route path="/pivottable" component={PivotTableScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            {/* <Route path="/delivery" component={DeliveryScreen} /> */}
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/order/:id" component={FinalizeOrderScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
          </div>
        </main>
        <footer className="footer">
          by CORE Data Design & Development w/ React
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

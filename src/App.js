import React from 'react';
import axios from 'axios';
import data from './data';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  }

  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");

  }

  async function makeRequest() {

    const config = {
      method: 'GET',
      url: 'http://164.90.158.158/products'
    }

    let res = await axios(config)
    let fetchedProducts = res.data;
    console.log(res.status);
    console.log(fetchedProducts);

  }

  makeRequest();


  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>
              &#9776;
          </button>
            <a href="index.html">Wellstar Order App</a>
          </div>
          <div className="header-links" >
            <a href="cart.html">Cart</a>
            <a href="signin.html">Sign In</a>
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
            {/* <Route path="/" exact={true} component={HomeScreen} /> */}
            <ul className="products">
              {
                data.products.map(product =>
                  <li>
                    <div className="product">
                      <img className="product-image" src={product.image} alt="productImage" />
                      <div className="product-name">
                        <a href="product.html">{product.name} </a>
                      </div>
                      <div className="product-price" >${product.price}</div>
                    </div>
                  </li>
                )
              }
            </ul>
          </div>
        </main>
        <footer className="footer">By Core ddd with React</footer>
      </div>
    </BrowserRouter>

  );
}

export default App;

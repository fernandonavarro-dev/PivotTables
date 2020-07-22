import React from 'react';
import axios from 'axios';
// import data from './data';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  }

  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");

  }

  const [fetchedProducts, setFetchedProducts] = useState([])

  useEffect(() => {
    async function makeRequest() {
      const config = {
        method: 'GET',
        url: 'http://164.90.158.158/products'
      }
      let res = await axios(config)
      let strapiData = res.data;
      // console.log(res.status);
      // console.log("makeRequest with strapiData ->", strapiData);
      setFetchedProducts(strapiData)
    }
    makeRequest();
  }, [])
  console.log("fetchedProducts, ", fetchedProducts);

  // const [fetchedProducts, setFetchedProducts] = useState([])
  // async function makeRequest() {
  //   const config = {
  //     method: 'GET',
  //     url: 'http://164.90.158.158/products'
  //   }
  //   let res = await axios(config)
  //   let strapiData = res.data;
  //   // console.log(res.status);
  //   // console.log("makeRequest with strapiData ->", strapiData);
  //   setFetchedProducts(strapiData)
  // }
  // // makeRequest();
  // // console.log("fetchedProducts, ", fetchedProducts);

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
                fetchedProducts.map(fetchedProduct =>
                  <li >
                    <div className="product">
                      <img className="product-image" src={`http://164.90.158.158${fetchedProduct.thumbnail.formats.thumbnail.url}`} alt="productImage" />
                      <div className="product-name">
                        <a href="product.html">{fetchedProduct.name} </a>
                      </div>
                      <div className="product-price" >${fetchedProduct.price_in_cents}</div>
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

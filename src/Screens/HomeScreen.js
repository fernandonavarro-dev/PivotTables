import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

function HomeScreen(props) {

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

    return <ul className="products">
        {
            fetchedProducts.map(fetchedProduct =>
                <li >
                    <div className="product">
                        <img className="product-image" src={`http://164.90.158.158${fetchedProduct.thumbnail.formats.small.url}`} alt="product" />
                        <div className="product-name">
                            <a href="product.html">{fetchedProduct.name} </a>
                        </div>
                        <div className="product-price" >${fetchedProduct.price_in_cents}</div>
                    </div>
                </li>
            )
        }
    </ul>
}

export default HomeScreen;
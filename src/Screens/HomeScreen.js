import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function HomeScreen() {

    const [fetchedProducts, setFetchedProducts] = useState([]);

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
    }, []);
    console.log("fetchedProducts, ", fetchedProducts);

    return (
        <ul className="products">
            {fetchedProducts.map(fetchedProduct =>
                <li key={fetchedProduct.id} >
                    <div className="product">
                        <Link to={'/product/' + fetchedProduct.id}>
                            <img
                                className="product-image"
                                src={`http://164.90.158.158${fetchedProduct.thumbnail.formats.small.url}`}
                                alt="product"
                            />
                        </Link>
                        <div className="product-name">
                            <Link to={'/product/' + fetchedProduct.id}>{fetchedProduct.name}
                            </Link>
                        </div>
                        <div className="product-price" >${fetchedProduct.price_in_cents}</div>
                    </div>
                </li>
            )}
        </ul>
    )
}

export default HomeScreen;
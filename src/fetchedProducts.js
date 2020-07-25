// import { useState, useEffect } from 'react'
// import axios from 'axios'

// const ProductData = () => {

//     const [fetchedProducts, setFetchedProducts] = useState([]);

//     useEffect(() => {
//         async function makeRequest() {
//             const config = {
//                 method: 'GET',
//                 url: 'http://164.90.158.158/products'
//             }
//             let res = await axios(config)
//             let strapiData = res.data;
//             // console.log(res.status);
//             // console.log("makeRequest with strapiData ->", strapiData);
//             setFetchedProducts(strapiData)
//         }
//         makeRequest();
//     }, []);
//     // console.log("fetchedProducts, ", fetchedProducts);
//     return fetchedProducts
// }

// export default ProductData;


// // export default () => {
// //     const [products, setProducts] = useState([])

// //     useEffect(() => {
// //         const getProducts = async () => {
// //             const response = await fetch('http://164.90.158.158/products')
// //             const data = await response.json()
// //             setProducts(data)
// //         }

// //         getProducts()
// //     }, [])

// //     return products

// // }

// // //8888----------------------------------------------------
// // const fetchedProducts = () => {
// //     const [products, setProducts] = useState([])

// //     useEffect(
// //         () => {
// //             (async => {
// //                 const response = await axios({
// //                     method: 'GET',
// //                     url: 'http://164.90.158.158/products'
// //                 })
// //                 setProducts(response.data)
// //             })(products)
// //         }
// //     )
// // }

// // //------------------------------------------------------------------------------
// // async function makeRequest() {

// //     const config = {
// //         method: 'GET',
// //         url: 'http://164.90.158.158/products'
// //     }

// //     let res = await axios(config)
// //     let fetchedProducts = res.data;
// //     console.log(res.status);
// //     return fetchedProducts
// // }

// // // const fetchedProducts = makeRequest();
// // // console.log("makeRequest with fetchedProducts ->", fetchedProducts);

// // export default data;

// // //------------------------------------------------------------------------------
export default {
    products: [
        {
            _id: '1',
            name: 'Slim Shirt',
            category: 'Shirts',
            image: '/images/d1.jpg',
            price: 60,
            brand: ' Nike',
            rating: 4.5,
            numReviews: 10
        },
        {
            _id: '2',
            name: 'Fit Shirt',
            category: 'Shirts',
            image: '/images/d2.jpg',
            price: 50,
            brand: ' Nike',
            rating: 4.2,
            numReviews: 5
        },
        {
            _id: '3',
            name: 'Best Pants',
            category: 'Pants',
            image: '/images/d3.jpg',
            price: 70,
            brand: ' Nike',
            rating: 4.5,
            numReviews: 8
        }, {
            _id: '4',
            name: 'Best Pants',
            category: 'Pants',
            image: '/images/d2.jpg',
            price: 70,
            brand: ' Nike',
            rating: 4.5,
            numReviews: 8
        },
    ]
}
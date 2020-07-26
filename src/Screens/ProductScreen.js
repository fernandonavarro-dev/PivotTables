import React from 'react';
// import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class ProductScreen extends React.Component {

    state = {
        fetchedProducts: [], pageProduct: []
    }

    async componentDidMount() {
        const productRes = await axios({
            method: 'GET',
            url: 'http://164.90.158.158/products'
        })

        const fetchedProducts = productRes.data

        const id = this.props.match.params.id
        const idInt = parseInt(id)

        const product = fetchedProducts.find(x => x['id'] === idInt);

        const pageProduct = product


        this.setState({ fetchedProducts, pageProduct })
    }

    render() {

        const { fetchedProducts, pageProduct } = this.state

        console.log("this.props, ", this.props);

        // const id = this.props.match.params.id
        // const idInt = parseInt(id)
        // console.log("typeof idInt, ", typeof idInt);

        // console.log("fetchedProducts inside render(), ", fetchedProducts);

        // const productIndex = [this.props.match.params.id - 1].toString();
        // console.log("productIndex inside render(), ", productIndex);

        // const product = fetchedProducts[productIndex];
        // const product = fetchedProducts.find(x => x['id'] === idInt);

        console.log("fetchedProducts inside render(), ", fetchedProducts);
        console.log("pageProduct inside render(), ", pageProduct);


        console.log("typeof pageProduct, ", typeof pageProduct);
        console.log("Object.keys(product), ", Object.keys(pageProduct));
        // const {  } = product;
        // console.log("product.name inside render(), ", product.id);

        // console.log("fetchedProducts.x.id inside render(), ", fetchedProducts.x.id);

        // const product = fetchedProducts[this.props.match.params.id - 1]
        // console.log("fetchedProducts[this.props.match.params.id - 1] inside render(), ", fetchedProducts.productIndex.id);
        // console.log("this.props.match.params.id inside render(), ", this.props.match.params.id);
        // console.log("product inside render(),", product);
        const imageUrl = pageProduct.thumbnail
        console.log("imageUrl, ", imageUrl);


        return (
            <div>
                <div className="back-to-result">
                    <Link to="/">Back to result</Link>
                </div>
                <>
                    <div className="details">
                        <div className="details-image">
                            {/* <img src={`http://164.90.158.158${pageProduct.thumbnail.formats.thumbnail.url}`} alt="product"></img> */}
                        </div>
                        <div className="details-action">
                            <ul>
                                <li>
                                    Price: {pageProduct.price}
                                </li>
                                <li>
                                    Status: {pageProduct.status}
                                </li>
                                <li>
                                    Qty: <select>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                    </select>
                                </li>
                                <li>
                                    <button className="button primary" >Add to order</button>
                                </li>
                            </ul>
                        </div>
                        <div className="details-info">
                            <ul>
                                <li>
                                    <h4>{pageProduct.name}</h4>
                                </li>
                                {/* <li>
                                <a href="#reviews">
                                    <Rating
                                    value={product.rating}
                                text={product.numReviews + ' reviews'}
                                />
                                </a>
                            </li> */}
                                <li>
                                    Price: <b>${pageProduct.price_in_cents}</b>
                                </li>
                                <li>
                                    Description:
                  <div>{pageProduct.description}</div>
                                </li>
                            </ul>
                        </div>

                    </div>
                </>

            </div>
        )
    }


}

// function ProductScreen(props) {
//     console.log("props inside ProductScreen", props);
//     // console.log("props.data inside ProductScreen", props.data);

//     // const [fetchedProducts, setFetchedProducts] = useState([])

//     // useEffect(() => {
//     //     const fetchData = async () => {
//     //         const { data } = await axios.get("http://164.90.158.158/products");
//     //         setFetchedProducts(data);
//     //     }
//     //     fetchData();
//     //     return () => {
//     //         //
//     //     }
//     // }, [])

//     // console.log("props.match.params.id", props.match.params.id);
//     // // console.log("props.match.params.slug", props.match.params.slug);
//     // // console.log("fetchedProducts ->", fetchedProducts);
//     // // console.log("fetchedProducts[props.match.params.id - 1],", fetchedProducts[props.match.params.id - 1]);

//     // // const product = fetchedProducts.filter(product => product.id === props.match.params.id);
//     // const product = fetchedProducts.find(x => x.id === props.match.params.id);
//     // // const product = fetchedProducts[props.match.params.id - 1];
//     // console.log("product,", product);
//     // // console.log("product.id,", product.id);

//     return (
//         <div>
//             <div className="back-to-result">
//                 <Link to="/">Back to result</Link>
//             </div>
//             <>
//                 <div className="details">
//                     {/* <div className="details-image">
//                         <img src={`http://164.90.158.158${fetchedProduct.thumbnail.formats.thumbnail.url}`} alt="product"></img>
//                     </div> */}
//                     <div className="details-info">
//                         <ul>
//                             <li>
//                                 {/* <h4>{product.name}</h4> */}
//                             </li>
//                             {/* <li>
//                                 <a href="#reviews">
//                                     <Rating
//                                     value={product.rating}
//                                 text={product.numReviews + ' reviews'}
//                                 />
//                                 </a>
//                             </li> */}
//                             <li>
//                                 {/* Price: <b>${product.price_in_cents}</b> */}
//                             </li>
//                             <li>
//                                 Description:
//                   {/* <div>{product.description}</div> */}
//                             </li>
//                         </ul>
//                     </div>
//                     <div className="details-action">
//                         <ul>
//                             <li>
//                                 {/* Price: {product.price} */}
//                             </li>
//                             <li>
//                                 {/* Status: {product.status} */}
//                             </li>
//                             <li>
//                                 Qty: <select>
//                                     <option>1</option>
//                                     <option>2</option>
//                                     <option>3</option>
//                                     <option>4</option>
//                                 </select>
//                             </li>
//                             <li>
//                                 <button className="button primary" >Add to order</button>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </>

//         </div>
//     )
// }

export default ProductScreen;
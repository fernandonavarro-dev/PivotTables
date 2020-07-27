// import React from 'react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct } from '../actions/productActions';

function ProductScreen(props) {

    const productDetails = useSelector(state => state.productDetails);
    console.log("productDetails, ", productDetails);
    // const [pageProduct, setpageProduct] = useState({});
    const dispatch = useDispatch();
    const { products, loading, error } = productDetails;


    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id));
        // setpageProduct(products);
        return () => {
            //
        };
    }, [])


    const product = { ...products }
    delete product.thumbnail
    // console.log("products,", products);
    // console.log("product,", product);
    // console.log("product.id,", product.id);

    // console.log("props.match.params.id, ", props.match.params.id);
    // console.log(Object.keys(product))

    // console.log("pageProduct, ", pageProduct);
    // console.log("products.name, ", id);

    // const { ['id']: productId } = products;
    // console.log("id, ", productId);

    return (
        <div>
            <div className="back-to-result">
                <Link to="/">Back to result</Link>
            </div>
            {loading ? <div>Loading...</div> :
                error ? <div>{error}</div> :
                    (
                        <div className="details">
                            <div className="details-image">
                                <img src={product.imageURL} alt="product"></img>
                            </div>
                            <div className="details-info">
                                <ul>
                                    <li>
                                        <h4>{product.name}</h4>
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
                                        Price: <b>${product.price}</b>
                                    </li>
                                    <li>
                                        Commission: <b>%{product.commissionPercentage}</b>
                                    </li>
                                    <li>
                                        Description:
                  <div>{product.description}</div>
                                    </li>
                                </ul>
                            </div>
                            <div className="details-action">
                                <ul>
                                    <li>
                                        Price: $ {product.price}
                                    </li>
                                    <li>
                                        Status: {product.status}
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

                        </div>
                    )
            }
        </div>
    )
}

export default ProductScreen;


// class ProductScreen extends React.Component {

//     state = {
//         fetchedProducts: [], pageProduct: []
//     }

//     async componentDidMount() {
//         const productRes = await axios({
//             method: 'GET',
//             url: 'http://164.90.158.158/products'
//         })

//         const fetchedProducts = productRes.data

//         const id = this.props.match.params.id
//         const idInt = parseInt(id)

//         const product = fetchedProducts.find(x => x['id'] === idInt);

//         const pageProduct = product


//         this.setState({ fetchedProducts, pageProduct })
//     }

//     render() {

//         const { pageProduct } = this.state
// console.log("this.props, ", this.props);

// const id = this.props.match.params.id
// const idInt = parseInt(id)
// console.log("typeof idInt, ", typeof idInt);

// console.log("fetchedProducts inside render(), ", fetchedProducts);

// const productIndex = [this.props.match.params.id - 1].toString();
// console.log("productIndex inside render(), ", productIndex);

// const product = fetchedProducts[productIndex];
// const product = fetchedProducts.find(x => x['id'] === idInt);

// console.log("fetchedProducts inside render(), ", fetchedProducts);
// console.log("pageProduct inside render(), ", pageProduct);


// console.log("typeof pageProduct, ", typeof pageProduct);
// console.log("Object.keys(product), ", Object.keys(pageProduct));
// const {  } = product;
// console.log("product.name inside render(), ", product.id);

// console.log("fetchedProducts.x.id inside render(), ", fetchedProducts.x.id);

// const product = fetchedProducts[this.props.match.params.id - 1]
// console.log("fetchedProducts[this.props.match.params.id - 1] inside render(), ", fetchedProducts.productIndex.id);
// console.log("this.props.match.params.id inside render(), ", this.props.match.params.id);
// console.log("product inside render(),", product);
// console.log("pageProduct ->", pageProduct);
// console.log("pageProduct.thumbnail ->", pageProduct.thumbnail);

// const imageUrl = "http://164.90.158.158/uploads/" + pageProduct.name + ".png"
// console.log("imageUrl, ", imageUrl);

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

// export default ProductScreen;
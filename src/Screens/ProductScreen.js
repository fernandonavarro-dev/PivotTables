// import React from 'react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';

function ProductScreen(props) {
    // const userLogin = useSelector(state => state.userLogin);
    // const { userInfo } = userLogin;
    // console.log("userInfo, ", userInfo);

    const [plazaStock, setPlazaStock] = useState({});
    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const dispatch = useDispatch();
    const { products, loading, error } = productDetails;

    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id));

        return () => {
            //
        };
    }, []);

    const product = { ...products }
    delete product.thumbnail

    const cdmxStocks = product.cdmx_product
    const cunStocks = product.cun_product
    const mtyStocks = product.mty_product
    const pblStocks = product.pbl_product
    const playaStocks = product.playa_product
    const qroStocks = product.qro_product
    const tulStocks = product.tul_product

    const cdmxStock = { ...cdmxStocks }
    const cunStock = { ...cunStocks }
    const mtyStock = { ...mtyStocks }
    const pblStock = { ...pblStocks }
    const playaStock = { ...playaStocks }
    const qroStock = { ...qroStocks }
    const tulStock = { ...tulStocks }

    // console.log("product, ", product);
    // console.log("product.cdmx_product, ", product.cdmx_product);
    // console.log("cdmxStock.countInStock, ", cdmxStock.countInStock);

    // const { qtyCDMX, qtyCUN, qtyMTY, qtyPLAYA, qtyPBL, qtyQRO, qtyTUL } = product;

    const productsAvailable = []

    for (let x = 0; x < parseInt(plazaStock); x++) {
        productsAvailable.push(<option key={x + 1} value={x + 1}>{x + 1}</option>)
    }

    const handleAddToCart = () => {
        // props.history.push("/cart/" + props.match.params.id + "?qty=" + Number(qty))
        dispatch(addToCart(product.id, qty, Number(plazaStock)));
        alert("Added to cart")

    }

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
                                        Commission: <b>${product.commission}</b>
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
                                        Plaza: <select value={plazaStock} onChange={(e) => {
                                            setPlazaStock(e.target.value)
                                        }}>
                                            <option value="void">select</option>
                                            <option value={cdmxStock.countInStock}>CDMX</option>
                                            <option value={cunStock.countInStock}>Cancun</option>
                                            <option value={mtyStock.countInStock}>Monterrey</option>
                                            <option value={pblStock.countInStock}>Playa del Carmen</option>
                                            <option value={playaStock.countInStock}>Puebla</option>
                                            <option value={qroStock.countInStock}>Queretaro</option>
                                            <option value={tulStock.countInStock}>Tulum</option>
                                        </select>
                                    </li>
                                    <li>
                                        Status: {productsAvailable.length > 0 ? "In stock" : ""}
                                    </li>
                                    <li>
                                        Qty: <select value={qty} onChange={(e) => { setQty(e.target.value) }} >
                                            {productsAvailable}
                                            {/* {[...Array({ plazaStock }).keys()].map(x =>
                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                            )} */}
                                        </select>
                                    </li>
                                    <li>
                                        {productsAvailable.length > 0 &&
                                            <button
                                                onClick={handleAddToCart}
                                                className="button primary" >Add to order</button>
                                        }
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

   // Plaza: <select
    //     value={plazaStock}
    //     onChange={(e) => { setPlazaStock(e.target.value) }}
    // >

    // function SetPlazaStuff(plaza) {
    //     switch (plaza) {
    //         case "CDMX":
    //             setPlazaString("product.qtyCDMX");
    //             setPlazaStock({ product.qtyCDMX });
    //             break;
    //         default:
    //             break;
    //     }
    // }
    // SetPlazaStuff(plaza)

    // const plazaObject = JSON.parse(plazaString.replace(/['"]+/g, ''))
    // const plazaString = `['qty${plaza}']`;


    // console.log("plazaString, ", plazaString);
    // console.log("typeof plazaString, ", typeof plazaString);

    // console.log("plazaObject, ", plazaObject);

    // console.log("plazaStock, ", plazaStock);
    // console.log("typeof plazaStock , ", typeof plazaStock);

// console.log("products,", products);
    // console.log("product,", product);
    // console.log("product.id,", product.id);

    // console.log("props.match.params.id, ", props.match.params.id);
    // console.log(Object.keys(product))

    // console.log("pageProduct, ", pageProduct);
    // console.log("products.name, ", id);

    // const { ['id']: productId } = products;
    // console.log("id, ", productId);

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
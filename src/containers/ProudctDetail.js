import React from "react";
import { message } from "antd";
import TextArea from "antd/lib/input/TextArea";

import { Link } from "react-router-dom";


import { connect } from "react-redux";

import { _staticUrl, _apiUrl } from "config/utils";
import { formatVnd } from "constants/func.utils";

// acitons
import {
  getProductById,
  getProductsByCategory,
  postFeedbackProduct,
  getFeedbackProduct
} from "actions/products";

// components
import { withCartProductHOC } from "components/HOC";
import { FeedBack } from "components/product";


const getUrlImage = product => {
  let urlImage = _staticUrl("/groci/wp-content/uploads/2018/08/2-1.jpg");

  if (product.id) {
    if (product.picture && product.picture[0] && product.picture[0].image) {
      if (!~product.picture[0].image.indexOf("http")) {
        urlImage = _apiUrl(product.picture[0].image);
      } else {
        urlImage = product.picture[0].image;
      }
    }
  }

  return urlImage;
}

const getImagesUrl = image => {
  let urlImage = _staticUrl("/groci/wp-content/uploads/2018/08/2-1.jpg");
  if (!~image.indexOf("http")) {
    urlImage = _apiUrl(image);
  } else {
    urlImage = image;
  }
  return urlImage
}


class ProudctDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num_add_to_cart: 1,
      curImageShowing: null
    }

    this.getProduct(props.match.params.product_id);
  }

  componentWillReceiveProps(props) {
    if (props.match.params.product_id !== this.props.match.params.product_id)
      this.getProduct(props.match.params.product_id);
    const productInCart = props.cart.items.find(it => it.product.id == props.detailProduct.product.id) || {};
    this.setState({
      num_add_to_cart: productInCart.quantity || 1,
    })
  }

  getProduct = (id) => {
    this.props.dispatch(getProductById(id));
    this.props.dispatch(getFeedbackProduct(id));
  }

  onAddToCart = product => e => {
    e.preventDefault();
    this.props.addNewItemToCart(product);
  }

  onChangeAmountItem = (e) => {
    if (e.target.value && Math.abs(+e.target.value - +this.state.num_add_to_cart) == 1) {
      console.log(Math.abs(+e.target.value));
      this.setState({
        num_add_to_cart: +e.target.value
      })
    }
  }

  onSubmitAddToCart = e => {
    e.preventDefault();
    if (this.state.num_add_to_cart > this.props.detailProduct.product.count_in_stock) {
      message.error("Sản phẩm không đủ số lượng");
      return;
    }
    this.props.updateItemInCart({
      product: this.props.detailProduct.product,
      quantity: this.state.num_add_to_cart
    })
  }

  onSelectImage = imageUrl => () => {
    this.setState({
      curImageShowing: imageUrl
    })
  }

  handleSubmitFormFeedBack = data => {
    const body = {
      product: this.props.detailProduct.product.id,
      store: this.props.detailProduct.product.stores.id,
      detail: data.comment,
      star: data.rate,
    }
    this.props.dispatch(postFeedbackProduct(body))
  }

  render() {
    const { product, relatedProducts, feedbacks } = this.props.detailProduct;
    let urlImage = getUrlImage(product);
    let listImages = product.picture || [];
    return (
      <div className="ProudctDetail">
        <section className="shop-single section-padding pt-3">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div style={{ height: "300px" }}>
                  <img style={{ height: "100%" }} src={this.state.curImageShowing || urlImage} alt="" />
                </div>
                <br />
                <br />
                <div style={{
                  display: "flex",
                  flexDirection: "row",
                  height: "150px",
                  justifyContent: "space-between"
                }}>
                  {
                    listImages.map(pic => {
                      return (
                        <div onClick={this.onSelectImage(getImagesUrl(pic.image))}><img src={getImagesUrl(pic.image)} style={{ cursor: "pointer", height: "100%" }} /></div>
                      )
                    })
                  }
                </div>
              </div>
              <div className="col-md-6">
                <div className="shop-detail-right klb-product-right">
                  {/* <span className="badge badge-success">30% OFF</span> */}
                  <h2>{product.name}</h2>
                  <p className="price"><del><span className="woocommerce-Price-amount amount"><span className="woocommerce-Price-currencySymbol"></span></span></del>
                    <ins><span className="woocommerce-Price-amount amount"><span className="woocommerce-Price-currencySymbol"></span>{formatVnd(product.price)}</span></ins></p>
                  <p className="stock in-stock">In Stock: {this.props.detailProduct.product.count_in_stock}</p>
                  <form className="cart" encType="multipart/form-data" onSubmit={this.onSubmitAddToCart}>
                    <div className="quantity">
                      <label className="screen-reader-text" htmlFor="quantity_5bb07e4411474">Quantity</label>
                      <input onChange={this.onChangeAmountItem} value={this.state.num_add_to_cart} type="number" id="quantity_5bb07e4411474" className="input-text qty text" step={1} min={1} max={100} name="quantity" title="Qty" size={4} inputMode="numeric" aria-labelledby />
                    </div>
                    <button type="submit" name="add-to-cart" value={63} className="btn btn-secondary btn-lg single_add_to_cart_button button alt"><i className="mdi mdi-cart-outline" /> Add to cart</button>
                  </form>
                  <div className="woocommerce-product-details__short-description short-description">
                    <h5>Quick Overview</h5>
                    <TextArea rows={5} value={product.detail} readOnly />
                  </div>
                  <div className="product_meta">
                    <span className="posted_in">
                      Category:
                      {
                        product.category && product.category.map(id => {
                          return (
                            <a href="#" rel="tag">
                              {
                                this.props.categories.find(ct => ct.id == id).name
                              }
                            </a>
                          )
                        })
                      }
                    </span>
                    <br />
                    <span className="posted_in">
                      Cửa hàng:
                      {
                        product.stores ? <Link to={`/search/storer=${product.stores.id}`}>
                          {
                            product.stores.name + " | " + product.stores.phone
                          }
                        </Link> : <a href="#" rel="tag">No storer</a>
                      }

                    </span>
                  </div>
                  <h6 className="mb-3 mt-4">Why shop from Groci?</h6>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="feature-box">
                        <i className="mdi mdi-truck-fast" />
                        <h6 className="text-info">Free Delivery</h6>											</div>
                    </div>
                    <div className="col-md-6">
                      <div className="feature-box">
                        <i className="mdi mdi-basket" />
                        <h6 className="text-info">100% Guarantee</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">

                <section className="related products klb-product-tab">
                  <h2>Feed back</h2>
                  <FeedBack feedbacks={feedbacks} onSubmitFeedBack={this.handleSubmitFormFeedBack} />
                </section>
              </div>

              <div className="col-md-12">

                <section className="related products klb-product-tab">
                  <h2>Related products</h2>
                  <div className="row">
                    {
                      relatedProducts.slice(0, 4).map((item, index) => {
                        let urlImage = getUrlImage(item);

                        return (
                          <div key={index} className="col-md-3">
                            <a href="/groci/product/fresh-red-seedless-grapes/" className="woocommerce-LoopProduct-link woocommerce-loop-product__link">
                            </a><div className="product">
                              <a href="/groci/product/fresh-red-seedless-grapes/"
                                className="woocommerce-LoopProduct-link woocommerce-loop-product__link" />
                              <Link to={`/product/${item.id}`}>
                                <div className="product-header"><span className="badge badge-success"></span><img className="img-fluid" src={urlImage} alt="Fresh Red Seedless" /><span className="veg text-success mdi mdi-circle" /></div>
                                <div className="product-body">
                                  <h5>{item.name.slice(0, 20)}...</h5>
                                  <h6><strong><span className="mdi mdi-approval text-success" /> In Stock</strong> - 1 kg</h6>
                                </div>
                              </Link><div className="product-footer"><a href="/groci/product/fresh-red-seedless-grapes/">
                                <p className="offer-price mb-0"><del><span className="woocommerce-Price-amount amount"><span className="woocommerce-Price-currencySymbol"></span></span></del>
                                  <ins><span className="woocommerce-Price-amount amount"><span className="woocommerce-Price-currencySymbol"></span>{formatVnd(item.price)}</span></ins></p></a><a onClick={this.onAddToCart(item)} className="btn btn-secondary btn-sm button product_type_simple add_to_cart_button ajax_add_to_cart"><i className="mdi mdi-cart-outline" /> Add to cart</a>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }

                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default withCartProductHOC(connect(store => ({
  detailProduct: store.products.detailProduct,
  cart: store.cart,
  categories: store.products.categories,

}))(ProudctDetail));
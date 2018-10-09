import React from "react";

import { _url } from "config/utils";


class Checkout extends React.Component {
    constructor(props) {
        super(props);
    }

    onSubmitCheckout = (e) => {
        e.preventDefault();
        this.props.history.push("/checkout-success");
    }

    render() {
        return (
            <div className="Checkout">
                <section className="section-padding bg-dark inner-header klb-breadcrumb">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h1 className="mt-0 mb-3 text-white">Checkout</h1>
                                <div className="breadcrumbs"><p className="mb-0 text-white"><a className="text-white" href="http://klbtheme.com/groci" title="Home" rel="bookmark">Home</a> / <span className="text-white">Checkout</span></p></div>             </div>
                        </div>
                    </div>
                </section>


                <section className="checkout-page section-padding">
                    <div className="container">
                        <div className="woocommerce">
                            <div className="klb-product-tab">
                                <div className="woocommerce-form-coupon-toggle">
                                    <div className="woocommerce-info">Have a coupon? <a href="#" className="showcoupon">Click here to enter your code</a></div>
                                </div>
                                <form className="checkout_coupon woocommerce-form-coupon" method="post" style={{ display: 'none' }}>
                                    <p>If you have a coupon code, please apply it below.</p>
                                    <p className=" form-row-first">
                                        <input type="text" name="coupon_code" className="input-text" placeholder="Coupon code" id="coupon_code" />
                                    </p>
                                    <p className=" form-row-last">
                                        <button type="submit" className="btn btn-secondary button" name="apply_coupon" value="Apply coupon">Apply coupon</button>
                                    </p>
                                    <div className="clear" />
                                </form>
                            </div>
                            <form onSubmit={this.onSubmitCheckout} name="checkout" className="checkout woocommerce-checkout" encType="multipart/form-data" noValidate="novalidate">
                                <div className="klb-product-tab">
                                    <div className="col2-set row" id="customer_details">
                                        <div className="col-md-6">
                                            <div className="woocommerce-billing-fields">
                                                <h3>Billing details</h3>
                                                <div className="woocommerce-billing-fields__field-wrapper">
                                                    <p className="form-row form-row-first validate-required" id="billing_first_name_field" data-priority={10}><label htmlFor="billing_first_name" >First name&nbsp;<abbr className="required" title="required">*</abbr></label><span className="woocommerce-input-wrapper"><input type="text" className="input-text " name="billing_first_name" id="billing_first_name" autoComplete="given-name" /></span></p><p className="form-row form-row-last validate-required" id="billing_last_name_field" data-priority={20}><label htmlFor="billing_last_name" >Last name&nbsp;<abbr className="required" title="required">*</abbr></label><span className="woocommerce-input-wrapper"><input type="text" className="input-text " name="billing_last_name" id="billing_last_name" autoComplete="family-name" /></span></p><p className="form-row form-row-wide" id="billing_company_field" data-priority={30}><label htmlFor="billing_company" >Company name&nbsp;<span className="optional">(optional)</span></label><span className="woocommerce-input-wrapper"><input type="text" className="input-text " name="billing_company" id="billing_company" autoComplete="organization" /></span></p><p className="form-row form-row-wide address-field validate-required" id="billing_address_1_field" data-priority={50}><label htmlFor="billing_address_1" >Street address&nbsp;<abbr className="required" title="required">*</abbr></label><span className="woocommerce-input-wrapper"><input type="text" className="input-text " name="billing_address_1" id="billing_address_1" placeholder="House number and street name" autoComplete="address-line1" /></span></p><p className="form-row form-row-wide address-field" id="billing_address_2_field" data-priority={60} style={{ display: 'none' }}><span className="woocommerce-input-wrapper"><input type="text" className="input-text " name="billing_address_2" id="billing_address_2" placeholder="Apartment, suite, unit etc. (optional)" autoComplete="address-line2" /></span></p><p className="form-row form-row-wide address-field validate-postcode" id="billing_postcode_field" data-priority={65} data-o_class="form-row form-row-wide address-field validate-postcode"><label htmlFor="billing_postcode" >Postcode / ZIP&nbsp;<span className="optional">(optional)</span></label><span className="woocommerce-input-wrapper"><input type="text" className="input-text " name="billing_postcode" id="billing_postcode" autoComplete="postal-code" /></span></p><p className="form-row form-row-wide address-field validate-required" id="billing_city_field" data-priority={70} data-o_class="form-row form-row-wide address-field validate-required"><label htmlFor="billing_city" >Town / City&nbsp;<abbr className="required" title="required">*</abbr></label><span className="woocommerce-input-wrapper"><input type="text" className="input-text " name="billing_city" id="billing_city" autoComplete="address-level2" /></span></p><p className="form-row form-row-wide address-field validate-state" id="billing_state_field" style={{ display: 'none' }} data-o_class="form-row form-row-wide address-field validate-state"><label htmlFor="billing_state" >State / County&nbsp;<span className="optional">(optional)</span></label><span className="woocommerce-input-wrapper"><input type="hidden" className="hidden" name="billing_state" id="billing_state" /></span></p><p className="form-row form-row-wide validate-required validate-phone" id="billing_phone_field" data-priority={100}><label htmlFor="billing_phone" >Phone&nbsp;<abbr className="required" title="required">*</abbr></label><span className="woocommerce-input-wrapper"><input type="tel" className="input-text " name="billing_phone" id="billing_phone" autoComplete="tel" /></span></p><p className="form-row form-row-wide validate-required validate-email" id="billing_email_field" data-priority={110}><label htmlFor="billing_email" >Email address&nbsp;<abbr className="required" title="required">*</abbr></label><span className="woocommerce-input-wrapper"><input type="email" className="input-text " name="billing_email" id="billing_email" autoComplete="email username" /></span></p></div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="woocommerce-shipping-fields">
                                            </div>
                                            <div className="woocommerce-additional-fields">
                                                <h3>Additional information</h3>
                                                <div className="woocommerce-additional-fields__field-wrapper">
                                                    <p className="form-row notes" id="order_comments_field" data-priority><label htmlFor="order_comments" >Order notes&nbsp;<span className="optional">(optional)</span></label><span className="woocommerce-input-wrapper"><textarea name="order_comments" className="input-text " id="order_comments" placeholder="Notes about your order, e.g. special notes for delivery." rows={2} cols={5} defaultValue={""} /></span></p>					</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="klb-product-tab order_review">
                                    <h3 id="order_review_heading">Your order</h3>
                                    <div id="order_review" className="woocommerce-checkout-review-order">
                                        <table className="shop_table woocommerce-checkout-review-order-table">
                                            <thead>
                                                <tr>
                                                    <th className="product-name">Product</th>
                                                    <th className="product-total">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="cart_item">
                                                    <td className="product-name">
                                                        Washed Sugar Snap Peas&nbsp;							 <strong className="product-quantity">× 1</strong>													</td>
                                                    <td className="product-total">
                                                        <span className="woocommerce-Price-amount amount"><span className="woocommerce-Price-currencySymbol">£</span>4.00</span>						</td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr className="cart-subtotal">
                                                    <th>Subtotal</th>
                                                    <td><span className="woocommerce-Price-amount amount"><span className="woocommerce-Price-currencySymbol">£</span>4.00</span></td>
                                                </tr>
                                                <tr className="order-total">
                                                    <th>Total</th>
                                                    <td><strong><span className="woocommerce-Price-amount amount"><span className="woocommerce-Price-currencySymbol">£</span>4.00</span></strong> </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                        <div id="payment" className="woocommerce-checkout-payment">
                                            <ul className="wc_payment_methods payment_methods methods">
                                                <li className="wc_payment_method payment_method_bacs">
                                                    <input id="payment_method_bacs" type="radio" className="input-radio" name="payment_method" defaultValue="bacs" defaultChecked="checked" data-order_button_text style={{ display: 'none' }} />
                                                    <label htmlFor="payment_method_bacs">
                                                        Direct bank transfer 	</label>
                                                    <div className="payment_box payment_method_bacs">
                                                        <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
                                                    </div>
                                                </li>
                                            </ul>
                                            <div className="form-row place-order">
                                                <div className="woocommerce-terms-and-conditions-wrapper">
                                                    <div className="woocommerce-privacy-policy-text"><p>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <a href="http://klbtheme.com/groci/?page_id=3" className="woocommerce-privacy-policy-link" target="_blank">privacy policy</a>.</p>
                                                    </div>
                                                </div>
                                                <button type="submit" className="btn btn-secondary button alt" name="woocommerce_checkout_place_order" id="place_order" value="Place order" data-value="Place order">Place order</button>
                                                <input type="hidden" id="woocommerce-process-checkout-nonce" name="woocommerce-process-checkout-nonce" defaultValue="345c7e7346" /><input type="hidden" name="_wp_http_referer" defaultValue="/groci/?wc-ajax=update_order_review" />	</div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Checkout;
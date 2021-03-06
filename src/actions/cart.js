import request from "api/request";
import {
    getActionType
} from "actions/utils";

const prefix = "action.cart";

export const GET_CART = getActionType(prefix)("GET_CART");
export const ADD_CART = getActionType(prefix)("ADD_CART");
export const UPDATE_CART = getActionType(prefix)("UPDATE_CART");
export const DELETE_CART = getActionType(prefix)("DELETE_CART");
export const CLEAN_CART = getActionType(prefix)("CLEAN_CART");


export const getCart = () => (dispatch, getState) => {
    if (getState().session.userAuth.token) {
        return request().get("/cart/").then(res => {
            if (res.data.length >= 0) {
                dispatch({
                    type: GET_CART,
                    items: res.data
                })
            }
        })
    }
}

export const addNewItemToCart = (product) => (dispatch, getState) => {
    const productInCart = getState().cart.items.find(pr => pr.product.id === product.id);
    if (getState().session.userAuth.token) {
        return dispatch(postCart({
            product_id: product.id,
            quantity: productInCart ? +productInCart.quantity + 1 : 1
        }))
    } else {
        const item = {
            product,
            quantity: productInCart ? +productInCart.quantity + 1 : 1
        }
        if (productInCart) {
            dispatch({
                type: UPDATE_CART,
                item
            })
        } else {
            dispatch({
                type: ADD_CART,
                item
            })
        }
    }
}

export const updateItemInCart = (item) => (dispatch, getState) => {

    const productInCart = getState().cart.items.find(pr => pr.product.id === item.product.id);
    if (getState().session.userAuth.token) {
        return dispatch(postCart({
            product_id: item.product.id,
            quantity: item.quantity,
        }))
    } else {
        if (item.quantity == 0) {
            dispatch({
                type: DELETE_CART,
                product_id: item.product.id,
            })
        } else {
            if (productInCart) {
                dispatch({
                    type: UPDATE_CART,
                    item,
                })
            } else {
                dispatch({
                    type: ADD_CART,
                    item,
                })
            }
        }

    }
}


export const postCart = (data) => (dispatch) => {
    return request().post("/cart/modify/", data).then(res => {
        return dispatch(getCart());
    })
}


export const orderProducts = (data, paypal = {}) => (dispatch) => {
    if (paypal.TOKEN) {
        console.log(paypal);
        return request().post("/paypal/payment/", {
            ...data,
            token: paypal.TOKEN,
            PayerID: paypal.PAYERID,
            money: +paypal.money,
        }).then(res => {
            dispatch(getCart());
        })
    } else {
        return request().post("/order/create/", data)
        .then(res => {
            dispatch(getCart());
        })
    }
}
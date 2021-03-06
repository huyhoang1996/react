import request from "api/request";
import axios from "axios";
import {
    getActionType
} from "actions/utils";

const prefix = "action.products";


export const GET_TOP = getActionType("GET_TOP");
export const getTopProducts = (limit = 10) => dispatch => {
    return request().get("/product/?item=" + limit).then(res => {
        dispatch({
            type: GET_TOP,
            data: res.data
        })
    })
}


export const GET_CATEGORIES = getActionType("GET_CATEGORIES");
export const getCategories = () => dispatch => {
    return request().get("/category/").then(res => {
        dispatch({
            type: GET_CATEGORIES,
            data: res.data
        })
    })
}


export const GET_PRODUCTS_BY_CATEGORY = getActionType("GET_PRODUCTS_BY_CATEGORY");
export const getProductsByCategory = category_id => dispatch => {
    return request().get(`/product/?category=${category_id}`).then(res => {
        dispatch({
            type: GET_PRODUCTS_BY_CATEGORY,
            data: res.data
        })
    })
}


export const GET_PRODUCT_BY_ID = getActionType("GET_PRODUCT_BY_ID");
export const getProductById = product_id => dispatch => {
    return request().get(`/product/${product_id}/`).then(res => {
        let product = res.data;
        if (product.category[0]) {
            return request().get(`/product/?category=${product.category[0]}`).then(res => {
                let relatedProducts = res.data;
                dispatch({
                    type: GET_PRODUCT_BY_ID,
                    data: {
                        product,
                        relatedProducts 
                    }
                })
            })
        }
    })
}


export const GET_PRODUCTS_BY_STORER = getActionType("GET_PRODUCTS_BY_STORER");
export const getProductsByStorer = storer_id => dispatch => {
    return request().get(`/product/?stores=${storer_id}`).then(res => {
        // in data tu server kiem tra co thanh cong khong
        // console.log(res.data); // day chinh la products da sarch thanh cong
        // chuyen vao store, mi chuyen thu coi :D
        dispatch({
            type: GET_PRODUCTS_BY_STORER,
            data: res.data
        })
        /**
         *dispatch({
            type: SEARCH_PRODUCTS_BY_NAME,
            data: res.data
        })

        */
    })
}

export const SEARCH_PRODUCTS_BY_NAME = getActionType("SEARCH_PRODUCTS_BY_NAME");
export const searchProductsByName = keyword => dispatch => {
    return request().get(`/product/?search=${keyword}`).then(res => {
        // in data tu server kiem tra co thanh cong khong
        // console.log(res.data); // day chinh la products da sarch thanh cong
        // chuyen vao store, mi chuyen thu coi :D
        dispatch({
            type: SEARCH_PRODUCTS_BY_NAME,
            data: res.data
        })
        
        /**
         *dispatch({
            type: SEARCH_PRODUCTS_BY_NAME,
            data: res.data
        })

        */
    })
}

export const POST_FEED_BACK_PRODUCT = getActionType("POST_FEED_BACK_PRODUCT");
export const postFeedbackProduct = data => dispatch => {
    return request().post(`/feedback/`, data).then(res => {
        dispatch({
            type: POST_FEED_BACK_PRODUCT,
            feedback: res.data
        })
    })
}

export const GET_FEED_BACK_PRODUCT = getActionType("GET_FEED_BACK_PRODUCT");
export const getFeedbackProduct = (product_id) => dispatch => {
    return request().get(`/feedback/?product=${product_id}`).then(res => {
        dispatch({
            type: GET_FEED_BACK_PRODUCT,
            feedbacks: res.data || []
        })
    })
}


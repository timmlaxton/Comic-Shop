import axios from 'axios';
import {
    
        GET_PRODUCTS_BY_SELL,
        GET_PRODUCTS_BY_ARRIVAL,
        GET_CHARACTERS,
        GET_PUBLISHERS,
        GET_PRODUCTS_TO_SHOP,
        ADD_PRODUCT,
        CLEAR_PRODUCT
       
    } from './types';

    import { PRODUCT_SERVER}  from '../components/utils/misc';

export function getProductsBySell(){
   
    const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
            .then(response => response.data)

            return {
                type: GET_PRODUCTS_BY_SELL,
                payload: request
            }
}

export function getProductsByArrival(){

    const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=created&order=desc&limit=4`)
            .then(response => response.data)

            return {
                type: GET_PRODUCTS_BY_ARRIVAL,
                payload: request
            }
}


export function getProductsToShop(skip, limit, filters  = []){
    const data ={limit, skip, filters}
    const request = axios.post(`${PRODUCT_SERVER}/Shop/back_issues`, data)
        .then(response => {
                return {
                size: response.data.size,
                articles: response.data.articles
            }
        });

    return {
        type: GET_PRODUCTS_TO_SHOP,
        payload: request
    }

}

export function addProduct(datatoSubmit){
    const request = axios.post(`${PRODUCT_SERVER}/article`, datatoSubmit)
    .then(response => response.data);

    return {
        type: ADD_PRODUCT,
        payload: request
    }
}




export function  getCharacters(){
    const request = axios.get(`${PRODUCT_SERVER}/characters`)
    .then(response => response.data)

    return {
        type: GET_CHARACTERS,
        payload: request
    }
} 

export function  getPublishers(){
    const request = axios.get(`${PRODUCT_SERVER}/publishers`)
    .then(response => response.data)

    return {
        type: GET_PUBLISHERS,
        payload: request
    }
} 

export function clearProduct(){
    return {
        type: CLEAR_PRODUCT,
        payload: ''
    }
}

import axios from 'axios';
import {
    
        GET_PRODUCTS_BY_SELL,
        GET_PRODUCTS_BY_ARRIVAL,
        GET_CHARACTERS,
        GET_ARTICLES,
        GET_PUBLISHERS,
        GET_GENRES
       
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


export function getCharacters(){
    const request = axios.get(`${PRODUCT_SERVER}/characters`)
    .then(response => response.data)

    return {
        type: GET_CHARACTERS,
        payload: request
    }
} 


export function  getArticles(){
    const request = axios.get(`${PRODUCT_SERVER}/articles`)
    .then(response => response.data)

    return {
        type: GET_ARTICLES,
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
export function  getGenres(){
    const request = axios.get(`${PRODUCT_SERVER}/genres`)
    .then(response => response.data)

    return {
        type: GET_GENRES,
        payload: request
    }
} 
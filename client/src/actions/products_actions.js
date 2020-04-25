import axios from 'axios';
import {
    
        GET_PRODUCTS_BY_SELL,
        GET_PRODUCTS_BY_ARRIVAL,
        GET_CHARACTERS,
        ADD_CHARACTER,
        GET_PUBLISHERS,
        ADD_PUBLISHER,
        ADD_CATERGORY,
        GET_CATERGORYS,
        GET_PRODUCTS_TO_BACK_ISSUES,
        GET_PRODUCTS_TO_NEW_COMICS,
        GET_PRODUCTS_TO_TRADES,
        ADD_PRODUCT,
        CLEAR_PRODUCT,
        GET_PRODUCT_DETAIL,
        CLEAR_PRODUCT_DETAIL

       
    } from './types';

    import { PRODUCT_SERVER}  from '../components/utils/misc';


    export function getProductDetail(id){

        const request = axios.get(`${PRODUCT_SERVER}/articles_by_id?id=${id}&type=single`)
        .then(response=>{
            return response.data[0]
        });
    
        return {
            type: GET_PRODUCT_DETAIL,
            payload: request
        }
    
    }


export function clearProductDetail(){
    return {
       
        type: CLEAR_PRODUCT_DETAIL,
        payload: ''
    }
}

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


export function getBackIssues(skip, limit, filters  = []){
    const data ={limit, skip, filters}
    const request = axios.post(`${PRODUCT_SERVER}/Shop/back_issues`, data)
        .then(response => {
                return {
                size: response.data.size,
                articles: response.data.articles
            }
        });

    return {
        type: GET_PRODUCTS_TO_BACK_ISSUES,
        payload: request
    }

}

export function getNewComics(skip, limit, filters  = []){
    const data ={limit, skip, filters}
    const request = axios.post(`${PRODUCT_SERVER}/Shop/new_comics`, data)
        .then(response => {
                return {
                size: response.data.size,
                articles: response.data.articles
            }
        });

    return {
        type: GET_PRODUCTS_TO_NEW_COMICS,
        payload: request
    }

}


export function getTrades(skip, limit, filters  = []){
    const data ={limit, skip, filters}
    const request = axios.post(`${PRODUCT_SERVER}/Shop/trades`, data)
        .then(response => {
                return {
                size: response.data.size,
                articles: response.data.articles
            }
        });

    return {
        type: GET_PRODUCTS_TO_TRADES,
        payload: request
    }

}



export function addProduct(datatoSubmit){

    const request = axios.post(`${PRODUCT_SERVER}/article`,datatoSubmit)
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

export function addCharacter(dataToSubmit, existingCharacters){
    const request = axios.post(`${PRODUCT_SERVER}/character`,dataToSubmit)
    .then(response=>{
        var characters = [
            ...existingCharacters,
            response.data.character
        ];
        return {
            success: response.data.success,
            characters
        }
    });
    return {
        type: ADD_CHARACTER,
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

export function addPublisher(dataToSubmit, existingPublishers){
    const request = axios.post(`${PRODUCT_SERVER}/publisher`,dataToSubmit)
    .then(response=>{
        var publishers = [
            ...existingPublishers,
            response.data.publisher
        ];
        return {
            success: response.data.success,
            publishers
        }
    });
    return {
        type: ADD_PUBLISHER,
        payload: request
    }
}

export function  getCatergorys(){
    const request = axios.get(`${PRODUCT_SERVER}/catergorys`)
    .then(response => response.data)

    return {
        type: GET_CATERGORYS,
        payload: request
    }
} 



export function addCatergory(dataToSubmit, existingCatergorys){
    const request = axios.post(`${PRODUCT_SERVER}/catergory`,dataToSubmit)
    .then(response=>{
        var catergorys = [
            ...existingCatergorys,
            response.data.publisher
        ];
        return {
            success: response.data.success,
            catergorys
        }
    });
    return {
        type: ADD_CATERGORY,
        payload: request
    }
}


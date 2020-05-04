import {           
    ADD_TO_CART_USER,
    GET_CART_ITEMS_USER,
    REMOVE_CART_ITEM_USER,
    SUB_QUANTITY,
    ADD_QUANTITY,
    ON_SUCCESS_BUY_USER,
    UPDATE_CART_DETAIL,
    SET_CART_ITEMS
} from './types';
import axios from 'axios'
import { USER_SERVER, PRODUCT_SERVER}  from '../components/utils/misc'

export function setCartItems(items) {
    return {
        type: SET_CART_ITEMS,
        payload: items
    }
}

export function addToCart(_id){
    const request = axios.post(`${USER_SERVER}/addToCart?productId=${_id}`)
    .then(response => response.data)

    return {
        type: ADD_TO_CART_USER,
        payload: request
    }
}

export function subQuantity(_id){
    const request = axios.post(`${USER_SERVER}/subQuantity?productId=${_id}`)
    .then(response => response.data)

    return {
        type: SUB_QUANTITY,
        payload: request
    }
}

export function addQuantity(_id){
    const request = axios.post(`${USER_SERVER}/addQuantity?productId=${_id}`)
    .then(response => response.data)

    return {
        type: ADD_QUANTITY,
        payload: request
    }
}


export function getCartItems(cartItems, userCart,){
    const request = axios.get(`${PRODUCT_SERVER}/articles_by_id?id=${cartItems}&type=array`)
    .then(response => {

        userCart.forEach(item=>{
            response.data.forEach((k,i)=>{
                if(item.id === k._id){
                    response.data[i].quantity = item.quantity;
                }
            })
        })
        return response.data;
             
    })



    return {
        type: GET_CART_ITEMS_USER,
        payload: request
    }
}

export function updateCartDetail(payload) {
    return {
        type: UPDATE_CART_DETAIL,
        payload
    }
}


export function removeCartItem(id){

    const request = axios.get(`${USER_SERVER}/removeFromCart?_id=${id}`)
                    .then(response => {

                        response.data.cart.forEach(item=>{
                            response.data.cartDetail.forEach((k,i)=>{
                                if(item.id === k._id){
                                    response.data.cartDetail[i].quantity = item.quantity;
                                }
                            })
                        })
                            return response.data;
                    })

    return {
        type: REMOVE_CART_ITEM_USER,
        payload: request
    }

}

export function onSuccessBuy(data){


    const request = axios.post(`${USER_SERVER}/successBuy`, data)
        .then(response => response.data);

    return {
        type: ON_SUCCESS_BUY_USER,
        payload: request
    }
}
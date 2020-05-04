import axios from 'axios';
import {
    
        LOGIN_USER,
        REGISTER_USER,
        AUTH_USER,
        LOGOUT_USER,
        ADD_TO_CART_USER,
        GET_CART_ITEMS_USER,
        REMOVE_CART_ITEM_USER,
        SUB_QUANTITY,
        ADD_QUANTITY,
        ON_SUCCESS_BUY_USER,
        UPDATE_DATA_USER,
        CLEAR_UPDATE_USER    
       
    } from './types';
    
    import { USER_SERVER, PRODUCT_SERVER}  from '../components/utils/misc'
    
    export function registerUser(dataToSubmit){
        const request = axios.post(`${USER_SERVER}/register`,dataToSubmit)
        .then(response => response.data);
    
        return {
            type: REGISTER_USER,
            payload: request
        }
    }
    
    export async function loginUser(dataToSubmit){
        return async dispatch => {
            const response = await axios.post(`${USER_SERVER}/login`,dataToSubmit)
            console.log('login user', response)
            return dispatch({
                type: LOGIN_USER,
                payload: response.data.loginSuccess
            })    
        }
    }


   
export function auth(user){
    console.log('in auth action', user)
    return {
        type: AUTH_USER,
        payload: user
    }
    return async dispatch => {
        const response = await axios.get(`${USER_SERVER}/auth`)
        console.log('auth response', response)
        return dispatch({
            type: AUTH_USER,
            payload: response.data
        })
    }    
}


export function logoutUser(){
    const request = axios.get(`${USER_SERVER}/logout`)
    .then(response => response.data);


    return {
        type:LOGOUT_USER,
        payload: request
    }
}

export function updateDataUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/update_profile`, dataToSubmit)
    .then(response => {
        console.log('updating user data', response)
        return response.data
    });

    return {
        type: UPDATE_DATA_USER,
        payload: request
    }

}

export function clearUpdateUser(){
    return {
        type: CLEAR_UPDATE_USER,
        payload: ''
    }
}
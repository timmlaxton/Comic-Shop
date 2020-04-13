 import {
    GET_PRODUCTS_BY_SELL,
    GET_PRODUCTS_BY_ARRIVAL,
    GET_CHARACTERS,
    ADD_CHARACTER,
    GET_PUBLISHERS,
    ADD_PUBLISHER,
    GET_PRODUCTS_TO_SHOP,
    ADD_PRODUCT,
    CLEAR_PRODUCT

    


} from '../actions/types';




export default function(state={},action){
    switch(action.type){
        case GET_PRODUCTS_BY_SELL:
            return {...state, bySell: action.payload}
        case GET_PRODUCTS_BY_ARRIVAL:
            return {...state, byArrival: action.payload}
        case GET_CHARACTERS:
            return {...state, characters: action.payload}
        case ADD_CHARACTER:
            return {...state, addCharacter: action.payload.success , 
                            characters: action.payload.characters}
        case GET_PUBLISHERS:
            return {...state, publishers: action.payload}
        case GET_PRODUCTS_TO_SHOP:
            return {...state,
                    toShop: action.payload.articles,
                    toShopSize: action.payload.size
                }
        case ADD_PRODUCT: 
            return {...state, addProduct: action.payload}
            case CLEAR_PRODUCT:
            return {...state,addProduct: action.payload}
        case ADD_PUBLISHER: 
            return {...state, addPublisher: action.payload}
            case CLEAR_PRODUCT:
            return {...state,addProduct: action.payload}
        default:
            return state;

    }
}
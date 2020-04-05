import {
    GET_PRODUCTS_BY_SELL,
    GET_PRODUCTS_BY_ARRIVAL,
    GET_CHARACTERS,
    GET_ARTICLES,
    GET_PUBLISHERS,
    GET_GENRES


} from '../actions/types';




export default function(state={},action){
    switch(action.type){
        case GET_PRODUCTS_BY_SELL:
            return {...state, bySell: action.payload}
        case GET_PRODUCTS_BY_ARRIVAL:
            return {...state, byArrival: action.payload}
        case GET_CHARACTERS:
            return {...state, characters: action.payload}
        case GET_ARTICLES:
            return {...state, articles: action.payload}
        case GET_PUBLISHERS:
            return {...state, publishers: action.payload}
        case GET_GENRES:
            return {...state, genres: action.payload}
        default:
            return state;

    }
}
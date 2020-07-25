import * as actionTypes from '../actions/actionTypes';
import {updateObject} from './utility';

const intialState = {
    orders : [],
    loading : false,
    purchased : false,
}

const purchaseInit = (state, action) => {
    return updateObject(state, {purchased : false});
}

const purchaseOrderStart = (state,action) => {
    return updateObject(state, {loading : true});
}

const purchaseOrderSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData,{id : action.orderId}) 
    return updateObject(state, {
        loading : false,
        purchased : true,
        orders : state.orders.concat(newOrder),
    })
}

const purchaseOrderFail = (state, action) => {
    return updateObject(state, {loading : false});
}

const fetchOrderStart = (state, action) => {
    return updateObject(state, {loading : true});
}
const fetchOrderSuccess = (state, action) => {
    return updateObject(state, {
        orders : action.orders,
        loading : false
    })
}
const fetchOrderFail = (state, action) => {
    return updateObject(state, {loading : false});
}

const reducer = (state = intialState, action) => {
    switch(action.type) {
        case actionTypes.PURCHASE_INIT : return purchaseInit(state, action);
        case actionTypes.PURCHASE_ORDER_START : return purchaseOrderStart(state, action); 
        case actionTypes.PURCHASE_ORDER_SUCCESS : return purchaseOrderSuccess(state, action);
        case actionTypes.PURCHASE_ORDER_FAIL : return purchaseOrderFail(state, action);
        case actionTypes.FETCH_ORDER_START : return fetchOrderStart(state, action);
        case actionTypes.FETCH_ORDER_SUCCESS : return fetchOrderSuccess(state, action);
        case actionTypes.FETCH_ORDER_FAILED : return fetchOrderFail(state, action);
        default : return state;
    }

}
export default reducer;
import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-orders'; 

export const purchaseOrderSuccess = (id,orderData) => {
    return {
        type : actionTypes.PURCHASE_ORDER_SUCCESS,
        orderId : id,
        orderData : orderData
    }
};

export const purchaseOrderFail = (error) => {
    return {
        type : actionTypes.PURCHASE_ORDER_FAIL,
        error : error
    }
}

export const purchaseOrderStart = () => {
    return {
        type : actionTypes.PURCHASE_ORDER_START,
    }
}

export const purchaseBurger = (token, orderData) => {
    return dispatch => {

        dispatch(purchaseOrderStart());
        axios.post('/orders.json?auth='+token, orderData)   //orders.json
        .then(response => {
            console.log(response.data);
            dispatch(purchaseOrderSuccess(response.data.name, orderData))
        }).catch(error => {
            console.log(error)
            dispatch(purchaseOrderFail(error.response.data))
        });

    }
}

export const purchaseInit = () => {
    return {
        type : actionTypes.PURCHASE_INIT
    };
};

export const fetchOrderSuccess = (orders) => {
    return {
        type : actionTypes.FETCH_ORDER_SUCCESS,
        orders : orders
    }
}

export const fetchOrderFailed = (error) => {
    return {
        type : actionTypes.FETCH_ORDER_FAILED,
        error : error
    }
}

export const fetchOrderStart = () => {
    return {
        type : actionTypes.FETCH_ORDER_START,
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrderStart());
        const queryParams = "?auth=" + token + '&orderBy="userId"&equalTo="' + userId +'"';
        axios.get('/orders.json' + queryParams) 
        .then(res => {
            console.log(res.data);
            const fetchedOrders =[];
            for(let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            dispatch(fetchOrderSuccess(fetchedOrders));
        })
        .catch(err => {
            dispatch(fetchOrderFailed(err));
        });

    }
}
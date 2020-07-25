import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


export const authStart = () => {
    return {
        type : actionTypes.AUTH_START
    }
}

export const authFailed = (error) => {
    return {
        type : actionTypes.AUTH_FAIL,
        error : error
    }
}

export const authSuccess = (token,userId) => {
    return {
        type : actionTypes.AUTH_SUCCESS,
        idToken : token,
        userId : userId,
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type : actionTypes.AUTH_LOGOUT
    }
}

export const  checkAuthTimeout =(expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        },expirationTime * 1000);
    }
}


export const auth = (email, pwd, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: pwd,
            returnSecureToken: true
        }
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBLU6lISn1XBKHC5fCxPakUEV_XpeVZi2k";
        if(!isSignUp) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBLU6lISn1XBKHC5fCxPakUEV_XpeVZi2k";
        }

        axios.post(url, authData)
            .then(response =>{
                console.log(response);

                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
                localStorage.setItem('token',response.data.idToken);
                localStorage.setItem('expirationDate',expirationDate);
                localStorage.setItem('userId',response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFailed(err.response.data.error));
            });

    } 
}

export const setAuthRedirectPath = (path) => {
    return {
        type : actionTypes.AUTH_REDIRECT_PATH,
        path : path
    }
}

export const checkAuthStatus = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) {
            logout();
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()) {
                logout();
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token,userId));
                const expTime = (expirationDate.getTime() - new Date().getTime()) / 1000;
                dispatch(checkAuthTimeout(expTime));
            }
        }        
    }
} 
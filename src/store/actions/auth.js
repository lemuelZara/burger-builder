import axios from 'axios'

import * as actionTypes from './actionTypes'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token,
        userId
    }
}

export const authFail = err => {
    return {
        type: actionTypes.AUTH_FAIL,
        err
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = time => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email,
            password,
            returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCoaPI-61GIABv4Lsl4rmF8JTkaxfp9DPk'
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCoaPI-61GIABv4Lsl4rmF8JTkaxfp9DPk'
        }
        axios
            .post(url, authData)
            .then(response => {
                console.log(response)
                dispatch(authSuccess(
                    response.data.idToken,
                    response.data.localId
                ))
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error))
            })
    }
}
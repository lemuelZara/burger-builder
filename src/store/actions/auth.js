import axios from 'axios'

import * as actionTypes from './actionTypes'


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = authData => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData
    }
}

export const authFail = err => {
    return {
        type: actionTypes.AUTH_FAIL,
        err
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
                dispatch(authSuccess(response.data))
            })
            .catch(err => {
                console.log(err)
                dispatch(authFail(err))
            })
    }
}
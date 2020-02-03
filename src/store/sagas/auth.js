import { put } from 'redux-saga/effects'
import { delay } from 'redux-saga/effects'
import axios from 'axios'

import {
    logoutSucceed,
    logout,
    authStart,
    authFail,
    checkAuthTimeout,
    authSuccess
} from '../actions/index'

export function* logoutSaga(action) {
    yield yield localStorage.removeItem('token')
    yield yield localStorage.removeItem('expirationDate')
    yield yield localStorage.removeItem('userId')

    yield put(logoutSucceed())
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000)
    yield put(logout())
}

export function* authUserSaga(action) {
    yield put(authStart())

    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCoaPI-61GIABv4Lsl4rmF8JTkaxfp9DPk'
    if (!action.isSignup) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCoaPI-61GIABv4Lsl4rmF8JTkaxfp9DPk'
    }

    try {
        const response = yield axios.post(url, authData)

        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000)

        yield localStorage.setItem('token', response.data.idToken)
        yield localStorage.setItem('expirationDate', expirationDate)
        yield localStorage.setItem('userId', response.data.localId)

        yield put(authSuccess(
            response.data.idToken,
            response.data.localId
        ))
        yield put(checkAuthTimeout(response.data.expiresIn))
    } catch (error) {
        yield put(authFail(error.response.data.error))
    }

}
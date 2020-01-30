import * as actionType from '../actions/actionTypes'
import { updatedObject } from '../../shared/utility'

// Recebo os dados vindo do store/actions

const initialState = {
    token: null,
    userId: null,
    err: null,
    loading: false,
    authRedirectPath: '/'
}

export const authLogout = (state, action) => {
    return updatedObject(state, { token: null, userId: null })
}

const setAuthRedirectPath = (state, action) => {
    return updatedObject(state, { authRedirectPath: action.path })
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.AUTH_START:
            return updatedObject(state, {
                err: null,
                loading: true
            })

        case actionType.AUTH_SUCCESS:
            return updatedObject(state, {
                token: action.token,
                userId: action.userId,
                err: null,
                loading: false
            })

        case actionType.AUTH_FAIL:
            return updatedObject(state, {
                err: action.err,
                loading: false
            })
        case actionType.AUTH_LOGOUT:
            return authLogout(state, action)
        case actionType.SET_AUTH_REDIRECT_PATH:
            return setAuthRedirectPath(state, action)
        default:
            return state
    }
}
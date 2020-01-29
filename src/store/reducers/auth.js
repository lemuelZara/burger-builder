import * as actionType from '../actions/actionTypes'
import { updatedObject } from '../utility'

// Recebo os dados vindo do store/actions

const initialState = {
    token: null,
    userId: null,
    err: null,
    loading: false
}

export const authLogout = (state, action) => {
    return updatedObject(state, { token: null, userId: null })
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
        default:
            return state
    }
}
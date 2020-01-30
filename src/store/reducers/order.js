import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../../shared/utility'

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case actionTypes.PURCHASE_INIT:
            return updatedObject(state, { purchased: false })

        case actionTypes.PURCHASE_BURGER_START:
            return updatedObject(state, { loading: true })

        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...actions.orderData,
                id: actions.orderId
            }
            return updatedObject(state, {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder),
                purchased: true
            })
        case actionTypes.PURCHASE_BURGER_FAIL:
            return updatedObject(state, { loading: false })

        case actionTypes.FETCH_ORDERS_START:
            return updatedObject(state, { loading: true })
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return updatedObject(state, {
                orders: actions.orders,
                loading: false
            })
        case actionTypes.FETCH_ORDERS_FAIL:
            return updatedObject(state, { loading: false })
        default:
            return state
    }
}

export default reducer
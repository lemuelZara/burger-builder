import * as actionTypes from '../actions/actionTypes'

const initialState = {
    orders: [],
    loading: false
}

const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...actions.orderData,
                id: actions.orderId
            }
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder)
            }
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}
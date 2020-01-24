import * as actionTypes from '../actions/actionTypes'

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const ingredientReducer = (prevState = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS:
            return {
                ...prevState,
                ingredients: {
                    ...prevState.ingredients,
                    [action.ingredientName]: prevState.ingredients[action.ingredientName] + 1
                },
                totalPrice: prevState.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENTS:
            return {
                ...prevState,
                ingredients: {
                    ...prevState.ingredients,
                    [action.ingredientName]: prevState.ingredients[action.ingredientName] - 1
                },
                totalPrice: prevState.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }
        case actionTypes.SET_INGREDIENTS:
            return {
                ...prevState,
                ingredients: action.ingredients,
                error: false
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...prevState,
                error: true
            }
        default:
            return prevState
    }
}

export default ingredientReducer
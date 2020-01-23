import * as actionTypes from './actions'

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4,
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
        default:
            return prevState
    }
}

export default ingredientReducer
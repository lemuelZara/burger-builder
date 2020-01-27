import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utility'

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
            const updatedIngredient = {
                [action.ingredientName]: prevState.ingredients[action.ingredientName] + 1
            }

            const updatedIngredients = updatedObject(
                prevState.ingredients,
                updatedIngredient
            )
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: prevState.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
            return updatedObject(prevState, updatedState)

        case actionTypes.REMOVE_INGREDIENTS:
            const updatedIngredient_2 = {
                [action.ingredientName]: prevState.ingredients[action.ingredientName] - 1
            }

            const updatedIngredients_2 = updatedObject(
                prevState.ingredients,
                updatedIngredient_2
            )

            const updatedState_2 = {
                ingredients: updatedIngredients_2,
                totalPrice: prevState.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
            return updatedObject(prevState, updatedState_2)

        case actionTypes.SET_INGREDIENTS:
            return updatedObject(
                prevState,
                {
                    ingredients: {
                        salad: action.ingredients.salad,
                        bacon: action.ingredients.bacon,
                        cheese: action.ingredients.cheese,
                        meat: action.ingredients.meat
                    },
                    error: false,
                    totalPrice: 4
                }
            )
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updatedObject(prevState, { error: true })
        default:
            return prevState
    }
}

export default ingredientReducer
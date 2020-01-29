import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utility'

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const addIngredient = (prevState, action) => {
    const updatedIngredient = {
        [action.ingredientName]: prevState.ingredients[action.ingredientName] + 1
    }

    const updatedIngredients = updatedObject(
        prevState.ingredients,
        updatedIngredient
    )
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: prevState.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updatedObject(prevState, updatedState)
}

const removeIngredient = (prevState, action) => {
    const updatedIngredient_2 = {
        [action.ingredientName]: prevState.ingredients[action.ingredientName] - 1
    }

    const updatedIngredients_2 = updatedObject(
        prevState.ingredients,
        updatedIngredient_2
    )

    const updatedState_2 = {
        ingredients: updatedIngredients_2,
        totalPrice: prevState.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updatedObject(prevState, updatedState_2)
}

const setIngredient = (prevState, action) => {
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
            totalPrice: 4,
            building: false
        }
    )
}

const ingredientReducer = (prevState = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS: return addIngredient(prevState, action)
        case actionTypes.REMOVE_INGREDIENTS: return removeIngredient(prevState, action)
        case actionTypes.SET_INGREDIENTS: return setIngredient(prevState, action)
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updatedObject(prevState, { error: true })
        default: return prevState
    }
}

export default ingredientReducer
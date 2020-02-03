import * as actionTypes from './actionTypes'

export const addIngredient = ingredientName => {
    return {
        type: actionTypes.ADD_INGREDIENTS,
        ingredientName
    }
}

export const removeIngredient = ingredientName => {
    return {
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredientName
    }
}

export const setIngredients = ingredients => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return { type: actionTypes.INIT_INGREDIENTS }
}
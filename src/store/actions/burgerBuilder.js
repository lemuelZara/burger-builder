import axios from '../../axios-orders'

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
    return dispatch => {
        axios.get('https://burger-builder-bb.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data))
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed())
            });
    }
}
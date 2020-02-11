import { put } from 'redux-saga/effects'

import axios from "../../axios-orders";
import { setIngredients, fetchIngredientsFailed } from '../actions/index'

export function* initIngredientsSaga(action) {
    try {
        const response = yield axios.get('https://burger-builder-bb.firebaseio.com/ingredients.json')
        yield put(setIngredients(response.data))
    } catch (error) {
        yield put(fetchIngredientsFailed())
    }
}
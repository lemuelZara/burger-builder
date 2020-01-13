import React, { Component } from "react";

import Hoc from '../../hoc/Hoc'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }, 
        totalPrice: 4
    }

    addIngredientHandler = typeIngredient => {
        const oldCount = this.state.ingredients[typeIngredient]
        const updatedCounted = oldCount + 1        
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[typeIngredient] = updatedCounted

        const priceAddition = INGREDIENT_PRICE[typeIngredient]
    }

    removeIngredientHandler = typeIngredient => {

    }

    render() {
        return (
            <Hoc>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls />
            </Hoc>
        )
    }
}

export default BurgerBuilder
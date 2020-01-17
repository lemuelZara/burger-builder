import React, { Component } from "react";

import Hoc from '../../hoc/Hoc'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";


const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 0,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: null
    }

    componentDidMount() {
        axios.get('https://burger-builder-bb.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data })
            })
            .catch(error => {
                this.setState({ error: true })
            })
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((total, item) => {
                return total + item
            }, 0)

        this.setState({ purchasable: sum > 0 })
    }

    addIngredientHandler = typeIngredient => {
        const oldCount = this.state.ingredients[typeIngredient]
        const updatedCounted = oldCount + 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[typeIngredient] = updatedCounted

        const priceAddition = INGREDIENT_PRICE[typeIngredient]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + priceAddition

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })

        this.updatePurchaseState(updatedIngredients)
    }

    removeIngredientHandler = typeIngredient => {
        const oldCount = this.state.ingredients[typeIngredient]
        if (oldCount <= 0)
            return

        const updatedCounted = oldCount - 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[typeIngredient] = updatedCounted

        const priceDeduction = INGREDIENT_PRICE[typeIngredient]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice - priceDeduction

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
        this.updatePurchaseState(updatedIngredients)

    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        this.setState({
            loading: true
        })
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Lemuel',
                adrress: {
                    street: 'Rua Jose Salvioni',
                    zipCode: '15625000',
                    country: 'Brasil'
                },
                email: 'lemuel@google.com'
            },
            deliveryMethod: 'fastest'

        }
        axios.post('/orders.json', order)
            .then(reponse => {
                this.setState({
                    loading: false, purchasing: false
                })
                console.log(reponse)
            })
            .catch(error => {
                this.setState({
                    loading: false, purchasing: false
                })
                console.log(error)
            })
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null
        let burger = this.state.error
            ? <p>Ingredients can't be loaded</p>
            : <Spinner />

        if (this.state.ingredients) {
            burger = (
                <Hoc>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler} />
                </Hoc>
            )

            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
                price={this.state.totalPrice} />
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Hoc>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Hoc>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios)
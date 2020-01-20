import React from 'react'

import classes from './Order.module.css'

const Order = props => {
    const ingredients = []

    for (let ingredientName in props.ingredients) {
        ingredients.push(props.ingredients[ingredientName])
    }

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredients}</p>
            <p>Price: <strong>{Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )
}

export default Order
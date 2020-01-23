import React from 'react'

import classes from './Order.module.css'

const Order = props => {
    const ingredients = []

    for (let ingredientName in props.ingredients) {
        console.log(ingredientName)
        ingredients.push({
            name: ingredientName,
            value: props.ingredients[ingredientName]
        })
    }

    let ingredientOutput = ingredients.map(ig => {
        return <span
            key={ig.name}
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}>{ig.name} {ig.value}</span>
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients:
                {ingredientOutput}
            </p>
            <p>Price: <strong>BRL {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )
}

export default Order
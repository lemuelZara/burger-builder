import React from 'react'

import styles from './Burger.module.css'
import BurgerIngredients from './BurgerIngredients/BurgerIngredients'

const Burger = props => {
    let transformIngredients = Object
        .keys(props.ingredients)
        .map(ingredientItem => {
            return [...Array(props.ingredients[ingredientItem])]
                .map((_, index) => {
                    return <BurgerIngredients
                        key={ingredientItem + index}
                        type={ingredientItem} />
                })
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, [])

    if (transformIngredients.length === 0) {
        transformIngredients = <p>Please start adding ingredients!</p>
    }

    return (
            <div className={styles.Burger}>
                <BurgerIngredients type="bread-top" />
                {transformIngredients}
                <BurgerIngredients type="bread-bottom" />
            </div>
        )
}

export default Burger
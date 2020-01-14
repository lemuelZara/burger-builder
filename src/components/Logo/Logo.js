import React from 'react'

import BurgerLogo from '../../assets/images/burger-logo.png'
import styles from './Logo.module.css'

const Logo = props => (
    <div className={styles.Logo} style={{height: props.height}}>
        <img src={BurgerLogo} alt="Logo Burger"/>
    </div>
)

export default Logo
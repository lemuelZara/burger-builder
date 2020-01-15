import React from 'react'

import styles from './DrawerToogle.module.css'

const DrawerToogle = props => (
    <div className={styles.DrawerToggle} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
)

export default DrawerToogle
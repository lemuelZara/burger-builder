import React from 'react'

import styles from './Toolbar.module.css'
import BurgerLogo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToogle from '../SideDrawer/DrawerToogle/DrawerToogle'

const Toolbar = props => (
    <header className={styles.Toolbar}>
        <DrawerToogle clicked={props.drawerToogleClick}/>
        <div className={styles.Logo}>
            <BurgerLogo />
        </div>
        <nav className={styles.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
)

export default Toolbar
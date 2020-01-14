import React from 'react'

import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import styles from './SideDrawer.module.css'
import BackDrop from '../../UI/Backdrop/Backdrop'
import Hoc from '../../../hoc/Hoc'

const SideDrawer = props => {
    let attachedClasses = [styles.SideDrawer, styles.Close]
    if (props.open) {
        attachedClasses = [styles.SideDrawer, styles.Open]
    }

    return (
        <Hoc>
            <BackDrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={styles.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Hoc>
    )
}

export default SideDrawer
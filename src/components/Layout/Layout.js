import React from 'react'

import Hoc from '../../hoc/Hoc'
import styles from './Layout.module.css'

const Layout = props => (
    <Hoc>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={styles.Content}>
            {props.children}
        </main>
    </Hoc>
)

export default Layout
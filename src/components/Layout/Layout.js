import React from 'react'

import Hoc from '../../hoc/Hoc'
import styles from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'

const Layout = props => (
    <Hoc>
        <Toolbar />
        <main className={styles.Content}>
            {props.children}
        </main>
    </Hoc>
)

export default Layout
import React from 'react'

import styles from './Modal.module.css'

import Hoc from '../../../hoc/Hoc'
import Backdrop from '../Backdrop/Backdrop'

const Modal = props => (
    <Hoc>
        <Backdrop show={props.show} clicked={props.modalClosed}/>
        <div
            className={styles.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'

            }}>
            {props.children}
        </div>
    </Hoc>

)

export default Modal
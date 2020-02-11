import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css'
import { auth, setAuthRedirectPath } from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
import { updatedObject, checkValidity } from '../../shared/utility'

const Auth = props => {
    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your email'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Your pass'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    })

    const [isSignup, setIsSignup] = useState(true)

    const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props
    useEffect(() => {
        if (!buildingBurger && authRedirectPath !== '/') {
            onSetAuthRedirectPath()
        }
    }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath])

    const inputChangedHandler = (event, controlName) => {
        const updateControls = updatedObject(controls, {
            [controlName]: updatedObject(controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validation),
                touched: true
            })
        })

        setControls(updateControls)
    }

    const submitHandler = event => {
        event.preventDefault()

        props.onAuth(
            controls.email.value,
            controls.password.value,
            isSignup
        )
    }

    const switchAuthModeHandler = () => setIsSignup(!isSignup)

    const formElementsArray = []
    for (let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key]
        })
    }

    let form = formElementsArray.map(formElement => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => inputChangedHandler(event, formElement.id)} />
    ))
    if (props.loading) {
        form = <Spinner />
    }

    let errorMessage = null
    if (props.err) {
        errorMessage = (
            <p>{props.err.message}</p>
        )
    }

    let authRedirect = null
    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath} />
    }

    return (
        <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType="Success">Log In</Button>
            </form>
            <Button
                clicked={switchAuthModeHandler}
                btnType="Danger">Switch to {isSignup ? 'SIGIN' : 'SIGNUP'}</Button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.authReducer.loading,
        err: state.authReducer.err,
        isAuthenticated: state.authReducer.token !== null,
        buildingBurger: state.burgerBuilderReducer.building,
        authRedirectPath: state.authReducer.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, pass, isSignup) => dispatch(auth(email, pass, isSignup)),
        onSetAuthRedirectPath: () => dispatch(setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
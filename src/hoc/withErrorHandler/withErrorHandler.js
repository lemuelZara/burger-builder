import React, { Component } from 'react'
import Hoc from '../Hoc'
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        constructor(props) {
            super(props)

            this.state = {
                error: null
            }

            this.reqInterceptor = axios.interceptors.request.use(request => {
                console.log('Entrei no axios.interceptors')
                this.setState({ error: null })
                return request
            })
            this.resInterceptor = axios.interceptors.response.use(response => response, err => {
                this.setState({ error: err })
            })
        }

        componentWillUnmount() {
            console.log('[componentWillUnmount]', this.reqInterceptor, this.resInterceptor)
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.response.eject(this.resInterceptor)
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null })
        }

        render() {
            return (
                <Hoc>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Hoc>
            )
        }
    }
}

export default withErrorHandler
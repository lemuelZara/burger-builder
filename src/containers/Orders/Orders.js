import React, { Component } from "react";
import { connect } from 'react-redux'

import Order from "../../components/Order/Order";
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'


class Orders extends Component {
    componentDidMount() {
        this.props.fetchOrders()
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price} />
                ))}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(null, mapDispatchToProps)(withErrorHandler(Orders, axios))
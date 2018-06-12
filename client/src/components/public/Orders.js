import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/orders';

const Orders=(props)=>{
    const orders = props.orders.map((order,i)=>{
        return <div key={i} className="order"><img src={order.img} alt=""/><button onClick={()=>props.removeOrder(i)}>x</button></div>
    });
    return(
        <div className="orders-container">
            {orders}
        </div>
    );
};

const mapStateToProps = (state)=>{
    return{
        orders:state.orders
    }
};

export default connect(mapStateToProps, actions)(Orders);
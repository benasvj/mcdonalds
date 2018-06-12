import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/orders';
import {Link} from 'react-router-dom';

const Menu=(props)=>{
    const menuItem = props.menu.filter(item=>item.category===props.active || !props.active).map((item,i)=>{
        return <div key={i} onClick={()=>props.addOrder(item)} className={item.instock? "menu-item" : "menu-item outstock"}>
            <h3>{item.name}</h3>
            <img src={item.img} alt=""/>
            {item.instock?
                <h5>{item.price} €</h5>
            :
                <p>Out of Stock</p>
            }
        </div>
    });
    return(
        <div className="menu">
            <h2>menu</h2>
            <div className="menu-container">
                {menuItem}
            </div>
            {
                props.orders.length>0 && 
                <Link to="/checkout">Checkout</Link>  
            }
        </div>
    );
};

const mapStateToProps = (state)=>{
    return{
        menu:state.menu,
        active:state.active,
        orders:state.orders
    }
};

export default connect(mapStateToProps, actions)(Menu);
import React from 'react';
import Categories from './Categories';
import Menu from './Menu';
import Orders from './Orders';
import { Route } from 'react-router-dom';
import {connect} from 'react-redux';
import * as categoriesActions from '../../actions/categories';
import * as menuActions from '../../actions/menu';
const actions = {...menuActions, ...categoriesActions};

class Shop extends React.Component{
    componentDidMount(){
        this.props.fetchCategories();
        this.props.fetchMenu();
    }

    render(){
        return(
            <div className="shop">
                <Route exact path="/shop" component={Menu}/>
                <Categories/>
                <Orders/>
            </div>
        );
    };
};

export default connect(null, actions)(Shop);
import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/categories';

class Categories extends React.Component{
    render(){
        const categories = this.props.categories.map((item,i)=>{
            return <div key={i} className={this.props.active===item.name? "category active" : "category"} onClick={()=>this.props.switchCategory(item.name)}>
                <h2>{item.name}</h2>
                <img src={item.img} alt=""/>
            </div>
        });
        return(
            <div className="categories">
                {categories}
                
            </div>
        );
    };
};

const mapStateToProps = (state)=>{
    return{
        categories:state.categories,
        active:state.active
    }
};

export default connect(mapStateToProps, actions)(Categories);
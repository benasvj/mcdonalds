import React from 'react';
import { Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import * as actions from '../../actions/user';
import {Redirect} from 'react-router-dom';

let Login = (props)=>{

    return(
        <div>
            <div>
                {props.user.name && <Redirect to="/admin"/>}
                <h1>{props.user.name}</h1>
                <form onSubmit={
                    props.handleSubmit(props.newUser, ()=>{
                        props.history.push('/admin')
                    })}>
                    <Field name="name" component="input" type="text" placeholder="Name" autoComplete="off"/>
                    <Field name="password" component="input" type="password" placeholder="Password"/>
                    <button type="submit">Login</button>
                </form>
                <h2>{props.user.err}</h2>
            </div>
        </div>
    );
};


Login = reduxForm({
    // a unique name for the form
    form: 'login'
})(Login);

const mapStateToProps = (state)=>{
    return{
        user:state.user
    };
};
export default connect(mapStateToProps,actions)(Login);
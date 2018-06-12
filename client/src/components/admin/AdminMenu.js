import React from 'react';
import {connect} from 'react-redux';
import * as actionsCat from '../../actions/categories';
import * as actionsMenu from '../../actions/menu';
import { Field, reduxForm, reset } from 'redux-form';
import axios from 'axios';
import Dropzone from 'react-dropzone';
const actions = {...actionsCat, ...actionsMenu};

class AdminMenu extends React.Component{
    state={
        message:"",
        dbData:[],
        file:''
    };

    componentDidMount(){
        axios.get('/api/admin/getdata').then((res)=>{
            this.setState({dbData:res.data.items});
            console.log(this.state.dbData);
        });
    };

    addProduct = (values)=>{
        //sukuriam objekta ir jam priskiriame formos savybes
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('price', values.price);
        formData.append('category', this.props.active);
        formData.append('itemimage', this.state.file);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.post('/api/admin/additem', formData).then((res)=>{
            console.log(res.data);
            this.setState({message:res.data.message})

            //itraukiam nauja item i reduceri pagal gauta response
            const {_id, name, price, category, img} = res.data;
            this.props.addItem({_id, name, price, category, img});
            this.setState({file:""});
            this.props.dispatch(reset('menu'));
        })
    };

    // removeItem = (item)=>{
    //     axios.post('/api/admin/removeitem', item).then((res)=>{
    //         console.log(res.data.message);
    //         this.setState({message:res.data.message})

    //         this.props.deleteItem(item);
    //     })
    // };

    uploadImage = (files)=>{
        this.setState({file:files[0]})
    };


    render(){
        const categories = this.props.categories.map((item, i)=>{
            return (
                <li 
                className={this.props.active===item.name? "active-cat" : null}
                onClick={()=>this.props.switchCategory(item.name)}
                key={i}
                >{item.name}</li>
            )
        });
        // const menuItem = this.props.menu.filter(item=>item.category===this.props.active || !this.props.active).map((item,i)=>{
        //     return <div key={i} className="menu-item">
        //         <h3>{item.name}</h3>
        //         <img src={item.img} alt=""/>
        //         <h5>{item.price} €</h5>
        //     </div>
        // });
        const newItems = this.props.menu.filter(item => {
            return item.category === this.props.active
        }).map((item, i) => {
            console.log(item);
            return <div key={i} className="menu-item">
                <h3>{item.name}</h3>
                <h5>{item.price} €</h5>
                <img src={item.img} alt=""/>
                <button className="remove-item" onClick={()=>this.props.removeItem(item._id)}>Remove</button>
            </div>
        });

        return(
            <div className="admin-menu">
                <ul>
                    {categories}
                </ul>
                {this.props.active &&
                <div className="dropzone">
                    <Dropzone 
                        onDrop={this.uploadImage}
                        style={{
                            width:'120px',
                            height:'120px',
                            margin:'auto',
                            backgroundImage:`url(${this.state.file.preview})`,
                            backgroundSize:'cover',
                            backgroundPosition:'center'
                        }}
                    >
                        <p>Drop item image here</p>
                    </Dropzone>
                    {/* <p>{this.state.file.name}</p>
                    <img src={this.state.file.preview} alt=""/> */}
                    <form onSubmit={this.props.handleSubmit(this.addProduct)}>
                        <Field name="name" component="input" type="text" placeholder="name"/>
                        <Field name="price" component="input" type="number" placeholder="price"/>
                        <Field name="category" component="input" type="hidden" value={this.props.active}/>
                        <button type="submit">Add</button>
                    </form>

                </div>
                }
                <div className="menu-container">
                    {newItems}
                    {/* {menuItem} */}
                </div>
                <h2>{this.state.message}</h2>
            </div>
        );
    };
};

const mapStateToProps = (state)=>{
    return{
        categories:state.categories,
        menu:state.menu,
        active:state.active
    };
};

AdminMenu = reduxForm({
    // a unique name for the form
    form: 'menu'
  })(AdminMenu)
    
export default connect(mapStateToProps, actions)(AdminMenu);

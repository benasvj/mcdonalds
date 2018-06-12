import axios from 'axios';

export function fetchMenu(){
    return async function (dispatch){
        const response = await axios.get('/api/menu');
        dispatch({
            type:'FETCH_MENU',
            payload:response.data
        })
    }
};

export function addItem(item){
    return{
        type:'ADD_ITEM',
        payload:item
    }
};

export function removeItem(_id){
    console.log(_id);
    return async function (dispatch){
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        const response = await axios.post('/api/remove', {_id});
        dispatch({
            type:'REMOVE_ITEM',
            payload:response.data
        });
    };
};

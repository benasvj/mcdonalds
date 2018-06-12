const menu = (state=[],action)=>{
    switch(action.type){
        case 'FETCH_MENU' :
            console.log(action.payload)
            return [...action.payload.menu];
        case 'ADD_ITEM' : return[...state, action.payload];
        case 'REMOVE_ITEM' : 
            console.log(action.payload._id);
            return [...state].filter(item=>item._id!==action.payload._id);
        default : return state
    }
};

export default menu;
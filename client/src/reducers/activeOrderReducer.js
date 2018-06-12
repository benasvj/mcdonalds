const activeOrder = (state=[], action)=>{
    switch (action.type){
        case 'ADD_ACTIVE_ORDER' : 
            return [action.payload, ...state];
        default : return state
    }
};

export default activeOrder;
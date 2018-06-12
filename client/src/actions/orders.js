//public
export function addOrder(order){
    console.log(order)
    return{
        type:'ADD_ORDER',
        payload:order
    }
}

export function removeOrder(order){
    return{
        type:'REMOVE_ORDER',
        payload:order
    }
}

export function removeAll(){
    return{
        type:'REMOVE_ALL',
    }
}

//admin (sockets)
export function addActiveOrder(order){
    console.log(order);
    return {
        type:'ADD_ACTIVE_ORDER',
        payload:order
    }
}
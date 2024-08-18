export const Authenticate = (state = {loggedIn: false,data:{}}, action) => {
if(action.type === 'AUTHENTICATE_USER'){
    return {...state, loggedIn : true, data : action.payload}
}
else if(action.type === 'LOGOUT'){
    return {...state, loggedIn : false, data : action.payload}
}
else if(action.type === 'ADD_PLAYER'){
    return {...state, loggedIn : true, data : action.payload}
}
else if(action.type === 'ADD_MATCH'){
    return {...state, loggedIn : true, data : action.payload}
}
else if(action.type === 'EDIT_PLAYER'){
    return {...state, loggedIn : true, data : action.payload}
}
else{
    return state
}
};
export const aunthenticateUser = (data) => {
    return (dispatch) => dispatch({
        type: 'AUTHENTICATE_USER',
        payload: data
    })
};

export const addPlayer = (data) => {
    return (dispatch) => dispatch({
        type: 'ADD_PLAYER',
        payload: data
    })
};

export const addScoreCard = (data) => {
    return (dispatch) => dispatch({
        type: 'ADD_MATCH',
        payload: data
    })
};


export const editPlayerProfile = (data) => {
    return (dispatch) => dispatch({
        type: 'EDIT_PLAYER',
        payload: data
    })
};


export const logoutauthenticateduser = (data) => {
    return (dispatch) => dispatch({
        type: 'LOGOUT',
        payload: data
    })
};
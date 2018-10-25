const INIT_STATE = {user: null, loading: false};

export default (state = INIT_STATE, action) =>{
    switch (action.type){
        case ('signUp_user'):
            return ({...state, loading: true});
        case ('signUp_success'):
            return ({...state, user: action.user, loading: false});
        default:
            return state;
    }
}
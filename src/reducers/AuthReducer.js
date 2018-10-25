const INITIAL_STATE = {user: null, loading: false, error: ''};

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case ('login_user') :
            return ({...state, loading: true});
        case ('login_failed') :
            return ({...state, loading: false, error: action.error});
        case ('login_success') :
            return ({...state, loading: false, user: action.user});
        default :
            return state;
    }
}
import auth from './index';
const INITIAL_STATE = { user: null, guest: true };

export default (state = INITIAL_STATE, action, auth) => {
    switch (action.type){
        case ('logout') :
            return ({ ...state, user: action.user });
        default :
            return state;
    }
}
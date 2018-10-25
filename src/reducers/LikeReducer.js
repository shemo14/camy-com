const INITIAL_STATE = {user_id: '', product_id: '', isLiked: false};

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case ('like_product') :
            return ({...state, user_id: action.user_id, product_id: action.product_id, isLiked: action.isLiked});
        default :
            return state;
    }
}
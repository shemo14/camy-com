const INIT_STATE = { locale: 'en' };

export default (state = INIT_STATE, action) => {
    switch (action.type){
        case 'change_lang':
            return { locale: action.payload };
        default:
            return state;
    }
}
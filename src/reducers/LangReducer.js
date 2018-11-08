const INIT_STATE = { locale: 'en', dir: 'ltr' };

export default (state = INIT_STATE, action) => {
    switch (action.type){
        case 'change_lang':
            return { locale: action.payload.lang, dir: action.payload.dir };
        default:
            return state;
    }
}
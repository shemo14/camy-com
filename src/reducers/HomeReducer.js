const INIT_STATE = {sliders: null, offers: null, brands: null, products: null};

export default (state = INIT_STATE, actions) => {
    switch (actions.type){
        case ('home'):
            return state;
        default:
            return state;
    }
};


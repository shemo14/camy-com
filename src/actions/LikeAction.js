import axios from 'axios';
import { AsyncStorage } from 'react-native';

export const Like = ({ product_id, user_id }) => {
    return (dispatch) => {
        dispatch({type: 'like_product'});


        axios.post('https://shams.arabsdesign.com/camy/api/like', {product_id, user_id})
             .then(response => dispatch({type: 'like_product', user_id: user_id, product_id: product_id, isLiked: response.data.isLiked}))
             .catch(error => console.error(error.data));
    };
};


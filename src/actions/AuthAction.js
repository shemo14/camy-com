import axios from 'axios';
import { AsyncStorage } from 'react-native';

export const LoginUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({type: 'user_login'});


        axios.post('https://shams.arabsdesign.com/camy/api/login', {email, password})
            .then(response => handelLogin(dispatch, response.data))
            .catch(error => console.warn(error.data));
    };
};


const handelLogin = (dispatch, data) => {
    if (!data.status){
        loginFailed(dispatch, data.msg)
    }else{
        loginSuccess(dispatch, data.user)
    }
};

const loginSuccess = (dispatch, user) => {
    AsyncStorage.multiSet([['user_id', JSON.stringify(user.id)], ['user', JSON.stringify(user)]])
        .then(() => dispatch({type: 'login_success', user}));

    dispatch({type: 'login_success', user});
};

const loginFailed = (dispatch, error) => {
    dispatch({type: 'login_failed', error: error});
};
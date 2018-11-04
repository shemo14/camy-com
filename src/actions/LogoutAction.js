import { AsyncStorage } from 'react-native';

export const Logout = () => {
    return (dispatch) => {
        dispatch({type: 'logout'});
        AsyncStorage.removeItem('auth');
        dispatch({type: 'logout', guest: true ,user:{ name: 'guest', avatar: 'https://shams.arabsdesign.com/camy/dashboard/uploads/users/default.png' }});
    };
};


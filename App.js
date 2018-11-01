import React from 'react';
import { StyleSheet, View, Image, AsyncStorage } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import RootStack from './src/components/RootStack';
import { Root } from "native-base";
import { I18nManager } from 'react-native';
import { DangerZone } from 'expo';
import I18n from './local/i18n';

AsyncStorage.getItem('lang').then(lang => {
    if (lang === 'ar') {
        I18nManager.forceRTL(true);
    } else if (lang === 'en') {
        I18nManager.forceRTL(false);
    }else{
        I18n.locale = 'en';
        AsyncStorage.setItem('lang', 'en');
    }
});



export default class App extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        isSplashReady: false,
        isAppReady: false,
        lang: 'en'
    };

    componentWillMount() {
        AsyncStorage.getItem('lang').then((value) => {
            if (value === 'ar') {
                I18nManager.forceRTL(true);
            } else {
                I18nManager.forceRTL(false);
            }
            // return this.setState({ lang: value });
        }).done();
    }


    render() {
        return (
            <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
                <Root>
                    <RootStack lang={this.state.lang}/>
                </Root>
            </Provider>
        );
    }
}



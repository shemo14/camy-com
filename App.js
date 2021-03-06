import React from 'react';
import { StyleSheet, View, Image, AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import RootStack from './src/components/RootStack';
import { Root } from "native-base";
import { I18nManager } from 'react-native';
import { store, persistedStore } from './src/store';
import I18n from './local/i18n';
import './ReactotronConfig';


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
        }).done();
    }


    render() {
        return (
            <Provider store={store}>
                <PersistGate persistor={persistedStore}>
                    <Root>
                        <RootStack lang={this.state.lang}/>
                    </Root>
                </PersistGate>
            </Provider>
        );
    }
}



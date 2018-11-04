import I18n from '../../local/i18n';
import { AsyncStorage } from 'react-native';
import Expo from "expo";

export const changeLang = (locale) => {
    I18n.locale = locale;
    AsyncStorage.setItem('lang', locale).then(() => {
        Expo.Util.reload();
    });
    return {
        type: 'change_lang',
        payload: locale
    };
};
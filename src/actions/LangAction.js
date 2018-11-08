import I18n from '../../local/i18n';
import {AsyncStorage, I18nManager} from 'react-native';
import Expo from "expo";

export const changeLang = (locale) => {
    if (locale === 'ar') {
        I18nManager.forceRTL(true);
    } else if (locale === 'en') {
        I18nManager.forceRTL(false);
    }

    I18n.locale = locale;
    AsyncStorage.setItem('lang', locale).then(() => {
        Expo.Util.reload();
    });
    return {
        type: 'change_lang',
        payload: {lang: locale, dir: locale === 'en' ? 'lrt' : 'rtl'}
    };
};
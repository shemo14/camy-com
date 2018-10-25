import I18n from '../../local/i18n';

export const changeLang = (locale) => {
    I18n.locale = locale;
    return {
        type: 'change_lang',
        payload: locale
    };
};
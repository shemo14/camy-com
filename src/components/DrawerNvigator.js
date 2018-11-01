import React, { Component } from 'react';
import { Image, View, ImageBackground, Text, AsyncStorage } from 'react-native';
import { createDrawerNavigator, createStackNavigator, DrawerItems } from 'react-navigation';
import Home from './Home';
import Profile from './Profile';
import Cart from './Cart';
import Favorites from './Favorites';
import About from './About';
import Maintenance from './Maintenance';
import Settings from './Settings';
import DrawerHeader from './DrawerHeader';
import Orders from './Orders';
import { Icon } from 'native-base';
import I18n from '../../local/i18n';
import {changeLang} from "../actions";
import Share from "./Share";
import Rate from "./Rate";

const lang = '';


const CustomDrawerContentComponent = (props) => (<DrawerHeader { ...props }/>);
console.log('DrawerLang', I18n.locale, lang);

const DrawerNavigator = createDrawerNavigator({
        home: Home,
        profile: Profile,
        cart: Cart,
        chat: {
            screen: Share,
            navigationOptions: {
                drawerLabel: I18n.t('chat'),
                drawerIcon: ( <Icon style={{ fontSize: 24 }} type='Ionicons' name='ios-chatbubbles' /> )
            }
        },
        orders: Orders,
        favorites: Favorites,
        share: {
            screen: Share,
            navigationOptions: {
                drawerLabel: I18n.t('shareWithFriends'),
                drawerIcon: ( <Icon style={{ fontSize: 24 }} type='Feather' name='share-2' /> )
            }
        },
        rate: {
            screen: Rate,
            navigationOptions: {
                drawerLabel: I18n.t('rateUs'),
                drawerIcon: ( <Icon style={{ fontSize: 24 }} type='FontAwesome' name='star'/> )
            }
        },
        maintenance: Maintenance,
        about: About,
        settings: Settings,
    },
    {
        initialRouteName: 'home',
        drawerPosition: I18n.locale === 'en' ? 'right' : 'left',
        contentComponent: CustomDrawerContentComponent,
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        gesturesEnabled: false,
        drawerToggleRoute: 'DrawerToggle'
    });

export default DrawerNavigator;
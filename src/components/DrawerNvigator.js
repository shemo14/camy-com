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

const lang = '';


const CustomDrawerContentComponent = (props) => (<DrawerHeader { ...props }/>);
console.log('DrawerLang', I18n.locale, lang);

const DrawerNavigator = createDrawerNavigator({
        home: Home,
        profile: Profile,
        cart: Cart,
        orders: Orders,
        favorites: Favorites,
        maintenance: Maintenance,
        about: About,
        settings: Settings,
    },
    {
        initialRouteName: 'home',
        // drawerPosition: locale === 'en' ? 'left' : 'right',
        contentComponent: CustomDrawerContentComponent,
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        gesturesEnabled: false,
        drawerToggleRoute: 'DrawerToggle'
    });

export default DrawerNavigator;
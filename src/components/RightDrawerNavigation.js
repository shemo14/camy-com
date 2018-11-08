import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import Home from './Home';
import Profile from './Profile';
import Cart from './Cart';
import Favorites from './Favorites';
import About from './About';
import Maintenance from './Maintenance';
import Settings from './Settings';
import DrawerHeader from './DrawerHeader';
import Orders from './Orders';
import Share from "./Share";
import Rate from "./Rate";
import Chat from "./Chat";
import Lang from "./Lang";

const CustomDrawerContentComponent = (props) => (<DrawerHeader { ...props }/>);
const DrawerNavigator = createDrawerNavigator({
        home: Home,
        profile: Profile,
        orders: Orders,
        cart: Cart,
        chat: Chat,
        favorites: Favorites,
        share: Share,
        rate: Rate,
        maintenance: Maintenance,
        about: About,
        settings: Settings,
        lang: Lang,
    },
    {
        initialRouteName: 'home',
        drawerPosition: 'right',
        contentComponent: CustomDrawerContentComponent,
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        gesturesEnabled: false,
        drawerToggleRoute: 'DrawerToggle'
    });

export default DrawerNavigator;
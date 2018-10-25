import React, { Component } from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { Image, View } from 'react-native';
import Settings from './Settings';
import Offers from './Offers';
import Cart from './Cart';
import Search from './Search';
import Home from './Home';
import { Icon, Button, Container, Header, Content, Left } from 'native-base';


export default class AppTabNavigator extends Component{
    // static navigationOptions = ({ navigation }) => {
    //     return {
    //         headerLeft: (
    //             <View style={{ padding: 10 }} onPress={() => navigation.openDrawer()}>
    //                 <Image source={require('../../assets/images/list.png')} onPress={() => navigation.openDrawer()} style={{ width:20, height: 20 }}/>
    //             </View>
    //         )
    //     }
    // };

    static navigationOptions = ({ navigation }) => ({
        title: "Home",
        headerLeft: <Icon name="ios-menu" style={{ paddingLeft: 10 }} onPress={() => navigation.openDrawer()} />,
        drawerLabel: 'Notification',
        drawerIcon: (
            <Image
                source={require('../../assets/images/list.png')}
                style={{ width: 20, height: 20}}
            />
        ),
    });


    render(){
        return( <CartTabNavigator screenProps={{ navigation: this.props.navigation }} /> );
    }
}

const CartTabNavigator = createBottomTabNavigator({
    settings: {
        screen: Settings,
        navigationOptions:{
            tabBarIcon: () => ( <Image style={{ width:27, height: 27 }} source={require('../../assets/images/dmaint.png')} /> ),
            tabBarOptions:{
                showLabel: false,
            }
        }
    },
    offers: {
        screen: Offers,
        navigationOptions:{
            tabBarIcon: () => ( <Image style={{ width:27, height: 27 }} source={require('../../assets/images/dsales.png')} /> ),
            tabBarOptions:{
                showLabel: false,
            }
        }
    },
    cart: {
        screen: Cart,
        navigationOptions:{
            tabBarIcon: () => ( <Image style={{ width:27, height: 32 }} source={require('../../assets/images/dcart.png')} /> ),
            tabBarOptions:{
                showLabel: false,
            }
        }
    },
    search: {
        screen: Search,
        navigationOptions:{
            tabBarIcon: () => ( <Image style={{ width:27, height: 27 }} source={require('../../assets/images/dsearch.png')} /> ),
            tabBarOptions:{
                showLabel: false,
            }
        }
    },
    home: {
        screen: Home,
        navigationOptions:{
            tabBarIcon: () => ( <Image style={{ width:27, height: 27 }} source={require('../../assets/images/dhome1.png')} /> ),
            tabBarOptions:{
                showLabel: false,
            }
        }
    },
},{
    initialRouteName: 'cart',
});
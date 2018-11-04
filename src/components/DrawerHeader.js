import React, { Component } from 'react';
import {Image, View, ImageBackground, Text, AsyncStorage, TouchableOpacity, Share, Linking} from 'react-native';
import {Container, Header, Content, Body, Toast} from 'native-base';
import { DrawerItems } from 'react-navigation';
import axios from 'axios';
import I18n from '../../local/i18n';
import { connect } from 'react-redux';
import { LoginUser, changeLang } from "../actions";
import Expo from "expo";

class DrawerHeader extends Component {
    constructor(props){
        super(props);
        this.state={
            user: [],
            lang: 'en'
        }
    }

    componentWillMount(){
        AsyncStorage.getItem('user_id')
                    .then(user_id => {
                        axios.get('https://shams.arabsdesign.com/camy/api/userData/' + user_id)
                            .then(response => this.setState({ user: response.data.user }))
                            .catch((e) => {
                                console.log('this is error ', e);
                                this.setState({ user: {
                                        name: 'guest',
                                        avatar: 'https://shams.arabsdesign.com/camy/dashboard/uploads/users/default.png',
                                        guest: true
                                    } })
                            })
                    })
                    .catch((e) => console.log(e))
    }

    onPressLogout(){
        this.props.LoginUser({email: 'ops', password: '123', type: 'logout'});
        this.props.navigation.navigate('login');
    }

    onShare (){
        Share.share({
            title: 'Camy.Com Application',
            url: 'https://shams.arabsdesign.com/camy',
            message: 'this is great app visit web site on : https://shams.arabsdesign.com/camy'
        }, {
            dialogTitle: 'share our app with your friends',
            excludedActivityTypes: [
                'com.apple.UIKit.activity.PostToTwitter'
            ]
        })
    };

    render(){
        let { user } = this.props;
        if (user === null){
            user = {
                name: 'guest',
                avatar: 'https://shams.arabsdesign.com/camy/dashboard/uploads/users/default.png',
                guest: true
            }
        }

        return(
            <Container>
                <Header style={styles.drawerHeader}>
                    <Body>
                    <ImageBackground resizeMode='cover' style={styles.drawerImage} source={require('../../assets/images/sidebackpattern.png')}>
                        <View style={styles.profileContainer}>
                            <Image style={styles.profileImage} source={{ uri: user.avatar }} />
                            <Text style={styles.welcomeText}>{ I18n.t('welcome') }</Text>
                            <View style={styles.authContainer}>
                                <Text onPress={() => this.props.navigation.navigate('profile')} style={styles.usernameText}>{ user.name }</Text>
                                <View style={styles.logoutContainer} onPress={() => this.onPressLogout() }>
                                    <TouchableOpacity onPress={() => this.onPressLogout() }>
                                        <Image style={styles.logoutImage} onPress={() => console.log('ops')} source={require('../../assets/images/sidelogout.png')} />
                                        <Text style={styles.logout}>{ I18n.t('logout') }</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                    </Body>
                </Header>
                <Content>
                    <DrawerItems {...this.props} onItemPress={
                            ( route, focused ) => {
                                if (route.route.key === 'share'){
                                    this.onShare()
                                }else if(route.route.key === 'rate'){
                                    Linking.openURL('https://play.google.com/store/apps/details?id=com.tencent.ig')
                                }else if(route.route.key === 'chat') {
                                    console.log('chat');
                                }else if(route.route.key === 'lang') {
                                    if (this.props.lang === 'ar')
                                        this.props.changeLang('en');
                                    else
                                        this.props.changeLang('ar');

                                }else if(route.route.key === 'cart' && user.guest){
                                    Toast.show({
                                        text: I18n.t('plzLogin'),
                                        type: "danger",
                                        duration: 5000
                                    });
                                }else{
                                    this.props.navigation.navigate(route.route.key);
                                }
                            }
                        }
                        items={user.guest ? this.props.items.filter((item) => item.routeName !== 'profile' && item.routeName !== 'cart' && item.routeName !== 'favorites' && item.routeName !== 'orders') : this.props.items }
                    />
                </Content>
            </Container>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    drawerHeader: {
        height: 200,
        backgroundColor: 'white'
    },
    drawerImage: {
        height: 200,
        width: 550,
        position: 'relative',
        left: -10,
    },
    profileImage: {
        height: 70,
        width: 70,
        borderRadius: 75,
    },
    profileContainer: {
        marginTop: 50,
        marginLeft: 30,
    },
    welcomeText:{
        color: '#fff',
        marginTop: 10,
    },
    usernameText:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
        height: 25,
        marginRight: 30
    },
    authContainer:{
        flex: 1,
        flexDirection:'row',
        flexWrap: 'wrap'
    },
    logout:{
        color: '#fff',
    },
    logoutImage: {
        width: 20,
        height: 20,
        marginRight: 5
    },
    logoutContainer:{
        flex: 1,
        flexDirection:'row',
        flexWrap: 'wrap'
    },
};

const mapTOState = ({ auth, logout, lang }) => {
    return {
        user: auth.user,
        guest: logout.user,
        lang: lang.locale
    };
};

export default connect(mapTOState, { LoginUser, changeLang })(DrawerHeader);
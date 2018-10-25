import React, { Component } from 'react';
import { Image, View, ImageBackground, Text, AsyncStorage, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Body} from 'native-base';
import { DrawerItems } from 'react-navigation';
import axios from 'axios';
import I18n from '../../local/i18n';

class DrawerHeader extends Component {
    constructor(props){
        super(props);
        this.state={
            user: []
        }
    }

    componentWillMount(){
        AsyncStorage.getItem('user_id')
                    .then(user_id => axios.get('https://shams.arabsdesign.com/camy/api/userData/' + user_id)
                                          .then(response => this.setState({ user: response.data.user })))
    }

    render(){
        return(
            <Container>
                <Header style={styles.drawerHeader}>
                    <Body>
                    <ImageBackground resizeMode='cover' style={styles.drawerImage} source={require('../../assets/images/sidebackpattern.png')}>
                        <View style={styles.profileContainer}>
                            <Image style={styles.profileImage} source={{ uri: this.state.user.avatar }} />
                            <Text style={styles.welcomeText}>Welcome</Text>
                            <View style={styles.authContainer}>
                                <Text onPress={() => this.props.navigation.navigate('profile')} style={styles.usernameText}>{ this.state.user.name }</Text>
                                <View style={styles.logoutContainer} onPress={() => console.log('ops')}>
                                    <TouchableOpacity onPress={() => { AsyncStorage.clear(); this.props.navigation.navigate('login') }}>
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
                    <DrawerItems {...this.props} />
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

export default DrawerHeader;
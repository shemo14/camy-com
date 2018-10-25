import React, { Component } from 'react';
import { TouchableOpacity, AsyncStorage } from 'react-native';
import { Container, Header, Content, Button, Icon, ListItem, Body, Left, Right, Radio } from 'native-base';
import { Row, Grid } from "react-native-easy-grid";
import axios from 'axios';

class AuthLoader extends Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){
        AsyncStorage.getItem('user_id').then(() => { this.props.navigation.navigate('home') }).catch(
            () => { this.props.navigation.navigate('login') }
        );
    }

    render(){
        return AsyncStorage.getItem('user_id').then(() => { this.props.navigation.navigate('home') }).catch(
            () => { this.props.navigation.navigate('login') }
        );
    }


}

export default AuthLoader;
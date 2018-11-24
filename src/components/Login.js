import React, { Component } from 'react';
import { View, Text, Image, KeyboardAvoidingView, AsyncStorage, I18nManager } from 'react-native';
import { Background, Spinner } from "../common";
import { Input, Button, Icon, Content, Item, Label, Container, Form } from 'native-base';
import { connect } from 'react-redux';
import { LoginUser } from '../actions';
import { store, persistedStore } from '../store';
import I18n from '../../local/i18n';
import {DangerZone} from "expo";


class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            emailError: '',
            password: '',
            passwordError: '',
            loader: false
        };
    }

    navigateToSignUp(){
        this.props.navigation.navigate('signUp');
    }

    componentWillMount(){
        AsyncStorage.getItem('lang').then((lang) => I18n.locale = lang);

        console.log('LoginLang', I18n.locale);
    }

    onLoginPressed() {

        const err = this.validate();
        if (!err){
            this.setState({ loader: true });
            const {email, password} = this.state;
            this.props.LoginUser({email, password, type: 'login'});
        }else{
            console.log(err, this.state.emailError, this.state.emailError);
        }
    }

    skipNavigations = async () => {
        const lang = await DangerZone.Localization.getCurrentLocaleAsync();
        if (this.props.lang === 'en'){
            if(lang.substr(0, 2) === 'ar')
                this.props.navigation.navigate('drawerNavigatorRight');
            else
                this.props.navigation.navigate('drawerNavigator');
        }else if (this.props.lang === 'ar'){
            if(lang.substr(0, 2) === 'ar')
                this.props.navigation.navigate('drawerNavigator');
            else
                this.props.navigation.navigate('drawerNavigatorRight');
        }
    }


    validate = () => {
        let isError = false;
        const errors = {
            emailError: "",
            passwordError: ""
        };

        if (this.state.password.length <= 0) {
            isError = true;
            errors.passwordError = I18n.t('passwordValid');
        }

        if (this.state.email.indexOf("@") === -1) {
            isError = true;
            errors.emailError = I18n.t('emailValid');
        }

        this.setState({
            ...this.state,
            ...errors
        });

        console.log(isError);
        return isError;
    };

    renderLoading(){
        if (this.state.loader){
            return(<Spinner />);
        }

        return (
            <Button style={{marginTop: 20, backgroundColor: '#03133b', width: 170, alignSelf: 'center', borderRadius: 10, justifyContent: 'center'}} onPress={() => { this.onLoginPressed()  }} primary>
                <Text style={{color: '#fff', fontSize: 17, textAlign: 'center'}}>{ I18n.t('login') }</Text>
            </Button>
        );
    }

    componentWillReceiveProps(newProps){
        if (newProps.user){
            this.props.navigation.navigate('drawerNavigator');
        }
    }

    render(){
        return(
            <Container>
                <Content contentContainerStyle={{flexGrow: 1}}>
                    <Background>
                        <KeyboardAvoidingView behavior="position">
                            <View style={{justifyContent: 'center', alignItems: 'center', height: 200}}>
                                <Image resizeMode={Image.resizeMode.center} style={{ width: 200, height: 200 }} source={{ uri: 'http://shams.arabsdesign.com/camy/app_resources/loglogo.png' }} />
                            </View>
                            <Form>
                                <View style={{flex: 2, padding: 30}}>
                                    <Item style={{
                                        flexDirection: 'row',
                                        borderBottomWidth: 1,
                                        borderBottomColor: this.state.emailError === '' ? '#ddd' : '#ff0000' ,
                                        padding: 3
                                    }}>
                                        <Icon style={{color: '#5e5e7c', fontSize: 40}} name={'user'} type={'EvilIcons'}/>
                                        <Input style={{ textAlign: I18nManager.isRTL ? 'right' : 'left' }} autoCapitalize='none' onChangeText={(email) => this.setState({email})} placeholder={ I18n.t('email') } value={this.state.email}/>
                                    </Item>
                                    <Text style={{ color: '#ff0000', textAlign: 'center', marginTop: 2 }}>{ this.state.emailError }</Text>

                                    <Item style={{
                                        flexDirection: 'row',
                                        borderBottomWidth: 1,
                                        borderBottomColor: this.state.emailError === '' ? '#ddd' : '#ff0000' ,
                                        padding: 3
                                    }}>
                                        <Icon style={{color: '#5e5e7c', fontSize: 40}} name={'lock'} type={'EvilIcons'}/>
                                        <Input style={{ textAlign: I18nManager.isRTL ? 'right' : 'left' }} autoCapitalize='none' onChangeText={(password) => this.setState({password})} secureTextEntry placeholder={ I18n.t('password') } value={this.state.password}/>
                                    </Item>
                                    <Text style={{ color: '#ff0000', textAlign: 'center', marginTop: 2 }}>{ this.state.passwordError }</Text>
                                    {this.renderLoading()}
                                    <View style={{justifyContent: 'center', alignItems: 'center', margin: 20}}>
                                        <Text stle={{fontSize: 19}}>{ I18n.t('youNotHaveAccount') }, <Text
                                            onPress={() => this.navigateToSignUp()}
                                            style={styles.signUp}>{ I18n.t('signUp') }</Text></Text>
                                    </View>
                                </View>
                            </Form>
                        </KeyboardAvoidingView>
                        <Button onPress={() => this.skipNavigations() } style={{ backgroundColor: '#f2f6fa', alignSelf: 'flex-end', padding: 16, margin: 30, height: 33 }}>
                            <Text>{ I18n.t('skip') }</Text>
                        </Button>
                    </Background>
                </Content>
            </Container>
        );
    }
}

const styles = {
    logo: {
        height: 130,
        width: 115,
        marginBottom: 40,
    },
    background: {
        padding: 40,
    },
    signUp: {
        fontWeight: 'bold',
    }
};


const mapStateToProps = ({ lang, auth }) => {
    return {
        error: auth.error,
        loading: auth.loading,
        user: auth.user,
        lang: lang.locale,
    }
};

export default connect(mapStateToProps, { LoginUser })(Login);
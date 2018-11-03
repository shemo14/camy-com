import React, { Component } from 'react';
import { View, Text, Image, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import { Background, Spinner } from "../common";
import { Input, Button, Icon, Content, Item, Label, Container, Form } from 'native-base';
import { connect } from 'react-redux';
import { LoginUser } from '../actions';
import I18n from '../../local/i18n';


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
            this.props.LoginUser({email, password});
        }else{
            console.log(err, this.state.emailError, this.state.emailError);
        }
    }

    skipNavigations(){
        this.props.navigation.navigate('drawerNavigator');
    }

    validate = () => {
        let isError = false;
        const errors = {
            emailError: "",
            passwordError: ""
        };

        if (this.state.password.length <= 0) {
            isError = true;
            errors.passwordError = "Password is required";
        }

        if (this.state.email.indexOf("@") === -1) {
            isError = true;
            errors.emailError = "Requires valid email";
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
                <Text style={{color: '#fff', fontSize: 17, textAlign: 'center'}}>Login</Text>
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
                                        <Input autoCapitalize='none' onChangeText={(email) => this.setState({email})} placeholder={'Email ...'} value={this.state.email}/>
                                    </Item>
                                    <Text style={{ color: '#ff0000', textAlign: 'center', marginTop: 2 }}>{ this.state.emailError }</Text>

                                    <Item style={{
                                        flexDirection: 'row',
                                        borderBottomWidth: 1,
                                        borderBottomColor: this.state.emailError === '' ? '#ddd' : '#ff0000' ,
                                        padding: 3
                                    }}>
                                        <Icon style={{color: '#5e5e7c', fontSize: 40}} name={'lock'} type={'EvilIcons'}/>
                                        <Input autoCapitalize='none' onChangeText={(password) => this.setState({password})} secureTextEntry placeholder={'Password ...'} value={this.state.password}/>
                                    </Item>
                                    <Text style={{ color: '#ff0000', textAlign: 'center', marginTop: 2 }}>{ this.state.passwordError }</Text>
                                    {this.renderLoading()}
                                    <View style={{justifyContent: 'center', alignItems: 'center', margin: 20}}>
                                        <Text stle={{fontSize: 19}}>If you don't have account, <Text
                                            onPress={() => this.navigateToSignUp()}
                                            style={styles.signUp}>SignUp</Text></Text>
                                    </View>
                                </View>
                            </Form>
                        </KeyboardAvoidingView>
                        <Button onPress={() => this.skipNavigations() } style={{ backgroundColor: '#f2f6fa', alignSelf: 'flex-end', padding: 16, margin: 30, height: 33 }}>
                            <Text>Skip</Text>
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


const mapStateToProps = state => {
    return {
        error: state.auth.error,
        loading: state.auth.loading,
        user: state.auth.user,
    }
};

export default connect(mapStateToProps, { LoginUser })(Login);
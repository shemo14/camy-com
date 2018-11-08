import React, { Component } from 'react';
import {View, Text, Image, KeyboardAvoidingView, Picker, AsyncStorage} from 'react-native';
import { Background, Spinner } from "../common";
import { Input, Button, Icon, Content, Item, Label, Container, Form } from 'native-base';
import Loader from './Loader';
import axios from 'axios';
import I18n from '../../local/i18n';


class SignUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            f_name: '',
            f_nameError: '',
            l_name: '',
            l_nameError: '',
            email: '',
            phone: '',
            phoneError: '',
            emailError: '',
            password: '',
            passwordError: '',
            countries: [],
            country: 0,
            loader: false,
            loading: true,
            'msg' : ''
        };
    }


    navigateToLogIn(){
        this.props.navigation.navigate('login');
    }

    onSignUpPressed(){
        this.setState({ loading: true});
        const err = this.validate();
        if (!err) {
            this.setState({ loader: true });
            axios.post('https://shams.arabsdesign.com/camy/api/signUp',
                {
                    f_name: this.state.f_name,
                    l_name: this.state.l_name,
                    phone: this.state.phone,
                    email: this.state.email,
                    password: this.state.password,
                    country_id: this.state.country
                }).then(response => {
                    this.setState({ loading: false });
                    AsyncStorage.multiSet([['user_id', JSON.stringify(response.data.user.id)], ['user', JSON.stringify(response.data.user)]])
                                .then(() => this.props.navigation.navigate('home'))
            });
        }else {
            console.log(err, this.state.emailError, this.state.emailError);
        }
    }

    validate = () => {
        let isError = false;
        const errors = {
            emailError: "",
            passwordError: "",
            f_nameError: "",
            l_nameError: "",
            phoneError: "",
        };

        if (this.state.password.length <= 0) {
            isError = true;
            errors.passwordError = "Password is required";
        }

        if (this.state.password.length <= 6) {
            isError = true;
            errors.passwordError = "Password less than 6 characters";
        }

        if (this.state.f_name.length <= 0) {
            isError = true;
            errors.f_nameError = "first name is required";
        }

        if (this.state.l_name.length <= 0) {
            isError = true;
            errors.l_nameError = "last name is required";
        }

        if (this.state.phone.length <= 0) {
            isError = true;
            errors.phoneError = "phone is required";
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
            <Button block style={{marginTop: 20}} onPress={() => { this.setState({ loading: true }); this.onSignUpPressed();}} primary>
                <Text style={{color: '#fff', fontSize: 17, fontWeight: 'bold'}}>Create Account</Text>
            </Button>
        );
    }

    componentWillMount(){
        axios.get('https://shams.arabsdesign.com/camy/api/countries/' + I18n.locale)
             .then(response => this.setState({ countries: response.data.countries, loading: false, country: response.data.countries[0].id }))
             .catch(error => console.log(error));
    }

    render(){
        console.log(this.state.country);
        return(
            <Container>
                <Content contentContainerStyle={{flexGrow: 1}}>
                    <Loader loading={this.state.loading} />
                    <Background>
                        <KeyboardAvoidingView behavior="padding">
                            <Text style={{ textAlign: 'center', fontSize: 19 }}>Create a new account</Text>
                            <Form>
                                <View style={{flex: 2, padding: 30}}>
                                <Item style={{
                                    flexDirection: 'row',
                                    borderBottomWidth: 1,
                                    borderBottomColor: this.state.f_nameError === '' ? '#ddd' : '#ff0000' ,
                                    padding: 3
                                }}>
                                    <Input autoCapitalize='none' placeholder={'First Name ...'} onChangeText={(f_name) => this.setState({f_name})} value={this.state.f_name}/>
                                </Item>
                                <Text style={{ color: '#ff0000', textAlign: 'center', marginTop: 2 }}>{ this.state.f_nameError }</Text>

                                <Item style={{
                                    flexDirection: 'row',
                                    borderBottomWidth: 1,
                                    borderBottomColor: this.state.l_nameError === '' ? '#ddd' : '#ff0000' ,
                                    padding: 3
                                }}>
                                    <Input placeholder={'Last Name ...'} autoCapitalize='none' onChangeText={(l_name) => this.setState({l_name})} value={this.state.l_name}/>
                                </Item>
                                <Text style={{ color: '#ff0000', textAlign: 'center', marginTop: 2 }}>{ this.state.l_nameError }</Text>

                                <Item style={{
                                    flexDirection: 'row',
                                    borderBottomWidth: 1,
                                    padding: 3
                                }}>
                                    <Picker
                                        selectedValue={this.state.country}
                                        style={{paddingBottom: 10, height: 40, width: 265}}
                                        onValueChange={(itemValue) => this.setState({country: itemValue})}
                                    >
                                        {this.state.countries.map(country => <Picker.Item key={country.id} label={country.name} value={country.id}/>)}
                                    </Picker>
                                </Item>

                                <Item style={{
                                    flexDirection: 'row',
                                    borderBottomWidth: 1,
                                    borderBottomColor: this.state.emailError === '' ? '#ddd' : '#ff0000' ,
                                    padding: 3
                                }}>
                                    <Input placeholder={'Email Address ...'} keyboardType='email-address' autoCapitalize='none' onChangeText={(email) => this.setState({email})} value={this.state.email}/>
                                </Item>
                                <Text style={{ color: '#ff0000', textAlign: 'center', marginTop: 2 }}>{ this.state.emailError }</Text>


                                <Item style={{
                                    flexDirection: 'row',
                                    borderBottomWidth: 1,
                                    borderBottomColor: this.state.phoneError === '' ? '#ddd' : '#ff0000' ,
                                    padding: 3
                                }}>
                                    <Input placeholder={'Phone Number ...'} keyboardType='phone-pad' autoCapitalize='none' onChangeText={(phone) => this.setState({phone})} value={this.state.phone}/>
                                </Item>
                                <Text style={{ color: '#ff0000', textAlign: 'center', marginTop: 2 }}>{ this.state.phoneError }</Text>


                                <Item style={{
                                    flexDirection: 'row',
                                    borderBottomWidth: 1,
                                    borderBottomColor: this.state.passwordError === '' ? '#ddd' : '#ff0000' ,
                                    padding: 3
                                }}>
                                    <Input secureTextEntry placeholder={'Password ...'} autoCapitalize='none' onChangeText={(password) => this.setState({password})} value={this.state.password}/>
                                </Item>
                                <Text style={{ color: '#ff0000', textAlign: 'center', marginTop: 2 }}>{ this.state.passwordError }</Text>

                                {this.renderLoading()}
                                <Text style={{ fontSize: 18, textAlign: 'center', marginTop: 15 }}>you already have account, <Text onPress={() => this.navigateToLogIn()} style={styles.logIn}>LogIn</Text></Text>
                            </View>
                            </Form>
                        </KeyboardAvoidingView>
                    </Background>
                </Content>
            </Container>
        );

    }
}

const styles = {
    logIn: {
        fontWeight: 'bold',
    }
};

export default SignUp;
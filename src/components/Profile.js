import React, { Component } from 'react';
import {View, Text, Image, ListView, AsyncStorage, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import { Container, Header, Content, Button, Icon, Input, Body, Left, Item, Label, Picker } from 'native-base';
import axios from 'axios';
import { ImagePicker } from "expo";
import I18n from "../../local/i18n";
import Loader from './Loader';
import { Background, Spinner } from "../common";


class Profile extends Component{

    constructor(props){
        super(props);
        this.state = {
            image: null,
            name: '',
            nameError: '',
            phone: '',
            phoneError: '',
            base64: '',
            email: '',
            emailError: '',
            password: '',
            loading: true,
            countries: [],
            country: 0,
            loader: false
        };
    }

    static navigationOptions = () => ({
        drawerLabel: I18n.t('profile'),
        drawerIcon: ( <Icon style={{ fontSize: 24 }} type={'FontAwesome'} name={'user'}/> )
    });
    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64: true,
        });

        // console.log(result);

        if (!result.cancelled) {
            this.setState({ image: result.uri, base64: result.base64 });
        }
    };
    _scrollToInput (reactNode: any) {
        // Add a 'scroll' ref to your ScrollView
        this.scroll.scrollToFocusedInput(reactNode)
    }

    componentWillMount(){
        AsyncStorage.getItem('user_id')
            .then(user_id => axios.get('https://shams.arabsdesign.com/camy/api/userData/' + user_id)
                .then(response => this.setState({
                    image: response.data.user.avatar,
                    name: response.data.user.name,
                    phone: response.data.user.phone,
                    email: response.data.user.email,
                    country: response.data.user.country,
                    loading: false
                })));

        axios.get('https://shams.arabsdesign.com/camy/api/countries/' + I18n.locale)
            .then(response => this.setState({ countries: response.data.countries, country: response.data.countries[0].id }))
            .catch(error => console.log(error));
    }

    validate = () => {
        let isError = false;
        const errors = {
            emailError: "",
            nameError: "",
            phoneError: "",
        };

        if (this.state.name.length <= 0) {
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

    updatePrpofile(){
        const err = this.validate();
        if (!err) {
            this.setState({loader: true});
            AsyncStorage.getItem('user_id')
                .then((user_id) => {
                    console.log(user_id, this.state.country, this.state.name, this.state.email, this.state.phone, this.state.base64);
                    axios.post('https://shams.arabsdesign.com/camy/api/updateProfile',
                        {
                            user_id: user_id,
                            name: this.state.name,
                            phone: this.state.phone,
                            email: this.state.email,
                            country_id: this.state.country,
                            image: this.state.base64
                        })
                        .then(response => this.setState({
                                image: response.data.user.avatar,
                                name: response.data.user.name,
                                phone: response.data.user.phone,
                                email: response.data.user.email,
                                country: response.data.user.country,
                                loader: false
                            })
                        )
                })
        }
    }

    renderLoading(){
        if (this.state.loader){
            return(<Spinner />);
        }

        return (
            <Button block style={{ marginTop: 20 }} onPress={() => this.updatePrpofile()}>
                <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold' }}>{  I18n.t('update') }</Text>
            </Button>
        );
    }

    render(){
        let { image } = this.state;

        return(
            <Container>
                <Header style={{ height: 70, backgroundColor: '#fff', paddingTop: 15, borderBottomWidth:1, borderBottomColor: '#eee'}}>
                    <Left style={{ flex: 0 }}>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name='menu' style={{ color: '#000' }} />
                        </Button>
                    </Left>
                    <Body style={{ alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{ fontSize: 18, color: '#999', textAlign: 'center' }}>{  I18n.t('profile') }</Text>
                    </Body>
                </Header>
                <Content style={{ padding: 30 }}>
                    <Loader loading={this.state.loading} />
                    <KeyboardAvoidingView behavior="position">
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={this._pickImage} style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#ddd', borderRadius: 55, padding: 3, width: 110, height: 110 }}>
                                {image != null ? <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 55 }} /> : <Icon type={'Entypo'} name={'plus'}/> }
                            </TouchableOpacity>
                        </View>

                        <Item style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ddd', padding: 3 }}>
                            <Icon style={{ color: '#5e5e7c' }} name={'user'} type={'Feather'} />
                            <Input placeholder={I18n.t('username')} onChangeText={(name) => this.setState({ name }) } value={this.state.name} />
                        </Item>

                        <Item style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ddd', padding: 3 }}>
                            <Icon style={{ color: '#5e5e7c' }} name={'email-outline'} type={'MaterialCommunityIcons'} />
                            <Input placeholder={I18n.t('email')} onChangeText={(email) => this.setState({ email }) } value={this.state.email} />
                        </Item>

                        <Item style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ddd', padding: 3 }}>
                            <Icon style={{ color: '#5e5e7c' }} name={'smartphone'} type={'Feather'} />
                            <Input placeholder={I18n.t('phone')} onChangeText={(phone) => this.setState({ phone }) } value={this.state.phone} />
                        </Item>

                        <Item style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ddd', padding: 3 }}>
                            <Icon style={{ color: '#5e5e7c' }} name={'location-pin'} type={'Entypo'} />
                            {/*<Label style={{ marginRight: 10, marginLeft: 10 }}>Country</Label>*/}
                            <Picker
                                note
                                mode="dropdown"
                                style={{ color: '#7b7c8c', height: 30, margin: 5 }}
                                selectedValue={this.state.selected}
                                onValueChange={(value) => this.setState({ country: value })}
                                itemStyle={{ flex: 1, width: 100 }}
                                itemTextStyle={{ flex: 1, width: 100 ,textAlign: 'center' }}
                            >
                                {this.state.countries.map(country => <Picker.Item key={country.id} label={country.name} value={country.id}/>)}
                            </Picker>
                        </Item>

                        <Item style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ddd', padding: 3 }}>
                            <Icon style={{ color: '#5e5e7c' }} name={'lock'} type={'Feather'} />
                            <Input placeholder={I18n.t('password')} onChangeText={(password) => this.setState({ password }) } value={this.state.password} />
                        </Item>

                        { this.renderLoading() }
                    </KeyboardAvoidingView>
                </Content>
            </Container>
        );
    }
}

const styles= {
    buyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10,
    }
};

export default Profile;
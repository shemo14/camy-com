import React, { Component } from 'react';
import {View, Text, Image, TouchableOpacity, AsyncStorage} from 'react-native';
import { Content, Container, Icon, Left, Button, Body, Footer, FooterTab, Header, Input, Textarea, Toast } from 'native-base';
import { ImagePicker } from 'expo';
import DateTimePicker from 'react-native-modal-datetime-picker';
import I18n from "../../local/i18n";
import ImageBrowser from './ImageBrowser';
import axios from "axios/index";
import Expo from "expo";
import { Spinner } from "../common";


class MaintenanceRequest extends Component{
    constructor(props){
        super(props);
        this.state = {
            image: null,
            deviceName: '',
            desc: '',
            isDateTimePickerVisible: false,
            date: I18n.t('chooseDate'),
            imageBrowserOpen: false,
            photos: [],
            base64: '',
            main: this.props.navigation.state.params.main,
            showToast: false,
            loader: false
        };
    }

    imageBrowserCallback = (callback) => {
        callback.then((photos) => {
            console.log(photos)
            this.setState({
                imageBrowserOpen: false,
                photos
            })
        }).catch((e) => console.log(e))
    };

    renderImage(item, i) {
        return(
            <Image
                style={{height: 100, width: 100}}
                source={{uri: item.file}}
                key={i}
            />
        )
    }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked (date) {
        console.log(date);
        this.setState({ date: JSON.stringify(date) });
        this._hideDateTimePicker();
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64: true,
        });

        if (!result.cancelled) {
            this.setState({ image: result.uri, base64: result.base64 });
        }
    };

    async componentWillMount(){
        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
        });
    }

    saveRequest(){
        this.setState({loader: true});
        AsyncStorage.getItem('user_id')
            .then((user_id) => {
                axios.post('https://shams.arabsdesign.com/camy/api/mainRequest',
                    {
                        user_id: user_id,
                        name: this.state.deviceName,
                        info: this.state.desc,
                        date: this.state.date,
                        main_id: this.state.main.id,
                        image: this.state.base64
                    })
                    .then(response => {
                        console.log(response.data);
                        this.setState({ loader: false, deviceName: '', desc: '', date: I18n.t('chooseDate'), image: null });
                        Toast.show({
                            text: I18n.t('mainRequest'),
                            type: "success",
                            duration: 5000
                        });
                    })
            });
    }


    renderLoading(){
        if (this.state.loader){
            return(<Spinner />);
        }

        return (
            <Button onPress={() => this.saveRequest()} block style={{ marginTop: 20, backgroundColor: '#020f31' }}>
                <Text style={{ color: '#fff', fontSize: 17 }}>{ I18n.t('send') }</Text>
            </Button>
        );
    }

    render(){
        let { image } = this.state;

        return(
            <Container>
                <Header style={{ height: 70, backgroundColor: '#fff', paddingTop: 15, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
                    <Left style={{ flex: 0 }}>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name={ I18n.locale === 'ar' ? 'ios-arrow-forward' : 'ios-arrow-back' } type='Ionicons' style={{ color: '#000' }} />
                        </Button>
                    </Left>
                    <Body style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{fontSize: 18, color: '#999', textAlign: 'center'}}>{ I18n.t('maintenance') }</Text>
                    </Body>
                </Header>

                {/* --Content-- */}
                <Content style={{ padding: 20 }}>
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={(date) => this._handleDatePicked(date) }
                        onCancel={this._hideDateTimePicker}
                        mode={'datetime'}
                        locale={I18n.locale}
                        date={new Date()}
                        minimumDate={new Date()}
                    />
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={this._pickImage} style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#ddd', borderRadius: 55, padding: 3, width: 110, height: 110 }}>
                            {image != null ? <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 55 }} /> : <Icon type={'Entypo'} name={'plus'}/> }
                        </TouchableOpacity>
                    </View>

                    <Input onChangeText={(deviceName) => this.setState({ deviceName }) } placeholder={ I18n.t('deviceName') + '...'} value={this.state.deviceName} style={{ borderRadius: 5, backgroundColor: '#f9f9f9', marginTop: 5 }}/>
                    <Textarea onChangeText={(desc) => this.setState({ desc }) } rowSpan={5} placeholder={ I18n.t('info') + '...'} style={{ borderRadius: 5, backgroundColor: '#f9f9f9', marginTop: 5 }}/>
                    <TouchableOpacity onPress={this._showDateTimePicker}>
                        <Text style={{ borderRadius: 5, backgroundColor: '#f9f9f9', marginTop: 5, height: 45, padding: 10 }}>{ this.state.date }</Text>
                    </TouchableOpacity>

                    { this.renderLoading() }
                </Content>

                {/* --footer-- */}
                <Footer style={{backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee'}}>
                    <FooterTab style={{backgroundColor: '#fff'}}>
                        <Button>
                            <Image style={{width: 27, height: 27}} source={require('../../assets/images/dmaint1.png')}/>
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate('offerBanars')}>
                            <Image style={{width: 27, height: 27}} source={require('../../assets/images/dsales.png')}/>
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate('cart')}>
                            <Image style={{width: 27, height: 32}} source={require('../../assets/images/dcart.png')}/>
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate('search')}>
                            <Image style={{width: 27, height: 27}} source={require('../../assets/images/dsearch.png')}/>
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate('home')}>
                            <Image style={{width: 27, height: 27}} source={require('../../assets/images/dhome.png')}/>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const styles = {
    imageStyle: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
    }
};

export default MaintenanceRequest;
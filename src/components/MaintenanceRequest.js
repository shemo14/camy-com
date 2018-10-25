import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Content, Container, Icon, Left, Button, Body, Footer, FooterTab, Label, Item, Header, Input, Textarea } from 'native-base';
import { ImagePicker } from 'expo';
import DateTimePicker from 'react-native-modal-datetime-picker';
import I18n from "../../local/i18n";



class MaintenanceRequest extends Component{
    constructor(props){
        super(props);
        this.state = {
            image: null,
            deviceName: '',
            desc: '',
            isDateTimePickerVisible: false,
            date: [I18n.t('dateTime')]
        };
    }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        this.setState({ date: date });
        // console.log(this.state.date);
        this._hideDateTimePicker();
    };

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };

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
                        onConfirm={this._handleDatePicked}
                        onCancel={this._hideDateTimePicker}
                        mode={'datetime'}
                    />
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={this._pickImage} style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#ddd', borderRadius: 55, padding: 3, width: 110, height: 110 }}>
                            {image != null ? <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 55 }} /> : <Icon type={'Entypo'} name={'plus'}/> }
                        </TouchableOpacity>
                    </View>

                    <Input autoCapitalize='none' secureTextEntry onChangeText={(deviceName) => this.setState({ deviceName }) } placeholder={ I18n.t('deviceName') + '...'} value={this.state.deviceName} style={{ borderRadius: 5, backgroundColor: '#f9f9f9', marginTop: 5 }}/>
                    <Textarea onChangeText={(desc) => this.setState({ desc }) } rowSpan={5} placeholder={ I18n.t('info') + '...'} style={{ borderRadius: 5, backgroundColor: '#f9f9f9', marginTop: 5 }}/>
                    <TouchableOpacity onPress={this._showDateTimePicker}>
                        <Text style={{ borderRadius: 5, backgroundColor: '#f9f9f9', marginTop: 5, height: 45, padding: 10 }}></Text>
                    </TouchableOpacity>
                    <Button block style={{ marginTop: 20 }}>
                        <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold' }}>{ I18n.t('save') }</Text>
                    </Button>
                </Content>


                {/* --footer-- */}
                <Footer style={{backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee'}}>
                    <FooterTab style={{backgroundColor: '#fff'}}>
                        <Button>
                            <Image style={{width: 27, height: 27}} source={require('../../assets/images/dmaint.png')}/>
                        </Button>
                        <Button>
                            <Image style={{width: 27, height: 27}} source={require('../../assets/images/dsales.png')}/>
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate('cart')}>
                            <Image style={{width: 27, height: 32}} source={require('../../assets/images/dcart.png')}/>
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate('search')}>
                            <Image style={{width: 27, height: 27}} source={require('../../assets/images/dsearch.png')}/>
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate('home')}>
                            <Image style={{width: 27, height: 27}} source={require('../../assets/images/dhome1.png')}/>
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
import React, { Component } from 'react';
import {View, Text, Image } from 'react-native';
import { Container, Content, Button } from 'native-base';
import I18n from '../../local/i18n';


class Thanks extends Component{
    constructor(props){
        super(props);
        this.state={
            orderId: this.props.navigation.state.params.orderId,
            date: this.props.navigation.state.params.date,
        }
    }

    renderImage(){
        if(I18n.locale === 'en'){
            return <Image source={require('../../assets/images/thank_en.png')} resizeMode={Image.resizeMode.center} style={{ width: 400, height: 400 }}/>
        }else{
            return <Image source={require('../../assets/images/thank.png')} resizeMode={Image.resizeMode.center} style={{ width: 400, height: 400 }}/>
        }
    }

    renderDelivedDate(){
        if (this.state.date !== ''){
            return(
                <View>
                    <Text style={{ color: '#6cc66a', fontSize: 20, textAlign: 'center' }}>{ I18n.t('confirmDelivery') }</Text>
                    <Text style={{ textAlign: 'center', color: '#787878', fontSize: 20, marginBottom: 10 }}>{ this.state.date }</Text>
                </View>
            );
        }
    }

    render(){
        return(
            <Container>
                <Content>
                    <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ marginTop: 60 }}>
                            <Text style={{ fontSize: 30, color: '#61b554', textAlign: 'center', fontWeight: 'bold' }}>{ I18n.t('thanks') }</Text>
                            <Text style={{ textAlign: 'center', color: '#787878', fontSize: 20, marginBottom: 10 }}>{ I18n.t('forYouOrder') }</Text>
                            <Text style={{ textAlign: 'center', color: '#777777' }}>{ I18n.t('orderNum') } <Text style={{ fontWeight: 'bold' }}>#{ this.state.orderId }</Text></Text>
                        </View>
                        <View>
                            { this.renderImage() }
                        </View>
                        { this.renderDelivedDate() }
                    </View>
                </Content>
                <View style={{ justifyContent: 'flex-end'}}>
                    <Button full style={{ backgroundColor: '#017cca', height: 60 }} onPress={() => this.props.navigation.navigate('home')}>
                        <Text style={{ color: '#fff', fontSize: 18 }}>{ I18n.t('goToHome') }</Text>
                    </Button>
                </View>
            </Container>
        );
    }
}


export default Thanks;
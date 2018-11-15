import React, { Component } from 'react';
import {View, Text, Image, ListView, AsyncStorage, I18nManager} from 'react-native';
import { Container, Header, Content, Button, Icon, ListItem, Radio, Right, Body, Left, Footer, Input } from 'native-base';
import I18n from '../../local/i18n';
import axios from 'axios';

class Payment extends Component{
    constructor(props){
        super(props);
        this.state={
            orderId: this.props.navigation.state.params.orderId,
            total: this.props.navigation.state.params.total,
        }
    }

    confirmOrder(){
        axios.post('https://shams.arabsdesign.com/camy/api/confirmOrder', { total: this.state.total, order_id: this.state.orderId} ).then(() => this.props.navigation.navigate('confirmPay', {orderId: this.state.orderId}))
             .catch(error => console.log(error));
    }

    render(){
        return(
            <Container>
                <Header style={{ height: 70, backgroundColor: '#fff', paddingTop: 15, borderBottomWidth:1, borderBottomColor: '#eee'}}>
                    <Left style={{ flex: 0 }}>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name={ I18n.locale === 'ar' ? 'ios-arrow-forward' : 'ios-arrow-back' } type='Ionicons' style={{ color: '#000' }} />
                        </Button>
                    </Left>
                    <Body style={{ alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{ fontSize: 18, color: '#999', textAlign: 'center' }}>{ I18n.t('payment') }</Text>
                    </Body>
                </Header>
                <Content style={{ flex: 3 }}>
                    <View style={{ padding: 30, backgroundColor: '#f8fcff', flex: 1 }}>
                        <Text style={{ fontSize: 17,fontWeight: 'bold' , color: '#606062', marginBottom: 10, textAlign: 'left', }}>{ I18n.t('promoCode') }</Text>
                        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10 }}>
                            <Input placeholder={'#1234'} placeholderStyle={{ color: '#9a9a9a' }} style={{ borderWidth: 1, borderColor: '#ddd', backgroundColor: '#fff', height: 45, padding: 5, textAlign: 'left', }}/>
                            <Button style={{ width: 100, backgroundColor: '#337ccb', justifyContent: 'center' }}>
                                <Text style={{ color: '#fff', textAlign: 'center', fontSize: 17 }}>{ I18n.t('apply') }</Text>
                            </Button>
                        </View>
                    </View>
                    <View style={{ flex: 2 }}>
                        <ListItem>
                            <Left>
                                <Icon type={'FontAwesome'} name={'money'} style={{ color: '#b7b7b7', fontSize: 30, width: 40 }}/>
                                <Text style={{ color: '#5b5b5b', marginTop: 2, fontSize: 16, marginLeft: 4, marginRight: 4 }}>{ I18n.t('cashDelivery') }</Text>
                            </Left>
                            <Right>
                                <Radio selected={true} />
                            </Right>
                        </ListItem>
                        <ListItem>
                            <Left>
                                <Icon type={'FontAwesome'} name={'credit-card-alt'} style={{ color: '#b7b7b7', fontSize: 27, width: 45 }}/>
                                <Text style={{ color: '#5b5b5b', marginTop: 2, fontSize: 16, marginLeft: 4, marginRight: 4 }}>{ I18n.t('creditCard') }</Text>
                            </Left>
                            <Right>
                                <Radio selected={false} />
                            </Right>
                        </ListItem>
                    </View>
                </Content>
                <View style={{ flex: 0.5, justifyContent: 'flex-end' }}>
                    <View style={{ flexDirection: 'row', marginBottom: 5, padding: 15 }}>
                        <Text style={{ color: '#5b5b5b', flex: 1,alignItems: 'flex-start', fontSize: 20, textAlign: 'left', }}>{ I18n.t('totalAmount') } : </Text>
                        <Text style={{ color: '#337ccb', flex: 1,alignItems: 'flex-end', fontSize: 20, textAlign: 'right' }}>{ this.state.total } { I18n.t('sar') }</Text>
                    </View>
                    <View>
                        <Button full success onPress={() => this.confirmOrder()}>
                            <Text style={{ color: '#fff', fontSize: 16 }}>{ I18n.t('continue') }</Text>
                        </Button>
                    </View>
                </View>
            </Container>
        );
    }
}

export default Payment;
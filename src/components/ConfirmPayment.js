import React, { Component } from 'react';
import {View, Text, Image, ScrollView, AsyncStorage, TouchableOpacity, I18nManager} from 'react-native';
import { Container, Header, Content, Button, Icon, Body, Left } from 'native-base';
import axios from 'axios';
import I18n from "../../local/i18n";

class ConfirmPayment extends Component{
    constructor(props){
        super(props);
        this.state={
            country: '',
            country_id: '',
            city: '',
            address: '',
            date: '',
            location_id: '',
            more_address: '',
            orderProducts: [],
            orderPrice: 0,
            chappingPrice: 0,
            total: 0,
            deliverDate: '',
            orderId: this.props.navigation.state.params.orderId,
        }
    }

    componentWillMount(){
        AsyncStorage.getItem('user_id').then(user_id =>
            axios.get('https://shams.arabsdesign.com/camy/api/OrderProducts/' + I18n.locale + '/' + user_id + '/' + this.state.orderId)
                 .then(response => {
                     this.setState({
                         orderProducts: response.data.data.products,
                         country: response.data.data.address.country,
                         country_id: response.data.data.address.country_id,
                         city: response.data.data.address.city,
                         address: response.data.data.address.address,
                         location_id: response.data.data.address.location_id,
                         more_address: response.data.data.address.more_address,
                         orderPrice: response.data.data.price.order_price,
                         chappingPrice: response.data.data.price.chapping,
                         total: response.data.data.price.total,
                         date: response.data.data.date,
                     })
                 })
        )
    }

    confirmOrderBill(){
        console.log(this.state.date);
        this.setState({ loading: true });
        AsyncStorage.getItem('user_id').then(user_id =>
            axios.post('https://shams.arabsdesign.com/camy/api/makeOrderBill', {
                order_id: this.state.orderId,
                user_id: user_id,
                country_id: this.state.country_id,
                location_id: this.state.location_id,
            }).then(response => {
                    this.setState({ loading: false });
                    this.props.navigation.navigate('thanks', { orderId: this.state.orderId, date: this.state.date })
              })
        )
    }

    render(){
        return(
            <Container>
                <Header style={styles.headerStyle}>
                    <Left style={{ flex: 0 }}>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name={ I18n.locale === 'ar' ? 'ios-arrow-forward' : 'ios-arrow-back' } type='Ionicons' style={{ color: '#000' }} />
                        </Button>
                    </Left>
                    <Body style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{fontSize: 18, color: '#999', textAlign: 'center'}}>{ I18n.t('orderSummary') }</Text>
                    </Body>
                </Header>
                <Content style={{flex: 3}}>
                    <ScrollView>
                        <View style={styles.shippingContainer}>
                            <Text style={styles.shipping}>{ I18n.t('shippingTO') }</Text>
                            <Text style={styles.addressStyle}>{ this.state.country } , { this.state.city }</Text>
                            <Text style={styles.addressStyle}>{ this.state.address !== '' ? this.state.address + ',' : '' } </Text>
                            <Text style={styles.addressStyle}>{ this.state.more_address }</Text>
                        </View>
                        <View style={{padding: 15}}>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1 }}>
                                <Text style={styles.orderStyleTitle}>{ I18n.t('yourOrder') }</Text>
                                <TouchableOpacity style={{ alignItems: 'flex-end', flex: 1 }} onPress={() => this.props.navigation.navigate('cart')}>
                                    <Text style={{ color: '#7eb6d6', fontSize: 17 }}>{I18n.t('edit')}</Text>
                                </TouchableOpacity>
                            </View>

                            {this.state.orderProducts.map(product => {
                                return (
                                    <View style={styles.orderContainer} key={product.id}>
                                        <View style={styles.imageContainer}>
                                            <Image resizeMode={Image.resizeMode.center}
                                                   source={{ uri: product.image }}
                                                   style={styles.imageStyle}/>
                                        </View>
                                        <View style={styles.descContainer}>
                                            <Text style={styles.productNameStyle}>{ product.name }</Text>
                                            <Text style={styles.priceStyle}>{ product.price } { I18n.t('sar') }</Text>
                                        </View>
                                        <View style={styles.qntyContainer}>
                                            <Text style={{ fontSize: 18, marginRight: 5, marginLeft: 5, borderWidth: 1, borderColor: '#ddd', borderRadius: 5, padding: 5 }}>{ product.qty }</Text>
                                        </View>
                                    </View>
                                );
                            })}
                        </View>
                    </ScrollView>
                </Content>
                <View style={{ justifyContent: 'flex-end', backgroundColor: '#f8fcff'}}>
                    <Text style={styles.paymentSummary}>{ I18n.t('paymentSummary') }</Text>
                    <View style={styles.OrderTotalStyle}>
                        <Text style={styles.title}>{ I18n.t('orderTotal') }</Text>
                        <Text style={styles.price}>{ this.state.orderPrice } { I18n.t('sar') }</Text>
                    </View>
                    <View style={styles.OrderTotalStyle}>
                        <Text style={styles.title}>{ I18n.t('DeliveryCharge') }</Text>
                        <Text style={styles.price}>{ this.state.chappingPrice } { I18n.t('sar') }</Text>
                    </View>
                    <View style={styles.OrderTotalStyle}>
                        <Text style={styles.title}>{ I18n.t('totalAmount') }</Text>
                        <Text style={styles.price}>{ this.state.total } { I18n.t('sar') }</Text>
                    </View>
                    <View>
                        <Button full success onPress={() => this.confirmOrderBill()}>
                            <Text style={{color: '#fff', fontSize: 16}}>{ I18n.t('confirm') }</Text>
                        </Button>
                    </View>
                </View>
            </Container>
        );
    }
}

const styles = {
    headerStyle: {
        height: 70,
        backgroundColor: '#fff',
        paddingTop: 15,
        borderBottomWidth:1,
        borderBottomColor: '#eee'
    },
    shipping: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#606062',
        marginBottom: 7,
        textAlign: 'left',
    },
    paymentSummary: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#606062',
        margin: 10,
        textAlign: 'left',
    },
    shippingContainer: {
        padding: 15,
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    addressStyle: {
        color: '#c5c5c4',
        fontSize: 15,
        textAlign: 'left',
    },
    orderStyleTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#606062',
        marginBottom: 10,
        flex: 1,
        alignSelf: 'flex-start',
        textAlign: 'left',
    },
    orderContainer: {
        flexDirection: 'row',
        marginBottom: 10
    },
    imageContainer: {
        alignItems: 'flex-start',
        flex: 1
    },
    imageStyle:{
        width: 100,
        height: 100,
        borderWidth: 1,
        borderColor:'#ececed'
    },
    descContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    productNameStyle: {
        color: '#afafaf',
        textAlign: 'center'
    },
    priceStyle: {
        color: '#737585',
        fontWeight: '600',
        textAlign: 'center'
    },
    qntyContainer:{
        alignItems: 'flex-end',
        justifyContent: 'center',
        flex: 0.5,

    },
    OrderTotalStyle: {
        flexDirection: 'row',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        textAlign: 'left',
    },
    price: {
        color: '#337ccb',
        flex: 1,
        alignItems: 'flex-end',
        fontSize: 16,
        textAlign: 'right'
    },
    title: {
        color: '#5b5b5b',
        flex: 1,
        alignItems: 'flex-start',
        fontSize: 16,
        textAlign: 'left',
    }

};

export default ConfirmPayment;
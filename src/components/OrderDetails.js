import React, { Component } from 'react';
import {View, Text, Image, ScrollView, AsyncStorage} from 'react-native';
import { Container, Header, Content, Button, Icon, ListItem, CheckBox, Right, Body, Left, Footer, Input } from 'native-base';
import CartListItem from './CartListItem';
import { Row, Grid } from "react-native-easy-grid";
import axios from 'axios';
import I18n from "../../local/i18n";
import Loader from './Loader';


class OrderDetails extends Component{
    constructor(props){
        super(props);
        this.state={
            checked: false,
            loading: true,
            products: [],
            status: 0,
            date: '',
            orderId: this.props.navigation.state.params.orderId,
        }
    }

    componentWillMount() {
        axios.get('https://shams.arabsdesign.com/camy/api/orderDetails/' + this.state.orderId + '/' + I18n.locale)
            .then(response => this.setState({
                products: response.data.products,
                status: response.data.status,
                date: response.data.date,
                loading: false
            }))
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
                    <Text style={{fontSize: 18, color: '#999', textAlign: 'center'}}>{ I18n.t('orderDetails') }</Text>
                    </Body>
                </Header>
                <Content style={{flex: 3, padding: 15}}>
                    <Loader loading={this.state.loading} />
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                        <Text style={{ fontSize: 20, color: '#737373', textAlign: 'center' }}>{ this.state.date }</Text>
                        <Text style={{ color: '#c4c4c3', marginTop: 2, fontSize: 16, textAlign: 'center' }}>{ I18n.t('orderNum') } #{ this.state.orderId }</Text>
                    </View>
                    <View style={styles.shippingContainer}>
                        <ListItem>
                            <Left>
                                <Text style={{ color: '#4e4e6d' }}>{ I18n.t('processingStatus') }</Text>
                            </Left>
                            <Right style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 0.5 }}>
                                <Text style={{ marginLeft: 2, marginRight: 2, color: '#a8dfba' }}>{ I18n.t('done') }</Text>
                                <CheckBox checked={true} color="blue"/>
                            </Right>
                        </ListItem>

                        <ListItem>
                            <Left>
                                <Text style={{ color: '#4e4e6d' }}>{ I18n.t('wayStatus') }</Text>
                            </Left>
                            <Right style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 0.5 }}>
                                <Text style={{ marginLeft: 2, marginRight: 2, color: '#a8dfba' }}>{ this.state.status === 1 || this.state.status === 2 ? I18n.t('done') : '-' }</Text>
                                <CheckBox checked={this.state.status === 1 || this.state.status === 2 ? true : false} color="blue"/>
                            </Right>
                        </ListItem>

                        <ListItem>
                            <Left>
                                <Text style={{ color: '#4e4e6d' }}>{ I18n.t('deliverdStatus') }</Text>
                            </Left>
                            <Right style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 0.5 }}>
                                <Text style={{ marginLeft: 2, marginRight: 2, color: '#a8dfba' }}>{ this.state.status === 2 ? I18n.t('done') : '-' }</Text>
                                <CheckBox checked={this.state.status === 2 ? true : false} color="blue"/>
                            </Right>
                        </ListItem>
                    </View>

                    {/*--order products--*/}
                    <View style={{padding: 15}}>
                        {this.state.products.map(product => {
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

                </Content>
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
        marginBottom: 7
    },
    paymentSummary: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#606062',
        margin: 10
    },
    shippingContainer: {
        padding: 15,
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    addressStyle: {
        color: '#c5c5c4',
        fontSize: 15
    },
    orderStyleTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#606062',
        marginBottom: 10
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
        borderColor: '#ddd'
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
        fontSize: 16
    }

};

export default OrderDetails;
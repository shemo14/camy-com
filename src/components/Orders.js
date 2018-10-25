import React, { Component } from 'react';
import {View, Text, Image, ListView, AsyncStorage, TouchableOpacity} from 'react-native';
import { Container, Header, Content, Button, Icon, ListItem, Body, Left, Right, Radio } from 'native-base';
import { Row, Grid } from "react-native-easy-grid";
import axios from 'axios';
import I18n from '../../local/i18n';
import Loader from './Loader';

class Orders extends Component{

    constructor(props){
        super(props);
        this.state ={
            orders: [],
            loading: true
        }
    }
    componentWillMount(){
        AsyncStorage.getItem('user_id').then((user_id) => {
            axios.get('https://shams.arabsdesign.com/camy/api/myOrders/' + user_id )
                .then(response => this.setState({ orders: response.data.data, loading: false }))
                .catch(error => console.log(error));
        });
    }
    orderStatus(status){
        if (status === 0){
            return <Text style={{ color: '#dbaa3a', marginRight: 2, marginLeft: 2 }}>{ I18n.t('underProcessing') }</Text>
        }else if(status === 1){
            return <Text style={{ color: '#dbaa3a', marginRight: 2, marginLeft: 2 }}>{ I18n.t('onWay') }</Text>
        }else{
            return <Text style={{ color: '#dbaa3a', marginRight: 2, marginLeft: 2 }}>{ I18n.t('delivered') }</Text>
        }
    }

    static navigationOptions = () => ({
        drawerLabel: I18n.t('myOrders'),
        drawerIcon: ( <Icon style={{ fontSize: 24 }} type={'MaterialCommunityIcons'} name={'more'}/> )
    });

    render(){
        return(
            <Container>
                <Header style={{ height: 70, backgroundColor: '#fff', paddingTop: 15, borderBottomWidth:1, borderBottomColor: '#eee'}}>
                    <Left style={{ flex: 0 }}>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name='menu' style={{ color: '#000' }} />
                        </Button>
                    </Left>
                    <Body style={{ alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{ fontSize: 18, color: '#999', textAlign: 'center' }}>{ I18n.t('myOrders') }</Text>
                    </Body>
                </Header>
                <Content>
                    <Loader loading={this.state.loading} />
                    {this.state.orders.map(order => {
                        return (
                            <ListItem key={order.id}>
                                <Left style={{ flexDirection: 'column' }}>
                                    <Text style={{ fontSize: 20, color: '#737373' }}>{ order.date }</Text>
                                    <Text style={{ color: '#c4c4c3', marginTop: 2, fontSize: 16 }}>{ I18n.t('orderNum') } #{ order.id }</Text>
                                </Left>
                                <Right>
                                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.props.navigation.navigate('orderDetails', {orderId: order.id})}>
                                         { this.orderStatus(order.status) }
                                        <Icon name={ I18n.locale === 'en' ? 'ios-arrow-forward' : 'ios-arrow-back' } type='Ionicons' />
                                    </TouchableOpacity>
                                </Right>
                            </ListItem>
                        )
                    })}
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

export default Orders;
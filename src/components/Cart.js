import React, { Component } from 'react';
import {View, Text, Image, ListView, AsyncStorage} from 'react-native';
import { Container, Header, Content, Button, Icon, List, Body, Left, CheckBox, DatePicker } from 'native-base';
import CartListItem from './CartListItem';
import { Row, Grid } from "react-native-easy-grid";
import axios from 'axios';
import I18n from '../../local/i18n';
import Loader from './Loader';

class Cart extends Component{

    constructor(props){
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            basic: true,
            total: 0,
            listViewData: [],
            checked: false,
            chosenDate: '',
            productCounter: [],
            liked: false,
            loading: true,
            installation: 0
        };

        this.setDate = this.setDate.bind(this);
    }

    static navigationOptions = () => ({
        drawerLabel: I18n.t('cart'),
        drawerIcon: ( <Icon style={{ fontSize: 24 }} type={'FontAwesome'} name={'shopping-cart'}/> )
    });

    setProductCounter (productCounter){
        this.setState({ productCounter: productCounter });
    }

    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }

    componentWillMount(){
        AsyncStorage.getItem('user_id').then((user_id) => {
            axios.get('https://shams.arabsdesign.com/camy/api/userCart/' + I18n.locale + '/' + user_id )
                .then(response => this.setState({ listViewData: response.data.products, total: response.data.total, loading: false, installation: response.data.installation }))
                .catch(error => console.log(error));
        });
    }

    deleteRow(secId, rowId, rowMap, productId) {
        rowMap[`${secId}${rowId}`].props.closeRow();
        const newData = [...this.state.listViewData];
        newData.splice(rowId, 1);
        this.setState({ listViewData: newData });

        AsyncStorage.getItem('user_id').then((user_id) => {
            axios.post('https://shams.arabsdesign.com/camy/api/deleteFromCard', { user_id: user_id, product_id: productId } )
                .then(response => console.log(response.data.msg))
                .catch(error => console.log(error));
        });
    }

    setOrder(){
        this.setState({ loading: true });
        AsyncStorage.getItem('user_id').then((user_id) => {
            axios.post('https://shams.arabsdesign.com/camy/api/makeOrder', { user_id: user_id, total: this.state.total, date: this.state.chosenDate } )
                .then(response => { this.props.navigation.navigate('payment', { orderId: response.data.order_id, total: response.data.total }); this.setState({ loading: false }) })
                .catch(error => console.log(error));
        });
    }

    renderList(ListData, isLiked){
        if (I18n.locale === 'en'){
            return (
                <List
                    style={{height: 400, borderWidth: 1, borderBottomColor: '#999'}}
                    rightOpenValue={-75}
                    dataSource={this.ds.cloneWithRows(ListData)}
                    renderRow={data => <CartListItem setProductCounter={this.setProductCounter.bind(this)}
                                                     data={data}/>}

                    renderRightHiddenRow={(data) =>
                        <Button full success onPress={_ => this.props.navigation.navigate('product', { productDetails: data ,isLiked: isLiked, liked: this.state.isLiked })}>
                            <Icon active type={'Feather'} name={'info'}/>
                        </Button>}

                    renderLeftHiddenRow={(data, secId, rowId, rowMap) =>
                        <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap, data.id)}>
                            <Icon active name="trash"/>
                        </Button>}
                />

            );
        }

        return (
            <List
                style={{height: 400, borderWidth: 1, borderBottomColor: '#999'}}
                leftOpenValue={75}
                rightOpenValue={-75}
                dataSource={this.ds.cloneWithRows(ListData)}
                renderRow={data => <CartListItem setProductCounter={this.setProductCounter.bind(this)}
                                                 data={data}/>}

                renderLeftHiddenRow={(data) =>
                    <Button full success onPress={_ => this.props.navigation.navigate('product', { productDetails: data ,isLiked: isLiked, liked: this.state.isLiked })}>
                        <Icon active type={'Feather'} name={'info'}/>
                    </Button>}

                renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                    <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap, data.id)}>
                        <Icon active name="trash"/>
                    </Button>}
            />

        );
    }

    setInstallation(){
        if(this.state.checked){
            this.setState({ checked: false });
            this.setState({ total : this.state.total - this.state.installation });
        }else{
            this.setState({ checked: true });
            this.setState({ total : this.state.total + this.state.installation });
        }
    }

    render(){
        const isLiked = data => {
            this.setState({ isLiked: data });
            console.log(data, this.state.isLiked);
        };

        return(
            <Container>
                <Header style={{ height: 70, backgroundColor: '#fff', paddingTop: 15, borderBottomWidth:1, borderBottomColor: '#eee'}}>
                    <Left style={{ flex: 0 }}>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name='menu' style={{ color: '#000' }} />
                        </Button>
                    </Left>
                    <Body style={{ alignItems: 'center', justifyContent: 'center'}}>
                    <Image source={require('../../assets/images/upericon.png')} style={{ height: 35, width: 29 }}/>
                    </Body>
                </Header>
                <Content style={{ flex: 1 }}>
                    <Loader loading={this.state.loading} />
                    <Grid>
                        <Row size={75}>
                            { this.renderList(this.state.listViewData, isLiked) }
                        </Row>
                        <Row size={25}>
                            <View style={styles.buyContainer}>
                                <View style={{ flex: 1, flexDirection: 'row', marginTop: 50, justifyContent: 'center', alignItems: 'center' }}>
                                    <Body>
                                        <Text style={{ color: '#000', fontWeight: '600' }}>{ I18n.t('addInstallation') } ({ this.state.installation } { I18n.t('sar') })</Text>
                                    </Body>
                                    <CheckBox style={{ borderRadius: 3, left: -85 }} checked={this.state.checked} onPress={() => this.setInstallation()} color="blue"/>
                                </View>
                                <DatePicker
                                    defaultDate={new Date(2018, 4, 4)}
                                    minimumDate={new Date(2018, 1, 1)}
                                    maximumDate={new Date(2018, 12, 31)}
                                    locale={"en"}
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={false}
                                    animationType={"fade"}
                                    androidMode={"default"}
                                    placeHolderText={I18n.t('selectDeliverDate') + " ..."}
                                    textStyle={{ color: "green" }}
                                    placeHolderTextStyle={{ color: "#d3d3d3" }}
                                    onDateChange={this.setDate}
                                />
                                <Button disabled={ this.state.listViewData.length > 0 ? false : true } onPress={() => this.setOrder()} style={{ alignSelf: 'center', marginTop: 10, width: 130, flex: 1, justifyContent: 'center', alignItems: 'center' }} light rounded>
                                    <Text style={{ textAlign: 'center' }}> { I18n.t('buy') } : { this.state.total } { I18n.t('sar') }</Text>
                                </Button>
                            </View>
                        </Row>
                    </Grid>
                </Content>
            </Container>
        );
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
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

export default Cart;
import React, { Component } from 'react';
import {View, Text, Image, ListView, AsyncStorage, RefreshControl } from 'react-native';
import {Container, Header, Content, Button, Icon, List, Body, Left, CheckBox, DatePicker, Toast, Footer, FooterTab} from 'native-base';
import CartListItem from './CartListItem';
import { Row, Grid } from "react-native-easy-grid";
import axios from 'axios';
import I18n from '../../local/i18n';
import Loader from './Loader';
import {Like} from "../actions";
import {connect} from "react-redux";
import Expo from "expo";

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
            installation: 0,
            refreshing: false
        };

        this.setDate = this.setDate.bind(this);
    }

    static navigationOptions = () => ({
        drawerLabel: I18n.t('cart'),
        drawerIcon: ( <Icon style={{ fontSize: 24 }} type={'FontAwesome'} name={'shopping-cart'}/> )
    });


    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }

    renderCartList(product_id, type, checked, install, product_price) {
        this.setState({loading: true});
        if (type === 'inc'){
            if (this.props.auth_user === null){
                console.log('inc');
                axios.post('https://shams.arabsdesign.com/camy/api/setInLocalStorage', {
                    product_id: product_id,
                    type: 'cart',
                    lang: I18n.locale,
                    token: Expo.Constants.deviceId,
                    qty: 1
                })
                    .then(response => {
                        const total = checked ? this.state.total + install + product_price : this.state.total + product_price;
                        console.log(this.state.total, install, product_price, total, response.data.total );
                        this.setState({
                            loading: false,
                            total: response.data.total,
                            installation: response.data.installation,
                            listViewData: response.data.products,
                        });
                    })
            }else {
                AsyncStorage.getItem('user_id')
                    .then(user_id => axios.post('https://shams.arabsdesign.com/camy/api/setToCart', {
                        user_id: user_id,
                        product_id: product_id,
                        qty: 1,
                        lang: I18n.locale,
                    })
                        .then(response => {
                            const total = checked ? this.state.total + install + product_price : this.state.total + product_price;
                            console.log(this.state.total, install, product_price, total);
                            this.setState({
                                loading: false,
                                total: response.data.total,
                                installation: response.data.installation,
                                listViewData: response.data.products,
                            });
                        }))
            }
        }else{
            if (this.props.auth_user === null) {
                axios.post('https://shams.arabsdesign.com/camy/api/deleteProductFromLocalStorage', {
                    token: Expo.Constants.deviceId,
                    product_id: product_id,
                    type: 'cart',
                    lang: I18n.locale,
                })
                    .then(response => {
                        const total = checked ? this.state.total - (install + product_price) : this.state.total - product_price;
                        console.log(this.state.total, install, product_price, total);
                        this.setState({ total: response.data.total , installation: response.data.installation, loading: false, listViewData: response.data.products, });
                    })
                    .catch(error => console.log(error));
            } else {
                AsyncStorage.getItem('user_id').then((user_id) => {
                    axios.post('https://shams.arabsdesign.com/camy/api/deleteOneProductFromCard', { user_id: user_id, product_id: product_id, lang: I18n.locale, } )
                        .then(response => {
                            const total = checked ? this.state.total - (install + product_price) : this.state.total - product_price;
                            console.log(this.state.total, install, product_price, total);
                            this.setState({ total: response.data.total, installation: response.data.installation, loading: false, listViewData: response.data.products });
                        })
                        .catch(error => console.log(error));
                });
            }
        }
    }

    componentWillMount(){
        this.renderCartData();
    }

    renderCartData(){
        if (this.props.auth_user === null){
            console.log('this is componentWillMount');
            axios.get('https://shams.arabsdesign.com/camy/api/getLocalStorage/' + I18n.locale + '/' + Expo.Constants.deviceId + '/' + 'cart' )
                .then(response => {
                    this.setState({
                        listViewData: response.data.products,
                        total: response.data.total,
                        loading: false,
                        installation: response.data.installation
                    });
                })
                .catch(error => console.log(error));
        }else{
            AsyncStorage.getItem('user_id').then((user_id) => {
                axios.get('https://shams.arabsdesign.com/camy/api/userCart/' + I18n.locale + '/' + user_id )
                    .then(response => {
                        this.setState({
                            listViewData: response.data.products,
                            total: response.data.total,
                            loading: false,
                            installation: response.data.installation
                        });
                    })
                    .catch(error => console.log(error));
            });
        }
    }


    deleteRow(secId, rowId, rowMap, ProductData) {
        if (this.props.auth_user === null) {
            axios.post('https://shams.arabsdesign.com/camy/api/deleteFromLocalStorage', {
                token: Expo.Constants.deviceId,
                product_id: ProductData.id,
                type: 'cart',
                lang: I18n.locale,
            })
                .then((response) => {
                    this.setState({
                        loading: false,
                        total: ProductData.install === 1 ? this.state.total - (ProductData.installation + (ProductData.price*ProductData.count)) : this.state.total - (ProductData.price*ProductData.count),
                        installation: response.data.installation,
                        listViewData: response.data.products
                    });
                    rowMap[`${secId}${rowId}`].props.closeRow();
                    let data = this.state.listViewData;
                    data     = data.filter((item) => item.key !== productId);
                    this.setState({ listViewData: data });
                    this.forceUpdate();
                })
                .catch(error => console.log(error));
        } else {
            console.log('auth before delete', this.state.listViewData);
            AsyncStorage.getItem('user_id').then((user_id) => {
                axios.post('https://shams.arabsdesign.com/camy/api/deleteFromCard', { user_id: user_id, product_id: data.id } )
                    .then(response => {
                        this.setState({
                            loading: false,
                            total: ProductData.install === 1 ? this.state.total - (ProductData.installation + (ProductData.price*ProductData.count)) : this.state.total - (ProductData.price*ProductData.count),
                            installation: response.data.installation,
                            listViewData: response.data.products,
                            lang: I18n.locale,
                        });
                        rowMap[`${secId}${rowId}`].props.closeRow();
                        let data = this.state.listViewData;
                        data     = data.filter((item) => item.key !== productId);
                        this.setState({ listViewData: data });
                        this.forceUpdate();
                    })
                    .catch(error => console.log(error));
            });
        }
    }

    setOrder(){
        if (this.props.auth_user !== null) {
            this.setState({loading: true});
            AsyncStorage.getItem('user_id').then((user_id) => {
                axios.post('https://shams.arabsdesign.com/camy/api/makeOrder', {
                    user_id: user_id,
                    total: this.state.total,
                    date: this.state.chosenDate
                })
                    .then(response => {
                        this.props.navigation.navigate('payment', {
                            orderId: response.data.order_id,
                            total: response.data.total
                        });
                        this.setState({loading: false})
                    })
                    .catch(error => console.log(error));
            });
        }else{
            this.props.navigation.navigate('login');
        }
    }

    renderList(ListData, isLiked){
        if (I18n.locale === 'en'){
            return (
                <List
                    style={{height: 400, borderWidth: 1, borderBottomColor: '#999'}}
                    leftOpenValue={75}
                    rightOpenValue={-75}
                    dataSource={this.ds.cloneWithRows(ListData)}
                    renderRow={data => <CartListItem addInstall={(type, price) => this.addInstall(type, price, data.id)} setProductCounter={(product_id, type, checked, install, price) => this.renderCartList(product_id, type, checked, install, price)} data={data}/>}

                    renderRightHiddenRow={(data) =>
                        <Button full success onPress={_ => this.props.navigation.navigate('product', { productDetails: data ,isLiked: isLiked, liked: this.state.isLiked })}>
                            <Icon active type={'Feather'} name={'info'}/>
                        </Button>}

                    renderLeftHiddenRow={(data, secId, rowId, rowMap) =>
                        <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap, data)}>
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
                renderRow={data => <CartListItem addInstall={(type, price) => this.addInstall(type, price, data.id)} setProductCounter={(product_id, type, checked, install, price) => this.renderCartList(product_id, type, checked, install, price)} data={data}/>}

                renderRightHiddenRow={(data) =>
                    <Button full success onPress={_ => this.props.navigation.navigate('product', { productDetails: data ,isLiked: isLiked, liked: this.state.isLiked })}>
                        <Icon active type={'Feather'} name={'info'}/>
                    </Button>}

                renderLeftHiddenRow={(data, secId, rowId, rowMap) =>
                    <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap, data)}>
                        <Icon active name="trash"/>
                    </Button>}
            />

        );
    }

    addInstall(type, price, product_id){
        if (type === 'add')
            this.setState({ total: this.state.total + price });
        else
            this.setState({ total: this.state.total - price });


        this.setState({loading: true});
        AsyncStorage.getItem('user_id')
            .then(user_id => axios.post('https://shams.arabsdesign.com/camy/api/setInstallation', {
                user_id: this.props.auth_user === null ? null : user_id,
                product_id: product_id,
                token: Expo.Constants.deviceId,
                lang: I18n.locale,
                type: type
            })
                .then(response => {
                    this.setState({
                        loading: false,
                        installation: response.data.installation,
                        listViewData: response.data.products,
                    });
                }))
    }

    render(){
        const isLiked = data => {
            this.setState({ isLiked: data });
        };
        return(
            <Container>
                <Header style={{ height: 70, top: 4, backgroundColor: '#fff', paddingTop: 15, borderBottomWidth:1, borderBottomColor: '#eee'}}>
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
                                <DatePicker
                                    defaultDate={new Date()}
                                    minimumDate={new Date()}
                                    locale={I18n.locale}
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={false}
                                    animationType={"fade"}
                                    androidMode={"default"}
                                    placeHolderText={I18n.t('selectDeliverDate') + " ..."}
                                    textStyle={{ color: "green" }}
                                    placeHolderTextStyle={{ color: "#d3d3d3" }}
                                    onDateChange={this.setDate}
                                    mode={'dateTime'}
                                />
                                <Button disabled={ this.state.listViewData.length > 0 ? false : true } onPress={() => this.setOrder()} style={{ alignSelf: 'center', marginTop: 10, width: 200, flex: 1, justifyContent: 'center', alignItems: 'center' }} light rounded>
                                    <Text style={{ textAlign: 'center' }}> { I18n.t('buy') } : { this.state.total } { I18n.t('sar') }</Text>
                                </Button>
                            </View>
                        </Row>
                    </Grid>
                </Content>
                <Footer style={{ backgroundColor: '#fff', borderBottomWidth:1, borderBottomColor: '#eee' }}>
                    <FooterTab style={{ backgroundColor: '#fff' }}>
                        <Button onPress={() => this.props.navigation.navigate('maintenance')}>
                            <Image style={{ width:27, height: 27 }} source={require('../../assets/images/dmaint.png')} />
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate('offerBanars')}>
                            <Image style={{ width:27, height: 27 }} source={require('../../assets/images/dsales.png')} />
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate('cart') }>
                            <Image style={{ width:27, height: 32 }} source={require('../../assets/images/dcart1.png')} />
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate('search')}>
                            <Image style={{ width:27, height: 27 }} source={require('../../assets/images/dsearch.png')} />
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate('home')}>
                            <Image style={{ width:27, height: 27 }} source={require('../../assets/images/dhome.png')} />
                        </Button>
                    </FooterTab>
                </Footer>
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

const mapTOState = ({ like, auth }) => {
    return {
        user_id: like.user_id,
        product_id: like.product_id,
        isLiked: like.isLiked,
        auth_user: auth.user
    };
};

export default connect(mapTOState, { Like })( Cart );
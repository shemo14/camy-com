import React, { Component } from 'react';
import { Text, ListView, AsyncStorage, Image} from 'react-native';
import { Container, Header, Content, Button, Icon, List, Body, Left, FooterTab, Footer } from 'native-base';
import FavList from './FavList';
import Loader from './Loader';
import axios from 'axios';
import I18n from '../../local/i18n';
import {Like} from "../actions";
import {connect} from "react-redux";
import Expo from "expo";

class Favorites extends Component{

    constructor(props){
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            basic: true,
            listViewData: [],
            chosenDate: new Date(),
            loading: true,
        };

        this.setDate = this.setDate.bind(this);
    }

    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }

    static navigationOptions = () => ({
        drawerLabel: I18n.t('favorites'),
        drawerIcon: ( <Icon style={{ fontSize: 24 }} type={'FontAwesome'} name={'heart'}/> )
    });

    componentWillMount(){
        if(this.props.auth_user === null){
            axios.get('https://shams.arabsdesign.com/camy/api/getLocalFavs/' + Expo.Constants.deviceId + '/' + I18n.locale )
                .then(response => this.setState({ listViewData: response.data.products, loading: false }))
                .catch(error => console.log(error));
        }else{
            AsyncStorage.getItem('user_id').then((user_id) => {
                axios.get('https://shams.arabsdesign.com/camy/api/getFavs/' + user_id + '/' + I18n.locale )
                    .then(response => this.setState({ listViewData: response.data.products, loading: false }))
                    .catch(error => console.log(error));
            });
        }
    }

    deleteRow(secId, rowId, rowMap, productId) {
        rowMap[`${secId}${rowId}`].props.closeRow();
        const newData = [...this.state.listViewData];
        newData.splice(rowId, 1);
        this.setState({ listViewData: newData });

        if (this.props.auth_user === null) {
            axios.post('https://shams.arabsdesign.com/camy/api/deleteFromLocalStorage', {
                token: Expo.Constants.deviceId,
                product_id: productId,
                type: 'fav'
            })
                .then(response => console.log(response.data.msg))
                .catch(error => console.log(error));
        } else {
            AsyncStorage.getItem('user_id').then((user_id) => {
                axios.get('https://shams.arabsdesign.com/camy/api/deleteFav/' + user_id + '/' + productId)
                    .then(response => console.log(response.data.msg))
                    .catch(error => console.log(error));
            });
        }
    }

    addToCard(productId){
        this.setState({ loading: true });
        if (this.props.auth_user === null){
            axios.post('https://shams.arabsdesign.com/camy/api/setInLocalStorage', {
                product_id: productId,
                type: 'cart',
                token: Expo.Constants.deviceId,
                qty: 1
            })
                .then(() => {
                    this.setState({loading: false});
                    this.props.navigation.navigate('cart')
                })
        }else {
            AsyncStorage.getItem('user_id').then((user_id) => {
                axios.post('https://shams.arabsdesign.com/camy/api/setToCart', {
                    user_id: user_id,
                    product_id: productId,
                    qty: 1
                })
                    .then(response => {
                        this.setState({loading: false});
                        this.props.navigation.navigate('cart')
                    })
                    .catch(error => console.log(error));
            });
        }
    }

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
                        <Text style={{ fontSize: 18, color: '#999', textAlign: 'center' }}>{ I18n.t('favorites') }</Text>
                    </Body>
                </Header>
                <Content>
                    <Loader loading={this.state.loading} />
                    <List
                        leftOpenValue={75}
                        rightOpenValue={-75}
                        dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                        renderRow={data => <FavList data={data}/>}
                        renderLeftHiddenRow={data =>
                            <Button full success onPress={() => this.addToCard(data.id)}>
                                <Icon active type={'FontAwesome'} name={'shopping-cart'}/>
                            </Button>}
                        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                            <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap, data.id)}>
                                <Icon active name="trash"/>
                            </Button>}
                    />
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
                            <Image style={{ width:27, height: 32 }} source={require('../../assets/images/dcart.png')} />
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

export default connect(mapTOState, { Like })( Favorites );
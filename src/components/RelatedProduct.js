import React, { Component } from 'react';
import {Text, SafeAreaView, ScrollView, Image, View, AsyncStorage, TouchableOpacity } from 'react-native';
import { Content, Header, Container, Left, Button, Icon, Body, Right, Footer, FooterTab, Picker } from 'native-base';
import SubcategoryProducts from './SubcategoryProducts';
import {connect} from "react-redux";
import Modal from 'react-native-modal';
import axios from "axios/index";
import I18n from "../../local/i18n";


class RelatedProduct extends Component {
    constructor(props){
        super(props);
        this.state = {
            categoryId: this.props.navigation.state.params.categoryId,
            visibleModal: null,
            cartCounter: 0
        }
    }

    componentWillMount(){
        AsyncStorage.getItem('user_id')
            .then(user_id => axios.get('https://shams.arabsdesign.com/camy/api/cartCounter/' + user_id)
                .then(response => this.setState({ cartCounter: response.data.cartCounter })))
    }

    goBack(){
        this.props.navigation.goBack();
    }


    render(){
        return(
            <Container>
                <Header style={{ height: 70, backgroundColor: '#fff', paddingTop: 15, borderBottomWidth:1, borderBottomColor: '#eee'}}>
                    <Left>
                        <Button transparent onPress={() => this.goBack()}>
                            <Icon name={ I18n.locale === 'ar' ? 'ios-arrow-forward' : 'ios-arrow-back' } type='Ionicons' style={{ color: '#000' }} />
                        </Button>
                    </Left>
                    <Left>
                        <Button transparent style={{ marginLeft: -10 }} onPress={() => this.props.navigation.navigate('search')}>
                            <Icon name='search' type='Feather' style={{ color: '#000' }} />
                        </Button>
                    </Left>
                    <Body style={{ alignItems: 'center', justifyContent: 'center'}}>
                    <Image source={require('../../assets/images/upericon.png')} style={{ height: 35, width: 29 }}/>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.navigate('cart')}>
                            <Icon name='shopping-cart' type='Feather' style={{ color: '#000' }} />
                            <Text style={{ backgroundColor: '#69c24f', borderRadius: 50, paddingRight: 5, paddingLeft: 5 , color: '#fff', position:'relative', right: 12, bottom:9 }}>{ this.state.cartCounter }</Text>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <SubcategoryProducts categoryId={this.state.categoryId}/>
                </Content>
                <Footer style={{ backgroundColor: '#fff', borderBottomWidth:1, borderBottomColor: '#eee' }}>
                    <FooterTab style={{ backgroundColor: '#fff' }}>
                        <Button onPress={() => this.props.navigation.navigate('maintenance')}>
                            <Image style={{ width:27, height: 27 }} source={require('../../assets/images/dmaint.png')} />
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate('offerBanars')}>
                            <Image style={{ width:27, height: 27 }} source={require('../../assets/images/dsales.png')} />
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate('cart')}>
                            <Image style={{ width:27, height: 32 }} source={require('../../assets/images/dcart.png')} />
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate('search')}>
                            <Image style={{ width:27, height: 27 }} source={require('../../assets/images/dsearch.png')} />
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate('home')}>
                            <Image style={{ width:27, height: 27 }} source={require('../../assets/images/dhome1.png')} />
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const styles = {
    productDetails: {
        padding: 20,
    },
    productText: {
        marginBottom: 20
    },
    productName: {
        fontSize: 20
    },
    loveIcon: {
        color: '#c0c0bf',
        alignSelf: 'flex-start'
    },
    loveIconLiked: {
        color: '#d34b52',
        alignSelf: 'flex-start'
    },
    productPrice: {
        fontSize: 20,
        color: '#ecb6bd',
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid'
    },
    productDiscount: {
        fontSize: 30
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        height: 300,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    }
};

export default RelatedProduct;
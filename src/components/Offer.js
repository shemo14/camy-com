import React, { Component } from 'react';
import { View, Text, Image, AsyncStorage, FlatList } from 'react-native';
import {Content, Container, Icon, Left, Button, Body, Footer, FooterTab, Header, Toast} from 'native-base';
import axios from 'axios';
import I18n from '../../local/i18n';
import Loader from './Loader';
import HomeProduct from './HomeProduct';
import {connect} from "react-redux";

class Offer extends Component{
    constructor(props){
        super(props);
        this.state={
            loading: true,
            products: [],
            offerId: this.props.navigation.state.params.offerId
        }
    }

    componentWillMount(){
        AsyncStorage.getItem('user_id').then(user_id => {
            axios.get('https://shams.arabsdesign.com/camy/api/getOffer/' + I18n.locale + '/' + user_id + '/' + this.state.offerId + '/' + Expo.Constants.deviceId)
                .then(response => this.setState({ products: response.data.products, loading: false }))
                .catch(error => console.log(error));
        });
    }

    renderItem(product) {
        return (<HomeProduct navigation={this.props.navigation} liked={product.isLiked} key={product.index} data={product.item} />);
    }

    render(){
        return(
            <Container>
                <Header style={{
                    height: 70,
                    backgroundColor: '#fff',
                    paddingTop: 15,
                    borderBottomWidth: 1,
                    borderBottomColor: '#eee'
                }}>
                    <Left style={{ flex: 0 }}>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name={ I18n.locale === 'ar' ? 'ios-arrow-forward' : 'ios-arrow-back' } type='Ionicons' style={{ color: '#000' }} />
                        </Button>
                    </Left>
                    <Body style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 18, color: '#999', textAlign: 'center'}}>{ I18n.t('offers') }</Text>
                    </Body>
                </Header>
                <Content>
                    <Loader loading={this.state.loading} />
                    <View style={{ flex: 2, padding: 10 }}>
                        <FlatList
                            data={this.state.products}
                            renderItem={product => this.renderItem(product)}
                            numColumns={2}
                        />
                    </View>
                </Content>
                <Footer style={{backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee'}}>
                    <FooterTab style={{backgroundColor: '#fff'}}>
                        <Button onPress={() => this.props.navigation.navigate('maintenance')}>
                            <Image style={{width: 27, height: 27}} source={require('../../assets/images/dmaint.png')}/>
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate('offerBanars')}>
                            <Image style={{width: 27, height: 27}} source={require('../../assets/images/dsales1.png')}/>
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate('cart') }>
                            <Image style={{width: 27, height: 32}} source={require('../../assets/images/dcart.png')}/>
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate('search')}>
                            <Image style={{width: 27, height: 27}} source={require('../../assets/images/dsearch.png')}/>
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate('home')}>
                            <Image style={{width: 27, height: 27}} source={require('../../assets/images/dhome.png')}/>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const styles={
    imageStyle: {
        width: '100%',
        height: 150
    }
};

const mapStateToProps = ({ auth }) => {
    return {
        user: auth.user
    }
};

export default connect(mapStateToProps)(Offer);
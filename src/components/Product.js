import React, { Component } from 'react';
import {Text, SafeAreaView, ScrollView, Image, View, AsyncStorage, TouchableOpacity } from 'react-native';
import { Content, Header, Container, Left, Button, Icon, Body, Right, Footer, FooterTab, Picker } from 'native-base';
import Slider from './ProductSlider';
import ProductDetails from './ProductDetails';
import { Like } from '../actions'
import {connect} from "react-redux";
import Modal from 'react-native-modal';
import I18n from "../../local/i18n";
import axios from 'axios';


class Product extends Component {
    constructor(props){
        super(props);
        this.state = {
            productDetails: this.props.navigation.state.params.productDetails,
            selected: 1,
            isLiked: this.props.navigation.state.params.isLiked,
            liked: this.props.navigation.state.params.liked,
            dislikeIcon: 'heart-o',
            likeIcon: 'heart',
            visibleModal: null,
            cartCounter: 0
        };
    }

    _renderButton = (text, onPress) => (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text>{text}</Text>
            </View>
        </TouchableOpacity>
    );

    componentWillMount(){
        AsyncStorage.getItem('user_id')
                    .then(user_id => axios.get('https://shams.arabsdesign.com/camy/api/cartCounter/' + user_id)
                                          .then(response => this.setState({ cartCounter: response.data.cartCounter })))
    }

    onPressLike(product_id){
        if (this.state.liked){
            this.refs[product_id].setNativeProps({ style: {color: '#c0c0bf'}});
            AsyncStorage.getItem('user_id').then(user_id => this.props.Like({ product_id, user_id }));

            this.setState({ liked: false, likeIcon: 'heart-o', dislikeIcon: 'heart-o' });
        }else{
            this.refs[product_id].setNativeProps({ style: {color: '#d34b52'}});
            AsyncStorage.getItem('user_id').then(user_id => this.props.Like({ product_id, user_id }));

            this.setState({ liked: true, dislikeIcon: 'heart', likeIcon: 'heart' });
        }
    }

    renderLoveIcon(isLiked, ref_id) {
        if (isLiked) {
            return (
                <Icon ref={ref_id} style={styles.loveIconLiked} name={this.state.likeIcon} type={'FontAwesome'}/>
            );
        }

        return (
            <Icon ref={ref_id} style={styles.loveIcon} name={ this.state.dislikeIcon } type={'FontAwesome'}/>
        );
    }

    goBack(){
        this.props.navigation.navigate('home');
        this.props.navigation.state.params.isLiked(this.state.liked);
    }

    navigateToRelatedProducts(){
        this.setState({ visibleModal: null });
        this.props.navigation.navigate('relatedProduct', { categoryId: this.state.productDetails.category_id });
    }

    setToCart(qty){
        this.setState({ loading: true });
        AsyncStorage.getItem('user_id')
                    .then(user_id => axios.post('https://shams.arabsdesign.com/camy/api/setToCart', {user_id: user_id, product_id: this.state.productDetails.id, qty: qty})
                                          .then(response => this.setState({ cartCounter: response.data.cartCounter, loading: false, visibleModal: 1 })))
    }

    render(){
        return(
            <Container>
                <Header style={{ height: 70, backgroundColor: '#fff', paddingTop: 20, borderBottomWidth:1, borderBottomColor: '#eee'}}>
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
                        <TouchableOpacity transparent style={{ marginRight: -10, marginBottom: 10 }} onPress={() => this.onPressLike( this.state.productDetails.id )}>
                            { this.renderLoveIcon(this.state.liked, this.state.productDetails.id ) }
                        </TouchableOpacity>

                        <Button transparent onPress={() => this.props.navigation.navigate('cart')}>
                            <Icon name='shopping-cart' type='Feather' style={{ color: '#000' }} />
                            <Text style={{ backgroundColor: '#69c24f', borderRadius: 50, paddingRight: 5, paddingLeft: 5 , color: '#fff', position:'relative', right: 12, bottom:9 }}>{ this.state.cartCounter }</Text>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
                        <ScrollView style={{ flex: 0.8 }}>
                            <Slider productId={this.state.productDetails.id}/>
                            <ProductDetails productId={this.state.productDetails.id}/>
                        </ScrollView>
                    </SafeAreaView>

                    <Modal isVisible={this.state.visibleModal === 1}>
                        <View style={styles.modalContent}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                                <Icon name={'info'} type={'SimpleLineIcons'} style={{ fontSize: 70, color: '#999' }}/>
                                <Text style={{ textAlign: 'center', fontSize: 17, marginTop: 10, color: '#999' }}>{this.state.productDetails.name} { I18n.t('needRelatedDevice') }</Text>
                                <Text styl={{ fontWeight: 'bold' }}>{ I18n.t('doYouWant') }</Text>
                            </View>
                            <View style={{ marginTop: 20, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Button success style={{ padding: 5, alignSelf: 'center', width: 60, justifyContent: 'center', height: 35 }} onPress={() => this.navigateToRelatedProducts()}>
                                    <Text style={{ color: '#fff' }}>{ I18n.t('select') }</Text>
                                </Button>

                                <Button style={{ padding: 5, alignSelf: 'center', width: 60, justifyContent: 'center', height: 35, marginTop: 10 }} bordered onPress={() => this.setState({ visibleModal: null })}>
                                    <Text>{ I18n.t('Skip') }</Text>
                                </Button>
                            </View>
                        </View>
                    </Modal>
                </Content>
                <Footer>
                    <FooterTab style={{ backgroundColor: '#fff', flex: 1 }}>
                        <View style={{ flex: 1, backgroundColor: '#259239', height: 60, flexDirection: 'row', flexWrap: 'wrap', paddingRight: 7, paddingLeft: 7 }}>
                            <Text style={{ color : '#fff', flex:1, marginTop:17, textAlign: 'center', fontSize:17 }}>{ I18n.t('Qty') } :</Text>
                            <Picker
                                note
                                mode="dropdown"
                                style={{ flex: 3, color: '#fff', backgroundColor: '#259239', height: 60 }}
                                selectedValue={this.state.selected}
                                onValueChange={(value) => this.setState({ selected: value })}
                                itemStyle={{ flex: 1, width: 100 }}
                                itemTextStyle={{ flex: 1, width: 100 ,textAlign: 'center' }}
                            >
                                <Picker.Item label="1" value="1" />
                                <Picker.Item label="2" value="2" />
                                <Picker.Item label="3" value="3" />
                                <Picker.Item label="4" value="4" />
                                <Picker.Item label="5" value="5" />
                            </Picker>
                        </View>
                        <Button title={'Add To Card'} onPress={() => this.setToCart(this.state.selected) } style={{ flex: 2, backgroundColor: '#35c44e' }}>
                            <Text style={{ color: '#fff' }}>{ I18n.t('addToCard') }</Text>
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

const mapTOState = state => {
    return {
        user_id: state.like.user_id,
        product_id: state.like.product_id,
        isLiked: state.like.isLiked,
    };
};

export default connect(mapTOState, { Like })( Product );
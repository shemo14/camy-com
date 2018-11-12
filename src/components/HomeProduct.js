import React, { Component } from 'react';
import {View, Share, Text, ImageBackground, TouchableOpacity, AsyncStorage, Image} from 'react-native';
import { Icon, Card, CardItem, Button, Toast } from 'native-base';
import { connect }  from 'react-redux';
import { Like } from '../actions';
import I18n from '../../local/i18n';
import axios from "axios/index";
import Loader from './Loader';


class HomeProduct extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLiked: this.props.liked,
            dislikeIcon: 'heart-o',
            likeIcon: 'heart',
            loading: false,
            showToast: false,
        };
        this.onPressLike = this.onPressLike.bind(this);
    }

    onPressLike(product_id) {
        if (this.state.isLiked) {
            this.refs[product_id].setNativeProps({style: {color: '#c0c0bf'}});
            AsyncStorage.getItem('user_id').then(user_id => this.props.Like({product_id, user_id}));

            this.setState({isLiked: false, likeIcon: 'heart-o', dislikeIcon: 'heart-o'});
        } else {
            this.refs[product_id].setNativeProps({style: {color: '#d34b52'}});
            AsyncStorage.getItem('user_id').then(user_id => this.props.Like({product_id, user_id}));

            this.setState({isLiked: true, dislikeIcon: 'heart', likeIcon: 'heart'});
        }


        console.log(this.state.isLiked);
    }

    renderLoveIcon(isLiked, ref_id) {
        if (isLiked) {
            return (
                <Icon ref={ref_id} style={{ color: '#d34b52',alignSelf: 'flex-start' }} name={this.state.likeIcon} type={'FontAwesome'}/>
            );
        }

        return (
            <Icon ref={ref_id} style={offerStyles.loveIcon} name={ this.state.dislikeIcon } type={'FontAwesome'}/>
        );
    }

    onShare (data){
        Share.share({
            title: data.name,
            url: 'https://shams.arabsdesign.com/camy/product/' + data.id,
            message: data.desc
        }, {
            dialogTitle: 'share this product',
            excludedActivityTypes: [
                'com.apple.UIKit.activity.PostToTwitter'
            ]
        })
    };

    buyNow() {
        if (this.props.auth_user !== null) {
            this.setState({loading: true});
            AsyncStorage.getItem('user_id')
                .then(user_id => axios.get('https://shams.arabsdesign.com/camy/api/buyNow/' + user_id + '/' + this.props.data.id)
                    .then(response => {
                        this.setState({loading: false});
                        this.props.navigation.navigate('payment', {
                            orderId: response.data.order_id,
                            total: this.props.data.price
                        })
                    }));

            }else{
                Toast.show({
                    text: I18n.t('plzLogin'),
                    type: "danger",
                    duration: 5000
                });
            }

    }

    addToCart() {
        this.setState({loading: true});
        AsyncStorage.getItem('user_id')
            .then(user_id => axios.post('https://shams.arabsdesign.com/camy/api/setToCart', {
                user_id: user_id,
                product_id: this.props.data.id,
                qty: 1
            })
                .then(response => {
                    this.setState({loading: false});
                    this.props.navigation.navigate('cart')
                }));

    }

    render(){
        const isLiked = data => {
            this.setState({ isLiked: data });
            console.log(data, this.state.isLiked);
        };


        return(
            <Card style={products.productCard}>
                <Loader loading={this.state.loading} />
                <CardItem cardBody style={products.imageBkg}>
                    <TouchableOpacity style={{ top: -12 }} onPress={() => this.props.navigation.navigate('product', { productDetails: this.props.data ,isLiked: isLiked, liked: this.state.isLiked })} >
                        <Image style={products.productImage} resizeMode={Image.resizeMode.stretch}
                                         source={{ uri: this.props.data.image }}/>
                    </TouchableOpacity>
                </CardItem>
                <CardItem style={products.iconCard}>
                    <View style={products.iconContainer}>
                        <TouchableOpacity style={offerStyles.touchableLoveIcon} onPress={() => this.onPressLike( this.props.data.id )}>
                            { this.renderLoveIcon(this.props.data.isLiked, this.props.data.id) }
                        </TouchableOpacity>
                        <TouchableOpacity style={offerStyles.touchableShareIcon} onPress={() => this.onShare(this.props.data)}>
                            <Icon style={offerStyles.shareIcon} name={'share-2'} type={'Feather'}/>
                        </TouchableOpacity>
                    </View>
                </CardItem>
                <CardItem style={products.textContainer}>
                    <View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('product', { productDetails: this.props.data ,isLiked: isLiked, liked: this.state.isLiked })}>
                            <Text style={products.productNameStyle}>{this.props.data.name}</Text>
                        </TouchableOpacity>
                        <Text style={products.productPrice}>{ this.props.data.discount } { I18n.t('sar') }</Text>
                        <Text style={products.productDiscount}>{ this.props.data.price } { I18n.t('sar') }</Text>
                    </View>
                </CardItem>
                <CardItem>
                    <Button onPress={() => this.buyNow() } style={products.buyButton} success><Text style={products.buyText}> { I18n.t('buyNow') } </Text></Button>
                    <Button on onPress={() => this.addToCart()} bordered success style={products.cartButton}>
                        <Icon style={products.icon} name={'bag'} type={'SimpleLineIcons'}/>
                    </Button>
                </CardItem>
            </Card>
        );
    }
}

const offerStyles = {
    offerContainer: {
        padding: 10,
    },
    offerImage: {
        height: 115,
        width: 150,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    iconContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 5,
        marginTop: 5,
    },
    loveIcon: {
        color: '#c0c0bf',
        alignSelf: 'flex-start'
    },
    shareIcon: {
        color: '#c0c0bf',
        alignSelf: 'flex-end'
    },
    touchableLoveIcon: {
        flex : 1,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    touchableShareIcon: {
        flex : 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    offerImageContainer: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#e6e4e6',
        height: 160
    },
    offerText: {
        fontSize: 20,
        color: '#828391',
        marginBottom: 5,
    },
    productNameStyle: {
        color : '#a5a5a5'
    },
    productPrice: {
        color : '#40415c',
        fontWeight: 'bold',

    },
    productDiscount: {
        color : '#ce8285'
    },
    textContainer: {
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 5,
    },
    offersContainers: {
        margin: 5,
    },
    brandContainers: {
        margin: 5,
        borderColor: '#999',
        borderWidth: 1,
    }


};
const products = {
    productImage: {
        flex: 1,
        width: 150,
        height: 150,
        justifyContent: 'center',
        borderColor: '#999',
        borderBottomWidth: 1,
    },
    iconCard: {
        paddingBottom: 0,
        paddingTop: 0,
    },
    iconContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 2,
    },
    loveIcon: {
        alignItems: 'flex-start',
        color: '#c0c0bf',
        flex: 5
    },
    shareIcon: {
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#c0c0bf',
    },
    offerImageContainer: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#e6e4e6',
        height: 160
    },
    offerText: {
        fontSize: 20,
        color: '#828391',
        marginBottom: 5,
    },
    productNameStyle: {
        color: '#a5a5a5'
    },
    productPrice: {
        color: '#40415c',
        fontWeight: 'bold',

    },
    productDiscount: {
        color: '#ce8285',
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid'
    },
    textContainer: {
        paddingTop: 0,
        paddingBottom: 0,
    },
    offersContainers: {
        margin: 5,
    },
    buyText: {
        color: '#fff'
    },
    buyButton: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        marginRight: 2,
    },
    cartButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 20,
        padding: 0
    },
    icon: {
        color: '#cbcdd0',
        fontSize: 20,
        marginLeft: 0,
        marginRight: 0,
    },
    productCard: {
        width: 150,
        flex: 1,
        borderRadius: 10
    },
    imageBkg: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    contentStyle: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
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

export default connect(mapTOState, { Like })( HomeProduct );
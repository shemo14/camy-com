import React, { Component } from 'react';
import { View, Share, Text, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { Icon } from 'native-base';
import { connect }  from 'react-redux';
import { Like } from '../actions'
import I18n from '../../local/i18n';

class OfferDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLiked: this.props.liked,
            dislikeIcon: 'heart-o',
            likeIcon: 'heart'
        };
        this.onPressLike = this.onPressLike.bind(this);
    }

    onPressLike(product_id){
        if (this.state.isLiked){
            this.refs[product_id].setNativeProps({ style: {color: '#c0c0bf'}});
            AsyncStorage.getItem('user_id').then(user_id => this.props.Like({ product_id, user_id }));

            this.setState({ isLiked: false, likeIcon: 'heart-o', dislikeIcon: 'heart-o' });
        }else{
            this.refs[product_id].setNativeProps({ style: {color: '#d34b52'}});
            AsyncStorage.getItem('user_id').then(user_id => this.props.Like({ product_id, user_id }));

            this.setState({ isLiked: true, dislikeIcon: 'heart', likeIcon: 'heart' });
        }

        console.log(this.state.isLiked);
    }

    renderLoveIcon(isLiked, ref_id) {
        if (isLiked) {
            return (
                <Icon ref={ref_id} style={offerStyles.loveIconLiked} name={this.state.likeIcon} type={'FontAwesome'}/>
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

    render(){
        const isLiked = data => {
            this.setState({ isLiked: data });
            console.log(data, this.state.isLiked);
        };

        return(
            <View style={offerStyles.offersContainers}>
                <View style={offerStyles.offerImageContainer}>
                    <TouchableOpacity style={{ top: -12 }} onPress={() => this.props.navigation.navigate('product', { productDetails: this.props.data ,isLiked: isLiked, liked: this.state.isLiked })} >
                        <Image style={offerStyles.offerImage} resizeMode={Image.resizeMode.center}
                               source={{ uri: this.props.data.image }}/>
                    </TouchableOpacity>
                    <View style={offerStyles.iconContainer}>
                        <TouchableOpacity style={offerStyles.touchableLoveIcon} onPress={() => this.onPressLike( this.props.data.id )}>
                            { this.renderLoveIcon(this.props.data.isLiked, this.props.data.id) }
                        </TouchableOpacity>
                        <TouchableOpacity style={offerStyles.touchableShareIcon} onPress={() => this.onShare(this.props.data)}>
                            <Icon style={offerStyles.shareIcon} name={'share-2'} type={'Feather'}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={offerStyles.textContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('product', { productDetails: this.props.data ,isLiked: isLiked, liked: this.state.isLiked })}>
                        <Text style={offerStyles.productNameStyle}>{ this.props.data.name }</Text>
                    </TouchableOpacity>
                    <Text style={offerStyles.productPrice}>{ this.props.data.price } { I18n.t('sar') }</Text>
                    <Text style={offerStyles.productDiscount}>{ this.props.data.discount } { I18n.t('sar') }</Text>
                </View>
            </View>
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
    loveIconLiked: {
        color: '#d34b52',
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

const mapTOState = state => {
  return {
    user_id: state.like.user_id,
    product_id: state.like.product_id,
    isLiked: state.like.isLiked,
  };
};

export default connect(mapTOState, { Like })( OfferDetails );
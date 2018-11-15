import React, { Component } from 'react';
import {View, Share, Text, ScrollView, AsyncStorage, I18nManager} from 'react-native';
import OfferDetails from './OfferDetails';
import I18n from '../../local/i18n';
import axios from 'axios';
import Loader from './Loader';
import {connect} from "react-redux";



class HomeOffers extends Component{
    constructor(props){
        super(props);
        this.state = {
            offers : [],
            user_id: null,
            loading: true
        };
    }


    componentWillMount(){
        AsyncStorage.getItem('user_id').then((user_id) => {
            axios.get('https://shams.arabsdesign.com/camy/api/offers' + '/' + I18n.locale + '/' + user_id + '/' + Expo.Constants.deviceId)
                .then(response => this.setState({ offers: response.data.products, loading: false }))
                .catch(error => console.warn(error));
        });

        if (this.props.lang === 'ar') {
            I18nManager.forceRTL(true);
        } else if (this.props.lang === 'en') {
            I18nManager.forceRTL(false);
        }

        console.log('redux lang', this.props.lang);

        I18n.locale = this.props.lang;
    }

    renderOffers(){
        return this.state.offers.map(offer =>  <OfferDetails navigation={this.props.navigation} liked={offer.isLiked} key={offer.id} data={offer} />);
    }

    render(){
        return(
            <View style={offerStyles.offerContainer}>
                <Loader loading={this.state.loading} />
                <Text style={offerStyles.offerText}>{I18n.t('currentOffers')}</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    { this.renderOffers() }
                </ScrollView>
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
        textAlign: 'left'
    },
    productNameStyle: {
        color : '#a5a5a5',
        textAlign: 'left'
    },
    productPrice: {
        color : '#40415c',
        fontWeight: 'bold',
        textAlign: 'left'
    },
    productDiscount: {
        color : '#ce8285',
        textAlign: 'left'
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


const mapStateToProps = ({ auth, lang }) => {
    return {
        user: auth.user,
        lang: lang.locale
    }
};


export default connect(mapStateToProps)(HomeOffers);

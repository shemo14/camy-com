import React, { Component } from 'react';
import {View, Text, ScrollView, AsyncStorage, I18nManager} from 'react-native';
import HomeCategoryDetails from './HomeCategoryDetails';
import axios from 'axios';
import I18n from '../../local/i18n';

class CategoriesProducts extends Component{
    constructor(props){
        super(props);
        this.state = {
            categories : []
        };
    }

    componentWillMount(){
        AsyncStorage.getItem('user_id').then(user_id => {
            axios.get('https://shams.arabsdesign.com/camy/api/categoryProducts/' + I18n.locale + '/' + user_id + '/' + Expo.Constants.deviceId)
                .then(response => this.setState({ categories: response.data.data }))
                .catch(error => console.log(error));
        });
    }

    renderCategories(){
        return this.state.categories.map(category =>
            <View key={category.id}>
                <Text style={offerStyles.offerText}>{category.category_name}</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <HomeCategoryDetails navigation={this.props.navigation} prodcuts={category.products}/>
                </ScrollView>
            </View>
        );
    }


    render(){
        return(
            <View style={{ padding: 10 }}>
                { this.renderCategories() }
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

export default CategoriesProducts;

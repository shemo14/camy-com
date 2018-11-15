import React, { Component } from 'react';
import {View, Text, ScrollView, Image, I18nManager} from 'react-native';
import { Card, CardItem} from 'native-base';
import axios from 'axios';
import I18n from '../../local/i18n';


class Brands extends Component{
    constructor(props){
        super(props);
        this.state = {
            brands : []
        };
    }

    componentWillMount(){
        axios.get('https://shams.arabsdesign.com/camy/api/brands')
            .then(response => this.setState({ brands: response.data.brands }))
            .catch(error => console.log(error));
    }

    renderBrands(){
        return this.state.brands.map(brand =>
            <Card key={ brand.id }>
                <CardItem cardBody>
                    <Image style={brands.brandImage} resizeMode={Image.resizeMode.center}
                           source={{ uri: brand.image }}/>
                </CardItem>
            </Card>
        );
    }


    render(){

        return(
            <View style={brands.brandContainer}>
                <Text style={brands.brandText}>{ I18n.t('topBrands') }</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    { this.renderBrands() }
                </ScrollView>
            </View>
        );
    }
}

const brands = {
    brandText: {
        fontSize: 20,
        color: '#828391',
        marginBottom: 5,
        textAlign: 'left'
    },
    brandContainer: {
        padding : 5,
    },
    brandImageContainers: {
        height: 80,
        width: 120,
        margin: 5,
        shadowColor: '#000',
        shadowOffset: { width: 20, height: 50 },
        shadowOpacity: 0.7,
        elevation: 1,
        zIndex:999,
    },
    brandImage: {
        flex: 1,
        height: 80,
        width: 150,
        // justifyContent: 'center',
    }
};

export default Brands;

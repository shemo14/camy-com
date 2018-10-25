import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Accordion } from 'native-base';
import axios from 'axios';
import Loader from './Loader';
import I18n from "../../local/i18n";


class ProductDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            desc: '',
            more_desc: '',
            price: 0,
            discount: 0,
            brand: '',
            weight: 0,
            loading: true,
        };
    }


    componentWillMount(){
        axios.get('https://shams.arabsdesign.com/camy/api/productDetails/' + I18n.locale + '/' + this.props.productId)
            .then(response => this.setState({ name: response.data.product.name,
                                              desc: response.data.product.desc,
                                              more_desc: response.data.product.more_desc,
                                              price: response.data.product.price,
                                              discount: response.data.product.discount,
                                              brand: response.data.product.brand,
                                              weight: response.data.product.weight,
                                              loading: false
                                            }))
            .catch(error => console.log(error));
    }

    productDetails(){
        const dataArray = [
            { title: I18n.t('desc'), content: this.state.desc },
            { title: I18n.t('more_desc'), content: this.state.more_desc },
            { title: I18n.t('brands'), content: this.state.brand },
            { title: I18n.t('weight'), content: this.state.weight }
        ];
        return dataArray;
    }

    render(){
        return(
            <View style={styles.productDetails}>
                <Loader loading={this.state.loading} />
                <View style={styles.productText}>
                    <Text style={styles.productName}>{ this.state.name }</Text>
                    <Text style={styles.productDiscount}>{ this.state.discount } { I18n.t('sar') }</Text>
                    <Text style={styles.productPrice}>{ this.state.price } { I18n.t('sar') }</Text>
                </View>

                <Accordion dataArray={this.productDetails()} expanded={0}/>
            </View>
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
    productPrice: {
        fontSize: 20,
        color: '#ecb6bd',
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid'
    },
    productDiscount: {
        fontSize: 30
    }

};

export default ProductDetails;

import React, { Component } from 'react';
import {Text, SafeAreaView, ScrollView, Image, View, AsyncStorage, TouchableOpacity } from 'react-native';
import { Content, Header, Container, Left, Button, Icon, Body, Right, Footer, FooterTab, Picker } from 'native-base';
import {connect} from "react-redux";
import ProductModal from './ProductModel';


class SubCategory extends Component {
    constructor(props){
        super(props);
        this.state = {
            visibleModal: null,
        }
    }

    renderProducts(){
        return this.props.data.products.map(product => <ProductModal key={product.id} product={product} />)
    }


    render(){
        return(
            <View>
                <Text style={styles.subcategoryText}>{ this.props.data.subcategory_name }</Text>
                <ScrollView style={styles.container} horizontal={true} showsHorizontalScrollIndicator={false}>
                    { this.renderProducts() }
                </ScrollView>
            </View>
        );
    }
}

const styles = {
    subcategoryText: {
        color: '#898999',
        fontSize: 18
    },
    container: {
        borderBottomWidth: 1,
        borderBottomColor: '#f8f8f8',
        paddingTop: 5,
        paddingBottom: 5,
    },
};

export default SubCategory;
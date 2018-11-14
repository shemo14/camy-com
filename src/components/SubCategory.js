import React, { Component } from 'react';
import {Text, SafeAreaView, ScrollView, Image, View, I18nManager } from 'react-native';
import { Content, Header, Container, Left, Button, Icon, Body, Right, Footer, FooterTab, Picker } from 'native-base';
import {connect} from "react-redux";
import ProductModal from './ProductModel';
import I18n from '../../local/i18n';


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

    componentWillMount() {
        if (I18nManager.isRTL) {
            setTimeout(() => this.scrollView.scrollTo({x: 0, y: 0, animated: true}));
        }
    }


    render(){
        return(
            <View>
                <Text style={styles.subcategoryText}>{ this.props.data.subcategory_name }</Text>
                <ScrollView style={styles.container} horizontal={true} showsHorizontalScrollIndicator={false} ref={ref => this.scrollView = ref}
                            ref={ref => this.scrollView = ref}>
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
import React, { Component } from 'react';
import {Text, SafeAreaView, ScrollView, Image, View, AsyncStorage, TouchableOpacity } from 'react-native';
import { Content, Header, Container, Left, Button, Icon, Body, Right, Footer, FooterTab, Picker } from 'native-base';
import SubCategory from './SubCategory';
import axios from 'axios';
import I18n from '../../local/i18n';
import Loader from './Loader';


class RelatedProduct extends Component {
    constructor(props){
        super(props);
        this.state = {
            subcategories: [],
            visibleModal: null,
            loading: true,
        }
    }

    componentWillMount(){
        axios.get('https://shams.arabsdesign.com/camy/api/subcategoryProducts/' + I18n.locale + '/' + this.props.categoryId)
             .then(response => this.setState({ subcategories: response.data.data, loading: false }))
             .catch(error => console.log(error));
    }

    renderSubcategory(){
        return this.state.subcategories.map(subcategory => <SubCategory data={subcategory} key={subcategory.id} />);
    }


    render(){
        return (
            <ScrollView style={styles.container}>
                <Loader loading={this.state.loading} />
                { this.renderSubcategory() }
            </ScrollView>
        );
    }
}

const styles = {
    container: {
        padding: 10,
    },
};

export default RelatedProduct;
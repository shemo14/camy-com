import React, { Component } from 'react';
import {View, Text, Image, ScrollView, AsyncStorage, TouchableOpacity} from 'react-native';
import { Container, Header, Content, Button, Icon, ListItem, Radio, FooterTab, Body, Left, Footer, Input } from 'native-base';
import axios from 'axios';
import I18n from "../../local/i18n";
import Loader from './Loader';
import SearchInput, { createFilter } from 'react-native-search-filter';

const KEYS_TO_FILTERS = ['name', 'id'];
class Search extends Component{

    constructor(props){
        super(props);
        this.state={
            products: [],
            loading: true,
            searchTerm: ''
        }
    }

    searchUpdated(term) {
        this.setState({ searchTerm: term })
    }

    componentWillMount(){
        axios.get('https://shams.arabsdesign.com/camy/api/products/' + I18n.locale )
             .then(response => this.setState({ products: response.data.products , loading: false }) )
             .catch(error => console.log(error));
    }

    render(){
        const filteredProducts = this.state.products.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));

        const isLiked = data => {
            this.setState({ isLiked: data });
            console.log(data, this.state.isLiked);
        };

        return(

            <Container>
                <Header style={{ height: 70, backgroundColor: '#fff', paddingTop: 15, borderBottomWidth:1, borderBottomColor: '#eee'}}>
                    <Left style={{ flex: 0 }}>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name={ I18n.locale === 'ar' ? 'ios-arrow-forward' : 'ios-arrow-back' } type='Ionicons' style={{ color: '#000' }} />
                        </Button>
                    </Left>
                    <Body style={{ alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{ fontSize: 18, color: '#999', textAlign: 'center' }}>{ I18n.t('search') }</Text>
                    </Body>
                </Header>
                <Content style={{ flex: 3 }}>
                    <Loader loading={this.state.loading} />
                    <View style={{ backgroundColor: '#f2f2f2', flex: 1 }}>
                        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10 }}>
                            <Icon type={'EvilIcons'} name={'search'} style={{ fontSize: 40, marginTop: 7, margin: 5, color: '#acacac' }} />
                            <SearchInput onChangeText={(term) => { this.searchUpdated(term) }} placeholder={ I18n.t('search') + '...'} style={{ backgroundColor: '#f2f2f2', height: 45, padding: 5, flex: 1, width: 1000 }}/>
                        </View>
                    </View>
                    <View style={{ flex: 2 }}>
                        {filteredProducts.map(product => {
                            return (
                                <ListItem key={product.id}>
                                    <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.navigation.navigate('product', { productDetails: product ,isLiked: isLiked, liked: false })}>
                                        <Text style={{ color: '#5b5b5b', fontSize: 18 }}>{ product.name }</Text>
                                    </TouchableOpacity>
                                </ListItem>
                            )
                        })}
                    </View>
                </Content>
                <Footer style={{ backgroundColor: '#fff', borderBottomWidth:1, borderBottomColor: '#eee' }}>
                    <FooterTab style={{ backgroundColor: '#fff' }}>
                        <Button onPress={() => this.props.navigation.navigate('maintenance')}>
                            <Image style={{ width:27, height: 27 }} source={require('../../assets/images/dmaint.png')} />
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate('offers')}>
                            <Image style={{ width:27, height: 27 }} source={require('../../assets/images/dsales.png')} />
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate('cart')}>
                            <Image style={{ width:27, height: 32 }} source={require('../../assets/images/dcart.png')} />
                        </Button>
                        <Button>
                            <Image style={{ width:27, height: 27 }} source={require('../../assets/images/dsearch1.png')} />
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate('home')}>
                            <Image style={{ width:27, height: 27 }} source={require('../../assets/images/dhome.png')} />
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

export default Search;
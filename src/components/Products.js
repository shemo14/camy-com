import React, { Component } from 'react';
import {View, Text, Image, FlatList, AsyncStorage } from 'react-native';
import { Container, Header, Content, Button, Icon, Picker, Body, Left, Footer, FooterTab } from 'native-base';
import axios from 'axios';
import I18n from "../../local/i18n";
import Loader from './Loader';
import HomeProduct from "./HomeProduct";


class Products extends Component{
    constructor(props){
        super(props);
        this.state={
            loading: true,
            category: this.props.navigation.state.params.category,
            subcategories: [],
            brands: [],
            tags: [],
            products: [],
            selectedSubcategory: '',
            selectedBrands: '',
            selectedTags: '',
            selectedOption: '',
        }
    }

    componentWillMount(){
        axios.get('https://shams.arabsdesign.com/camy/api/subcategories/' + I18n.locale + '/' + this.state.category.id)
              .then(response => this.setState({ subcategories: response.data.subcategories, loading: false }))
              .catch(error => console.log(error));

        axios.get('https://shams.arabsdesign.com/camy/api/brands/' + I18n.locale + '/' + this.state.category.id)
             .then(response => this.setState({ brands: response.data.brands }))
             .catch(error => console.log(error));

        axios.get('https://shams.arabsdesign.com/camy/api/tags/' + I18n.locale )
             .then(response => this.setState({ tags: response.data.tags }))
             .catch(error => console.log(error));

        AsyncStorage.getItem('user_id').then(user_id => {
            axios.get('https://shams.arabsdesign.com/camy/api/getCategoryProducts/' + this.state.category.id + '/' + I18n.locale + '/' + user_id + '/' + Expo.Constants.deviceId)
                .then(response => this.setState({ products: response.data.products }))
                .catch(error => console.log(error));
        });
    }

    renderSubCategory(){
        return this.state.subcategories.map(subcategory => <Picker.Item key={'subcategory_' + subcategory.id} label={subcategory.name} value={subcategory.id} />);
    }

    renderBrands(){
        return this.state.brands.map(brand => <Picker.Item key={'brand_' + brand.id} label={brand.name} value={brand.id} />)
    }

    renderTags(){
        return this.state.tags.map(tag => <Picker.Item key={'tag_' + tag.id} label={tag.name} value={tag.id} />)
    }

    onFilter(subcategory_id, brand_id, tag_id) {
        if (subcategory_id !== '' || brand_id !== '' || tag_id !== '') {
            this.setState({loading: true});
            AsyncStorage.getItem('user_id').then(user_id => {
                axios.post('https://shams.arabsdesign.com/camy/api/filter', {
                    lang: I18n.locale,
                    subcategory_id: subcategory_id,
                    brand_id: brand_id,
                    tag_id: tag_id,
                    user_id: user_id,
                    token: Expo.Constants.deviceId
                })
                    .then(response => {
                        this.setState({products: response.data.products, loading: false});
                    })
                    .catch(error => console.log(error));
            });
        }
    }


    renderItem(product) {
        return (<HomeProduct navigation={this.props.navigation} liked={product.isLiked} key={product.index} data={product.item} />);
    }

    render(){
        return(
            <Container>
                <Header style={{ height: 70, backgroundColor: '#fff', paddingTop: 15, borderBottomWidth:1, borderBottomColor: '#eee'}}>
                    <Left style={{ flex: 0 }}>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name={ I18n.locale === 'ar' ? 'ios-arrow-forward' : 'ios-arrow-back' } type='Ionicons' style={{ color: '#000' }} />
                        </Button>
                    </Left>
                    <Body style={{ alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{ fontSize: 18, color: '#999', textAlign: 'center' }}>{ this.state.category.name }</Text>
                    </Body>
                </Header>
                <Content>
                    <Loader loading={this.state.loading} />

                    <View style={{ paddingTop: 12, paddingBottom: 12, backgroundColor: '#f9f8f8', flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 1, borderRadius: 20, borderWidth: 1, borderColor: '#ddd', height: 40, margin: 1, overflow: 'hidden', paddingRight: 10}}>
                            <Picker
                                note
                                mode="dialog"
                                style={{ color: '#7b7c8c', height: 30, margin: 5, backgroundColor: '#f9f8f8', overflow: 'hidden' }}
                                selectedValue={this.state.selectedSubcategory}
                                onValueChange={(value) => {
                                    this.setState({ selectedSubcategory: value });
                                    this.onFilter(value, this.state.selectedBrands, this.state.selectedTags);
                                }}
                                itemStyle={{ flex: 1, width: 150, textAlign: 'right', marginLeft: 0 }}
                                itemTextStyle={{ flex: 1 ,textAlign: 'center', width: 150, fontSize: 10, marginLeft: 0 }}
                            >
                                <Picker.Item style={{ textAlign: 'right' }} label={I18n.t('subcategories')} value="" />
                                { this.renderSubCategory() }
                            </Picker>
                        </View>

                        <View style={{ flex: 1, borderRadius: 20, borderWidth: 1, borderColor: '#ddd', height: 40, margin: 1, overflow: 'hidden', paddingRight: 10}}>
                            <Picker
                                note
                                mode="dialog"
                                style={{ color: '#7b7c8c', height: 30, margin: 5, backgroundColor: '#f9f8f8', overflow: 'hidden', marginRight: 30 }}
                                selectedValue={this.state.selectedBrands}
                                onValueChange={(value) => {
                                    this.setState({ selectedBrands: value });
                                    this.onFilter(this.state.selectedSubcategory, value, this.state.selectedTags);
                                } }
                                itemStyle={{ flex: 1, width: 100 }}
                                itemTextStyle={{ flex: 1, width: 100 ,textAlign: 'center' }}
                            >
                                <Picker.Item label={I18n.t('brands')} value="" />
                                { this.renderBrands() }
                            </Picker>
                        </View>

                        <View style={{ flex: 1, borderRadius: 20, borderWidth: 1, borderColor: '#ddd', height: 40, margin: 1, overflow: 'hidden' }}>
                            <Picker
                                note
                                mode="dialog"
                                style={{ color: '#7b7c8c', height: 30, margin: 5, backgroundColor: '#f9f8f8', overflow: 'hidden', marginRight: 30 }}
                                selectedValue={this.state.selectedTags}
                                onValueChange={(value) => {
                                    this.setState({ selectedTags: value });
                                    this.onFilter(this.state.selectedSubcategory, this.state.selectedBrands, value);
                                } }
                                itemStyle={{ flex: 1, width: 100 }}
                                itemTextStyle={{ flex: 1, width: 100 ,textAlign: 'center' }}
                            >
                                <Picker.Item label={I18n.t('tags')} value="" />
                                { this.renderTags() }
                            </Picker>
                        </View>
                    </View>

                    <View style={{ flex: 2, padding: 10 }}>
                        <FlatList
                            data={this.state.products}
                            renderItem={product => this.renderItem(product)}
                            numColumns={2}
                        />
                    </View>
                </Content>
                <Footer style={{ backgroundColor: '#fff', borderBottomWidth:1, borderBottomColor: '#eee' }}>
                    <FooterTab style={{ backgroundColor: '#fff' }}>
                        <Button onPress={() => this.props.navigation.navigate('maintenance')}>
                            <Image style={{ width:27, height: 27 }} source={require('../../assets/images/dmaint.png')} />
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate('offerBanars')}>
                            <Image style={{ width:27, height: 27 }} source={require('../../assets/images/dsales.png')} />
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate('cart')}>
                            <Image style={{ width:27, height: 32 }} source={require('../../assets/images/dcart.png')} />
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate('search')}>
                            <Image style={{ width:27, height: 27 }} source={require('../../assets/images/dsearch.png')} />
                        </Button>
                        <Button>
                            <Image style={{ width:27, height: 27 }} source={require('../../assets/images/dhome1.png')} />
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
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
        width: null,
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
        color: '#ce8285'
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
        borderRadius: 10,
        flex: 1,
        margin: 2
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

export default Products;
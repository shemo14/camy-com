import React, { Component } from 'react';
import {
    Text, SafeAreaView, ScrollView, Image, View, AsyncStorage, TouchableOpacity, ImageBackground,
    I18nManager
} from 'react-native';
import { Icon, Toast } from 'native-base';
import axios from "axios";
import Slider from './ProductSlider';
import ProductDetails from './ProductDetails';
import Modal from 'react-native-modal';
import Expo from "expo";
import I18n from '../../local/i18n';
import {Like} from "../actions";
import {connect} from "react-redux";


class ProductModel extends Component {
    constructor(props){
        super(props);
        this.state = {
            visibleModal: null,
            showToast: false,
            msg: '',
            cartProducts: [],
            loading: true
        }
    }

    async componentWillMount() {
        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
        });
        this.setState({ loading: false });
    }



    addToCard(){
        this.setState({ visibleModal: null });
        if (this.props.auth_user === null){
            axios.post('https://shams.arabsdesign.com/camy/api/setInLocalStorage', {
                product_id: this.props.product.id,
                type: 'cart',
                token: Expo.Constants.deviceId,
                qty: 1
            })
                .then(response => {
                    Toast.show({
                        text: I18n.t('addProductToCard'),
                        type: "success",
                        duration: 3000
                    });
                })
        }else {
            AsyncStorage.getItem('user_id').then((user_id) => {
                axios.post('https://shams.arabsdesign.com/camy/api/addToCard', {
                    user_id: user_id,
                    product_id: this.props.product.id
                })
                    .then(response => this.setState({msg: response.data.msg}))
                    .catch(error => console.log(error));
            }).catch(() => {
                this.setState({cartProducts: this.state.cartProducts.concat(this.props.product.id)});
                AsyncStorage.setItem('cart_products', JSON.stringify(this.state.cartProducts))
                    .then(() => this.setState({msg: 'product added to your cart successfully'}));
            });
            Toast.show({
                text: I18n.t('addProductToCard'),
                type: "success",
                duration: 3000
            });
        }
    }


    render(){
        if (this.state.loading) {
            return <Expo.AppLoading />;
        }
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.imageContainer} onPress={() => this.setState({ visibleModal: 1 })}>
                    <Image style={styles.image} resizeMode={Image.resizeMode.center} source={{ uri: this.props.product.image }} />
                </TouchableOpacity>
                <View style={styles.plusContainer}>
                    <TouchableOpacity onPress={() => this.addToCard()} style={styles.touchableOpacityStyle}>
                        <Icon name={'plus'} type={'Entypo'}/>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.productNameStyle}>{ this.props.product.name }</Text>
                    <Text style={styles.priceStyle}>{ this.props.product.price } { I18n.t('sar') }</Text>
                </View>

                <Modal isVisible={this.state.visibleModal === 1}>
                    <SafeAreaView style={{backgroundColor: '#fff', flex: 1, borderRadius: 15}}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Slider productId={this.props.product.id}/>
                            <ProductDetails productId={this.props.product.id}/>
                        </ScrollView>
                    </SafeAreaView>
                    <View style={styles.plusContainer}>
                        <TouchableOpacity onPress={() => this.addToCard() } style={styles.modelTouchableOpacityStyle}>
                            <Icon name={'plus'} style={styles.modelPlusIcon} type={'Entypo'}/>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = {
    image: {
        width: 100,
        height: 130,
        borderRadius: 15,
        marginLeft: 10,
    },
    container: {
        margin: 5,
        width: 130,
        height: 160
    },
    imageContainer: {
        // width: 150,
        height: 100,
        flex: 1,
        borderColor: '#d4d6d8',
        borderWidth: 1,
        justifyContent: 'center',
        borderRadius: 15,
        overflow: 'visible'
    },
    touchableOpacityStyle: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#d4d6d8',
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: -15,
        width: 30,
        zIndex: 99999,
        alignSelf: 'center'
    },
    modelTouchableOpacityStyle: {
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#03133b',
        position: 'absolute',
        bottom: -15,
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99999,
        alignSelf: 'center'
    },
    plusContainer: {
      marginBottom: 13,
    },
    productNameStyle: {
        color: '#afafaf',
        textAlign: 'left',
    },
    priceStyle: {
        color: '#737585',
        fontWeight: '600',
        textAlign: 'left',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        height: 300,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modelPlusIcon: {
        color: '#fff',
        fontSize: 40
    }
};


const mapTOState = ({ like, auth }) => {
    return {
        user_id: like.user_id,
        product_id: like.product_id,
        isLiked: like.isLiked,
        auth_user: auth.user
    };
};

export default connect(mapTOState, { Like })( ProductModel );
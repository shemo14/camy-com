import React, { Component } from 'react';
import {View, Text, Image, FlatList, Dimensions, TouchableOpacity} from 'react-native';
import {Container, Header, Content, Button, Icon, Body, Left, Footer, FooterTab, Toast} from 'native-base';
import axios from 'axios';
import I18n from "../../local/i18n";
import Loader from './Loader';

const width = Dimensions.get('window').width;

class OfferBanars extends Component{

    constructor(props){
        super(props);
        this.state={
            loading: true,
            firstImage: [],
            images: []
        }
    }

    static navigationOptions = () => ({
        drawerLabel: I18n.t('about'),
        drawerIcon: ( <Icon style={{ fontSize: 24 }} type={'Feather'} name={'info'}/> )
    });

    componentWillMount(){
        axios.get('https://shams.arabsdesign.com/camy/api/getOffersBanar').then(response => {
            this.setState({ firstImage: response.data.firstImage, images: response.data.images, loading: false })
        })
    }

    onPressBanar(id){
        this.props.navigation.navigate('offer', { offerId: id })
    }

    renderItem(image){
        const count = this.state.images.length;
        let styleLastItem = {
            height: 150,
            flex: 1,
            marginTop: 2,
            marginLeft: image.index % 2 !== 0 ? 2 : 0,
            width: (width/2)
        };

        if (count%2 !== 0 && image.index+1 === count){
            styleLastItem = {
                height: 150,
                flex: 1,
                marginTop: 2,
                marginLeft: image.index % 2 !== 0 ? 2 : 0,
                width: width,
                bottom: -1
            };
        }

        return(
            <TouchableOpacity onPress={() => this.onPressBanar(image.item.key)}>
                <Image key={image.item.key} resizeMode={Image.resizeMode.stretch} style={styleLastItem} source={{ uri: image.item.image }}/>
            </TouchableOpacity>
        );
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
                    <Text style={{ fontSize: 18, color: '#999', textAlign: 'center' }}>{ I18n.t('offers') }</Text>
                    </Body>
                </Header>
                <Content>
                    <Loader loading={this.state.loading} />
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flex: 1, height: 150 }}>
                            <TouchableOpacity style={{ width: '100%', height: 0, flex: 1 }} onPress={() => this.onPressBanar(this.state.firstImage.key)}>
                                <Image resizeMode={Image.resizeMode.stretch} style={{ height: 150, flex: 1, width: width }} source={{ uri: this.state.firstImage.image }}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 2 }}>
                            <FlatList
                                data={this.state.images}
                                renderItem={image => this.renderItem(image)}
                                numColumns={2}
                            />
                        </View>
                    </View>
                </Content>
                <Footer style={{backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee'}}>
                    <FooterTab style={{backgroundColor: '#fff'}}>
                        <Button onPress={() => this.props.navigation.navigate('maintenance')}>
                            <Image style={{width: 27, height: 27}} source={require('../../assets/images/dmaint.png')}/>
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate('offerBanars')}>
                            <Image style={{width: 27, height: 27}} source={require('../../assets/images/dsales1.png')}/>
                        </Button>
                        <Button onPress={() => {
                            if(this.props.user !== null){
                                this.props.navigation.navigate('cart')
                            }else{
                                Toast.show({
                                    text: I18n.t('plzLogin'),
                                    type: "danger",
                                    duration: 5000
                                });
                            }
                        }}>
                            <Image style={{width: 27, height: 32}} source={require('../../assets/images/dcart.png')}/>
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate('search')}>
                            <Image style={{width: 27, height: 27}} source={require('../../assets/images/dsearch.png')}/>
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate('home')}>
                            <Image style={{width: 27, height: 27}} source={require('../../assets/images/dhome.png')}/>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

export default OfferBanars;
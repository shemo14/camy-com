import React, { Component } from 'react';
import { ScrollView, SafeAreaView, Image, Animated, BackHandler, BackAndroid } from 'react-native';
import Slider from './HomeSlider';
import HomeOffers from './HomeOffers';
import Brands from './Brands';
import Banar from './Banar';
import Categories from './Categories';
import CategoriesProducts from './CategoriesProducts';
import { Footer, FooterTab, Button, Icon, Header, Left, Body, Container, Right, Content } from 'native-base';
import I18n from '../../local/i18n';
import axios from 'axios';


class Home extends Component {
    constructor (props) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(0),
            availabel: 0,
            loading: true,
            categories: []
        };
    }

    static navigationOptions = () => ({
        drawerLabel: I18n.t('home'),
        drawerIcon: ( <Icon style={{ fontSize: 24 }} type={'FontAwesome'} name={'home'}/> )
    });


    componentWillMount(){
        axios.get('https://shams.arabsdesign.com/camy/api/categories/' + I18n.locale)
            .then(response => this.setState({ categories: response.data.categories }))
            .catch(error => console.log(error));

        BackHandler.addEventListener('hardwareBackPress', function() {
            BackHandler.exitApp();
        });
    }

    setAnimate(){
        if (this.state.availabel === 1){
            Animated.timing(
                this.state.fadeAnim,
                {
                    toValue: 0,
                    duration: 1500,
                },
            ).start();
            this.setState({ availabel: 0 });
        }else {
            Animated.timing(
                this.state.fadeAnim,
                {
                    toValue: 1,
                    duration: 1500,
                },
            ).start();
            this.setState({ availabel: 1 });
        }
    }

    render () {
        console.log(I18n.locale);
        return (
            <Container>
                <Header style={{ height: 70, backgroundColor: '#fff', paddingTop: 20, borderBottomWidth:1, borderBottomColor: '#eee'}}>
                    <Left style={{ flex: 1 }}>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name='menu' style={{ color: '#000' }} />
                        </Button>
                    </Left>
                    <Body style={{ flex:2, alignItems: 'center', justifyContent: 'center'}}>
                        <Image source={require('../../assets/images/upericon.png')} style={{ height: 35, width: 29 }}/>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.setAnimate()}>
                            <Image source={this.state.availabel === 1 ? require('../../assets/images/cat2.png') : require('../../assets/images/cat1.png')} style={{ width: 20, height: 20.5 }}/>
                        </Button>
                    </Right>
                </Header>
                <Animated.View style={{ position: 'absolute', top: 70, backgroundColor: '#030f31', width: '100%', zIndex: 99999999, opacity: this.state.fadeAnim, padding: 5 }}>
                    <Categories navigation={this.props.navigation} data={this.state.categories} />
                </Animated.View>
                <Content>
                    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
                        <ScrollView style={{ flex: 0.8 }}>
                            <Slider/>
                            <HomeOffers navigation={this.props.navigation}/>
                            <Brands/>
                            <Banar/>
                            <CategoriesProducts navigation={this.props.navigation}/>
                        </ScrollView>
                    </SafeAreaView>
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


export default Home;
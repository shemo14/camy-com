import React, { Component } from 'react';
import { ScrollView, SafeAreaView, Image, Animated, BackHandler, AsyncStorage, View, I18nManager } from 'react-native';
import Slider from './HomeSlider';
import HomeOffers from './HomeOffers';
import Brands from './Brands';
import Banar from './Banar';
import Categories from './Categories';
import CategoriesProducts from './CategoriesProducts';
import {Footer, FooterTab, Button, Icon, Header, Left, Body, Container, Right, Content, Toast} from 'native-base';
import I18n from '../../local/i18n';
import { connect } from "react-redux";
import axios from 'axios';
import Expo, {Notifications, Permissions} from "expo";



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

        I18n.locale = this.props.lang;

        if (this.props.lang === 'en' && this.props.dir === 'rtl' || this.props.lang === 'ar' && this.props.dir === 'lrt'){
            Expo.Util.reload();
        }

    }

    componentDidMount(){
        this.registerForPushNotificationsAsync();
    }

    registerForPushNotificationsAsync = async () => {
        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            return;
        }

        try{
            const token = await Notifications.getExpoPushTokenAsync();
            AsyncStorage.getItem('user_id').then(user_id => {
               axios.post('https://shams.arabsdesign.com/camy/api/setDeviceId', {user_id, device_id: token})
                    .then(response => console.log( response.data.msg ))
                    .catch(error => console.log(error));
            });

        }catch(e) {
            console.log('Error of notification pusher', e);
        }

    };


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
                    toValue: 200,
                    duration: 1300,
                },
            ).start();
            this.setState({ availabel: 1 });
        }
    }

    render () {
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
                <Animated.ScrollView style={{ position: 'absolute', top: 70, backgroundColor: '#030f31', width: '100%', zIndex: 99999999, height: this.state.fadeAnim }}>
                    <View style={{ padding: 5 }}>
                        <Categories navigation={this.props.navigation} data={this.state.categories} />
                    </View>
                </Animated.ScrollView>
                <Content>
                    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
                        <ScrollView style={{ flex: 0.8 }}>
                            <Slider navigation={this.props.navigation}/>
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
                        <Button onPress={() => this.props.navigation.navigate('offerBanars')}>
                            <Image style={{ width:27, height: 27 }} source={require('../../assets/images/dsales.png')} />
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate('cart') }>
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

const mapStateToProps = ({ auth, lang }) => {
  return {
      user: auth.user,
      lang: lang.locale,
      dir: lang.dir
  }
};

export default connect(mapStateToProps)(Home);
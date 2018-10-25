import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Content, Container, Icon, Left, Button, Body, Footer, FooterTab, Header } from 'native-base';
import axios from 'axios';
import I18n from "../../local/i18n";
import Loader from './Loader';

class Offers extends Component{
    constructor(props){
        super(props);
        this.state={
            mains: [],
            loading: true,
        }
    }

    componentWillMount(){
        axios.get('https://shams.arabsdesign.com/camy/api/maintenance/' + I18n.locale )
            .then(response => this.setState({ mains: response.data.mains , loading: false }) )
            .catch(error => console.log(error));
    }

    static navigationOptions = () => ({
        drawerLabel: I18n.t('maintenance'),
        drawerIcon: ( <Icon style={{ fontSize: 24 }} type={'FontAwesome'} name={'wrench'}/> )
    });

    renderMains(){
        return this.state.mains.map(main => {
            return (
                <Button key={main.id} block style={{ marginTop: 20 }} onPress={() => this.props.navigation.navigate('maintenanceRequest', { main })}>
                    <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold' }}>{ main.name }</Text>
                </Button>
            );
        })
    }

    render(){
        return(
            <Container>
                <Header style={{ height: 70, backgroundColor: '#fff', paddingTop: 15, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
                    <Left style={{ flex: 0 }}>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name={ I18n.locale === 'ar' ? 'ios-arrow-forward' : 'ios-arrow-back' } type='Ionicons' style={{ color: '#000' }} />
                        </Button>
                    </Left>
                    <Body style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{fontSize: 18, color: '#999', textAlign: 'center'}}>{ I18n.t('maintenance') }</Text>
                    </Body>
                </Header>
                <Content style={{ padding: 10 }}>
                    <Loader loading={this.state.loading} />
                    { this.renderMains() }
                </Content>
                <Footer style={{backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee'}}>
                    <FooterTab style={{backgroundColor: '#fff'}}>
                        <Button>
                            <Image style={{width: 27, height: 27}} source={require('../../assets/images/dmaint1.png')}/>
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate('offers')}>
                            <Image style={{width: 27, height: 27}} source={require('../../assets/images/dsales.png')}/>
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate('cart')}>
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

const styles={
    imageStyle: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
    }
};

export default Offers;
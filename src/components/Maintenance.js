import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import {Content, Container, Icon, Left, Button, Body, Footer, FooterTab, Header, Toast} from 'native-base';
import axios from 'axios';
import I18n from "../../local/i18n";
import Loader from './Loader';
import {connect} from "react-redux";

class Maintenance extends Component{
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
                <Button key={main.id} block style={{ marginTop: 25, backgroundColor: '#020f31', borderRadius: 10 }} onPress={() => {
                    if(this.props.user !== null) {
                        this.props.navigation.navigate('maintenanceRequest', {main})
                    } else {
                        this.props.navigation.navigate('login');
                    }
                }}>
                    <Text style={{ color: '#fff', fontSize: 18 }}>{ main.name }</Text>
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
                <Content style={{ paddingRight: 20, paddingLeft: 20, }}>
                    <Loader loading={this.state.loading} />
                    { this.renderMains() }
                </Content>
                <Footer style={{backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee'}}>
                    <FooterTab style={{backgroundColor: '#fff'}}>
                        <Button>
                            <Image style={{width: 27, height: 27}} source={require('../../assets/images/dmaint1.png')}/>
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate('offerBanars')}>
                            <Image style={{width: 27, height: 27}} source={require('../../assets/images/dsales.png')}/>
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

const styles={
    imageStyle: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
    }
};

const mapStateToProps = ({ auth }) => {
    return {
        user: auth.user
    }
};

export default connect(mapStateToProps)(Maintenance);
import React, { Component } from 'react';
import {View, Text, Image, Linking, AsyncStorage, TouchableOpacity} from 'react-native';
import { Container, Header, Content, Button, Icon, List, Body, Left, CheckBox, DatePicker } from 'native-base';
import { Row, Grid } from "react-native-easy-grid";
import axios from 'axios';
import I18n from "../../local/i18n";
import Loader from './Loader';

class About extends Component{

    constructor(props){
        super(props);
        this.state={
            socials: [],
            aboutApp: '',
            loading: true
        }
    }

    static navigationOptions = () => ({
        drawerLabel: I18n.t('about'),
        drawerIcon: ( <Icon style={{ fontSize: 24 }} type={'Feather'} name={'info'}/> )
    });

    componentWillMount(){
        axios.get('https://shams.arabsdesign.com/camy/api/aboutApp').then(response => {
            this.setState({ socials: response.data.socials, aboutApp: response.data.aboutApp, loading: false })
        })
    }

    render(){
        return(
            <Container>
                <Header style={{ height: 70, backgroundColor: '#fff', paddingTop: 15, borderBottomWidth:1, borderBottomColor: '#eee'}}>
                    <Left style={{ flex: 0 }}>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name='menu' style={{ color: '#000' }} />
                        </Button>
                    </Left>
                    <Body style={{ alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{ fontSize: 18, color: '#999', textAlign: 'center' }}>{ I18n.t('about') }</Text>
                    </Body>
                </Header>
                <Content>
                    <Loader loading={this.state.loading} />
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                        <Image resizeMode={Image.resizeMode.center} source={require('../../assets/images/loglogo.png')}/>

                        <View style={{ backgroundColor: '#f8fcff', justifyContent: 'center', alignItems: 'center', padding: 5, width: '100%', borderRadius: 20 }}>
                            <Text style={{ textAlign: 'center' }}>{ this.state.aboutApp }</Text>
                            <View style={{ flexDirection: 'row',  justifyContent: 'center', alignItems: 'center'}}>
                                {this.state.socials.map(soical => {
                                    return (
                                        <TouchableOpacity key={soical.id} onPress={() => { Linking.openURL(soical.link) }}>
                                            <Image resizeMode={Image.resizeMode.stretch} style={{ margin: 5, width: 50, height: 50 }} source={{ uri: soical.image }}/>
                                        </TouchableOpacity>
                                    );
                                })}

                            </View>
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles= {
    buyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10,
    }
};

export default About;
import React, { Component } from 'react';
import { Text, AsyncStorage } from 'react-native';
import { Container, Header, Content, Button, Icon, ListItem, Body, Left, Right, Radio } from 'native-base';
import ToggleSwitch from 'toggle-switch-react-native';
import I18n from '../../local/i18n';
import { connect } from 'react-redux';
import { changeLang } from '../actions';
import axios from 'axios';
import Expo from "expo";

class Settings extends Component{

    constructor(props){
        super(props);
        this.state={
            active: false,
            en: this.props.locale === 'en' ? true : false,
            ar: this.props.locale === 'ar' ? true : false
        }
    }

    static navigationOptions = () => ({
        drawerLabel: I18n.t('settings'),
        drawerIcon: ( <Icon style={{ fontSize: 24 }} type={'Ionicons'} name={'md-settings'}/> )
    });

    setLang(lang){
        if (lang === 'ar')
            this.setState({ ar: true, en: false });
        else
            this.setState({ ar: false, en: true });

        this.props.changeLang(lang);
        I18n.locale = lang;
        AsyncStorage.setItem('lang', I18n.locale).then(() => {
            Expo.Util.reload();
        });

        console.log(I18n.locale);
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
                        <Text style={{ fontSize: 18, color: '#999', textAlign: 'center' }}>Settings</Text>
                    </Body>
                </Header>
                <Content>
                    <Text style={{ fontSize: 20, color: '#5b5b5b', margin: 5 }}>Choose Language</Text>
                    <ListItem>
                        <Left>
                            <Text style={{ color: '#5b5b5b', marginTop: 2, fontSize: 16 }}>AR</Text>
                        </Left>
                        <Right>
                            <Radio selected={this.state.ar} onPress={() => this.setLang('ar')}/>
                        </Right>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Text style={{ color: '#5b5b5b', marginTop: 2, fontSize: 16 }}>EN</Text>
                        </Left>
                        <Right>
                            <Radio selected={this.state.en} onPress={() => this.setLang('en')}/>
                        </Right>
                    </ListItem>

                    <ListItem>
                        <Left>
                            <Text style={{ color: '#5b5b5b', marginTop: 2, fontSize: 16 }}>{I18n.t('getNotifications')}</Text>
                        </Left>
                        <Right>
                            <ToggleSwitch
                                isOn={this.state.active}
                                onColor='blue'
                                offColor='#5b5b5b'
                                size='medium'
                                style={{ width: 20 }}
                                onToggle={ (isOn) => this.setState({ active: isOn }) }
                            />
                        </Right>
                    </ListItem>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = ({ lang }) => {
    return {
        locale: lang.locale
    }
};

export default connect(mapStateToProps, { changeLang })(Settings);
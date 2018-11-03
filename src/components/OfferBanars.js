import React, { Component } from 'react';
import {View, Text, Image, FlatList, Dimensions, TouchableOpacity} from 'react-native';
import { Container, Header, Content, Button, Icon, Body, Left, CheckBox, DatePicker } from 'native-base';
import axios from 'axios';
import I18n from "../../local/i18n";
import Loader from './Loader';

const data = [
    {
        key: 1,
        image: '../../assets/images/poster.jpg'
    },
    {
        key: 2,
        image: '../../assets/images/poster.jpg'
    },
    {
        key: 3,
        image: '../../assets/images/poster.jpg'
    },
    {
        key: 4,
        image: '../../assets/images/poster.jpg'
    },
    {
        key: 5,
        image: '../../assets/images/poster.jpg'
    },
    {
        key: 6,
        image: '../../assets/images/poster.jpg'
    },
    {
        key: 7,
        image: '../../assets/images/poster.jpg'
    },
];

const width = Dimensions.get('window').width;

class OfferBanars extends Component{

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
        // axios.get('https://shams.arabsdesign.com/camy/api/aboutApp').then(response => {
        //     this.setState({ socials: response.data.socials, aboutApp: response.data.aboutApp, loading: false })
        // })
    }

    renderItem(image){
        const count = data.length;
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
            <TouchableOpacity>
                <Image key={image.index} resizeMode={Image.resizeMode.stretch} style={styleLastItem} source={require('../../assets/images/poster.jpg')}/>
            </TouchableOpacity>
        );
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
                    <Text style={{ fontSize: 18, color: '#999', textAlign: 'center' }}>{ I18n.t('offers') }</Text>
                    </Body>
                </Header>
                <Content>
                    {/*<Loader loading={this.state.loading} />*/}
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flex: 1, height: 150 }}>
                            <TouchableOpacity style={{ width: '100%', height: 0, flex: 1 }}>
                                <Image resizeMode={Image.resizeMode.stretch} style={{ height: 150, flex: 1, width: width }} source={require('../../assets/images/poster.jpg')}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 2 }}>
                            <FlatList
                                data={data}
                                renderItem={image => this.renderItem(image)}
                                numColumns={2}
                            />
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}

export default OfferBanars;
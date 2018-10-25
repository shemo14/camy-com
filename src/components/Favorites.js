import React, { Component } from 'react';
import { Text, ListView, AsyncStorage} from 'react-native';
import { Container, Header, Content, Button, Icon, List, Body, Left } from 'native-base';
import FavList from './FavList';
import { Row, Grid } from "react-native-easy-grid";
import Loader from './Loader';
import axios from 'axios';
import I18n from '../../local/i18n';

class Favorites extends Component{

    constructor(props){
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            basic: true,
            listViewData: [],
            chosenDate: new Date(),
            loading: true,
        };

        this.setDate = this.setDate.bind(this);
    }

    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }

    static navigationOptions = () => ({
        drawerLabel: I18n.t('favorites'),
        drawerIcon: ( <Icon style={{ fontSize: 24 }} type={'FontAwesome'} name={'heart'}/> )
    });

    componentWillMount(){
        AsyncStorage.getItem('user_id').then((user_id) => {
            axios.get('https://shams.arabsdesign.com/camy/api/getFavs/' + user_id + '/' + I18n.locale )
                 .then(response => this.setState({ listViewData: response.data.products, loading: false }))
                 .catch(error => console.log(error));
        });
    }

    deleteRow(secId, rowId, rowMap, productId) {
        rowMap[`${secId}${rowId}`].props.closeRow();
        const newData = [...this.state.listViewData];
        newData.splice(rowId, 1);
        this.setState({ listViewData: newData });

        AsyncStorage.getItem('user_id').then((user_id) => {
            axios.get('https://shams.arabsdesign.com/camy/api/deleteFav/' + user_id + '/' +  productId )
                .then(response => console.log(response.data.msg))
                .catch(error => console.log(error));
        });
    }

    addToCard(productId){
        this.setState({ loading: true });
        AsyncStorage.getItem('user_id').then((user_id) => {
            axios.post('https://shams.arabsdesign.com/camy/api/setToCart', { user_id: user_id, product_id: productId, qty: 1 } )
                 .then(response => {
                     this.setState({ loading: false });
                     this.props.navigation.navigate('cart')
                 })
                 .catch(error => console.log(error));
        });
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
                        <Text style={{ fontSize: 18, color: '#999', textAlign: 'center' }}>{ I18n.t('favorites') }</Text>
                    </Body>
                </Header>
                <Content>
                    <Loader loading={this.state.loading} />
                    <List
                        leftOpenValue={75}
                        rightOpenValue={-75}
                        dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                        renderRow={data => <FavList data={data}/>}
                        renderLeftHiddenRow={data =>
                            <Button full success onPress={() => this.addToCard(data.id)}>
                                <Icon active type={'FontAwesome'} name={'shopping-cart'}/>
                            </Button>}
                        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                            <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap, data.id)}>
                                <Icon active name="trash"/>
                            </Button>}
                    />

                </Content>
            </Container>
        );
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
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

export default Favorites;
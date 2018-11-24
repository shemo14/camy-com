import React, { Component } from 'react';
import {Text, Image, TouchableOpacity, AsyncStorage, View} from 'react-native';
import { ListItem, Input, Icon, CheckBox, Body } from 'native-base';
import { Col, Grid } from "react-native-easy-grid";
import I18n from "../../local/i18n";
import axios from "axios/index";
import Loader from './Loader';

class CartListItem extends Component{
    constructor(props){
        super(props);
        this.state={
            count: this.props.data.count,
            installation: this.props.data.installation,
            loading: false,
            checked: false
        };
    }

    setInstallation(){
        if(this.props.data.install === 1){
            this.setState({ checked: false });
            this.props.addInstall('remove', this.props.data.installation);
        }else{
            this.setState({ checked: true });
            this.props.addInstall('add', this.props.data.installation);
        }
    }

    increaseProduct(){
        if (this.props.data.count < 5) {
            // this.setState({ installation })
            this.props.setProductCounter(this.props.data.id, 'inc', this.state.checked, (this.props.data.installation/this.props.data.count), this.props.data.price);
        }

        console.log(this.props.data.installation)
    }

    decreaseProduct(){
        if (this.props.data.count > 1){
            this.props.setProductCounter(this.props.data.id, 'dec', this.state.checked, (this.props.data.installation/this.props.data.count), this.props.data.price);
        }

        console.log(this.props.data.installation)
    }

    renderInstallation(){
        if(this.props.data.installation > 0){
            return(
                <Col style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Body style={{ flex: 0 }}>
                        <Text onPress={ () => this.setInstallation()} style={{ color: '#000', fontWeight: '600', marginLeft: 10, marginRight: 10, marginBottom: 10 }}>تركيب</Text>
                        </Body>
                        <CheckBox style={{ borderRadius: 3 }} checked={this.props.data.install === 1 ? true : false} onPress={() => this.setInstallation()} color="blue"/>
                        <Text onPress={ () => this.setInstallation()} style={{ color: '#000', fontWeight: '600', marginLeft: 10, marginRight: 10, marginTop: 10 }}>{this.props.data.installation} { I18n.t('sar') }</Text>
                    </View>
                </Col>
            );
        }

        return <View/>;
    }

    render(){
        return(
            <ListItem style={styles.itemListStyle}>
                <Loader loading={this.state.loading} />
                <Grid>
                    <Col style={styles.imageContainer}>
                        <Image resizeMode={Image.resizeMode.center} style={styles.imageStyle} source={{ uri: this.props.data.image }}/>
                    </Col>
                    <Col style={styles.textStyle}>
                        <Text style={styles.productNameStyle}>{ this.props.data.name }</Text>
                        <Text style={styles.priceStyle}>{ this.props.data.price } { I18n.t('sar') }</Text>
                    </Col>
                    { this.renderInstallation() }
                    <Col style={styles.qntyContainer}>
                        <TouchableOpacity onPress={() => this.increaseProduct()}>
                            <Icon name={'plus'} type={'Entypo'}/>
                        </TouchableOpacity>
                        <Input disabled style={styles.inputStyle} value={JSON.stringify(this.props.data.count)} onChangeText={(count) => this.setState({ count }) }/>
                        <TouchableOpacity onPress={() => this.decreaseProduct()}>
                            <Icon name={'minus'} type={'Entypo'}/>
                        </TouchableOpacity>
                    </Col>
                </Grid>
            </ListItem>
        );
    }
}

const styles= {
    itemListStyle: {
        padding: 10,
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageStyle: {
        maxWidth: 150,
        maxHeight: 150,
        width: 70,
        height: 70,
        borderWidth: 1,
        borderColor:'#ececed',
        margin: 5
    },
    textStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    qntyContainer:{
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    productNameStyle: {
        color: '#afafaf',
        textAlign: 'center'
    },
    priceStyle: {
        color: '#737585',
        fontWeight: '600',
        textAlign: 'center'
    },
    inputStyle: {
        borderWidth: 1,
        borderColor:'#ececed',
        borderRadius: 5,
        textAlign: 'center',
        flex: 0.5,
        height: 33,
        margin: 5,
    }
};

export default CartListItem;
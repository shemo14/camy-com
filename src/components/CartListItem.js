import React, { Component } from 'react';
import {Text, Image, TouchableOpacity, AsyncStorage} from 'react-native';
import { ListItem, Input, Icon } from 'native-base';
import { Col, Grid } from "react-native-easy-grid";
import I18n from "../../local/i18n";
import axios from "axios/index";
import Loader from './Loader';

class CartListItem extends Component{
    constructor(props){
        super(props);
        this.state={
            count: this.props.data.count,
            loading: false,
        };

        // this.returnCartCounter = this.returnCartCounter.bind(this);
    }

    increaseProduct(){
        this.props.setProductCounter(this.props.data.id, 'inc');
        this.setState({
            count: this.state.count + 1,
        });
    }

    decreaseProduct(){
        if (this.state.count > 1){
            this.props.setProductCounter(this.props.data.id, 'dec');
            this.setState({ count: this.state.count-1 })
        }
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
                    <Col style={styles.qntyContainer}>
                        <TouchableOpacity onPress={() => this.increaseProduct()}>
                            <Icon name={'plus'} type={'Entypo'}/>
                        </TouchableOpacity>
                        <Input disabled style={styles.inputStyle} value={JSON.stringify(this.state.count)} onChangeText={(count) => this.setState({ count }) }/>
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
        width: 100,
        height: 100,
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
        flex: 1,
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
        height: 15,
        margin: 5,
    }
};

export default CartListItem;
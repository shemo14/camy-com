import React, { Component } from 'react';
import {FlatList, Text, Image, TouchableOpacity} from 'react-native';

class Categories extends Component{

    constructor(props){
        super(props);
    }

    navigateToProducts(category){
        this.props.navigation.navigate('products', { category: category });
    }

    renderCategory(category){
        return(
            <TouchableOpacity onPress={() => this.navigateToProducts(category.item)} key={category.index} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 3, marginBottom: 8 }}>
                <Image style={{ width: 50, height: 50 }} resizeMode={Image.resizeMode.stretch} source={{ uri: category.item.image }}/>
                <Text style={{ color: '#fff', textAlign: 'center' }}>{ category.item.name }</Text>
            </TouchableOpacity>
        );
    }

    render(){

        return(
            <FlatList
                data={this.props.data}
                renderItem={category => this.renderCategory(category)}
                numColumns={3}
            />
        );
    }
}


export default Categories;
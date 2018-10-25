import React, { Component } from 'react';
import HomeProduct from './HomeProduct';
class HomeCategoryDetails extends Component{
    constructor(props){
        super(props);
    }

    renderProducts() {
        return this.props.prodcuts.map(product => <HomeProduct navigation={this.props.navigation} liked={product.isLiked} key={product.id} data={product} />);
    }

    render(){
        return this.renderProducts() ;
    }
}



export default HomeCategoryDetails;
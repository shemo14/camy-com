import React, { Component } from 'react';
import { Image } from 'react-native';
import { Card, CardItem } from 'native-base';
import axios from 'axios';


class Banar extends Component{
    constructor(props){
        super(props);
        this.state = {
            image : 'https://shams.arabsdesign.com/camy/dashboard/uploads/setting/banar/logo_ar.png'
        };
    }

    componentWillMount(){
        axios.get('https://shams.arabsdesign.com/camy/api/banar')
            .then(response => this.setState({ image: response.data.image }))
            .catch(error => console.log(error));
    }

    render(){
        return(
            <Card>
                <CardItem cardBody>
                    <Image resizeMode={Image.resizeMode.stretch} style={banar.banarImage} source={{ uri: this.state.image }}/>
                </CardItem>
            </Card>
        );
    }
}

const banar= {
    banarImage: {
        flex: 1,
        justifyContent: 'center',
        height: 150,
        width: null
    }
};

export default Banar;

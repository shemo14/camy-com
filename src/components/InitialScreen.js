import React, {Component} from 'react';
import {connect} from 'react-redux';

class InitialScreen extends Component {

    constructor(props){
        super(props);
    }

    componentWillMount() {
        if (this.props.lang === 'en'){
            this.props.navigation.navigate('drawerNavigator')
        }else
            this.props.navigation.navigate('drawerNavigatorRight')
    }

    render() {
        return null;
    }
}


const mapStateToProps = ({ lang }) => {
    return {
        lang: lang.locale
    }
};

export default connect(mapStateToProps)(InitialScreen);

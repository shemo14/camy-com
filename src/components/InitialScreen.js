import React, {Component} from 'react';
import {connect} from 'react-redux';
import { DangerZone } from "expo";


class InitialScreen extends Component {

    constructor(props){
        super(props);
        this.state= {
            lang: ''
        }
    }


    componentWillMount = async () => {
        const lang = await DangerZone.Localization.getCurrentLocaleAsync();
        if (this.props.lang === 'en'){
            if(lang.substr(0, 2) === 'ar')
                this.props.navigation.navigate('drawerNavigatorRight');
            else
                this.props.navigation.navigate('drawerNavigator');
        }else if (this.props.lang === 'ar'){
            if(lang.substr(0, 2) === 'ar')
                this.props.navigation.navigate('drawerNavigator');
            else
                this.props.navigation.navigate('drawerNavigatorRight');
        }
    };

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

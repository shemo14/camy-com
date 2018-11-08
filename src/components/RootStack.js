import React from 'react';
import { AsyncStorage } from 'react-native';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import Profile from './Profile';
import Cart from './Cart';
import Product from './Product';
import RelatedProduct from './RelatedProduct';
import Payment from './Payment';
import ConfirmPayment from './ConfirmPayment';
import Thanks from './Thanks';
import Search from './Search';
import Offers from './Offers';
import Maintenance from './Maintenance';
import MaintenanceRequest from './MaintenanceRequest';
import Products from './Products';
import Favorites from './Favorites';
import About from './About';
import Orders from './Orders';
import Settings from './Settings';
import AuthLoader from './AuthLoader';
import OrderDetails from './OrderDetails';
import DrawerNavigator from './DrawerNvigator';
import I18n from 'ex-react-native-i18n';
import CameraScreen from "./Camera";
import { createStackNavigator } from 'react-navigation';
import OfferBanars from "./OfferBanars";
import Offer from "./Offer";
import AllProducts from "./AllProducts";
import RightDrawerNavigation from './RightDrawerNavigation';
import InitialScreen from './InitialScreen';


export default createStackNavigator({
    initialScreen: {
        screen: InitialScreen,
        navigationOptions: {
            header: null,
        }
    },
    drawerNavigator: {
        screen: DrawerNavigator,
        navigationOptions: {
            header: null,
        }
    },
    drawerNavigatorRight: {
        screen: RightDrawerNavigation,
        navigationOptions: {
            header: null,
        }
    },
    home: {
        screen: Home,
        navigationOptions: {
            header: null,
        }
    },
    login: {
        screen: Login,
        navigationOptions: {
            header: null,
        }
    },
    signUp: {
        screen: SignUp,
        navigationOptions: {
            header: null,
        }
    },
    cart: {
        screen: Cart,
        navigationOptions: {
            header: null,
        }
    },
    product: {
        screen: Product,
        navigationOptions: {
            header: null,
        }
    },
    relatedProduct: {
        screen: RelatedProduct,
        navigationOptions: {
            header: null,
        }
    },
    payment: {
        screen: Payment,
        navigationOptions: {
            header: null,
        }
    },
    confirmPay: {
        screen: ConfirmPayment,
        navigationOptions: {
            header: null,
        }
    },
    thanks: {
        screen: Thanks,
        navigationOptions: {
            header: null,
        }
    },
    search: {
        screen: Search,
        navigationOptions: {
            header: null,
        }
    },
    offers: {
        screen: Offers,
        navigationOptions: {
            header: null,
        }
    },
    maintenance: {
        screen: Maintenance,
        navigationOptions: {
            header: null,
        }
    },
    products: {
        screen: Products,
        navigationOptions: {
            header: null,
        }
    },
    favorites: {
        screen: Favorites,
        navigationOptions: {
            header: null,
        }
    },
    about: {
        screen: About,
        navigationOptions: {
            header: null,
        }
    },
    orders: {
        screen: Orders,
        navigationOptions: {
            header: null,
        }
    },
    orderDetails: {
        screen: OrderDetails,
        navigationOptions: {
            header: null,
        }
    },
    profile: {
        screen: Profile,
        navigationOptions: {
            header: null,
        }
    },
    settings: {
        screen: Settings,
        navigationOptions: {
            header: null,
        }
    },
    camera: {
        screen: CameraScreen,
        navigationOptions: {
            header: null,
        }
    },
    maintenanceRequest: {
        screen: MaintenanceRequest,
        navigationOptions: {
            header: null,
        }
    },
    offerBanars: {
        screen: OfferBanars,
        navigationOptions: {
            header: null,
        }
    },
    offer: {
        screen: Offer,
        navigationOptions: {
            header: null,
        }
    },
    allProduct: {
        screen: AllProducts,
        navigationOptions: {
            header: null,
        }
    }
},{
    initialRouteName: 'initialScreen',
    gesturesEnabled: false,
});
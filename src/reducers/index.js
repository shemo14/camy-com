import { combineReducers } from 'redux';
import AuhtReducer  from './AuthReducer';
import LikeReducer from './LikeReducer';
import LangReducer from './LangReducer';
import LogoutReducer from './LogoutReducer'

export default combineReducers({
   auth: AuhtReducer,
   like: LikeReducer,
   lang: LangReducer,
   logout: LogoutReducer
});
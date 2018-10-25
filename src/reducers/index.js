import { combineReducers } from 'redux';
import AuhtReducer  from './AuthReducer';
import LikeReducer from './LikeReducer';
import LangReducer from './LangReducer';

export default combineReducers({
   auth: AuhtReducer,
   like: LikeReducer,
    LangReducer: LangReducer,
});
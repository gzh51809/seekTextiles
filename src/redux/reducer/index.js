import { combineReducers } from 'redux';
// 引入reducers
import homeReducer from './homeReducer';
import loginReducer from './loginReducer';
import cartReducer from './cartReducer';

let rootReducer = combineReducers({
    home:homeReducer,
    login:loginReducer,
    cart:cartReducer,
})

export default rootReducer;
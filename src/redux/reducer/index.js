import { combineReducers } from 'redux';
// 引入reducers
import homeReducer from './homeReducer';

let rootReducer = combineReducers({
    home:homeReducer
})

export default rootReducer;
import {createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';//使用Redux DevTools工具查看数据
import reducer from '../reducer';

let store = createStore(reducer,composeWithDevTools());
export default store;
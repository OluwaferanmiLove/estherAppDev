import {createStore} from 'redux';
import requestorReducer from './reducer';

const store = createStore(requestorReducer);

export default store;

import { createStore, combineReducers } from "redux"
import UserReducer from './reducers/UserReducer'


const reducer=combineReducers({UserReducer})


const store = createStore(reducer);
window.store = store;
export default store;
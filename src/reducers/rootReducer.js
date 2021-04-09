import {combineReducers} from "redux";

import pizzaReducer from './pizzaReducer';
import userReducer from "./userReducer";

export default combineReducers({
    pizzaReducer,
    userReducer
});
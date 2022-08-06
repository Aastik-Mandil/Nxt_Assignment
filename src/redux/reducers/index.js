import { combineReducers } from "redux";
import basicReducer from "./basicReducer";

const reducers = combineReducers({
  basicReducer: basicReducer,
});

export default reducers;

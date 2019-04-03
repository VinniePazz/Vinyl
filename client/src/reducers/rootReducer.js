import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import userReducer from "./userReducer";
import productRudecer from "./productReducer";

const rootReducer = combineReducers({
	form: formReducer,
	user: userReducer,
	products: productRudecer
});

export default rootReducer;

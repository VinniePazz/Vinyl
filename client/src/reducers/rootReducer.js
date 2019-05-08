import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { reducer as toastrReducer } from "react-redux-toastr";
import userReducer from "./userReducer";
import productReducer from "./productReducer";
import loadingReducer from "./asyncReducer";

const rootReducer = combineReducers({
  user: userReducer,
  products: productReducer,
  form: formReducer,
  toastr: toastrReducer,
  loading: loadingReducer
});

export default rootReducer;

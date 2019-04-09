import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";

import "./styles.css";

import { configureStore } from "./app/store/configureStore";
import App from "./app/layout/App";
import theme from "./theme";

//============================-font-awesome-====================================
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faCompass,
  faClock,
  faPhone,
  faEnvelope,
  faShoppingCart,
  faTh,
  faBars,
  faPlusCircle,
  faTruck,
  faCheck,
	faTimes,
	faFrown,
	faSmile
} from "@fortawesome/free-solid-svg-icons";
library.add(
  fab,
  faCompass,
  faClock,
  faPhone,
  faEnvelope,
  faShoppingCart,
  faTh,
  faBars,
  faPlusCircle,
  faTruck,
  faCheck,
	faTimes,
	faFrown,
	faSmile
);
// =============================================================================

const store = configureStore();

let render = () => {
  ReactDOM.render(
    <Provider store={store}>
			<MuiThemeProvider theme={theme}>
				<App />
			</MuiThemeProvider>
    </Provider>,
    document.getElementById("root")
  );
};

if (module.hot) {
  module.hot.accept("./app/layout/App", () => {
    setTimeout(render);
  });
}

render();

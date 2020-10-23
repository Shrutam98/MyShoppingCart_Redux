import React from "react";
import "App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Input } from "antd";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import { store } from "actions/store";
import Navingation from "components/Shared/Navingation";
import { ToastProvider } from "react-toast-notifications";

function App() {
  return (
    <>
      <Provider store={store}>
        <ToastProvider autoDismiss={true}>
          <Navingation />
        </ToastProvider>
      </Provider>
    </>
  );
}

export default App;

import React, { useContext, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useIdleTimer } from "react-idle-timer";
// style
import "./assets/scss/main.css";
import "react-toastify/dist/ReactToastify.css";

// my component
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import { contextApi } from "context/GlobalContext";

const App = () => {
  const [isTimeout, setIsTimeout] = useState(false);
  let { authDetails, LoginOut } = useContext(contextApi);
  const token = authDetails && authDetails.token;

  // const handleOnIdle = (event) => {
  //   console.log("user is idle", event);
  //   console.log("last active", getLastActiveTime());
  // };

  const handleOnActive = (event) => {
    console.log("user is active", event);
    console.log("time remaining", getRemainingTime());
    if (getRemainingTime() == 0) {
      LoginOut();
    }
  };
  // useEffect(() => {
  //   window.onunload = () => {
  //     // Clear the local storage
  //     window.localStorage.clear();
  //   };
  // }, []);

  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 60 * 15,
    // onIdle: handleOnIdle,
    onActive: handleOnActive,
    // onAction: handleOnAction,
    debounce: 500,
  });
  return (
    <BrowserRouter>
      <Switch>
        {!token ? (
          <>
            <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
            <Redirect from="/" to="/auth/login" />
          </>
        ) : (
          <>
            <Route
              path="/admin"
              render={(props) => <AdminLayout {...props} />}
            />
            <Redirect from="/" to="/admin/bank" />
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
};

export default App;

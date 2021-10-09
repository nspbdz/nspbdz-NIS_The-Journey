import { useState, useContext, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { UserContext } from "./context/userContext";
import ModalSignin from "./components/modal/ModalSignin"
import Home from "./pages/Home";
import Header from "./components/Header";

import Profile from "./pages/Profile";
import Bookmark from "./pages/Bookmark";
import DetailJourney from "./pages/DetailJourney"
// import AddJourney from "./pages/AddJourney"

import ListJourney from "./pages/ListJourney"
import AddJourney from "./pages/AddJourney"
import UpdateJourney from "./pages/UpdateJourney"

import { API, setAuthToken } from "./config/api";

// init token on axios every time the app is refreshed
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
console.log(localStorage.token)
function App() {
  const [show, setshow] = useState(false);
  const [newCheckUser, setNewCheckUser] = useState(false);

  let history = useHistory();
  const [state, dispatch] = useContext(UserContext);
  console.clear();

  // console.log(state);
  // console.log(state.user.listAs);
  console.log(localStorage.token)
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    if (!state.isLogin) {
      setshow(true);
    }
    //   // Redirect Auth
    if (state.isLogin === false) {
      history.push("/");
    }
    else {
      if (state.user.listAs === 1) {
        history.push("/");
      } else if (state.user.listAs === "customer") {
        history.push("/");
      }
    }
    return () => {
      setshow(false)
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      // console.log(response)
      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data.user;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);
// }, [newCheckUser]);
  // console.log(checkUser)
  return (
    <>
      <Header />
      

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/journey/:id" component={DetailJourney} />
        <Route exact path="/listjourney" component={ListJourney} />
        <Route exact path="/addjourney" component={AddJourney} />
        <Route exact path="/updatejourney/:id" component={UpdateJourney} />
        {/* <Route exact path="/addJourney" component={AddJourney} /> */}

        <Route exact path="/profile" component={Profile} />
        <Route exact path="/bookmark" component={Bookmark} />

      </Switch>

    </>
  );
}

export default App;

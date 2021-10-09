import { Redirect, Route } from "react-router-dom";

/**
 * Wrapper component to protect particular route
 * we use conditional rendering base on state to check
 * if there is user login or not
 * if login: render Component
 * if not: redirect to home path
 */
const PrivateRoute = ({ component: Component, ...rest }) => {
  const login = true;

  return (
    <>
      <Route
        {...rest}
        render={(props) =>
          login ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    </>
  );
};

export default PrivateRoute;

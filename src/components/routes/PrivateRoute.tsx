import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest}: any) => (
  <Route
    {...rest}
    render={props => (!!localStorage.getItem('request_token') && !!localStorage.getItem('api_key')) ? <Component {...props} /> : <Redirect to="/login" />}
  />
);

export default PrivateRoute;

// const FilmsRoute = ({component: Component, ...rest }: any) => (
//   <Route {...rest} render={PrivateRender(Component)} />
// );

// const PrivateRender = (Component: any) => {
//   return (props: any) => {
//     return <Component {...props}/>;
//   };
// };

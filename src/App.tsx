import * as React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom'

import './App.css';
import PrivateRoute from './components/routes/PrivateRoute';
import * as Loadable from "react-loadable";
import {Loader} from "semantic-ui-react";

export const Films = Loadable({
    loader: () => import('./components/pages/films/Films'),
    loading: () => (<Loader active inline='centered' />),
});

export const Login = Loadable({
    loader: () => import('./components/pages/login/LoginPage'),
    loading: () => (<Loader active inline='centered' />),
});

interface AppState {
  apiKey: string | null;
  requestToken: string | null;
  sessionId: string | null
}

class App extends React.Component<any, AppState> {

  constructor(props: any) {
    super(props);

    this.state = {
      apiKey: localStorage.getItem('api_key'),
      requestToken: localStorage.getItem('request_token'),
      sessionId: null
    }

  }

  public render() {
    return (
      <div className="container">
        <Switch>
            <Route exact path="/login" component={Login} />
            <PrivateRoute path="/films" component={Films}/>
            <Redirect to="/films"/>
        </Switch>

      </div>
    );
  }
}

export default App;

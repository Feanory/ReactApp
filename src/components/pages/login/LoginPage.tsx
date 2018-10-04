import * as React from 'react';
import LoginForm from '../../forms/LoginForm';
import * as config from '../../../config/apiUrl'
import axios from 'axios';
import './LoginPage.css';

class LoginPage extends React.Component {

  componentWillMount() {
    localStorage.clear();
    sessionStorage.clear();
  }

  public submit(data: { apiKey: string }) {
    if (data.apiKey) {
        this.sentLoginRequest(data.apiKey);
    }
  }

  public sentLoginRequest(apiKey: string) {
      axios.get(config.apiUrl + `/3/authentication/token/new?api_key=${apiKey}`)
          .then((res: any) => {
              const redirectUrl = process.env.REACT_APP_PUBLIC_HOMEPAGE || 'http://localhost:3000/films';
              localStorage.setItem('request_token', res.data.request_token);
              localStorage.setItem('api_key', apiKey);
              window.location.replace(`https://www.themoviedb.org/authenticate/${res.data.request_token}?redirect_to=${redirectUrl}`);
          })
  }

  public render() {
    return (
      <div className="ui center aligned middle aligned grid" style={{ height: '100%' }}>
        <div className="column login-form-container">
          <LoginForm submit={(e: { apiKey: string }) => this.submit(e)}/>
        </div>

      </div>
    )
  }
}

export default LoginPage;
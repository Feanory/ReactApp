import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { config } from 'dotenv';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

config();

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import App from './modules/App';
import Create from './modules/Create';

import getLinks from './utils/getLinks';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" onChange={getLinks} component={App}>
      <Route path="/create" component={Create} />
    </Route>
  </Router>
  ), document.getElementById('app')
);


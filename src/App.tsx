import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './components/main/Main';
import Admin from './components/admin/Admin';
import Login from './components/admin/login/Login';
import PageNotFound from './components/general/404/PageNotFound';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/admin-dashboard" component={Admin} />
        <Route exact path="/admin-login" component={Login} />
        <Route path="/" component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

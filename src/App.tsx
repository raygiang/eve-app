import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './components/main/Main';
import Admin from './components/admin/Admin';
import AdminLogin from './components/admin/login/Login';
import './App.scss';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/admin-login" component={AdminLogin} />
        <Route path="/admin-dashboard" component={Admin} />
        <Route path="/" component={Main} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

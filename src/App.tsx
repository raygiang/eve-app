import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from './store/reducers/rootReducer';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Admin from './components/admin/Admin';
import Login from './components/admin/login/Login';
import './style/theme.scss';

const App = () => {
  const auth = useSelector((state: RootState) => state.firebase.auth, shallowEqual);

  if(auth.isLoaded) {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/admin-dashboard" component={Admin} />
          <Route path="/admin-login" component={Login} />
        </Switch>
      </BrowserRouter>
    );
  }
  else {
    return <></>
  }
}

export default App;

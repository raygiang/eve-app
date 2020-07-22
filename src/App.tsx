import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from './store/reducers/rootReducer';
import Main from './components/main/Main';
import Admin from './components/admin/Admin';
import Login from './components/admin/login/Login';

const App = () => {
  const auth = useSelector((state: RootState) => state.firebase.auth, shallowEqual);

  if(auth.isLoaded) {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Main} />
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

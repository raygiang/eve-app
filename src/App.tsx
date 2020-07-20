import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Admin from './components/admin/Admin';
import { RootState } from './store/reducers/rootReducer';

const App = () => {
  const auth = useSelector((state: RootState) => state.firebase.auth, shallowEqual);
  
  if(auth.isLoaded) {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/admin-dashboard" component={Admin} />
        </Switch>
      </BrowserRouter>
    );
  }
  else {
    return <></>
  }
}

export default App;

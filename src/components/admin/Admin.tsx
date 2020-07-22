import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import { RootState } from '../../store/reducers/rootReducer';
import { Redirect } from 'react-router-dom';
import Header from './header/Header';
import Home from './home/Home';
import EditHome from './edit-home/EditHome';
import WordCategories from './word-categories/WordCategories';
import WeeklyStudyGuides from './weekly-study-guides/WeeklyStudyGuides';
import PageNotFound from '../general/404/PageNotFound';
import Loading from '../general/loading/Loading';
import './Admin.scss'

const Admin = () : JSX.Element => {
  const auth = useSelector((state: RootState) => state.firebase.auth, isEqual);
  
  if(!auth.isLoaded) {
    return (
      <section className="admin-dashboard">
        <Header />
        <Loading />
      </section>
    );
  }
  else if(!auth.uid) {
    return <Redirect to='/admin-login' />
  }
  console.log("LOAD ADMIN");

  return (
    <section className="admin-dashboard">
      <Header />
      <Switch>
        <Route exact path="/admin-dashboard" component={Home} />
        <Route exact path="/admin-dashboard/edit-home" component={EditHome} />
        <Route exact path="/admin-dashboard/word-categories" component={WordCategories} />
        <Route exact path="/admin-dashboard/weekly-study-guides" component={WeeklyStudyGuides} />
        <Route path="/admin-dashboard" component={PageNotFound} />
      </Switch>
    </section>
  )
}

export default Admin;

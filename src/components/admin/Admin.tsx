import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../store/reducers/rootReducer';
import { Redirect } from 'react-router-dom';
import Header from './header/Header';
import Home from './home/Home';
import EditHome from './edit-home/EditHome';
import WordCategories from './word-categories/WordCategories';
import WeeklyStudyGuides from './weekly-study-guides/WeeklyStudyGuides';
import './Admin.scss'

const Admin = () => {
  const auth = useSelector((state: RootState) => state.firebase.auth, shallowEqual);

  if(!auth.uid) {
    return <Redirect to='/admin-login' />
  }

  return (
    <section className="admin-dashboard">
      <Header />
      <Route exact path="/admin-dashboard" component={Home} />
      <Route path="/admin-dashboard/edit-home" component={EditHome} />
      <Route path="/admin-dashboard/word-categories" component={WordCategories} />
      <Route path="/admin-dashboard/weekly-study-guides" component={WeeklyStudyGuides} />
    </section>
  )
}

export default Admin;

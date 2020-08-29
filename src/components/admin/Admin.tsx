import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import { RootState } from '../../store/reducers/rootReducer';
import { Redirect } from 'react-router-dom';
import Header from './header/Header';
import Home from './home/Home';
import EditHome from './edit-home/EditHome';
import Language from './language/Language';
import WordCategories from './word-categories/WordCategories';
import Subcategories from './subcategories/Subcategories';
import Groups from './groups/Groups';
import Group from './group/Group';
import Exercise from './exercise/Exercise';
import WeeklyStudyGuides from './weekly-study-guides/WeeklyStudyGuides';
import AddGuide from './add-guide/AddGuide';
import EditGuide from './edit-guide/EditGuide';
import Footer from './footer/Footer';
import PageNotFound from '../general/404/PageNotFound';
import Loading from '../general/loading/Loading';

const Admin = (): JSX.Element => {
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

  return (
    <main className="admin-dashboard">
      <Header />
      <Switch>
        <Route exact path="/admin-dashboard" component={Home} />
        <Route exact path="/admin-dashboard/edit-home" component={EditHome} />
        <Route exact path="/admin-dashboard/language/:languageId" component={Language} />
        <Route exact path="/admin-dashboard/word-categories" component={WordCategories} />
        <Route exact path="/admin-dashboard/subcategories/:categoryId" component={Subcategories} />
        <Route exact path="/admin-dashboard/groups/:subcategoryId" component={Groups} />
        <Route exact path="/admin-dashboard/group/:subcategoryId/:groupId" component={Group} />
        <Route exact path="/admin-dashboard/exercise/:subcategoryId/:groupId/:exerciseId" component={Exercise} />
        <Route exact path="/admin-dashboard/weekly-study-guides" component={WeeklyStudyGuides} />
        <Route exact path="/admin-dashboard/add-study-guide" component={AddGuide} />
        <Route exact path="/admin-dashboard/edit-study-guide/:guideId" component={EditGuide} />
        <Route path="/admin-dashboard" component={PageNotFound} />
      </Switch>
      <Footer />
    </main>
  )
}

export default Admin;

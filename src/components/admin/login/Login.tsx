import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../../store/reducers/rootReducer';
import { Redirect } from 'react-router-dom';
import LoginForm from './LoginForm/LoginForm';
import './Login.scss';

const Login = () : JSX.Element => {
  const auth = useSelector((state: RootState) => state.firebase.auth, shallowEqual);

  if(!auth.isLoaded) {
    return <></>;
  }
  if(auth.uid) {
    return <Redirect to='/admin-dashboard' />
  }

  return (
    <section className="login-page">
      <div className="login-page__wrapper page-wrapper">
        <h1 className="login-page__heading">EVE - Administrative Dashboard</h1>
        <LoginForm />
      </div>
    </section>
  )
}

export default Login;

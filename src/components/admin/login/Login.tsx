import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../../store/reducers/rootReducer';
import { Redirect } from 'react-router-dom';
import LoginForm from './LoginForm/LoginForm';

const Login = () => {
  const auth = useSelector((state: RootState) => state.firebase.auth, shallowEqual);

  if(auth.uid) {
    return <Redirect to='/admin-dashboard' />
  }

  return (
    <section className="login-page">
      <h1 className="login-page__heading">Log in to the Admin Dashboard</h1>
      <LoginForm />
    </section>
  )
}

export default Login;

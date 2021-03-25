import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../../store/reducers/rootReducer';
import { Redirect } from 'react-router-dom';
import RegisterForm from './RegisterForm/RegisterForm';
import './Register.scss';

const Register = (): JSX.Element => {
  const auth = useSelector((state: RootState) => state.firebase.auth, shallowEqual);

  if(!auth.isLoaded) {
    return <></>;
  }
  if(auth.uid) {
    return <Redirect to='/' />
  }

  return (
    <section className="register-page">
      <div className="register-page__wrapper page-wrapper">
        <h1 className="register-page__heading">English Vocabulary Exercises - Register</h1>
        <RegisterForm />
        <div className="register-page__register-container">
          <Link to="/login">Already have an account? Log in here.</Link>
        </div>
      </div>
    </section>
  )
}

export default Register;

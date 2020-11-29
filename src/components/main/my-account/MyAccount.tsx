import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../../store/reducers/rootReducer';
import { Redirect } from 'react-router-dom';
import AccountForm from './AccountForm/AccountForm';
import './MyAccount.scss';

const MyAccount = (): JSX.Element => {
  const auth = useSelector((state: RootState) => state.firebase.auth, shallowEqual);

  if(!auth.isLoaded) {
    return <></>;
  }
  if(!auth.uid) {
    return <Redirect to='/' />
  }

  console.log(auth);

  return (
    <section className="account-page">
      <div className="account-page__wrapper page-wrapper">
        <h1 className="account-page__heading">{'Welcome Back' + (auth.displayName ? ` ${auth.displayName}` : '!')}</h1>
        <div className="account-page__overview">
          <p>
            This is the interface for editing an exercise inside of a group.
            Please upload your htm export from Gerry's Vocabulary Teacher to proceed.
          </p>
        </div>
        <AccountForm auth={auth} />
      </div>
    </section>
  )
}

export default MyAccount;

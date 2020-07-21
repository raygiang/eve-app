import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../store/reducers/rootReducer';
import { Redirect } from 'react-router-dom';

const Admin = () => {
  const auth = useSelector((state: RootState) => state.firebase.auth, shallowEqual);

  if(!auth.uid) {
    return <Redirect to='/admin-login' />
  }

  return (
    <div>
      <h1>ADMIN</h1>
    </div>
  )
}

export default Admin;

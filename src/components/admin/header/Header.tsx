import React from 'react';
import './Header.scss';
import firebase from '../../../config/firebaseConfig';

const Header = () => {
  const logOut = () : void => {
    firebase.auth().signOut();
  }

  return (
    <header className="admin-header">
      <div className="admin-header__wrapper page-wrapper">
        <div className="admin-header__heading">
          <a href="/admin-dashboard">
            English Vocabulary Exercises - Admin
          </a>
        </div>
        <nav className="admin-header__nav">
          <ul>
            <li><a href="/admin-dashboard/edit-home">Edit Home</a></li>
            <li><a href="/admin-dashboard/word-categories">Edit Word Categories</a></li>
            <li><a href="/admin-dashboard/weekly-study-guides">Edit Weekly Exercises</a></li>
            <li><button onClick={logOut}>Log Out</button></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header;

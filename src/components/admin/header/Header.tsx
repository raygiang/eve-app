import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import firebase from '../../../config/firebaseConfig';
import './Header.scss';

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
            <li><Link to="/admin-dashboard/edit-home">Edit Home</Link></li>
            <li><Link to="/admin-dashboard/word-categories">Edit Word Categories</Link></li>
            <li><Link to="/admin-dashboard/weekly-study-guides">Edit Weekly Exercises</Link></li>
            <li>
              <button onClick={logOut} title="Log Out">
                <FontAwesomeIcon icon={faDoorOpen} />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header;
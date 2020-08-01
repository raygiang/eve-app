import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = (): JSX.Element => {
  return (
    <header className="header">
      <div className="header__wrapper page-wrapper">
        <div className="header__heading">
          <a href="/">
            English Vocabulary Exercises
          </a>
        </div>
        <nav className="header__nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/word-categories">Word Categories</Link></li>
            <li><Link to="/weekly-study-guides">Weekly Study Guides</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header;

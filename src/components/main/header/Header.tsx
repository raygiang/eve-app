import React, { createRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Header.scss';

const Header = (): JSX.Element => {
  const menuRef = createRef<HTMLElement>();
  const firstLinkRef = createRef<HTMLAnchorElement>();
  const mobileOverlay = createRef<HTMLDivElement>();
  const currentPath = window.location.pathname.split('/')[1] || null;
  const homePaths: (string | null)[] = [null];
  const wordCategoryPaths: (string | null)[] = ['word-categories', 'subcategories', 'groups', 'group', 'exercise'];
  const studyGuidePaths: (string | null)[] = ['weekly-study-guides', 'weekly-study-guide'];

  const toggleMobileMenu = () => {
    menuRef.current?.classList.toggle('show');
    mobileOverlay.current?.classList.toggle('show');
    if(menuRef.current?.classList.contains('show')) firstLinkRef.current?.focus();
  }

  return (
    <header className="header">
      <div className="header__wrapper page-wrapper">
        <div className="header__heading">
          <Link to="/">
            English Vocabulary Exercises
          </Link>
        </div>
        <div className="header__mobile-overlay" ref={mobileOverlay} onClick={toggleMobileMenu} />
        <nav className="header__nav" ref={menuRef}>
          <button className="header__close-button" onClick={toggleMobileMenu}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <ul className="header__nav-list">
            <li>
              <Link to="/" ref={firstLinkRef} className={homePaths.includes(currentPath) ? 'current' : undefined}>Home</Link>
            </li>
            <li>
              <Link to="/word-categories" className={wordCategoryPaths.includes(currentPath) ? 'current' : undefined}>Word Categories</Link>
            </li>
            <li>
              <Link to="/weekly-study-guides" className={studyGuidePaths.includes(currentPath) ? 'current' : undefined}>Weekly Study Guides</Link>
            </li>
          </ul>
        </nav>
        <button className="header__burger-button" onClick={toggleMobileMenu}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
    </header>
  )
}

export default Header;

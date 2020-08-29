import React, { createRef, useEffect, useCallback } from 'react';
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

  const toggleMobileMenu = (): void => {
    menuRef.current?.classList.toggle('show');
    mobileOverlay.current?.classList.toggle('show');
    if(menuRef.current?.classList.contains('show')) firstLinkRef.current?.focus();
  }

  const hideMobileMenu = useCallback((): void => {
    menuRef.current?.classList.remove('show')
    mobileOverlay.current?.classList.remove('show');
  }, [menuRef, mobileOverlay]);

  const checkCurrentPath = (pathList: (string | null)[]): string | undefined => {
    return pathList.includes(currentPath) ? 'current' : undefined;
  }

  useEffect((): (() => void) => {
    const escapeHandler = (e: KeyboardEvent) => {
      if(e.keyCode === 27) {
        if(menuRef.current?.classList.contains('show')) hideMobileMenu();
      }
    }

    window.addEventListener('keydown', escapeHandler);

    return (): void => {
      window.removeEventListener('keydown', escapeHandler);
    }
  }, [hideMobileMenu, menuRef]);

  return (
    <header className="header">
      <div className="header__wrapper page-wrapper">
        <div className="header__heading">
          <Link to="/">
            English Vocabulary Exercises
          </Link>
        </div>
        <div className="header__mobile-overlay" ref={mobileOverlay} onClick={hideMobileMenu} />
        <nav className="header__nav" ref={menuRef}>
          <button className="header__close-button" onClick={toggleMobileMenu}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <ul className="header__nav-list">
            <li>
              <Link to="/" ref={firstLinkRef} className={checkCurrentPath(homePaths)}>Home</Link>
            </li>
            <li>
              <Link to="/word-categories" className={checkCurrentPath(wordCategoryPaths)}>Word Categories</Link>
            </li>
            <li>
              <Link to="/weekly-study-guides" className={checkCurrentPath(studyGuidePaths)}>Weekly Study Guides</Link>
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

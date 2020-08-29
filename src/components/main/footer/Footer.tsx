import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = (): JSX.Element => {
  return (
    <footer className="main-footer">
      <div className="main-footer__wrapper page-wrapper">
        <div className="main-footer__link-container">
          <a rel="noopener noreferrer" target="_blank" className="main-footer__link" href="http://www.cpr4esl.com/">Gerry's Vocabulary Teacher</a>
          <a rel="noopener noreferrer" target="_blank" className="main-footer__link" href="https://www.facebook.com/pages/English-Vocabulary-Exercises/179726835407325">Facebook</a>
          <Link className="main-footer__link" to="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer;

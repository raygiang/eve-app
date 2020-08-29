import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = (): JSX.Element => {
  return (
    <footer className="admin-footer">
      <div className="admin-footer__wrapper page-wrapper">
        <div className="admin-footer__link-container">
          <Link className="admin-footer__link" to="/">To Main Website</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer;

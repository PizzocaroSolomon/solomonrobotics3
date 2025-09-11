import React, { useState } from 'react';
import { Link } from 'gatsby';
import * as styles from '../styles/header.module.css';
import * as utils from '../styles/utils.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={utils.container}>
        <div className={styles.headerContent}>
          <Link to="/" className={styles.logo}>
            <h1>Consulting Pro</h1>
          </Link>
          
          <nav className={styles.nav}>
            <ul className={`${styles.navList} ${isMenuOpen ? styles.navListOpen : ''}`}>
              <li><Link to="/" className={styles.navLink} activeClassName={styles.navLinkActive}>Home</Link></li>
              <li><Link to="/services" className={styles.navLink} activeClassName={styles.navLinkActive}>Services</Link></li>
              <li><Link to="/portfolio" className={styles.navLink} activeClassName={styles.navLinkActive}>Portfolio</Link></li>
              <li><Link to="/about" className={styles.navLink} activeClassName={styles.navLinkActive}>About</Link></li>
              <li><Link to="/contact" className={styles.navLink} activeClassName={styles.navLinkActive}>Contact</Link></li>
            </ul>
            
            <button 
              className={styles.menuToggle}
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
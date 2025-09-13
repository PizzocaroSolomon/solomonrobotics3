import React from 'react';
import { Link } from 'gatsby';
import * as styles from '../styles/footer.module.css';
import * as utils from '../styles/utils.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={utils.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3>Solomon Pizzocaro Consulting</h3>
            <address className={styles.address}>
              Via San Michele Arcangelo, 13<br />
              Varese, VA 21100<br />
              <a href="mailto:solomon.pizzocaro.consulting@gmail.com">solomon.pizzocaro.consulting@gmail.com</a><br />
              <a href="tel:+39-346-638-0084">(346) 638-0084</a>
            </address>
          </div>
          
          <div className={styles.footerSection}>
            <h3>Quick Links</h3>
            <nav>
              <ul className={styles.footerNav}>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/portfolio">Portfolio</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </nav>
          </div>
          
          <div className={styles.footerSection}>
            <h3>Legal</h3>
            <nav>
              <ul className={styles.footerNav}>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
              </ul>
            </nav>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p>&copy; {currentYear} Consulting Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
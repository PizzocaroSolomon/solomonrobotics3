import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Seo from './Seo';
import * as styles from '../styles/layout.module.css';

const Layout = ({ children, pageTitle, pageDescription }) => {
  return (
    <>
      <Seo title={pageTitle} description={pageDescription} />
      <div className={styles.layout}>
        <Header />
        <main className={styles.main}>
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
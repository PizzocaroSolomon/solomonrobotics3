import React from 'react';
import { Link } from 'gatsby';
import * as styles from '../styles/about.module.css';
import * as utils from '../styles/utils.module.css';

const AboutSection = () => {
  return (
    <section id="about" className={styles.aboutSection}>
      <div className={utils.container}>
        <div className={styles.aboutContent}>
          <h2>About Our Company</h2>
          <p className={styles.aboutText}>
            With over a decade of experience in business consulting, we've helped 
            hundreds of companies streamline their operations, increase efficiency, 
            and achieve sustainable growth. Our team of experts brings deep industry 
            knowledge and proven methodologies to every project.
          </p>
          <Link to="/about" className={styles.learnMoreButton}>
            Learn More About Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
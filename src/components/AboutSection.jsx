import React from 'react';
import { Link } from 'gatsby';
import * as styles from '../styles/about.module.css';
import * as utils from '../styles/utils.module.css';

const AboutSection = () => {
  return (
    <section id="about" className={styles.aboutSection}>
      <div className={utils.container}>
        <div className={styles.aboutContent}>
          <h2>About Our Expertise</h2>
          <p className={styles.aboutText}>
            We are a specialized engineering consultancy focused on embedded systems, 
            autonomous robotics, artificial intelligence, and data analytics. Our expertise 
            spans the complete development lifecycle from system architecture and embedded 
            software to AI integration and real-time data platforms. We deliver solutions 
            that combine cutting-edge technology with practical engineering excellence.
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
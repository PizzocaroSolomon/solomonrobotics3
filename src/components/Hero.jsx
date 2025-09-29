import React from 'react';
import { Link } from 'gatsby';
import * as styles from '../styles/hero.module.css';
import * as utils from '../styles/utils.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={utils.container}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              Advanced Engineering Solutions for Autonomous Systems
            </h1>
            <p className={styles.heroSubtitle}>
              We deliver comprehensive engineering solutions spanning embedded systems, 
              autonomous robotics, artificial intelligence, and data analytics. 
              Transforming complex technical challenges into robust, production-ready systems.
            </p>
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>4</span>
                <span className={styles.statLabel}>Core Services</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>10+</span>
                <span className={styles.statLabel}>Years Experience</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>100%</span>
                <span className={styles.statLabel}>Client Satisfaction</span>
              </div>
            </div>
            <div className={styles.heroCtas}>
              <Link to="/services" className={`${styles.ctaButton} ${styles.ctaPrimary}`}>
                Our Services
              </Link>
              <Link to="/portfolio" className={`${styles.ctaButton} ${styles.ctaSecondary}`}>
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
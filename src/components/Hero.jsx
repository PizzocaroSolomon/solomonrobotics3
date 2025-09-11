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
              Autonomous Systems & Mobile Robotics Consultant
            </h1>
            <p className={styles.heroSubtitle}>
              From Research to Production - Transforming Complex Robotics Challenges 
              into Reliable Solutions. PhD in Systems & Control with proven industry 
              experience in autonomous driving and agricultural robotics.
            </p>
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>PhD</span>
                <span className={styles.statLabel}>Systems & Control</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>5+</span>
                <span className={styles.statLabel}>Years Experience</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>BMW</span>
                <span className={styles.statLabel}>Industry Partner</span>
              </div>
            </div>
            <div className={styles.heroCtas}>
              <Link to="/about" className={`${styles.ctaButton} ${styles.ctaPrimary}`}>
                View My Experience
              </Link>
              <Link to="/services" className={`${styles.ctaButton} ${styles.ctaSecondary}`}>
                Consulting Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
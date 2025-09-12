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
              Advanced Control Systems & Engineering Solutions
            </h1>
            <p className={styles.heroSubtitle}>
              We specialize in cutting-edge control systems engineering, from autonomous 
              driving and sensor fusion to embedded software and AI integration. 
              Transforming complex engineering challenges into reliable, production-ready solutions.
            </p>
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>8+</span>
                <span className={styles.statLabel}>Core Services</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>15+</span>
                <span className={styles.statLabel}>Projects Delivered</span>
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
import React from 'react';
import { Link } from 'gatsby';
import servicesData from '../data/servicesData';
import * as styles from '../styles/services.module.css';
import * as utils from '../styles/utils.module.css';

const ServicesSection = ({ showAll = false }) => {
  const displayServices = showAll ? servicesData : servicesData.slice(0, 3);
  
  return (
    <section id="services" className={styles.servicesSection}>
      <div className={utils.container}>
        <div className={styles.servicesHeader}>
          <h2>Our Services</h2>
          <p className={styles.servicesSubtitle}>
            Comprehensive consulting solutions tailored to your business needs
          </p>
        </div>
        
        <div className={`${utils.grid} ${styles.servicesGrid}`}>
          {displayServices.map((service) => (
            <div key={service.id} className={styles.serviceCard}>
              <h3>{service.title}</h3>
              <p>{showAll ? service.fullDescription : service.excerpt}</p>
              <Link to="/services" className={styles.readMoreButton}>
                Read More
              </Link>
            </div>
          ))}
        </div>
        
        {!showAll && (
          <div className={styles.servicesFooter}>
            <Link to="/services" className={styles.viewAllButton}>
              View All Services
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
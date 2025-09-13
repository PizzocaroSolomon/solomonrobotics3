import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/Layout';
import NavigationDemo from '../components/NavigationDemo';
import PerceptionDemo from './SensorFusionDemo';
import * as styles from '../styles/service-template.module.css';
import * as utils from '../styles/utils.module.css';
import SensorFusionDemo from './SensorFusionDemo';

const ServiceTemplate = ({ service, allServices }) => {
  const otherServices = allServices.filter(s => s.id !== service.id);

  const renderDemo = () => {
    if (!service.hasDemo) return null;
    
    if (service.demoComponent === 'NavigationDemo') {
      return <NavigationDemo />;
    }

    if (service.demoComponent === 'SensorFusionDemo') {
      return <SensorFusionDemo />;
    }
    
    return null;
  };

  const renderVisualization = () => {
    if (service.hasDemo) {
      return renderDemo();
    }
    
    // For services without interactive demos, show a placeholder image
    return (
      <div className={styles.imageVisualization}>
        <img 
          src={`/images/service-${service.slug}.jpg`} 
          alt={service.title}
          onError={(e) => {
            // Fallback to a generic placeholder
            e.target.src = '/images/service-placeholder.jpg';
          }}
        />
      </div>
    );
  };

  return (
    <Layout 
      pageTitle={service.title}
      pageDescription={service.excerpt}
    >
      {/* Combined Header and Visualization Section */}
      <section className={styles.serviceHero}>
        <div className={utils.container}>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1>{service.title}</h1>
              <p className={styles.serviceExcerpt}>{service.excerpt}</p>
            </div>
            <div className={styles.heroVisualization}>
              {renderVisualization()}
            </div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className={styles.serviceDetails}>
        <div className={utils.container}>
          <div className={styles.detailsGrid}>
            <div className={styles.mainContent}>
              <h2>Service Overview</h2>
              <p className={styles.fullDescription}>{service.fullDescription}</p>

              <h3>Key Features</h3>
              <ul className={styles.featuresList}>
                {service.keyFeatures.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>

              <h3>Applications</h3>
              <div className={styles.applicationsGrid}>
                {service.applications.map((application, index) => (
                  <div key={index} className={styles.applicationCard}>
                    {application}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.sidebar}>
              <div className={styles.sidebarCard}>
                <h3>Technologies</h3>
                <div className={styles.technologiesGrid}>
                  {service.technologies.map((tech, index) => (
                    <span key={index} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.sidebarCard}>
                <h3>Get Started</h3>
                <p>Ready to discuss your project?</p>
                <Link to="/contact" className={styles.ctaButton}>
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className={styles.otherServices}>
        <div className={utils.container}>
          <h2>Other Services</h2>
          <div className={styles.servicesGrid}>
            {otherServices.slice(0, 3).map(otherService => (
              <div key={otherService.id} className={styles.serviceCard}>
                <h3>{otherService.title}</h3>
                <p>{otherService.excerpt}</p>
                <Link 
                  to={`/services/${otherService.slug}`}
                  className={styles.serviceLink}
                >
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
          <div className={styles.allServicesLink}>
            <Link to="/services" className={styles.viewAllButton}>
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServiceTemplate;
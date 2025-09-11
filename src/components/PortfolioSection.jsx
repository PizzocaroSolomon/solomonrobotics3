import React from 'react';
import { Link } from 'gatsby';
import portfolioData from '../data/portfolioData';
import * as styles from '../styles/portfolio.module.css';
import * as utils from '../styles/utils.module.css';

const PortfolioSection = ({ showAll = false }) => {
  const displayProjects = showAll ? portfolioData : portfolioData.slice(0, 3);
  
  return (
    <section id="portfolio" className={styles.portfolioSection}>
      <div className={utils.container}>
        <div className={styles.portfolioHeader}>
          <h2>Our Work</h2>
          <p className={styles.portfolioSubtitle}>
            Recent projects that showcase our expertise and results
          </p>
        </div>
        
        <div className={`${utils.grid} ${styles.portfolioGrid}`}>
          {displayProjects.map((project) => (
            <div key={project.id} className={styles.projectCard}>
              <div className={styles.projectImage}>
                <img 
                  src={project.image} 
                  alt={project.title}
                  loading="lazy"
                />
              </div>
              <div className={styles.projectContent}>
                <h3>{project.title}</h3>
                <p>{showAll ? project.fullDescription : project.excerpt}</p>
                <Link to="/portfolio" className={styles.readMoreButton}>
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {!showAll && (
          <div className={styles.portfolioFooter}>
            <Link to="/portfolio" className={styles.viewAllButton}>
              View All Projects
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;
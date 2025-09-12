import React from 'react';
import { Link } from 'gatsby';
import portfolioData from '../data/portfolioData';
import * as styles from '../styles/portfolio.module.css';
import * as utils from '../styles/utils.module.css';

const PortfolioSection = ({ showAll = false }) => {
  // Add slug generation for portfolio items
  const portfolioWithSlugs = portfolioData.map(project => ({
    ...project,
    slug: project.title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }));

  const displayProjects = showAll ? portfolioWithSlugs : portfolioWithSlugs.slice(0, 3);
  
  return (
    <section id="portfolio" className={styles.portfolioSection}>
      <div className={utils.container}>
        <div className={styles.portfolioHeader}>
          <h2>Our Work</h2>
          <p className={styles.portfolioSubtitle}>
            Recent projects showcasing our expertise in control systems and automation
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
                <Link to={`/work/${project.slug}`} className={styles.readMoreButton}>
                  View Project
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
import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/Layout';
import * as styles from '../styles/work-template.module.css';
import * as utils from '../styles/utils.module.css';

const WorkTemplate = ({ project, allProjects }) => {
  const otherProjects = allProjects.filter(p => p.id !== project.id);

  const renderVisualization = () => {
    // Check if project has video
    if (project.video) {
      return (
        <div className={styles.videoContainer}>
          <video 
            controls 
            poster={project.image}
            className={styles.projectVideo}
          >
            <source src={project.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }
    
    // Show image gallery if multiple images
    if (project.images && project.images.length > 1) {
      return (
        <div className={styles.imageGallery}>
          <div className={styles.mainImage}>
            <img src={project.images[0]} alt={`${project.title} - Main`} />
          </div>
          <div className={styles.thumbnails}>
            {project.images.slice(1).map((image, index) => (
              <img 
                key={index}
                src={image} 
                alt={`${project.title} - ${index + 2}`}
                className={styles.thumbnail}
              />
            ))}
          </div>
        </div>
      );
    }
    
    // Single image fallback
    return (
      <div className={styles.singleImage}>
        <img 
          src={project.image || '/images/project-placeholder.jpg'} 
          alt={project.title}
          onError={(e) => {
            e.target.src = '/images/project-placeholder.jpg';
          }}
        />
      </div>
    );
  };

  return (
    <Layout 
      pageTitle={project.title}
      pageDescription={project.excerpt}
    >
      {/* Project Header */}
      <section className={styles.projectHeader}>
        <div className={utils.container}>
          <div className={styles.headerContent}>
            <div className={styles.projectMeta}>
              <span className={styles.client}>{project.client}</span>
              <span className={styles.duration}>{project.duration}</span>
            </div>
            <h1>{project.title}</h1>
            <p className={styles.projectExcerpt}>{project.excerpt}</p>
          </div>
        </div>
      </section>

      {/* Visualization Section */}
      <section className={styles.visualizationSection}>
        <div className={utils.container}>
          {renderVisualization()}
        </div>
      </section>

      {/* Project Details */}
      <section className={styles.projectDetails}>
        <div className={utils.container}>
          <div className={styles.detailsGrid}>
            <div className={styles.mainContent}>
              <h2>Project Overview</h2>
              <p className={styles.fullDescription}>{project.fullDescription}</p>

              {project.challenges && (
                <>
                  <h3>Challenges</h3>
                  <ul className={styles.challengesList}>
                    {project.challenges.map((challenge, index) => (
                      <li key={index}>{challenge}</li>
                    ))}
                  </ul>
                </>
              )}

              {project.solutions && (
                <>
                  <h3>Solutions Implemented</h3>
                  <ul className={styles.solutionsList}>
                    {project.solutions.map((solution, index) => (
                      <li key={index}>{solution}</li>
                    ))}
                  </ul>
                </>
              )}

              <h3>Results Achieved</h3>
              <div className={styles.resultsGrid}>
                {project.results.map((result, index) => (
                  <div key={index} className={styles.resultCard}>
                    {result}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.sidebar}>
              <div className={styles.sidebarCard}>
                <h3>Project Info</h3>
                <div className={styles.projectInfo}>
                  <div className={styles.infoItem}>
                    <strong>Client:</strong>
                    <span>{project.client}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <strong>Duration:</strong>
                    <span>{project.duration}</span>
                  </div>
                  {project.industry && (
                    <div className={styles.infoItem}>
                      <strong>Industry:</strong>
                      <span>{project.industry}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.sidebarCard}>
                <h3>Technologies Used</h3>
                <div className={styles.technologiesGrid}>
                  {project.technologies.map((tech, index) => (
                    <span key={index} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.sidebarCard}>
                <h3>Start Your Project</h3>
                <p>Have a similar challenge? Let's discuss how we can help.</p>
                <Link to="/contact" className={styles.ctaButton}>
                  Get In Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Projects */}
      <section className={styles.otherProjects}>
        <div className={utils.container}>
          <h2>Other Projects</h2>
          <div className={styles.projectsGrid}>
            {otherProjects.slice(0, 3).map(otherProject => (
              <div key={otherProject.id} className={styles.projectCard}>
                <div className={styles.projectImage}>
                  <img 
                    src={otherProject.image || '/images/project-placeholder.jpg'} 
                    alt={otherProject.title}
                    loading="lazy"
                  />
                </div>
                <div className={styles.projectContent}>
                  <h3>{otherProject.title}</h3>
                  <p className={styles.projectClient}>{otherProject.client}</p>
                  <p>{otherProject.excerpt}</p>
                  <Link 
                    to={`/work/${otherProject.slug}`}
                    className={styles.projectLink}
                  >
                    View Project →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.allProjectsLink}>
            <Link to="/portfolio" className={styles.viewAllButton}>
              View All Projects
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WorkTemplate;
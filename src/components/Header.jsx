import React, { useState } from 'react';
import { Link } from 'gatsby';
import * as styles from '../styles/header.module.css';
import * as utils from '../styles/utils.module.css';

// Import the data directly
const servicesData = [
  { id: 1, title: "Embedded & Systems Engineering", slug: "embedded-systems-engineering" },
  { id: 2, title: "Autonomous Systems & Robotics", slug: "autonomous-systems-robotics" },
  { id: 3, title: "Artificial Intelligence & Data Analytics", slug: "ai-data-analytics" },
  { id: 4, title: "Data Platforms & Visualization", slug: "data-platforms-visualization" }
];

const portfolioData = [
  { id: 1, title: "Agricultural Robot Navigation System", slug: "agricultural-robot-navigation-system" },
  { id: 2, title: "Racing Telemetry Platform", slug: "racing-telemetry-platform" },
  { id: 3, title: "Deep Learning Grape Detection", slug: "deep-learning-grape-detection" },
  { id: 4, title: "Optimal Control Path Generation", slug: "optimal-path-generation" }
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDropdownToggle = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  return (
    <header className={styles.header}>
      <div className={utils.container}>
        <div className={styles.headerContent}>
          <Link to="/" className={styles.logo}>
            <div className={styles.logoContainer}>
              <div className={styles.logoIcon}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="32" height="32" rx="6" fill="#0066cc"/>
                  <path d="M8 12h16v2H8v-2zm0 4h16v2H8v-2zm0 4h10v2H8v-2z" fill="white"/>
                  <circle cx="20" cy="20" r="3" fill="#64b5f6"/>
                </svg>
              </div>
              <div className={styles.logoText}>
                <div className={styles.companyName}>SOLOMON PIZZOCARO</div>
                <div className={styles.companyTagline}>consulting</div>
              </div>
            </div>
          </Link>
          
          <nav className={styles.nav}>
            <ul className={`${styles.navList} ${isMenuOpen ? styles.navListOpen : ''}`}>
              <li><Link to="/" className={styles.navLink} activeClassName={styles.navLinkActive}>Home</Link></li>
              
              {/* Services Dropdown */}
              <li 
                className={styles.dropdownContainer}
                onMouseEnter={() => handleDropdownToggle('services')}
                onMouseLeave={closeDropdown}
              >
                <Link 
                  to="/services" 
                  className={`${styles.navLink} ${styles.dropdownTrigger}`} 
                  activeClassName={styles.navLinkActive}
                >
                  Services
                  <span className={styles.dropdownIcon}>▼</span>
                </Link>
                {activeDropdown === 'services' && (
                  <ul className={styles.dropdownMenu}>
                    <li>
                      <Link to="/services" className={styles.dropdownLink}>
                        All Services
                      </Link>
                    </li>
                    {servicesData.map(service => (
                      <li key={service.id}>
                        <Link 
                          to={`/services/${service.slug}`}
                          className={styles.dropdownLink}
                        >
                          {service.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              {/* Portfolio Dropdown */}
              <li 
                className={styles.dropdownContainer}
                onMouseEnter={() => handleDropdownToggle('portfolio')}
                onMouseLeave={closeDropdown}
              >
                <Link 
                  to="/portfolio" 
                  className={`${styles.navLink} ${styles.dropdownTrigger}`} 
                  activeClassName={styles.navLinkActive}
                >
                  Work
                  <span className={styles.dropdownIcon}>▼</span>
                </Link>
                {activeDropdown === 'portfolio' && (
                  <ul className={styles.dropdownMenu}>
                    <li>
                      <Link to="/portfolio" className={styles.dropdownLink}>
                        All Work
                      </Link>
                    </li>
                    {portfolioData.map(project => (
                      <li key={project.id}>
                        <Link 
                          to={`/work/${project.slug}`}
                          className={styles.dropdownLink}
                        >
                          {project.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              <li><Link to="/about" className={styles.navLink} activeClassName={styles.navLinkActive}>About</Link></li>
              <li><Link to="/contact" className={styles.navLink} activeClassName={styles.navLinkActive}>Contact</Link></li>
            </ul>
            
            <button 
              className={styles.menuToggle}
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
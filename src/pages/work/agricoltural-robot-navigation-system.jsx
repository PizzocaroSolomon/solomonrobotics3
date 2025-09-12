import React from 'react';
import WorkTemplate from '../../components/WorkTemplate';
import portfolioData from '../../data/portfolioData';

const AgriculturalRobotPage = () => {
  // Update portfolioData with slug field and additional details
  const updatedPortfolioData = portfolioData.map(project => ({
    ...project,
    slug: project.title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, ''),
    industry: project.industries ? project.industries[0] : 'Technology',
    challenges: [
      "Precise navigation between vineyard rows without GPS signal",
      "Real-time obstacle detection and avoidance",
      "Robust operation in changing weather conditions",
      "Integration of multiple sensor systems"
    ],
    solutions: [
      "Developed advanced sensor fusion algorithm combining GNSS, magnetometer, and odometry",
      "Implemented LiDAR-based terrain analysis for vine row detection",
      "Created robust localization system for GPS-denied environments",
      "Designed fail-safe navigation algorithms for autonomous operation"
    ]
  }));
  
  const project = updatedPortfolioData.find(p => p.slug === 'agricultural-robot-navigation-system');
  const allProjects = updatedPortfolioData;

  return <WorkTemplate project={project} allProjects={allProjects} />;
};

export default AgriculturalRobotPage;

export const Head = () => <title>Agricultural Robot Navigation System | Control Systems Consulting</title>;
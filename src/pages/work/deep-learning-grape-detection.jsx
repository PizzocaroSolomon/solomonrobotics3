// src/pages/work/deep-learning-grape-detection.jsx
import React from 'react';
import WorkTemplate from '../../components/WorkTemplate';
import portfolioData from '../../data/portfolioData';

const GrapeDetectionPage = () => {
  const project = portfolioData.find(p => p.slug === 'deep-learning-grape-detection');
  const allProjects = portfolioData;

  return <WorkTemplate project={project} allProjects={allProjects} />;
};

export default GrapeDetectionPage;

export const Head = () => <title>Deep Learning Grape Detection | Control Systems Consulting</title>;
// src/pages/work/racing-telemetry-platform.jsx
import React from 'react';
import WorkTemplate from '../../components/WorkTemplate';
import portfolioData from '../../data/portfolioData';

const RacingTelemetryPage = () => {
  const project = portfolioData.find(p => p.slug === 'racing-telemetry-platform');
  const allProjects = portfolioData;

  return <WorkTemplate project={project} allProjects={allProjects} />;
};

export default RacingTelemetryPage;

export const Head = () => <title>Racing Telemetry Platform | Control Systems Consulting</title>;
// src/pages/services/data-platforms-visualization.jsx
import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';
import servicesData from '../../data/servicesData';

const TelemetryPage = () => {
  const service = servicesData.find(s => s.slug === 'data-platforms-visualization');
  const allServices = servicesData;

  return <ServiceTemplate service={service} allServices={allServices} />;
};

export default TelemetryPage;

export const Head = () => <title>Telemetry and Data Visualization | Control Systems Consulting</title>;
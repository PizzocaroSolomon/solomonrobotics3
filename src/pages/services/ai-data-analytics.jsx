// src/pages/services/ai-data-analytics.jsx
import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';
import servicesData from '../../data/servicesData';

const AIIntegrationPage = () => {
  const service = servicesData.find(s => s.slug === 'ai-data-analytics');
  const allServices = servicesData;

  return <ServiceTemplate service={service} allServices={allServices} />;
};

export default AIIntegrationPage;

export const Head = () => <title>AI & Data Analytics | Control Systems Consulting</title>;
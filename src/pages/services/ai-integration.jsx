// src/pages/services/ai-integration.jsx
import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';
import servicesData from '../../data/servicesData';

const AIIntegrationPage = () => {
  const service = servicesData.find(s => s.slug === 'ai-integration');
  const allServices = servicesData;

  return <ServiceTemplate service={service} allServices={allServices} />;
};

export default AIIntegrationPage;

export const Head = () => <title>AI Integration | Control Systems Consulting</title>;
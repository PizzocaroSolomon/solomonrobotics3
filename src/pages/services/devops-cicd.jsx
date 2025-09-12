// src/pages/services/devops-cicd.jsx
import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';
import servicesData from '../../data/servicesData';

const DevOpsPage = () => {
  const service = servicesData.find(s => s.slug === 'devops-cicd');
  const allServices = servicesData;

  return <ServiceTemplate service={service} allServices={allServices} />;
};

export default DevOpsPage;

export const Head = () => <title>DevOps and CI/CD | Control Systems Consulting</title>;
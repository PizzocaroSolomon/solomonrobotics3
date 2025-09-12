// src/pages/services/embedded-software-development.jsx
import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';
import servicesData from '../../data/servicesData';

const EmbeddedSoftwarePage = () => {
  const service = servicesData.find(s => s.slug === 'embedded-software-development');
  const allServices = servicesData;

  return <ServiceTemplate service={service} allServices={allServices} />;
};

export default EmbeddedSoftwarePage;

export const Head = () => <title>Embedded Software Development | Control Systems Consulting</title>;
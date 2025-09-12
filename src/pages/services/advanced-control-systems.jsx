// src/pages/services/advanced-control-systems.jsx
import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';
import servicesData from '../../data/servicesData';

const ControlSystemsPage = () => {
  const service = servicesData.find(s => s.slug === 'advanced-control-systems');
  const allServices = servicesData;

  return <ServiceTemplate service={service} allServices={allServices} />;
};

export default ControlSystemsPage;

export const Head = () => <title>Advanced Control Systems (MPC) | Control Systems Consulting</title>;
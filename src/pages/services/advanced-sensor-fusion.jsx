// src/pages/services/advanced-sensor-fusion.jsx
import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';
import servicesData from '../../data/servicesData';

const SensorFusionPage = () => {
  const service = servicesData.find(s => s.slug === 'advanced-sensor-fusion');
  const allServices = servicesData;

  return <ServiceTemplate service={service} allServices={allServices} />;
};

export default SensorFusionPage;

export const Head = () => <title>Advanced Sensor Fusion | Control Systems Consulting</title>;
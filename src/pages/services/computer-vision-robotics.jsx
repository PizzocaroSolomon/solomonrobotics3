// src/pages/services/computer-vision-robotics.jsx
import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';
import servicesData from '../../data/servicesData';

const ComputerVisionPage = () => {
  const service = servicesData.find(s => s.slug === 'computer-vision-robotics');
  const allServices = servicesData;

  return <ServiceTemplate service={service} allServices={allServices} />;
};

export default ComputerVisionPage;

export const Head = () => <title>Computer Vision for Robotics | Control Systems Consulting</title>;
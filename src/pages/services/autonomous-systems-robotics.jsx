import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';
import servicesData from '../../data/servicesData';

const AutonomousDrivingPage = () => {
  const service = servicesData.find(s => s.slug === 'autonomous-systems-robotics');
  const allServices = servicesData;

  return <ServiceTemplate service={service} allServices={allServices} />;
};

export default AutonomousDrivingPage;

export const Head = () => <title>Autonomous Driving & Robotics | Control Systems Consulting</title>;
import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';
import servicesData from '../../data/servicesData';

const EmbeddedSystemsPage = () => {
  const service = servicesData.find(s => s.slug === 'embedded-systems-engineering');
  const allServices = servicesData;

  return <ServiceTemplate service={service} allServices={allServices} />;
};

export default EmbeddedSystemsPage;

export const Head = () => <title>Embedded & Systems Engineering | Solomon Pizzocaro Consulting</title>;
import React from 'react';
import Layout from '../components/Layout';
import ServicesSection from '../components/ServicesSection';

const ServicesPage = () => {
  return (
    <Layout 
      pageTitle="Services"
      pageDescription="Advanced engineering solutions for control systems and automation across multiple industries."
    >
      <ServicesSection showAll={true} />
    </Layout>
  );
};

export default ServicesPage;

export const Head = () => <title>Services | Control Systems Consulting</title>;
import React from 'react';
import Layout from '../components/Layout';
import ServicesSection from '../components/ServicesSection';
import NavigationDemo from '../components/NavigationDemo';

const ServicesPage = () => {
  return (
    <Layout 
      pageTitle="Services"
      pageDescription="Comprehensive consulting services including strategy, operations, technology, and change management."
    >
      <NavigationDemo />
      
      <ServicesSection showAll={true} />
    </Layout>
  );
};

export default ServicesPage;

export const Head = () => <title>Services | Consulting Pro</title>;
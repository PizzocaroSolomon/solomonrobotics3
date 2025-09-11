import React from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import PortfolioSection from '../components/PortfolioSection';
import ContactSection from '../components/ContactSection';

const IndexPage = () => {
  return (
    <Layout 
      pageTitle="Home"
      pageDescription="Professional consulting services to help your business grow and succeed."
    >
      <Hero />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <ContactSection />
    </Layout>
  );
};

export default IndexPage;

export const Head = () => <title>Consulting Pro</title>;
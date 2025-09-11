import React from 'react';
import Layout from '../components/Layout';
import PortfolioSection from '../components/PortfolioSection';

const PortfolioPage = () => {
  return (
    <Layout 
      pageTitle="Portfolio"
      pageDescription="View our recent projects and case studies showcasing successful business transformations."
    >
      <PortfolioSection showAll={true} />
    </Layout>
  );
};

export default PortfolioPage;

export const Head = () => <title>Portfolio | Consulting Pro</title>;
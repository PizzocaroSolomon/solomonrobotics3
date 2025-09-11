import React from 'react';
import Layout from '../components/Layout';
import ContactSection from '../components/ContactSection';

const ContactPage = () => {
  return (
    <Layout 
      pageTitle="Contact"
      pageDescription="Get in touch with our team to discuss your business needs and how we can help."
    >
      <ContactSection />
    </Layout>
  );
};

export default ContactPage;

export const Head = () => <title>Contact | Consulting Pro</title>;
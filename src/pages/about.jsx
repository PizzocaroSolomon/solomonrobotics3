import React from 'react';
import Layout from '../components/Layout';
import * as styles from '../styles/about.module.css';
import * as utils from '../styles/utils.module.css';

const AboutPage = () => {
  return (
    <Layout 
      pageTitle="About Us"
      pageDescription="Learn more about our team, values, and commitment to excellence in business consulting."
    >
      <section className={styles.aboutPageSection}>
        <div className={utils.container}>
          <div className={styles.aboutPageContent}>
            <h1>About Consulting Pro</h1>
            
            <div className={styles.aboutPageText}>
              <p>
                Founded in 2010, Consulting Pro has been at the forefront of business 
                transformation, helping companies across various industries achieve 
                sustainable growth and operational excellence.
              </p>
              
              <p>
                Our team of experienced consultants brings together diverse backgrounds 
                in strategy, operations, technology, and change management. We believe 
                that every business is unique, and we tailor our approach to meet the 
                specific needs and challenges of each client.
              </p>
              
              <h2>Our Mission</h2>
              <p>
                To empower businesses to reach their full potential through innovative 
                solutions, strategic guidance, and collaborative partnerships that drive 
                measurable results.
              </p>
              
              <h2>Our Values</h2>
              <ul className={styles.valuesList}>
                <li><strong>Excellence:</strong> We strive for the highest standards in everything we do</li>
                <li><strong>Integrity:</strong> We build trust through transparent and honest communication</li>
                <li><strong>Innovation:</strong> We embrace new ideas and creative solutions</li>
                <li><strong>Collaboration:</strong> We work as partners with our clients</li>
                <li><strong>Results:</strong> We are committed to delivering measurable outcomes</li>
              </ul>
              
              <h2>Why Choose Us</h2>
              <p>
                With over a decade of experience and a proven track record of success, 
                we have the expertise and knowledge to tackle your most complex business 
                challenges. Our client-centric approach ensures that we understand your 
                unique needs and deliver solutions that work for your organization.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;

export const Head = () => <title>About Us | Consulting Pro</title>;
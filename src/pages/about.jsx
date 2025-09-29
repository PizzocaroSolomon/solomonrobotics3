import React from 'react';
import Layout from '../components/Layout';
import * as styles from '../styles/about.module.css';
import * as utils from '../styles/utils.module.css';

const AboutPage = () => {
  return (
    <Layout 
      pageTitle="About Us"
      pageDescription="Learn more about our expertise in embedded systems, autonomous robotics, AI, and data platforms."
    >
      <section className={styles.aboutPageSection}>
        <div className={utils.container}>
          <div className={styles.aboutPageContent}>
            <h1>About Solomon Pizzocaro Consulting</h1>
            
            <div className={styles.aboutPageText}>
              <p>
                Solomon Pizzocaro Consulting specializes in advanced engineering solutions 
                for embedded systems, autonomous robotics, artificial intelligence, and 
                data platforms. With deep expertise in both theoretical foundations and 
                practical implementation, we help organizations transform complex technical 
                challenges into robust, production-ready systems.
              </p>
              
              <p>
                Our approach combines cutting-edge research with industry best practices, 
                ensuring solutions that are not only innovative but also maintainable, 
                scalable, and aligned with real-world operational requirements.
              </p>
              
              <h2>Our Expertise</h2>
              <p>
                We bring comprehensive capabilities across four core domains:
              </p>
              <ul className={styles.valuesList}>
                <li><strong>Embedded & Systems Engineering:</strong> From low-level drivers to complete system integration</li>
                <li><strong>Autonomous Systems & Robotics:</strong> Multi-sensor perception, SLAM, and intelligent navigation</li>
                <li><strong>Artificial Intelligence & Data Analytics:</strong> NLP, ML, and predictive analytics for industrial applications</li>
                <li><strong>Data Platforms & Visualization:</strong> Real-time telemetry and actionable insights</li>
              </ul>
              
              <h2>Our Approach</h2>
              <p>
                We believe in delivering solutions that balance innovation with practicality. 
                Every project begins with a deep understanding of your specific requirements 
                and constraints. We then architect solutions that leverage modern frameworks 
                like ROS2, implement DevOps best practices, and ensure long-term maintainability 
                through clean code and comprehensive documentation.
              </p>
              
              <h2>Industries We Serve</h2>
              <p>
                Our solutions have been successfully deployed across automotive, industrial 
                automation, robotics, and agriculture sectors. We work with both established 
                organizations and innovative startups, adapting our approach to meet the 
                unique needs of each client.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;

export const Head = () => <title>About Us | Solomon Pizzocaro Consulting</title>;
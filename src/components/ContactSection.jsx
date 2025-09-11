import React, { useState } from 'react';
import * as styles from '../styles/contact.module.css';
import * as utils from '../styles/utils.module.css';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Reset form
      setFormData({ name: '', email: '', message: '' });
      alert('Thank you for your message! We will get back to you soon.');
    }
  };

  return (
    <section id="contact" className={styles.contactSection}>
      <div className={utils.container}>
        <div className={styles.contactHeader}>
          <h2>Get In Touch</h2>
          <p className={styles.contactSubtitle}>
            Ready to start your project? We'd love to hear from you.
          </p>
        </div>
        
        <div className={styles.contactContent}>
          <form onSubmit={handleSubmit} className={styles.contactForm}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.formLabel}>
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`${styles.formInput} ${errors.name ? styles.formInputError : ''}`}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <span id="name-error" className={styles.errorMessage}>
                  {errors.name}
                </span>
              )}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`${styles.formInput} ${errors.email ? styles.formInputError : ''}`}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <span id="email-error" className={styles.errorMessage}>
                  {errors.email}
                </span>
              )}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.formLabel}>
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className={`${styles.formTextarea} ${errors.message ? styles.formInputError : ''}`}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <span id="message-error" className={styles.errorMessage}>
                  {errors.message}
                </span>
              )}
            </div>
            
            <button type="submit" className={styles.submitButton}>
              Send Message
            </button>
          </form>
          
          <div className={styles.contactInfo}>
            <h3>Contact Information</h3>
            <div className={styles.contactDetails}>
              <p>
                <strong>Email:</strong><br />
                <a href="mailto:hello@consultingpro.com">hello@consultingpro.com</a>
              </p>
              <p>
                <strong>Phone:</strong><br />
                <a href="tel:+1-555-123-4567">(555) 123-4567</a>
              </p>
              <p>
                <strong>Address:</strong><br />
                123 Business Street<br />
                Suite 100<br />
                Business City, BC 12345
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
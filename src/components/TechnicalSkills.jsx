import React from 'react';
import skillsData from '../data/skillsData';
import * as styles from '../styles/skills.module.css';
import * as utils from '../styles/utils.module.css';

const TechnicalSkills = () => {
  const renderSkillCategory = (title, skills, categoryKey) => (
    <div key={categoryKey} className={styles.skillCategory}>
      <h3>{title}</h3>
      <div className={styles.skillsList}>
        {skills.map((skill, index) => (
          <div key={index} className={styles.skillItem}>
            <div className={styles.skillHeader}>
              <span className={styles.skillName}>{skill.name}</span>
              <span className={styles.skillLevel}>{skill.level}%</span>
            </div>
            <div className={styles.skillBar}>
              <div 
                className={styles.skillProgress} 
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
            <p className={styles.skillDescription}>{skill.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className={styles.skillsSection}>
      <div className={utils.container}>
        <div className={styles.skillsHeader}>
          <h2>Technical Expertise</h2>
          <p className={styles.skillsSubtitle}>
            Comprehensive skills in robotics, autonomous systems, and software engineering
          </p>
        </div>
        
        <div className={styles.skillsGrid}>
          {renderSkillCategory("Sensors & Hardware", skillsData.sensors, "sensors")}
          {renderSkillCategory("Algorithms", skillsData.algorithms, "algorithms")}
          {renderSkillCategory("Programming", skillsData.programming, "programming")}
          {renderSkillCategory("Tools & DevOps", skillsData.tools, "tools")}
        </div>
      </div>
    </section>
  );
};

export default TechnicalSkills;
const servicesData = [
  {
    id: 1,
    title: "Embedded & Systems Engineering",
    slug: "embedded-systems-engineering",
    excerpt: "Design and development of embedded software and system-level solutions that ensure efficiency, stability, and seamless hardware–software integration.",
    fullDescription: "Comprehensive expertise in embedded systems engineering, spanning from low-level driver development to application software for real-time platforms. Our solutions include C/C++ programming, Linux-based environments, with emphasis on performance, safety, and maintainability. We integrate DevOps practices and CI/CD pipelines for automated testing, continuous validation, and reliable deployments. This approach enables faster development cycles, robust system operation, and long-term scalability across automotive, robotics, and industrial automation industries.",
    keyFeatures: [
      "Low-level driver development for real-time platforms",
      "C/C++ programming for embedded systems",
      "Linux-based embedded environments",
      "DevOps practices and CI/CD pipelines",
      "Automated testing and continuous validation",
      "Performance optimization and safety-critical design"
    ],
    applications: [
      "Automotive embedded systems",
      "Industrial automation controllers",
      "Robotics control units",
      "Real-time operating systems",
      "Safety-critical applications"
    ],
    technologies: ["C/C++", "Linux", "Real-time OS", "DevOps", "CI/CD", "GitLab", "Jenkins"],
    hasDemo: false,
    demoComponent: null
  },
  {
    id: 2,
    title: "Autonomous Systems & Robotics",
    slug: "autonomous-systems-robotics",
    excerpt: "Development of intelligent systems for vehicles and robots that combine perception, localization, and control algorithms to enable safe and reliable autonomy.",
    fullDescription: "Expertise in creating autonomous systems that integrate multi-sensor perception, SLAM, and advanced planning algorithms. We fuse data from LiDAR, radar, cameras, and GNSS/IMU to generate accurate real-time environmental models that support navigation and decision-making in complex scenarios. Our solutions are built on modular frameworks like ROS2, ensuring scalability and smooth integration into robotics and automotive ecosystems. We emphasize adaptability, robustness, and industry standard compliance, enabling both research-driven innovation and real-world deployment in self-driving vehicles, mobile robots, and industrial automation.",
    keyFeatures: [
      "Multi-sensor perception with LiDAR, radar, and cameras",
      "SLAM (Simultaneous Localization and Mapping)",
      "Advanced path planning and navigation algorithms",
      "GNSS/IMU sensor fusion for accurate localization",
      "ROS2-based modular architecture",
      "Real-time environmental modeling and decision-making"
    ],
    applications: [
      "Self-driving vehicles",
      "Mobile autonomous robots",
      "Industrial automation systems",
      "Agricultural robotics",
      "Warehouse automation"
    ],
    technologies: ["ROS2", "LiDAR", "RADAR", "GNSS/IMU", "SLAM", "Computer Vision", "C++", "Python"],
    hasDemo: true,
    demoComponent: "NavigationDemo"
  },
  {
    id: 3,
    title: "Artificial Intelligence & Data Analytics",
    slug: "ai-data-analytics",
    excerpt: "AI and machine learning solutions that automate processes, predict outcomes, and generate actionable insights to improve efficiency and decision-making.",
    fullDescription: "We integrate AI technologies into business and industrial systems, focusing on Natural Language Processing (NLP) and Machine Learning (ML). Our NLP solutions embed intelligent assistants and text analysis tools into workflows, automating repetitive tasks, improving knowledge access, and boosting productivity. For ML applications, we apply predictive models to industrial contexts for fault detection, anomaly identification, demand forecasting, and process optimization. All solutions are designed for scalability and maintainability, with continuous monitoring and retraining strategies ensuring long-term reliability. This approach helps organizations reduce downtime, optimize resources, and leverage data for strategic decision-making.",
    keyFeatures: [
      "Natural Language Processing (NLP) for intelligent assistants",
      "Machine Learning for predictive analytics",
      "Fault detection and anomaly identification",
      "Demand forecasting and process optimization",
      "Continuous monitoring and model retraining",
      "Scalable and maintainable AI solutions"
    ],
    applications: [
      "Intelligent workflow automation",
      "Predictive maintenance systems",
      "Process optimization",
      "Demand forecasting",
      "Anomaly detection in industrial systems"
    ],
    technologies: ["Python", "TensorFlow", "PyTorch", "NLP", "Machine Learning", "scikit-learn", "MLOps"],
    hasDemo: false,
    demoComponent: null
  },
  {
    id: 4,
    title: "Data Platforms & Visualization",
    slug: "data-platforms-visualization",
    excerpt: "Custom telemetry, post-processing, and visualization tools that transform raw data into clear insights and actionable intelligence.",
    fullDescription: "We develop complete data platforms that manage the entire lifecycle from telemetry and real-time data acquisition to advanced post-processing and analytics. Our tailored software tools enable in-depth data analysis, with visualization dashboards designed for both technical and non-technical users. These solutions identify anomalies, evaluate system performance, and extract trends from complex datasets. By converting raw information into accessible insights, organizations can make faster, more informed decisions, improve operational efficiency, and support continuous optimization across their processes.",
    keyFeatures: [
      "Real-time telemetry and data acquisition",
      "Advanced post-processing and analytics",
      "Custom visualization dashboards",
      "Anomaly detection and performance evaluation",
      "Trend analysis from complex datasets",
      "User-friendly interfaces for technical and non-technical users"
    ],
    applications: [
      "Industrial process monitoring",
      "Fleet management systems",
      "Performance analytics platforms",
      "Real-time system monitoring",
      "Data-driven decision support systems"
    ],
    technologies: ["React", "Node.js", "WebSockets", "InfluxDB", "Grafana", "Docker", "Python"],
    hasDemo: false,
    demoComponent: null
  }
];

export default servicesData;
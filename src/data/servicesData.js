const servicesData = [
  {
    id: 1,
    title: "Embedded Software Development",
    slug: "embedded-software-development",
    excerpt: "Real-time embedded systems for industrial automation, robotics, and IoT applications with safety-critical requirements.",
    fullDescription: "We develop robust embedded software solutions for microcontrollers and embedded systems across various industries. Our expertise includes real-time operating systems, device drivers, communication protocols, and safety-critical applications. We work with ARM Cortex, ESP32, STM32, and other popular platforms to deliver reliable and efficient embedded solutions.",
    keyFeatures: [
      "Real-time system development",
      "Safety-critical applications",
      "Device driver development",
      "Communication protocols (CAN, I2C, SPI, UART)",
      "Low-power optimization",
      "Hardware abstraction layers"
    ],
    applications: [
      "Industrial automation controllers",
      "Robotics control units",
      "IoT sensor nodes",
      "Automotive ECUs",
      "Medical devices"
    ],
    technologies: ["C/C++", "FreeRTOS", "ARM Cortex", "STM32", "ESP32", "CAN Bus", "Modbus"],
    hasDemo: false,
    demoComponent: null
  },
  {
    id: 2,
    title: "Autonomous Driving",
    slug: "autonomous-driving",
    excerpt: "End-to-end autonomous navigation systems for mobile robots, agricultural vehicles, and autonomous cars.",
    fullDescription: "Complete autonomous driving solutions from perception to control. We design and implement sophisticated navigation algorithms that handle complex environments including urban settings, agricultural fields, and industrial facilities. Our systems integrate multiple sensors and use advanced path planning algorithms to ensure safe and efficient navigation.",
    keyFeatures: [
      "Multi-sensor fusion (LiDAR, cameras, RADAR)",
      "Real-time path planning and obstacle avoidance",
      "Localization and mapping (SLAM)",
      "Behavioral decision making",
      "Safety-critical system design",
      "Weather and lighting adaptability"
    ],
    applications: [
      "Autonomous agricultural vehicles",
      "Warehouse automation robots",
      "Autonomous passenger vehicles",
      "Mining and construction vehicles",
      "Security patrol robots"
    ],
    technologies: ["ROS", "C++", "Python", "SLAM", "A*", "RRT*", "Kalman Filters"],
    hasDemo: true,
    demoComponent: "NavigationDemo"
  },
  {
    id: 3,
    title: "Advanced Sensor Fusion",
    slug: "advanced-sensor-fusion",
    excerpt: "Multi-modal sensor integration combining LiDAR, cameras, IMU, GNSS, and RADAR for robust perception systems.",
    fullDescription: "We develop sophisticated sensor fusion algorithms that combine data from multiple sensors to create robust and accurate perception systems. Our solutions handle sensor failures, environmental challenges, and provide reliable state estimation even in GPS-denied environments.",
    keyFeatures: [
      "Multi-modal sensor integration",
      "Extended Kalman Filter implementation",
      "Particle filter algorithms",
      "Sensor failure detection and recovery",
      "Real-time processing optimization",
      "Calibration and synchronization"
    ],
    applications: [
      "Autonomous vehicle localization",
      "Drone navigation systems",
      "Industrial robot positioning",
      "Augmented reality systems",
      "Maritime navigation"
    ],
    technologies: ["Kalman Filters", "Particle Filters", "OpenCV", "PCL", "Eigen", "ROS"],
    hasDemo: true,
    demoComponent: "SensorFusionDemo"
  },
  {
    id: 4,
    title: "Advanced Control Systems",
    slug: "advanced-control-systems",
    excerpt: "Model Predictive Control (MPC), adaptive control, and optimization algorithms for complex dynamic systems.",
    fullDescription: "We design and implement advanced control strategies including Model Predictive Control, adaptive control, and robust control systems. Our solutions optimize performance while respecting system constraints and handling uncertainties in real-time applications.",
    keyFeatures: [
      "Model Predictive Control (MPC)",
      "Adaptive and robust control",
      "Multi-objective optimization",
      "Constraint handling",
      "Real-time implementation",
      "System identification"
    ],
    applications: [
      "Industrial process control",
      "Automotive powertrain control",
      "Energy management systems",
      "Climate control systems",
      "Robotic manipulator control"
    ],
    technologies: ["MATLAB/Simulink", "CasADi", "CVXPY", "C++", "Real-time Systems"],
    hasDemo: false,
    demoComponent: null
  },
  {
    id: 5,
    title: "AI Integration",
    slug: "ai-integration",
    excerpt: "Machine learning and deep learning integration into embedded systems and real-time control applications.",
    fullDescription: "We integrate artificial intelligence and machine learning algorithms into control systems and embedded applications. Our approach focuses on practical AI solutions that can run efficiently on resource-constrained hardware while maintaining real-time performance requirements.",
    keyFeatures: [
      "Edge AI deployment",
      "Neural network optimization",
      "Real-time inference",
      "Model quantization and pruning",
      "Reinforcement learning for control",
      "Predictive maintenance algorithms"
    ],
    applications: [
      "Predictive maintenance systems",
      "Intelligent process optimization",
      "Adaptive control systems",
      "Anomaly detection",
      "Quality control automation"
    ],
    technologies: ["TensorFlow Lite", "PyTorch", "ONNX", "OpenVINO", "CUDA", "Python"],
    hasDemo: false,
    demoComponent: null
  },
  {
    id: 6,
    title: "Computer Vision for Robotics",
    slug: "computer-vision-robotics",
    excerpt: "Deep learning-based vision systems for object detection, tracking, and scene understanding in robotics applications.",
    fullDescription: "We develop computer vision solutions specifically tailored for robotics applications. Our systems handle challenging lighting conditions, moving objects, and provide real-time performance for navigation, manipulation, and inspection tasks.",
    keyFeatures: [
      "Object detection and tracking",
      "3D scene reconstruction",
      "Visual servoing",
      "Stereo vision processing",
      "Real-time image processing",
      "Deep learning model deployment"
    ],
    applications: [
      "Robotic pick-and-place systems",
      "Quality inspection automation",
      "Navigation and obstacle detection",
      "Human-robot interaction",
      "Agricultural monitoring"
    ],
    technologies: ["OpenCV", "TensorFlow", "PyTorch", "ROS", "PCL", "YOLO"],
    hasDemo: false,
    demoComponent: null
  },
  {
    id: 7,
    title: "Telemetry and Data Visualization",
    slug: "telemetry-data-visualization",
    excerpt: "Real-time monitoring systems and interactive dashboards for industrial systems and robotics fleets.",
    fullDescription: "We create comprehensive telemetry and visualization solutions that provide real-time insights into system performance. Our dashboards enable operators to monitor, analyze, and optimize system behavior with intuitive interfaces and powerful analytics capabilities.",
    keyFeatures: [
      "Real-time data streaming",
      "Interactive dashboards",
      "Historical data analysis",
      "Alert and notification systems",
      "Mobile-responsive interfaces",
      "Data export and reporting"
    ],
    applications: [
      "Fleet management systems",
      "Industrial process monitoring",
      "Energy management dashboards",
      "Equipment health monitoring",
      "Performance analytics"
    ],
    technologies: ["React", "Node.js", "WebSockets", "InfluxDB", "Grafana", "Docker"],
    hasDemo: false,
    demoComponent: null
  },
  {
    id: 8,
    title: "DevOps and CI/CD",
    slug: "devops-cicd",
    excerpt: "Automated testing, deployment pipelines, and infrastructure management for engineering software projects.",
    fullDescription: "We implement modern DevOps practices specifically tailored for engineering and embedded software projects. Our solutions include automated testing frameworks, continuous integration pipelines, and deployment strategies that ensure reliable and efficient software delivery.",
    keyFeatures: [
      "Automated testing frameworks",
      "Hardware-in-the-Loop (HIL) testing",
      "Continuous integration pipelines",
      "Docker containerization",
      "Infrastructure as Code",
      "Version control strategies"
    ],
    applications: [
      "Embedded software testing",
      "Control system validation",
      "Multi-platform deployment",
      "Automated compliance testing",
      "Release management"
    ],
    technologies: ["GitLab CI/CD", "Jenkins", "Docker", "Kubernetes", "Terraform", "Ansible"],
    hasDemo: false,
    demoComponent: null
  }
];

export default servicesData;
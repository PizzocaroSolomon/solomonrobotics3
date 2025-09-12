const portfolioData = [
  {
    id: 1,
    title: "Agricultural Robot Navigation System",
    slug: "agricultural-robot-navigation-system",
    excerpt: "Developed GNSS-magnetometer-odometry fusion algorithm for precision vineyard navigation during PhD research.",
    fullDescription: "Led R&D project for autonomous navigation in agricultural robotics during PhD at Politecnico di Milano. Developed sophisticated sensor fusion combining GNSS, magnetometer, and odometry for precise navigation between vineyard rows. Implemented LiDAR-based terrain analysis for vine row segmentation and traversability assessment. System achieved centimeter-level accuracy in challenging outdoor environments with variable GPS coverage.",
    image: "/images/agricultural-robot.jpg",
    technologies: ["GNSS", "LiDAR", "Sensor Fusion", "Terrain Analysis", "ROS"],
    client: "Politecnico di Milano - PhD Research",
    duration: "2019-2022",
    industry: "Agriculture",
    challenges: [
      "Precise navigation between vineyard rows without reliable GPS signal",
      "Real-time obstacle detection and avoidance in natural environments",
      "Robust operation in changing weather and lighting conditions",
      "Integration of multiple heterogeneous sensor systems"
    ],
    solutions: [
      "Developed advanced sensor fusion algorithm combining GNSS, magnetometer, and odometry",
      "Implemented LiDAR-based terrain analysis for vine row detection and segmentation",
      "Created robust localization system for GPS-denied environments",
      "Designed fail-safe navigation algorithms for autonomous operation"
    ],
    results: ["Centimeter-level navigation accuracy", "Robust operation in GPS-denied areas", "Published research papers", "Industry partnership demonstrations"]
  },
  {
    id: 2,
    title: "BMW Localization Validation System",
    slug: "bmw-localization-validation-system",
    excerpt: "Developed and maintained localization validation software for BMW autonomous driving at Luxoft Italy.",
    fullDescription: "Created comprehensive validation framework for BMW's autonomous driving localization systems. Optimized radar-based localization algorithm for ADAS applications, ensuring compliance with automotive standards. Implemented robust testing procedures and validation metrics to guarantee system reliability in production vehicles. Work contributed to BMW's advanced driver assistance systems deployed in commercial vehicles.",
    image: "/images/autonomous-vehicle.jpg",
    technologies: ["RADAR", "ADAS", "Automotive Standards", "C++", "Validation Framework"],
    client: "BMW (via Luxoft Italy)",
    duration: "Nov 2022 - Mar 2024",
    industry: "Automotive",
    challenges: [
      "Ensuring compliance with strict automotive safety standards",
      "Validating localization accuracy in diverse driving conditions",
      "Optimizing real-time performance for production systems",
      "Managing complex validation test scenarios"
    ],
    solutions: [
      "Developed comprehensive validation framework with automated testing",
      "Implemented radar-based localization algorithm optimizations",
      "Created robust testing procedures and validation metrics",
      "Established compliance protocols for automotive standards"
    ],
    results: ["Improved localization accuracy", "Automotive standard compliance", "Production system deployment", "Enhanced testing framework"]
  },
  {
    id: 3,
    title: "Racing Telemetry Platform",
    slug: "racing-telemetry-platform",
    excerpt: "Built real-time telemetry visualization system for race car simulators using modern web technologies.",
    fullDescription: "Designed and implemented comprehensive real-time telemetry platform for AS.CAR.I's race car simulators and testing infrastructure. System provides live data visualization, performance analytics, and remote monitoring capabilities. Utilized WebSockets for real-time communication, React for responsive dashboards, and optimized Docker deployment strategies. Platform enables engineers to monitor vehicle performance and make data-driven decisions during testing and simulation.",
    image: "/images/sensor-fusion.jpg",
    technologies: ["WebSockets", "React", "Node.js", "Docker", "Real-time Analytics"],
    client: "AS.CAR.I spa",
    duration: "Mar 2024 - May 2025",
    industry: "Automotive Racing",
    challenges: [
      "Real-time data streaming with minimal latency",
      "Handling high-frequency sensor data from multiple sources",
      "Creating intuitive dashboards for complex data visualization",
      "Ensuring system reliability during critical testing sessions"
    ],
    solutions: [
      "Implemented WebSocket-based real-time communication architecture",
      "Designed efficient data processing pipelines for high-frequency data",
      "Created responsive React dashboards with advanced visualization components",
      "Established containerized deployment with Docker for reliability"
    ],
    results: ["Real-time data streaming", "Interactive dashboards", "Improved testing efficiency", "Remote monitoring capabilities"]
  },
  {
    id: 4,
    title: "Autonomous Parking System",
    slug: "autonomous-parking-system",
    excerpt: "Developed stereo vision and 3D LiDAR-based parking algorithms during research at CU-ICAR, USA.",
    fullDescription: "Research project at Clemson University International Center for Automotive Research (CU-ICAR) focusing on autonomous parking solutions. Supervised Master's students in developing advanced parking algorithms using stereo vision and 3D LiDAR sensors. Implemented lane-keeping control with monocular camera-based road detection. All algorithms were integrated and validated through real-world automotive testing on campus facilities.",
    image: "/images/computer-vision.jpg",
    technologies: ["Stereo Vision", "3D LiDAR", "Lane Detection", "Control Systems", "Real-world Testing"],
    client: "CU-ICAR Research",
    duration: "Jan 2019 - Aug 2019",
    industry: "Automotive Research",
    challenges: [
      "Accurate vehicle positioning in tight parking spaces",
      "Real-time processing of stereo vision and LiDAR data",
      "Developing robust lane-keeping algorithms",
      "Coordinating research with multiple Master's students"
    ],
    solutions: [
      "Developed advanced stereo vision algorithms for precise positioning",
      "Implemented 3D LiDAR-based environment mapping and obstacle detection",
      "Created lane-keeping control system with monocular camera input",
      "Established comprehensive real-world testing and validation protocols"
    ],
    results: ["Successful autonomous parking", "Real-world validation", "Student mentorship", "Research publications"]
  },
  {
    id: 5,
    title: "Deep Learning Grape Detection",
    slug: "deep-learning-grape-detection",
    excerpt: "Created CNN-based grape and peduncle detection system using mono and depth cameras for agricultural automation.",
    fullDescription: "Developed sophisticated computer vision system for automated grape detection and harvesting support. Implemented custom CNN architectures for detecting grapes and peduncles using both monocular and depth camera inputs. System designed to work in varying lighting conditions and complex vineyard environments. Research contributed to advancing precision agriculture and automated harvesting technologies.",
    image: "/images/computer-vision.jpg",
    technologies: ["CNNs", "Deep Learning", "Depth Cameras", "Agricultural AI", "Computer Vision"],
    client: "Politecnico di Milano - PhD Research",
    duration: "2020-2022",
    industry: "Agriculture",
    challenges: [
      "Detecting grapes in varying lighting and weather conditions",
      "Distinguishing between grapes and similar-looking objects",
      "Processing both RGB and depth camera data in real-time",
      "Achieving high accuracy for automated harvesting applications"
    ],
    solutions: [
      "Developed custom CNN architectures optimized for grape detection",
      "Implemented multi-modal processing using both RGB and depth cameras",
      "Created robust training datasets with diverse environmental conditions",
      "Designed real-time processing pipeline for agricultural applications"
    ],
    results: ["High-accuracy grape detection", "Robust outdoor performance", "Multi-sensor integration", "Agricultural automation advancement"]
  },
  {
    id: 6,
    title: "Smart Order Routing Algorithm",
    slug: "smart-order-routing-algorithm",
    excerpt: "Contributing to advanced trading algorithms and testing infrastructure for Capital Markets at TAS Group.",
    fullDescription: "Current role involves designing and implementing sophisticated Smart Order Routing (SOR) algorithms for high-frequency trading platforms. Developing comprehensive testing pipelines to enable safe refactoring of legacy trading systems. Work focuses on optimizing order execution strategies and ensuring system reliability in fast-paced financial markets. Implementing modern software engineering practices in critical trading infrastructure.",
    image: "/images/control-systems.jpg",
    technologies: ["Algorithm Design", "Financial Systems", "Testing Pipelines", "Legacy System Refactoring"],
    client: "TAS Group - Capital Markets",
    duration: "May 2025 - Present",
    industry: "Financial Technology",
    challenges: [
      "Optimizing order execution in microsecond-critical environments",
      "Safely refactoring legacy trading systems without disruption",
      "Implementing comprehensive testing for financial algorithms",
      "Ensuring regulatory compliance and system reliability"
    ],
    solutions: [
      "Designed sophisticated Smart Order Routing algorithms for optimal execution",
      "Developed comprehensive testing pipelines for safe system refactoring",
      "Implemented modern software engineering practices in legacy systems",
      "Created monitoring and validation systems for trading algorithm performance"
    ],
    results: ["Enhanced trading algorithms", "Improved system reliability", "Modernized testing infrastructure", "Optimized order execution"]
  }
];

export default portfolioData;
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
    title: "Racing Telemetry Platform",
    slug: "racing-telemetry-platform",
    excerpt: "Built real-time telemetry visualization system for race car simulators using modern web technologies.",
    fullDescription: "Designed and implemented comprehensive real-time telemetry platform for AS.CAR.I's race car simulators and testing infrastructure. System provides live data visualization, performance analytics, and remote monitoring capabilities. Utilized WebSockets for real-time communication, React for responsive dashboards, and optimized Docker deployment strategies. Platform enables engineers to monitor vehicle performance and make data-driven decisions during testing and simulation.",
    image: "/images/telemetry_race_car.png",
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
    id: 3,
    title: "Deep Learning Grape Detection",
    slug: "deep-learning-grape-detection",
    excerpt: "Created CNN-based grape and peduncle detection system using mono and depth cameras for agricultural automation.",
    fullDescription: "Developed sophisticated computer vision system for automated grape detection and harvesting support. Implemented custom CNN architectures for detecting grapes and peduncles using both monocular and depth camera inputs. System designed to work in varying lighting conditions and complex vineyard environments. Research contributed to advancing precision agriculture and automated harvesting technologies.",
    image: "/images/dataset_example_g_and_b.png",
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
    id: 4,
    title: "Optimal Control Path Generation",
    slug: "optimal-control-path-generation",
    excerpt: "Developed and implemented optimal control and path generation algorithms for robotics applications.",
    fullDescription: "Developed advanced optimal control and path generation algorithms for various robotics applications. Utilized Model Predictive Control (MPC) and other optimization techniques to generate smooth and efficient trajectories. Implemented real-time constraint handling and system identification methods. Validated algorithms through simulations and hardware experiments.",
    image: "/images/path_generation_scenario.png",
    technologies: ["Model Predictive Control", "Optimization Algorithms", "Robotics", "Real-time Systems", "MATLAB"],
    client: "Various",
    duration: "2023-2025",
    industry: "Robotics",
    challenges: [
      "Generating smooth and efficient trajectories in real-time",
      "Handling system constraints and uncertainties",
      "Implementing algorithms on resource-constrained hardware",
      "Validating algorithms through simulations and experiments"
    ],
    solutions: [
      "Developed Model Predictive Control (MPC) algorithms for optimal control",
      "Implemented real-time constraint handling methods",
      "Utilized system identification techniques to model dynamic systems",
      "Validated algorithms through simulations and hardware experiments"
    ],
    results: ["Smooth and efficient trajectories", "Real-time performance", "Robust constraint handling", "Successful hardware experiments"]
  }
];

export default portfolioData;
const portfolioData = [
  {
    id: 1,
    title: "Agricultural Robot Navigation System",
    excerpt: "Developed GNSS-magnetometer-odometry fusion algorithm for precision vineyard navigation during PhD research.",
    fullDescription: "Led R&D project for autonomous navigation in agricultural robotics during PhD at Politecnico di Milano. Developed sophisticated sensor fusion combining GNSS, magnetometer, and odometry for precise navigation between vineyard rows. Implemented LiDAR-based terrain analysis for vine row segmentation and traversability assessment. System achieved centimeter-level accuracy in challenging outdoor environments with variable GPS coverage.",
    image: "/images/agricultural-robot.jpg",
    technologies: ["GNSS", "LiDAR", "Sensor Fusion", "Terrain Analysis", "ROS"],
    client: "Politecnico di Milano - PhD Research",
    duration: "2019-2022",
    results: ["Centimeter-level navigation accuracy", "Robust operation in GPS-denied areas", "Published research papers", "Industry partnership demonstrations"]
  },
  {
    id: 2,
    title: "BMW Localization Validation System",
    excerpt: "Developed and maintained localization validation software for BMW autonomous driving at Luxoft Italy.",
    fullDescription: "Created comprehensive validation framework for BMW's autonomous driving localization systems. Optimized radar-based localization algorithm for ADAS applications, ensuring compliance with automotive standards. Implemented robust testing procedures and validation metrics to guarantee system reliability in production vehicles. Work contributed to BMW's advanced driver assistance systems deployed in commercial vehicles.",
    image: "/images/autonomous-vehicle.jpg",
    technologies: ["RADAR", "ADAS", "Automotive Standards", "C++", "Validation Framework"],
    client: "BMW (via Luxoft Italy)",
    duration: "Nov 2022 - Mar 2024",
    results: ["Improved localization accuracy", "Automotive standard compliance", "Production system deployment", "Enhanced testing framework"]
  },
  {
    id: 3,
    title: "Racing Telemetry Platform",
    excerpt: "Built real-time telemetry visualization system for race car simulators using modern web technologies.",
    fullDescription: "Designed and implemented comprehensive real-time telemetry platform for AS.CAR.I's race car simulators and testing infrastructure. System provides live data visualization, performance analytics, and remote monitoring capabilities. Utilized WebSockets for real-time communication, React for responsive dashboards, and optimized Docker deployment strategies. Platform enables engineers to monitor vehicle performance and make data-driven decisions during testing and simulation.",
    image: "/images/sensor-fusion.jpg",
    technologies: ["WebSockets", "React", "Node.js", "Docker", "Real-time Analytics"],
    client: "AS.CAR.I spa",
    duration: "Mar 2024 - May 2025",
    results: ["Real-time data streaming", "Interactive dashboards", "Improved testing efficiency", "Remote monitoring capabilities"]
  },
  {
    id: 4,
    title: "Autonomous Parking System",
    excerpt: "Developed stereo vision and 3D LiDAR-based parking algorithms during research at CU-ICAR, USA.",
    fullDescription: "Research project at Clemson University International Center for Automotive Research (CU-ICAR) focusing on autonomous parking solutions. Supervised Master's students in developing advanced parking algorithms using stereo vision and 3D LiDAR sensors. Implemented lane-keeping control with monocular camera-based road detection. All algorithms were integrated and validated through real-world automotive testing on campus facilities.",
    image: "/images/computer-vision.jpg",
    technologies: ["Stereo Vision", "3D LiDAR", "Lane Detection", "Control Systems", "Real-world Testing"],
    client: "CU-ICAR Research",
    duration: "Jan 2019 - Aug 2019",
    results: ["Successful autonomous parking", "Real-world validation", "Student mentorship", "Research publications"]
  },
  {
    id: 5,
    title: "Deep Learning Grape Detection",
    excerpt: "Created CNN-based grape and peduncle detection system using mono and depth cameras for agricultural automation.",
    fullDescription: "Developed sophisticated computer vision system for automated grape detection and harvesting support. Implemented custom CNN architectures for detecting grapes and peduncles using both monocular and depth camera inputs. System designed to work in varying lighting conditions and complex vineyard environments. Research contributed to advancing precision agriculture and automated harvesting technologies.",
    image: "/images/computer-vision.jpg",
    technologies: ["CNNs", "Deep Learning", "Depth Cameras", "Agricultural AI", "Computer Vision"],
    client: "Politecnico di Milano - PhD Research",
    duration: "2020-2022",
    results: ["High-accuracy grape detection", "Robust outdoor performance", "Multi-sensor integration", "Agricultural automation advancement"]
  },
  {
    id: 6,
    title: "Smart Order Routing Algorithm",
    excerpt: "Contributing to advanced trading algorithms and testing infrastructure for Capital Markets at TAS Group.",
    fullDescription: "Current role involves designing and implementing sophisticated Smart Order Routing (SOR) algorithms for high-frequency trading platforms. Developing comprehensive testing pipelines to enable safe refactoring of legacy trading systems. Work focuses on optimizing order execution strategies and ensuring system reliability in fast-paced financial markets. Implementing modern software engineering practices in critical trading infrastructure.",
    image: "/images/control-systems.jpg",
    technologies: ["Algorithm Design", "Financial Systems", "Testing Pipelines", "Legacy System Refactoring"],
    client: "TAS Group - Capital Markets",
    duration: "May 2025 - Present",
    results: ["Enhanced trading algorithms", "Improved system reliability", "Modernized testing infrastructure", "Optimized order execution"]
  }
];

export default portfolioData;
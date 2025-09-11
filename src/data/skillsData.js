const skillsData = {
  sensors: [
    { name: "LiDAR", level: 95, description: "3D point cloud processing, SLAM, terrain analysis" },
    { name: "Stereo Cameras", level: 90, description: "Depth estimation, object detection, navigation" },
    { name: "RADAR", level: 85, description: "Localization, ADAS applications, sensor fusion" },
    { name: "GNSS", level: 90, description: "Precision agriculture, outdoor navigation, RTK" },
    { name: "Depth Sensors", level: 85, description: "Indoor mapping, object recognition, manipulation" }
  ],
  algorithms: [
    { name: "SLAM", level: 95, description: "Simultaneous Localization and Mapping" },
    { name: "Kalman Filters", level: 90, description: "State estimation, sensor fusion" },
    { name: "CNNs", level: 85, description: "Computer vision, object detection" },
    { name: "Model Predictive Control", level: 90, description: "Advanced control, optimization" },
    { name: "Particle Filters", level: 80, description: "Non-linear state estimation" }
  ],
  programming: [
    { name: "C++", level: 95, description: "Real-time systems, robotics, performance-critical code" },
    { name: "Python", level: 90, description: "Machine learning, rapid prototyping, data analysis" },
    { name: "ROS/ROS2", level: 90, description: "Robot Operating System, distributed systems" },
    { name: "MATLAB", level: 85, description: "Control systems, algorithm development" },
    { name: "JavaScript", level: 75, description: "Web interfaces, telemetry dashboards" }
  ],
  tools: [
    { name: "Docker", level: 90, description: "Containerization, deployment, DevOps" },
    { name: "Git/GitLab CI", level: 85, description: "Version control, continuous integration" },
    { name: "CMake/Bazel", level: 80, description: "Build systems, cross-platform development" },
    { name: "AWS", level: 65, description: "Cloud deployment, basic infrastructure" }
  ]
};

export default skillsData;
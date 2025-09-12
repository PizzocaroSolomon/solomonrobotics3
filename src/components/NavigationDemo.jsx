import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import * as styles from '../styles/navigation-demo.module.css';

const NavigationDemo = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  
  // Constants
  const FIELD_WIDTH = 800;
  const FIELD_HEIGHT = 600;
  const ROBOT_SIZE = 20;
  const ROBOT_RADIUS = ROBOT_SIZE / 2;
  const INFLATION_RADIUS = ROBOT_RADIUS * 3/2;
  const GOAL_THRESHOLD = ROBOT_SIZE / 2;
  const ROBOT_SPEED = 1.5;
  const LOOK_AHEAD_DISTANCE = ROBOT_SIZE;
  const WAYPOINT_TOLERANCE = 8;

  // More diverse obstacles - wrapped in useMemo to prevent re-creation
  const obstacles = useMemo(() => [
    { x: 220, y: 160, width: 80, height: 60 },
    { x: 480, y: 250, width: 90, height: 70 },
    { x: 380, y: 460, width: 85, height: 55 },
    { x: 160, y: 400, width: 50, height: 65 },
    { x: 640, y: 120, width: 60, height: 45 },
    { x: 580, y: 460, width: 55, height: 70 },
    { x: 100, y: 180, width: 45, height: 50 },
    { x: 420, y: 100, width: 35, height: 35 },
    { x: 200, y: 80, width: 40, height: 30 },
    { x: 500, y: 160, width: 30, height: 40 },
    { x: 680, y: 300, width: 35, height: 45 },
    { x: 90, y: 480, width: 40, height: 35 },
    { x: 340, y: 260, width: 20, height: 80 },
    { x: 560, y: 80, width: 25, height: 60 },
    { x: 400, y: 360, width: 15, height: 70 },
    { x: 700, y: 500, width: 50, height: 40 },
    { x: 60, y: 300, width: 40, height: 40 },
    { x: 300, y: 540, width: 60, height: 30 },
    { x: 150, y: 240, width: 30, height: 60 },
    { x: 520, y: 380, width: 45, height: 35 },
    { x: 750, y: 100, width: 30, height: 50 },
    { x: 630, y: 200, width: 40, height: 40 },
    { x: 460, y: 520, width: 60, height: 30 },
    { x: 100, y: 100, width: 50, height: 30 },
    { x: 220, y: 500, width: 45, height: 35 },
    { x: 720, y: 400, width: 35, height: 45 },
    { x: 360, y: 180, width: 40, height: 40 },
    { x: 580, y: 300, width: 55, height: 35 },
    { x: 300, y: 100, width: 30, height: 40 },
    { x: 400, y: 40, width: 50, height: 30 }
  ], []);
  
  // Game state
  const [robot, setRobot] = useState({ x: 50, y: 50, angle: 0 });
  const [goal, setGoal] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [globalPath, setGlobalPath] = useState([]);
  const [localPath, setLocalPath] = useState([]);
  const [currentGlobalIndex, setCurrentGlobalIndex] = useState(0);
  const [currentLocalIndex, setCurrentLocalIndex] = useState(0);
  const [sensorData, setSensorData] = useState({ lidar: [] });
  const [recoveryMode, setRecoveryMode] = useState(false);
  const [recoveryPath, setRecoveryPath] = useState([]);
  const [recoveryIndex, setRecoveryIndex] = useState(0);
  const [blockedAttempts, setBlockedAttempts] = useState(0);

  // Collision detection with robot radius
  const isPointInObstacle = useCallback((x, y, checkRadius = ROBOT_RADIUS) => {
    // Check field boundaries
    if (x - checkRadius < 0 || x + checkRadius > FIELD_WIDTH ||
        y - checkRadius < 0 || y + checkRadius > FIELD_HEIGHT) {
      return true;
    }
    
    // Check obstacles
    return obstacles.some(obs => {
      const closestX = Math.max(obs.x, Math.min(x, obs.x + obs.width));
      const closestY = Math.max(obs.y, Math.min(y, obs.y + obs.height));
      
      const distanceX = x - closestX;
      const distanceY = y - closestY;
      const distanceSquared = distanceX * distanceX + distanceY * distanceY;
      
      return distanceSquared < (checkRadius * checkRadius);
    });
  }, [obstacles, ROBOT_RADIUS, FIELD_WIDTH, FIELD_HEIGHT]);

  // Create occupancy grid for pathfinding
  const createOccupancyGrid = useCallback(() => {
    const grid = Array(FIELD_HEIGHT/10).fill().map(() => Array(FIELD_WIDTH/10).fill(0));
    
    obstacles.forEach(obs => {
      const expandedObs = {
        x: obs.x - INFLATION_RADIUS,
        y: obs.y - INFLATION_RADIUS,
        width: obs.width + 2 * INFLATION_RADIUS,
        height: obs.height + 2 * INFLATION_RADIUS
      };
      
      for (let y = Math.floor(expandedObs.y/10); y < Math.floor((expandedObs.y + expandedObs.height)/10); y++) {
        for (let x = Math.floor(expandedObs.x/10); x < Math.floor((expandedObs.x + expandedObs.width)/10); x++) {
          if (y >= 0 && y < grid.length && x >= 0 && x < grid[0].length) {
            grid[y][x] = 1;
          }
        }
      }
    });
    
    // Mark field boundaries as occupied
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[0].length; x++) {
        const realX = x * 10;
        const realY = y * 10;
        
        if (realX < ROBOT_RADIUS || realX > FIELD_WIDTH - ROBOT_RADIUS ||
            realY < ROBOT_RADIUS || realY > FIELD_HEIGHT - ROBOT_RADIUS) {
          grid[y][x] = 1;
        }
      }
    }
    
    return grid;
  }, [obstacles, INFLATION_RADIUS, ROBOT_RADIUS, FIELD_WIDTH, FIELD_HEIGHT]);

  const heuristic = useCallback((a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y), []);

  // A* pathfinding implementation
  const aStar = useCallback((grid, start, end) => {
    const startNode = { x: Math.floor(start.x/10), y: Math.floor(start.y/10) };
    const endNode = { x: Math.floor(end.x/10), y: Math.floor(end.y/10) };
    
    const openSet = [startNode];
    const closedSet = [];
    const cameFrom = new Map();
    const gScore = new Map();
    const fScore = new Map();
    
    gScore.set(`${startNode.x},${startNode.y}`, 0);
    fScore.set(`${startNode.x},${startNode.y}`, heuristic(startNode, endNode));
    
    while (openSet.length > 0) {
      let current = openSet.reduce((lowest, node) => {
        const currentF = fScore.get(`${node.x},${node.y}`) || Infinity;
        const lowestF = fScore.get(`${lowest.x},${lowest.y}`) || Infinity;
        return currentF < lowestF ? node : lowest;
      });
      
      if (current.x === endNode.x && current.y === endNode.y) {
        const path = [];
        while (current) {
          path.unshift({ x: current.x * 10 + 5, y: current.y * 10 + 5 });
          current = cameFrom.get(`${current.x},${current.y}`);
        }
        return path;
      }
      
      openSet.splice(openSet.indexOf(current), 1);
      closedSet.push(current);
      
      const neighbors = [
        { x: current.x + 1, y: current.y },
        { x: current.x - 1, y: current.y },
        { x: current.x, y: current.y + 1 },
        { x: current.x, y: current.y - 1 }
      ];
      
      for (let neighbor of neighbors) {
        if (neighbor.x < 0 || neighbor.x >= grid[0].length || 
            neighbor.y < 0 || neighbor.y >= grid.length ||
            grid[neighbor.y][neighbor.x] === 1 ||
            closedSet.some(node => node.x === neighbor.x && node.y === neighbor.y)) {
          continue;
        }
        
        const tentativeGScore = (gScore.get(`${current.x},${current.y}`) || 0) + 1;
        
        if (!openSet.some(node => node.x === neighbor.x && node.y === neighbor.y)) {
          openSet.push(neighbor);
        } else if (tentativeGScore >= (gScore.get(`${neighbor.x},${neighbor.y}`) || Infinity)) {
          continue;
        }
        
        cameFrom.set(`${neighbor.x},${neighbor.y}`, current);
        gScore.set(`${neighbor.x},${neighbor.y}`, tentativeGScore);
        fScore.set(`${neighbor.x},${neighbor.y}`, tentativeGScore + heuristic(neighbor, endNode));
      }
    }
    
    return [];
  }, [heuristic]);

  const isLineOfSightClear = useCallback((start, end) => {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const steps = Math.ceil(distance / 5);
    
    for (let i = 0; i <= steps; i++) {
      const x = start.x + (dx * i / steps);
      const y = start.y + (dy * i / steps);
      
      if (isPointInObstacle(x, y, ROBOT_RADIUS)) {
        return false;
      }
    }
    
    return true;
  }, [isPointInObstacle, ROBOT_RADIUS]);

  // Enhanced path smoothing with bezier-like curves
  const smoothPath = useCallback((path) => {
    if (path.length <= 2) return path;
    
    // First pass: remove unnecessary waypoints using line of sight
    const smoothed = [path[0]];
    let i = 0;
    
    while (i < path.length - 1) {
      let j = path.length - 1;
      
      while (j > i + 1) {
        if (isLineOfSightClear(path[i], path[j])) {
          break;
        }
        j--;
      }
      
      smoothed.push(path[j]);
      i = j;
    }
    
    // Second pass: add intermediate points for smoother curves
    const finalSmoothed = [smoothed[0]];
    
    for (let i = 1; i < smoothed.length; i++) {
      const prev = smoothed[i - 1];
      const curr = smoothed[i];
      const distance = Math.sqrt(
        Math.pow(curr.x - prev.x, 2) + Math.pow(curr.y - prev.y, 2)
      );
      
      // Add intermediate points for long segments
      if (distance > 40) {
        const numPoints = Math.floor(distance / 20);
        for (let j = 1; j < numPoints; j++) {
          const t = j / numPoints;
          const intermX = prev.x + (curr.x - prev.x) * t;
          const intermY = prev.y + (curr.y - prev.y) * t;
          
          if (!isPointInObstacle(intermX, intermY, ROBOT_RADIUS)) {
            finalSmoothed.push({ x: intermX, y: intermY });
          }
        }
      }
      
      finalSmoothed.push(curr);
    }
    
    return finalSmoothed;
  }, [isLineOfSightClear, isPointInObstacle, ROBOT_RADIUS]);

  // A* pathfinding with feasibility check
  const generateGlobalPath = useCallback((start, end) => {
    // Check if end point is reachable
    if (isPointInObstacle(end.x, end.y, ROBOT_RADIUS)) {
      const searchRadius = ROBOT_RADIUS;
      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 8) {
        for (let radius = searchRadius; radius <= searchRadius + 30; radius += 5) {
          const testX = end.x + Math.cos(angle) * radius;
          const testY = end.y + Math.sin(angle) * radius;
          
          if (!isPointInObstacle(testX, testY, ROBOT_RADIUS)) {
            end = { x: testX, y: testY };
            setGoal(end);
            break;
          }
        }
      }
    }
    
    const grid = createOccupancyGrid();
    const path = aStar(grid, start, end);
    return smoothPath(path);
  }, [createOccupancyGrid, aStar, smoothPath, isPointInObstacle, ROBOT_RADIUS]);

  // Enhanced LiDAR simulation with proper distance calculation
  const simulateLidar = useCallback((robotPos) => {
    const beams = [];
    const numBeams = 16;
    
    for (let i = 0; i < numBeams; i++) {
      const angle = (i / numBeams) * 2 * Math.PI;
      const maxRange = 100;
      let hitDistance = maxRange;
      
      // Cast ray step by step
      for (let range = 5; range <= maxRange; range += 2) {
        const x = robotPos.x + Math.cos(angle) * range;
        const y = robotPos.y + Math.sin(angle) * range;
        
        // Check field boundaries
        if (x < 0 || x > FIELD_WIDTH || y < 0 || y > FIELD_HEIGHT) {
          hitDistance = range;
          break;
        }
        
        // Check obstacle collision (point collision for beam)
        let hitObstacle = false;
        for (const obs of obstacles) {
          if (x >= obs.x && x <= obs.x + obs.width &&
              y >= obs.y && y <= obs.y + obs.height) {
            hitObstacle = true;
            break;
          }
        }
        
        if (hitObstacle) {
          hitDistance = range;
          break;
        }
      }
      
      beams.push({ 
        angle, 
        range: hitDistance,
        endX: robotPos.x + Math.cos(angle) * hitDistance,
        endY: robotPos.y + Math.sin(angle) * hitDistance
      });
    }
    
    return beams;
  }, [obstacles, FIELD_WIDTH, FIELD_HEIGHT]);

  // FIXED: Local path planning that creates actual local waypoints
  const generateLocalPath = useCallback((robotPos, globalPath, currentIndex) => {
    if (globalPath.length === 0 || currentIndex >= globalPath.length) return [];
    
    const localPoints = [];
    const maxLocalPoints = 4; // Limit local path length
    
    // Start from current global path index
    for (let i = currentIndex; i < Math.min(globalPath.length, currentIndex + maxLocalPoints); i++) {
      const point = globalPath[i];
      const distance = Math.sqrt(
        Math.pow(point.x - robotPos.x, 2) + Math.pow(point.y - robotPos.y, 2)
      );
      
      // Include points within look-ahead distance
      if (distance <= LOOK_AHEAD_DISTANCE || i === currentIndex) {
        localPoints.push({ ...point, globalIndex: i });
      }
    }
    
    return localPoints;
  }, [LOOK_AHEAD_DISTANCE]);

  // Check if robot can move in desired direction
  const canMoveTowards = useCallback((from, to) => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance === 0) return true;
    
    const moveX = (dx / distance) * ROBOT_SPEED;
    const moveY = (dy / distance) * ROBOT_SPEED;
    const newX = from.x + moveX;
    const newY = from.y + moveY;
    
    return !isPointInObstacle(newX, newY, ROBOT_RADIUS);
  }, [isPointInObstacle, ROBOT_RADIUS, ROBOT_SPEED]);

  // Enhanced recovery path with obstacle avoidance and escape maneuvers
  const generateRecoveryPath = useCallback((robotPos, globalPath, currentIndex) => {
    const recoveryPoints = [];
    
    // Step 1: Immediate escape - move away from closest obstacle
    let closestObstacle = null;
    let minDistance = Infinity;
    
    obstacles.forEach(obs => {
      const closestX = Math.max(obs.x, Math.min(robotPos.x, obs.x + obs.width));
      const closestY = Math.max(obs.y, Math.min(robotPos.y, obs.y + obs.height));
      const distance = Math.sqrt(
        Math.pow(robotPos.x - closestX, 2) + Math.pow(robotPos.y - closestY, 2)
      );
      
      if (distance < minDistance) {
        minDistance = distance;
        closestObstacle = { obs, closestX, closestY, distance };
      }
    });
    
    // If very close to obstacle, add escape point
    if (closestObstacle && closestObstacle.distance < ROBOT_RADIUS * 2) {
      const escapeDistance = ROBOT_RADIUS * 4;
      const awayX = robotPos.x - closestObstacle.closestX;
      const awayY = robotPos.y - closestObstacle.closestY;
      const awayLength = Math.sqrt(awayX * awayX + awayY * awayY);
      
      if (awayLength > 0) {
        const escapeX = robotPos.x + (awayX / awayLength) * escapeDistance;
        const escapeY = robotPos.y + (awayY / awayLength) * escapeDistance;
        
        // Check if escape point is safe
        if (!isPointInObstacle(escapeX, escapeY, ROBOT_RADIUS)) {
          recoveryPoints.push({ x: escapeX, y: escapeY });
        } else {
          // Try perpendicular escape directions
          const perpAngle1 = Math.atan2(awayY, awayX) + Math.PI / 2;
          const perpAngle2 = Math.atan2(awayY, awayX) - Math.PI / 2;
          
          for (const angle of [perpAngle1, perpAngle2]) {
            const perpX = robotPos.x + Math.cos(angle) * escapeDistance;
            const perpY = robotPos.y + Math.sin(angle) * escapeDistance;
            
            if (!isPointInObstacle(perpX, perpY, ROBOT_RADIUS)) {
              recoveryPoints.push({ x: perpX, y: perpY });
              break;
            }
          }
        }
      }
    }
    
    // Step 2: Find safe backtrack point along path
    const backtrackDistance = ROBOT_SIZE * 2;
    let distanceCovered = 0;
    let backtrackIndex = Math.max(0, currentIndex - 1);
    
    while (backtrackIndex >= 0 && distanceCovered < backtrackDistance) {
      const point = globalPath[backtrackIndex];
      if (point && !isPointInObstacle(point.x, point.y, ROBOT_RADIUS * 1.2)) {
        // Check if path to this point is clear
        if (recoveryPoints.length === 0 || isLineOfSightClear(recoveryPoints[recoveryPoints.length - 1], point)) {
          recoveryPoints.push(point);
          break;
        }
      }
      
      if (backtrackIndex > 0) {
        const prevPoint = globalPath[backtrackIndex - 1];
        if (prevPoint) {
          const segmentDistance = Math.sqrt(
            Math.pow(point.x - prevPoint.x, 2) + Math.pow(point.y - prevPoint.y, 2)
          );
          distanceCovered += segmentDistance;
        }
      }
      backtrackIndex--;
    }
    
    // Step 3: If still no safe point, try circular search for open space
    if (recoveryPoints.length === 0) {
      const searchRadii = [ROBOT_SIZE * 1.5, ROBOT_SIZE * 2, ROBOT_SIZE * 3];
      const searchAngles = [0, Math.PI/4, Math.PI/2, 3*Math.PI/4, Math.PI, 5*Math.PI/4, 3*Math.PI/2, 7*Math.PI/4];
      
      for (const radius of searchRadii) {
        let foundSafe = false;
        for (const angle of searchAngles) {
          const testX = robotPos.x + Math.cos(angle) * radius;
          const testY = robotPos.y + Math.sin(angle) * radius;
          
          if (!isPointInObstacle(testX, testY, ROBOT_RADIUS)) {
            recoveryPoints.push({ x: testX, y: testY });
            foundSafe = true;
            break;
          }
        }
        if (foundSafe) break;
      }
    }
    
    return recoveryPoints;
  }, [obstacles, isPointInObstacle, isLineOfSightClear, ROBOT_RADIUS, ROBOT_SIZE]);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      if (!isNavigating || !goal) {
        return;
      }
      
      setRobot(prevRobot => {
        // Check if reached goal
        const distanceToGoal = Math.sqrt(
          Math.pow(goal.x - prevRobot.x, 2) + Math.pow(goal.y - prevRobot.y, 2)
        );
        
        if (distanceToGoal < GOAL_THRESHOLD) {
          setIsNavigating(false);
          setLocalPath([]);
          setCurrentGlobalIndex(0);
          setCurrentLocalIndex(0);
          setRecoveryMode(false);
          setRecoveryPath([]);
          setRecoveryIndex(0);
          setBlockedAttempts(0);
          return prevRobot;
        }

        // Update sensor data with current robot position
        const lidarData = simulateLidar(prevRobot);
        setSensorData({ lidar: lidarData });
        
        // Handle recovery mode
        if (recoveryMode) {
          if (recoveryPath.length > 0 && recoveryIndex < recoveryPath.length) {
            const recoveryTarget = recoveryPath[recoveryIndex];
            
            // Use slightly higher speed for recovery
            const recoverySpeed = ROBOT_SPEED * 1.2;
            
            if (canMoveTowards(prevRobot, recoveryTarget)) {
              const dx = recoveryTarget.x - prevRobot.x;
              const dy = recoveryTarget.y - prevRobot.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              if (distance < WAYPOINT_TOLERANCE) {
                setRecoveryIndex(prev => prev + 1);
              }
              
              const moveX = (dx / distance) * recoverySpeed;
              const moveY = (dy / distance) * recoverySpeed;
              const newAngle = Math.atan2(dy, dx);
              
              return {
                x: prevRobot.x + moveX,
                y: prevRobot.y + moveY,
                angle: newAngle
              };
            } else {
              // If can't move to recovery target, regenerate recovery path
              const newRecPath = generateRecoveryPath(prevRobot, globalPath, currentGlobalIndex);
              setRecoveryPath(newRecPath);
              setRecoveryIndex(0);
            }
          } else {
            // Recovery complete, replan from current position
            console.log("Recovery complete, replanning path from current position");
            const newPath = generateGlobalPath(prevRobot, goal);
            setGlobalPath(newPath);
            setCurrentGlobalIndex(0);
            setCurrentLocalIndex(0);
            setRecoveryMode(false);
            setRecoveryPath([]);
            setRecoveryIndex(0);
            setBlockedAttempts(0);
            
            if (newPath.length === 0) {
              setIsNavigating(false);
              return prevRobot;
            }
          }
          
          return prevRobot;
        }

        // Normal navigation - FIXED to use local path
        if (globalPath.length === 0) return prevRobot;

        // Generate local path based on current global position
        const newLocalPath = generateLocalPath(prevRobot, globalPath, currentGlobalIndex);
        setLocalPath(newLocalPath);

        // FIXED: Follow local path instead of global path directly
        let targetPoint = null;
        
        if (newLocalPath.length > currentLocalIndex) {
          targetPoint = newLocalPath[currentLocalIndex];
          
          // Check if we've reached current local waypoint
          const distanceToLocalWaypoint = Math.sqrt(
            Math.pow(targetPoint.x - prevRobot.x, 2) + Math.pow(targetPoint.y - prevRobot.y, 2)
          );
          
          if (distanceToLocalWaypoint < WAYPOINT_TOLERANCE) {
            // Move to next local waypoint
            if (currentLocalIndex < newLocalPath.length - 1) {
              setCurrentLocalIndex(prev => prev + 1);
              targetPoint = newLocalPath[currentLocalIndex + 1];
            } else {
              // Update global index and reset local index
              const newGlobalIndex = Math.min(currentGlobalIndex + 2, globalPath.length - 1);
              setCurrentGlobalIndex(newGlobalIndex);
              setCurrentLocalIndex(0);
              
              // Use goal as target if we're near the end
              if (newGlobalIndex >= globalPath.length - 1) {
                targetPoint = goal;
              } else {
                targetPoint = globalPath[newGlobalIndex];
              }
            }
          }
        } else {
          // Fallback to global path if local path is empty
          targetPoint = globalPath[Math.min(currentGlobalIndex, globalPath.length - 1)];
        }
        
        if (!targetPoint) {
          targetPoint = goal;
        }
        
        // Check if robot can move towards target
        if (!canMoveTowards(prevRobot, targetPoint)) {
          setBlockedAttempts(prev => prev + 1);
          
          // Enter recovery mode after 3 blocked attempts
          if (blockedAttempts >= 3) {
            console.log("Robot blocked, entering recovery mode");
            const recPath = generateRecoveryPath(prevRobot, globalPath, currentGlobalIndex);
            setRecoveryPath(recPath);
            setRecoveryMode(true);
            setRecoveryIndex(0);
            setBlockedAttempts(0);
          }
          
          return prevRobot;
        } else {
          setBlockedAttempts(0);
        }
        
        // Move robot towards target
        const dx = targetPoint.x - prevRobot.x;
        const dy = targetPoint.y - prevRobot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0) {
          const moveX = (dx / distance) * ROBOT_SPEED;
          const moveY = (dy / distance) * ROBOT_SPEED;
          const newAngle = Math.atan2(dy, dx);
          
          const newX = prevRobot.x + moveX;
          const newY = prevRobot.y + moveY;
          
          return {
            x: newX,
            y: newY,
            angle: newAngle
          };
        }
        
        return prevRobot;
      });
      
      if (isNavigating) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    if (isNavigating) {
      animationRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [
    isNavigating, 
    goal, 
    globalPath, 
    currentGlobalIndex,
    currentLocalIndex,
    recoveryMode,
    recoveryPath,
    recoveryIndex,
    blockedAttempts,
    simulateLidar, 
    generateLocalPath, 
    canMoveTowards,
    generateRecoveryPath,
    generateGlobalPath,
    GOAL_THRESHOLD, 
    ROBOT_SPEED,
    WAYPOINT_TOLERANCE
  ]);

  // Handle canvas click
  const handleCanvasClick = useCallback((event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Reset recovery state on new goal
    setRecoveryMode(false);
    setRecoveryPath([]);
    setRecoveryIndex(0);
    setBlockedAttempts(0);
    
    // Check if click is not on an obstacle
    if (!isPointInObstacle(x, y, ROBOT_RADIUS)) {
      const newGoal = { x, y };
      setGoal(newGoal);
      
      // Generate global path
      const path = generateGlobalPath(robot, newGoal);
      setGlobalPath(path);
      setCurrentGlobalIndex(0);
      setCurrentLocalIndex(0);
      
      if (path.length > 0) {
        setIsNavigating(true);
      } else {
        console.log("No path found to goal");
      }
    } else {
      console.log("Goal not reachable - too close to obstacle");
    }
  }, [isPointInObstacle, ROBOT_RADIUS, generateGlobalPath, robot]);

  // Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.fillStyle = '#f0f4f8';
    ctx.fillRect(0, 0, FIELD_WIDTH, FIELD_HEIGHT);
    
    // Draw grid
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (let x = 0; x <= FIELD_WIDTH; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, FIELD_HEIGHT);
      ctx.stroke();
    }
    for (let y = 0; y <= FIELD_HEIGHT; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(FIELD_WIDTH, y);
      ctx.stroke();
    }
    
    // Draw obstacles with different shades for different sizes
    obstacles.forEach(obs => {
      const area = obs.width * obs.height;
      if (area > 4000) {
        ctx.fillStyle = '#475569'; // Dark for large obstacles
      } else if (area > 2000) {
        ctx.fillStyle = '#64748b'; // Medium shade
      } else {
        ctx.fillStyle = '#94a3b8'; // Light for small obstacles
      }
      ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
    });
    
    // Draw global path
    if (globalPath.length > 1) {
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 4]);
      ctx.beginPath();
      ctx.moveTo(globalPath[0].x, globalPath[0].y);
      globalPath.forEach(point => ctx.lineTo(point.x, point.y));
      ctx.stroke();
      ctx.setLineDash([]);
    }
    
    // Draw recovery path in orange
    if (recoveryPath.length > 0) {
      ctx.strokeStyle = '#f97316';
      ctx.lineWidth = 4;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(robot.x, robot.y);
      recoveryPath.forEach(point => ctx.lineTo(point.x, point.y));
      ctx.stroke();
      ctx.setLineDash([]);
    }
    
    // Draw local path (more prominent since robot follows this)
    if (localPath.length > 0) {
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 5;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(robot.x, robot.y);
      localPath.forEach(point => ctx.lineTo(point.x, point.y));
      ctx.stroke();
      
      // Draw local waypoints
      localPath.forEach((point, index) => {
        ctx.fillStyle = index === currentLocalIndex ? '#ef4444' : '#10b981';
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });
    }
    
    // Draw LiDAR beams with updated distances
    sensorData.lidar.forEach(beam => {
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(robot.x, robot.y);
      ctx.lineTo(beam.endX, beam.endY);
      ctx.stroke();
      
      // Draw end point
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(beam.endX, beam.endY, 2, 0, Math.PI * 2);
      ctx.fill();
    });
    
    // Draw goal
    if (goal) {
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(goal.x, goal.y, 8, 0, Math.PI * 2);
      ctx.fill();
      
      // Goal indicator circle
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.arc(goal.x, goal.y, GOAL_THRESHOLD, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    
    // Draw robot (with different color if in recovery mode)
    ctx.save();
    ctx.translate(robot.x, robot.y);
    ctx.rotate(robot.angle);
    
    // Robot body - orange if in recovery mode, blue if normal
    ctx.fillStyle = recoveryMode ? '#f97316' : '#1e40af';
    ctx.fillRect(-ROBOT_SIZE/2, -ROBOT_SIZE/2, ROBOT_SIZE, ROBOT_SIZE);
    
    // Robot direction indicator
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(ROBOT_SIZE/2, 0);
    ctx.lineTo(ROBOT_SIZE/3, -ROBOT_SIZE/4);
    ctx.lineTo(ROBOT_SIZE/3, ROBOT_SIZE/4);
    ctx.closePath();
    ctx.fill();
    
    ctx.restore();
    
  }, [robot, goal, globalPath, localPath, currentLocalIndex, recoveryPath, sensorData, obstacles, recoveryMode, FIELD_WIDTH, FIELD_HEIGHT, ROBOT_SIZE, GOAL_THRESHOLD]);

  return (
    <div className={styles.demoContainer}>
      <div className={styles.demoHeader}>
        <h3>Interactive Autonomous Navigation Demo</h3>
        <p>Click anywhere in the field to set a goal for the robot</p>
      </div>

      <div className={styles.demoContent}>
        <div style={{ position: 'relative' }}>
          <canvas
            ref={canvasRef}
            width={FIELD_WIDTH}
            height={FIELD_HEIGHT}
            onClick={handleCanvasClick}
            className={styles.demoCanvas}
          />
          <div style={{
            position: 'absolute',
            top: 8,
            left: 8,
            background: 'rgba(0, 0, 0, 0.5)',
            padding: '6px 10px',
            borderRadius: '6px',
            color: '#fff',
            fontSize: '13px'
          }}>
            Status: {recoveryMode ? 'Recovery Mode' : (isNavigating ? 'Navigating' : 'Idle')}<br/>
            Global Index: {currentGlobalIndex}<br/>
            Local Index: {currentLocalIndex}
          </div>
        </div>
      </div>

      <div className={styles.demoLegendWrapper}>
        <div className={styles.demoLegend}>
          <div className={styles.legendItem}>
            <div className={`${styles.legendColor} ${styles.globalPath}`}></div>
            <span>Global Path</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.legendColor} ${styles.localPath}`}></div>
            <span>Local Path</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.legendColor} ${styles.recoveryPath}`}></div>
            <span>Recovery</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.legendColor} ${styles.lidar}`}></div>
            <span>LiDAR</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.legendColor} ${styles.goal}`}></div>
            <span>Goal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationDemo;
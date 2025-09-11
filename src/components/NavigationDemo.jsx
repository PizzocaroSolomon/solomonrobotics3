import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import * as styles from '../styles/navigation-demo.module.css';

const NavigationDemo = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  
  // Constants
  const FIELD_WIDTH = 600;
  const FIELD_HEIGHT = 400;
  const ROBOT_SIZE = 20;
  const ROBOT_RADIUS = ROBOT_SIZE / 2 ;
  const GOAL_THRESHOLD = ROBOT_SIZE / 2;
  const ROBOT_SPEED = 1.0;

  // More diverse obstacles - wrapped in useMemo to prevent re-creation
  const obstacles = useMemo(() => [
    // Large obstacles
    { x: 180, y: 120, width: 80, height: 60 },
    { x: 350, y: 180, width: 90, height: 70 },
    { x: 280, y: 320, width: 85, height: 55 },
    // Medium obstacles
    { x: 120, y: 280, width: 50, height: 65 },
    { x: 480, y: 80, width: 60, height: 45 },
    { x: 450, y: 300, width: 55, height: 70 },
    { x: 80, y: 150, width: 45, height: 50 },
    // Small obstacles
    { x: 320, y: 80, width: 35, height: 35 },
    { x: 150, y: 50, width: 40, height: 30 },
    { x: 380, y: 120, width: 30, height: 40 },
    { x: 520, y: 200, width: 35, height: 45 },
    { x: 50, y: 320, width: 40, height: 35 },
    // Narrow obstacles
    { x: 250, y: 200, width: 20, height: 80 },
    { x: 420, y: 40, width: 25, height: 60 },
    { x: 300, y: 250, width: 15, height: 70 }
  ], []);
  
  // Game state
  const [robot, setRobot] = useState({ x: 50, y: 50, angle: 0 });
  const [goal, setGoal] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [globalPath, setGlobalPath] = useState([]);
  const [localPath, setLocalPath] = useState([]);
  const [currentPathIndex, setCurrentPathIndex] = useState(0);
  const [sensorData, setSensorData] = useState({ lidar: [] });
  const [recoveryMode, setRecoveryMode] = useState(false);
  const [recoveryPath, setRecoveryPath] = useState([]);
  const [recoverySteps, setRecoverySteps] = useState(0);
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
        x: obs.x - ROBOT_RADIUS,
        y: obs.y - ROBOT_RADIUS,
        width: obs.width + 2 * ROBOT_RADIUS,
        height: obs.height + 2 * ROBOT_RADIUS
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
  }, [obstacles, ROBOT_RADIUS, FIELD_WIDTH, FIELD_HEIGHT]);

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

  const smoothPath = useCallback((path) => {
    if (path.length <= 2) return path;
    
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
    
    return smoothed;
  }, [isLineOfSightClear]);

  // A* pathfinding with feasibility check
  const generateGlobalPath = useCallback((start, end) => {
    // Check if end point is reachable
    if (isPointInObstacle(end.x, end.y, ROBOT_RADIUS)) {
      const searchRadius = ROBOT_RADIUS + 10;
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

  // Local path planning
  const generateLocalPath = useCallback((robotPos, globalPath) => {
    if (globalPath.length === 0) return [];
    
    const lookAheadDistance = 40;
    const localPoints = [];
    
    for (let i = 0; i < globalPath.length; i++) {
      const point = globalPath[i];
      const distance = Math.sqrt(
        Math.pow(point.x - robotPos.x, 2) + Math.pow(point.y - robotPos.y, 2)
      );
      
      if (distance <= lookAheadDistance) {
        localPoints.push(point);
      }
    }
    
    return localPoints.slice(0, 3);
  }, []);

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

  // Generate recovery path by going backwards
  const generateRecoveryPath = useCallback((robotPos, globalPath, currentIndex) => {
    const backtrackSteps = Math.min(5, currentIndex);
    const recoveryPoints = [];
    
    // Go back along the path
    for (let i = 1; i <= backtrackSteps; i++) {
      const backIndex = Math.max(0, currentIndex - i);
      if (globalPath[backIndex]) {
        recoveryPoints.push(globalPath[backIndex]);
      }
    }
    
    // Add a safe point away from obstacles
    if (recoveryPoints.length > 0) {
      const lastPoint = recoveryPoints[recoveryPoints.length - 1];
      const safeAngles = [0, Math.PI/4, Math.PI/2, 3*Math.PI/4, Math.PI, 5*Math.PI/4, 3*Math.PI/2, 7*Math.PI/4];
      
      for (const angle of safeAngles) {
        const safeX = lastPoint.x + Math.cos(angle) * 30;
        const safeY = lastPoint.y + Math.sin(angle) * 30;
        
        if (!isPointInObstacle(safeX, safeY, ROBOT_RADIUS)) {
          recoveryPoints.push({ x: safeX, y: safeY });
          break;
        }
      }
    }
    
    return recoveryPoints;
  }, [isPointInObstacle, ROBOT_RADIUS]);

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
          setCurrentPathIndex(0);
          setRecoveryMode(false);
          setRecoveryPath([]);
          setBlockedAttempts(0);
          return prevRobot;
        }

        // Update sensor data with current robot position
        const lidarData = simulateLidar(prevRobot);
        setSensorData({ lidar: lidarData });
        
        // Generate local path
        const newLocalPath = generateLocalPath(prevRobot, globalPath);
        setLocalPath(newLocalPath);

        // Handle recovery mode
        if (recoveryMode) {
          if (recoveryPath.length > 0 && recoverySteps < recoveryPath.length) {
            const recoveryTarget = recoveryPath[recoverySteps];
            
            if (canMoveTowards(prevRobot, recoveryTarget)) {
              const dx = recoveryTarget.x - prevRobot.x;
              const dy = recoveryTarget.y - prevRobot.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              if (distance < 10) {
                setRecoverySteps(prev => prev + 1);
              }
              
              const moveX = (dx / distance) * ROBOT_SPEED;
              const moveY = (dy / distance) * ROBOT_SPEED;
              const newAngle = Math.atan2(dy, dx);
              
              return {
                x: prevRobot.x + moveX,
                y: prevRobot.y + moveY,
                angle: newAngle
              };
            }
          } else {
            // Recovery complete, replan from current position
            console.log("Recovery complete, replanning path");
            const newPath = generateGlobalPath(prevRobot, goal);
            setGlobalPath(newPath);
            setCurrentPathIndex(0);
            setRecoveryMode(false);
            setRecoveryPath([]);
            setRecoverySteps(0);
            setBlockedAttempts(0);
            
            if (newPath.length === 0) {
              setIsNavigating(false);
              return prevRobot;
            }
          }
          
          return prevRobot;
        }

        // Normal navigation
        if (globalPath.length === 0) return prevRobot;

        // Find next target point in global path
        let targetPoint = goal;
        for (let i = currentPathIndex; i < globalPath.length; i++) {
          const pathPoint = globalPath[i];
          const distanceToPathPoint = Math.sqrt(
            Math.pow(pathPoint.x - prevRobot.x, 2) + Math.pow(pathPoint.y - prevRobot.y, 2)
          );
          
          if (distanceToPathPoint > 15) {
            targetPoint = pathPoint;
            setCurrentPathIndex(i);
            break;
          }
        }
        
        // Check if robot can move towards target
        if (!canMoveTowards(prevRobot, targetPoint)) {
          setBlockedAttempts(prev => prev + 1);
          
          // Enter recovery mode after 3 blocked attempts
          if (blockedAttempts >= 3) {
            console.log("Robot blocked, entering recovery mode");
            const recPath = generateRecoveryPath(prevRobot, globalPath, currentPathIndex);
            setRecoveryPath(recPath);
            setRecoveryMode(true);
            setRecoverySteps(0);
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
    currentPathIndex, 
    recoveryMode,
    recoveryPath,
    recoverySteps,
    blockedAttempts,
    simulateLidar, 
    generateLocalPath, 
    canMoveTowards,
    generateRecoveryPath,
    generateGlobalPath,
    GOAL_THRESHOLD, 
    ROBOT_SPEED
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
    setRecoverySteps(0);
    setBlockedAttempts(0);
    
    // Check if click is not on an obstacle
    if (!isPointInObstacle(x, y, ROBOT_RADIUS)) {
      const newGoal = { x, y };
      setGoal(newGoal);
      
      // Generate global path
      const path = generateGlobalPath(robot, newGoal);
      setGlobalPath(path);
      setCurrentPathIndex(0);
      
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
      ctx.lineWidth = 3;
      ctx.setLineDash([5, 5]);
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
    
    // Draw local path
    if (localPath.length > 0) {
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(robot.x, robot.y);
      localPath.forEach(point => ctx.lineTo(point.x, point.y));
      ctx.stroke();
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
    
  }, [robot, goal, globalPath, localPath, recoveryPath, sensorData, obstacles, recoveryMode, FIELD_WIDTH, FIELD_HEIGHT, ROBOT_SIZE, GOAL_THRESHOLD]);

  return (
    <div className={styles.demoContainer}>
      <div className={styles.demoHeader}>
        <h3>Interactive Autonomous Navigation Demo</h3>
        <p>Click anywhere in the field to set a goal for the robot</p>
      </div>
      
      <div className={styles.demoContent}>
        <canvas
          ref={canvasRef}
          width={FIELD_WIDTH}
          height={FIELD_HEIGHT}
          onClick={handleCanvasClick}
          className={styles.demoCanvas}
        />
        
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
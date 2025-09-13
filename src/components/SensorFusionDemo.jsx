import React, { useState, useEffect, useRef } from 'react';
import * as styles from '../styles/sensor-fusion-demo.module.css';

const SensorFusionDemo = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const FIELD_WIDTH = 800;
  const FIELD_HEIGHT = 600;
  const ROBOT_SIZE = 20;
  const PATH_POINTS = [
    { x: 100, y: 100 }, { x: 700, y: 100 }, { x: 700, y: 500 }, { x: 100, y: 500 }, { x: 100, y: 100 }
  ];

  const [isRunning, setIsRunning] = useState(false);
  const [groundTruth, setGroundTruth] = useState({ x: 100, y: 100, angle: 0, index: 0 });
  const [estimated, setEstimated] = useState({ x: 100, y: 100, angle: 0 });
  const [sensorNoise, setSensorNoise] = useState({ gps: 2, lidar: 1, odom: 0.5 });
  const [sensorActive, setSensorActive] = useState({ gps: true, lidar: true, odom: true });

  // --- Simulation Functions ---
  const moveAlongPath = (robot) => {
    const current = PATH_POINTS[robot.index];
    const next = PATH_POINTS[(robot.index + 1) % PATH_POINTS.length];

    const dx = next.x - current.x;
    const dy = next.y - current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    const step = 1.5;
    if (dist < step) {
      return { ...robot, index: (robot.index + 1) % PATH_POINTS.length };
    }

    const moveX = (dx / dist) * step;
    const moveY = (dy / dist) * step;
    const angle = Math.atan2(dy, dx);

    return {
      x: robot.x + moveX,
      y: robot.y + moveY,
      angle,
      index: robot.index
    };
  };

  const simulateSensors = (robot) => {
    const rand = (sigma) => sigma * (Math.random() * 2 - 1);

    return {
      gps: sensorActive.gps
        ? { x: robot.x + rand(sensorNoise.gps), y: robot.y + rand(sensorNoise.gps) }
        : null,
      odom: sensorActive.odom
        ? { dx: 1.5 + rand(sensorNoise.odom), dtheta: rand(0.05) }
        : null,
      lidar: sensorActive.lidar
        ? { x: robot.x + rand(sensorNoise.lidar), y: robot.y + rand(sensorNoise.lidar) }
        : null
    };
  };

  // --- Kalman Filter (Basic 2D Position + Velocity Estimator) ---
  const kalmanState = useRef({
    x: 100, y: 100, vx: 0, vy: 0,
    P: [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]]
  });

  const applyKalmanFilter = (sensors) => {
    const dt = 1;
    const F = [[1,0,dt,0],[0,1,0,dt],[0,0,1,0],[0,0,0,1]];
    const H = [[1,0,0,0],[0,1,0,0]];
    const R = [[sensorNoise.gps ** 2, 0], [0, sensorNoise.gps ** 2]];
    const Q = [[0.01,0,0,0],[0,0.01,0,0],[0,0,0.01,0],[0,0,0,0.01]];
    let { x, y, vx, vy, P } = kalmanState.current;

    // Predict
    const xp = x + vx * dt;
    const yp = y + vy * dt;
    const vp = [vx, vy];
    const Pp = P; // Simplified

    // Update with GPS (if available)
    if (sensors.gps) {
      const z = [sensors.gps.x, sensors.gps.y];
      const yk = [z[0] - xp, z[1] - yp];

      const S = [
        [Pp[0][0] + R[0][0], Pp[0][1]],
        [Pp[1][0], Pp[1][1] + R[1][1]]
      ];
      const K = [
        [Pp[0][0] / S[0][0], Pp[0][1] / S[1][1]],
        [Pp[1][0] / S[0][0], Pp[1][1] / S[1][1]],
        [Pp[2][0] / S[0][0], Pp[2][1] / S[1][1]],
        [Pp[3][0] / S[0][0], Pp[3][1] / S[1][1]],
      ];

      x = xp + K[0][0] * yk[0] + K[0][1] * yk[1];
      y = yp + K[1][0] * yk[0] + K[1][1] * yk[1];
    } else {
      x = xp;
      y = yp;
    }

    kalmanState.current = { x, y, vx, vy, P: Pp };
    return { x, y };
  };

  // --- Animation Loop ---
  useEffect(() => {
    const animate = () => {
      if (!isRunning) return;

      setGroundTruth((gt) => {
        const newGT = moveAlongPath(gt);
        const sensors = simulateSensors(newGT);
        const estimate = applyKalmanFilter(sensors);
        setEstimated((prev) => ({ ...estimate, angle: newGT.angle }));
        return newGT;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    if (isRunning) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(animationRef.current);
  }, [isRunning, sensorNoise, sensorActive]);

  // --- Draw Canvas ---
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, FIELD_WIDTH, FIELD_HEIGHT);

    // Draw Path
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 4]);
    ctx.beginPath();
    PATH_POINTS.forEach((pt, i) => {
      if (i === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    });
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw ground truth robot (transparent)
    ctx.save();
    ctx.translate(groundTruth.x, groundTruth.y);
    ctx.rotate(groundTruth.angle);
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = '#1e40af';
    ctx.fillRect(-ROBOT_SIZE / 2, -ROBOT_SIZE / 2, ROBOT_SIZE, ROBOT_SIZE);
    ctx.restore();

    // Draw estimated robot (opaque)
    ctx.save();
    ctx.translate(estimated.x, estimated.y);
    ctx.rotate(estimated.angle);
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#16a34a';
    ctx.fillRect(-ROBOT_SIZE / 2, -ROBOT_SIZE / 2, ROBOT_SIZE, ROBOT_SIZE);
    ctx.restore();
  }, [groundTruth, estimated]);

  return (
    <div className={styles.demoContainer}>
      <div className={styles.demoHeader}>
        <p>Increase the error or switch off the sensors below and see how localization changes</p>
      </div>

      <div className={styles.demoContent}>
        <canvas
          ref={canvasRef}
          width={FIELD_WIDTH}
          height={FIELD_HEIGHT}
          className={styles.demoCanvas}
        />
      </div>

      <div className={styles.demoLegendWrapper}>
        <div className={styles.demoLegend}>
          {['gps', 'lidar', 'odom'].map((sensor) => (
            <div key={sensor} className={styles.legendItem}>
              <label>{sensor.toUpperCase()} Noise</label>
              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={sensorNoise[sensor]}
                onChange={(e) =>
                  setSensorNoise((prev) => ({ ...prev, [sensor]: +e.target.value }))
                }
              />
              <button
                onClick={() =>
                  setSensorActive((prev) => ({ ...prev, [sensor]: !prev[sensor] }))
                }
              >
                {sensorActive[sensor] ? 'On' : 'Off'}
              </button>
            </div>
          ))}
          <button onClick={() => setIsRunning(true)}>Start</button>
          <button onClick={() => {
            setIsRunning(false);
            setGroundTruth({ x: 100, y: 100, angle: 0, index: 0 });
            setEstimated({ x: 100, y: 100, angle: 0 });
            kalmanState.current = {
              x: 100, y: 100, vx: 0, vy: 0,
              P: [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]]
            };
          }}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default SensorFusionDemo;

import { useEffect, useRef, useState } from 'react';

// Configuration constants
const EASING_FACTOR = 0.1;
const TRAIL_DISTANCE = 60; // Distance to stay behind cursor
const MAX_DISTANCE_FROM_CURSOR = 150; // Max distance before snapping back
const SCROLL_TIMEOUT = 200;
const ROTATION_EASING = 0.15;
const IDLE_TIMEOUT = 5000; // 5 seconds
const STEAL_SPEED = 0.3; // Faster movement when stealing cursor

// Custom Rocket SVG without flame
const RocketIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

export const RocketFollower = () => {
  const rocketWrapperRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const scrollTimeoutRef = useRef<number>();
  const idleTimeoutRef = useRef<number>();
  
  // State
  const [isScrolling, setIsScrolling] = useState(false);
  const [isStealingCursor, setIsStealingCursor] = useState(false);
  const stateRef = useRef({
    currentX: window.innerWidth * 0.1,
    currentY: window.innerHeight * 0.3,
    mouseX: window.innerWidth * 0.1,
    mouseY: window.innerHeight * 0.3,
    rotation: 45,
    lastMouseMoveTime: Date.now(),
    stolenTargetX: 0,
    stolenTargetY: 0,
  });

  useEffect(() => {
    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      stateRef.current.mouseX = e.clientX;
      stateRef.current.mouseY = e.clientY;
      stateRef.current.lastMouseMoveTime = Date.now();
      
      // Reset idle state when mouse moves
      if (isStealingCursor) {
        setIsStealingCursor(false);
      }
      
      // Reset idle timeout
      if (idleTimeoutRef.current) {
        window.clearTimeout(idleTimeoutRef.current);
      }
      
      // Set new idle timeout
      idleTimeoutRef.current = window.setTimeout(() => {
        // Generate random position on screen
        const randomX = Math.random() * (window.innerWidth - 100) + 50;
        const randomY = Math.random() * (window.innerHeight - 100) + 50;
        stateRef.current.stolenTargetX = randomX;
        stateRef.current.stolenTargetY = randomY;
        setIsStealingCursor(true);
      }, IDLE_TIMEOUT);
    };

    // Scroll handler
    const handleScroll = () => {
      setIsScrolling(true);

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }

      // Set timeout to stop scrolling state
      scrollTimeoutRef.current = window.setTimeout(() => {
        setIsScrolling(false);
      }, SCROLL_TIMEOUT);
    };

    // Animation loop
    const animate = () => {
      const state = stateRef.current;

      // Determine target position based on stealing state
      let targetMouseX = state.mouseX;
      let targetMouseY = state.mouseY;
      
      if (isStealingCursor) {
        // When stealing, target the random stolen position
        targetMouseX = state.stolenTargetX;
        targetMouseY = state.stolenTargetY;
      }

      // Calculate angle from rocket current position to target
      const deltaX = targetMouseX - state.currentX;
      const deltaY = targetMouseY - state.currentY;
      const angleToMouse = Math.atan2(deltaY, deltaX);
      const distanceToCursor = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      // Determine if rocket should snap back to cursor
      const shouldSnapBack = distanceToCursor > MAX_DISTANCE_FROM_CURSOR || isStealingCursor;
      const currentEasing = shouldSnapBack || isStealingCursor ? STEAL_SPEED : EASING_FACTOR;
      
      // Calculate target position: stay behind cursor at TRAIL_DISTANCE (unless stealing)
      let targetX, targetY;
      if (isStealingCursor) {
        // Move directly to stolen target when stealing
        targetX = targetMouseX;
        targetY = targetMouseY;
      } else {
        // Normal behavior - stay behind cursor
        targetX = state.mouseX - Math.cos(angleToMouse) * TRAIL_DISTANCE;
        targetY = state.mouseY - Math.sin(angleToMouse) * TRAIL_DISTANCE;
      }

      // Ease current position toward target
      state.currentX += (targetX - state.currentX) * currentEasing;
      state.currentY += (targetY - state.currentY) * currentEasing;
      
      // Calculate rotation to point toward the target
      const finalDeltaX = targetMouseX - state.currentX;
      const finalDeltaY = targetMouseY - state.currentY;
      const targetRotation = Math.atan2(finalDeltaY, finalDeltaX) * (180 / Math.PI) + 45;
      
      // Smooth rotation transition
      state.rotation += (targetRotation - state.rotation) * ROTATION_EASING;

      // Apply transform
      if (rocketWrapperRef.current) {
        rocketWrapperRef.current.style.transform = 
          `translate3d(${state.currentX}px, ${state.currentY}px, 0) rotate(${state.rotation}deg)`;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(animate);

    // Start idle timer
    idleTimeoutRef.current = window.setTimeout(() => {
      // Generate random position on screen
      const randomX = Math.random() * (window.innerWidth - 100) + 50;
      const randomY = Math.random() * (window.innerHeight - 100) + 50;
      stateRef.current.stolenTargetX = randomX;
      stateRef.current.stolenTargetY = randomY;
      setIsStealingCursor(true);
    }, IDLE_TIMEOUT);

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      if (idleTimeoutRef.current) {
        window.clearTimeout(idleTimeoutRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isStealingCursor]);

  return (
    <div
      ref={rocketWrapperRef}
      className={`rocket-wrapper ${isScrolling ? 'rocket--active' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        willChange: 'transform',
      }}
    >
      <div className="rocket-container">
        <div className="rocket-body">
          <RocketIcon />
          <div className="rocket-flame" />
        </div>
      </div>
    </div>
  );
};

import { useEffect, useRef, useState } from 'react';

// Configuration constants
const EASING_FACTOR = 0.1;
const MAX_SCROLL_DISTANCE = 600;
const TRAIL_DISTANCE = 60; // Distance to stay behind cursor
const SCROLL_TIMEOUT = 200;
const ROTATION_EASING = 0.15;

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
  
  // State
  const [isScrolling, setIsScrolling] = useState(false);
  const stateRef = useRef({
    currentX: window.innerWidth * 0.1,
    currentY: window.innerHeight * 0.3,
    targetX: window.innerWidth * 0.1,
    targetY: window.innerHeight * 0.3,
    baseMouseY: window.innerHeight * 0.3,
    lastScrollY: 0,
    rotation: 45,
    mouseX: window.innerWidth * 0.1,
    mouseY: window.innerHeight * 0.3,
    lastMouseX: window.innerWidth * 0.1,
    lastMouseY: window.innerHeight * 0.3,
  });

  useEffect(() => {
    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      stateRef.current.mouseX = e.clientX;
      stateRef.current.mouseY = e.clientY;
    };

    // Scroll handler
    const handleScroll = () => {
      setIsScrolling(true);
      
      stateRef.current.lastScrollY = window.scrollY;

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

      // Calculate scroll progress and extra offset
      const scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      const extraScrollOffset = scrollProgress * MAX_SCROLL_DISTANCE;

      // Get cursor direction
      const cursorDeltaX = state.mouseX - state.lastMouseX;
      const cursorDeltaY = state.mouseY - state.lastMouseY;
      
      // Calculate angle from cursor movement
      const movementAngle = Math.atan2(cursorDeltaY, cursorDeltaX);
      
      // Position rocket behind the cursor based on movement direction
      const offsetX = -Math.cos(movementAngle) * TRAIL_DISTANCE;
      const offsetY = -Math.sin(movementAngle) * TRAIL_DISTANCE;
      
      // Set target position behind cursor
      state.targetX = state.mouseX + offsetX;
      state.baseMouseY = state.mouseY + offsetY;
      
      // Update last mouse position
      state.lastMouseX = state.mouseX;
      state.lastMouseY = state.mouseY;

      // Calculate final target Y combining mouse and scroll
      const finalTargetY = state.baseMouseY + extraScrollOffset;

      // Ease current position toward target
      state.currentX += (state.targetX - state.currentX) * EASING_FACTOR;
      state.currentY += (finalTargetY - state.currentY) * EASING_FACTOR;
      
      // Calculate rotation to point toward the cursor
      const deltaX = state.mouseX - state.currentX;
      const deltaY = state.mouseY - state.currentY;
      
      // Calculate angle from rocket to cursor in degrees
      // Add 45 to account for the rocket icon's default orientation
      const targetRotation = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 45;
      
      // Smooth rotation transition
      state.rotation += (targetRotation - state.rotation) * ROTATION_EASING;

      // Clamp positions to keep rocket mostly in viewport
      const clampedX = Math.max(-50, Math.min(window.innerWidth + 50, state.currentX));
      const clampedY = Math.max(-50, Math.min(window.innerHeight + 100, state.currentY));

      // Apply transform
      if (rocketWrapperRef.current) {
        rocketWrapperRef.current.style.transform = 
          `translate3d(${clampedX}px, ${clampedY}px, 0) rotate(${state.rotation}deg)`;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(animate);

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
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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


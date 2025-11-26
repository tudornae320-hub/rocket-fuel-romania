import { useEffect, useRef, useState } from 'react';

// Configuration constants
const EASING_FACTOR = 0.1;
const MAX_SCROLL_DISTANCE = 600;
const MOUSE_OFFSET_X = 40;
const MOUSE_OFFSET_Y = -40;
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
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
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
    prevX: window.innerWidth * 0.1,
    prevY: window.innerHeight * 0.3,
  });

  useEffect(() => {
    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      stateRef.current.targetX = e.clientX + MOUSE_OFFSET_X;
      stateRef.current.baseMouseY = e.clientY + MOUSE_OFFSET_Y;
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

      // Calculate final target Y combining mouse and scroll
      const finalTargetY = state.baseMouseY + extraScrollOffset;

      // Store previous position for rotation calculation
      const oldX = state.currentX;
      const oldY = state.currentY;

      // Ease current position toward target
      state.currentX += (state.targetX - state.currentX) * EASING_FACTOR;
      state.currentY += (finalTargetY - state.currentY) * EASING_FACTOR;
      
      // Calculate rotation based on direction of movement
      const deltaX = state.currentX - oldX;
      const deltaY = state.currentY - oldY;
      
      // Only update rotation if there's significant movement
      if (Math.abs(deltaX) > 0.1 || Math.abs(deltaY) > 0.1) {
        // Calculate angle in degrees (0 degrees = pointing right, 90 = down)
        const targetRotation = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 45;
        state.rotation += (targetRotation - state.rotation) * ROTATION_EASING;
      }

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
        </div>
        <div className="rocket-flame" />
      </div>
    </div>
  );
};


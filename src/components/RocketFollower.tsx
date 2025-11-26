import { useEffect, useRef, useState } from 'react';
import { Rocket } from 'lucide-react';

// Configuration constants
const EASING_FACTOR = 0.1;
const MAX_SCROLL_DISTANCE = 600;
const MOUSE_OFFSET_X = 40;
const MOUSE_OFFSET_Y = -40;
const SCROLL_TIMEOUT = 200;

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
    rotation: 0,
    targetRotation: 0,
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
      
      // Detect scroll direction
      const currentScrollY = window.scrollY;
      if (currentScrollY > stateRef.current.lastScrollY) {
        stateRef.current.targetRotation = -12;
      } else {
        stateRef.current.targetRotation = 0;
      }
      stateRef.current.lastScrollY = currentScrollY;

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }

      // Set timeout to stop scrolling state
      scrollTimeoutRef.current = window.setTimeout(() => {
        setIsScrolling(false);
        stateRef.current.targetRotation = 0;
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

      // Ease current position toward target
      state.currentX += (state.targetX - state.currentX) * EASING_FACTOR;
      state.currentY += (finalTargetY - state.currentY) * EASING_FACTOR;
      
      // Ease rotation
      state.rotation += (state.targetRotation - state.rotation) * EASING_FACTOR;

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
        <Rocket className="rocket-body" />
        <div className="rocket-flame" />
      </div>
    </div>
  );
};


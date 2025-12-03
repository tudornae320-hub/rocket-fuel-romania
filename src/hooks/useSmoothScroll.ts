import { useEffect } from 'react';

export const useSmoothScroll = () => {
  useEffect(() => {
    let currentScroll = window.scrollY;
    let targetScroll = window.scrollY;
    let isScrolling = false;
    const ease = 0.08; // Lower = smoother, higher = faster response

    const smoothScroll = () => {
      currentScroll += (targetScroll - currentScroll) * ease;
      
      // Stop animation when close enough to target
      if (Math.abs(targetScroll - currentScroll) < 0.5) {
        currentScroll = targetScroll;
        window.scrollTo(0, currentScroll);
        isScrolling = false;
        return;
      }
      
      window.scrollTo(0, currentScroll);
      requestAnimationFrame(smoothScroll);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      // Add to target scroll position
      targetScroll += e.deltaY;
      
      // Clamp to document bounds
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));
      
      if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(smoothScroll);
      }
    };

    // Sync on manual scroll (touch, scrollbar drag)
    const handleScroll = () => {
      if (!isScrolling) {
        currentScroll = window.scrollY;
        targetScroll = window.scrollY;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
};

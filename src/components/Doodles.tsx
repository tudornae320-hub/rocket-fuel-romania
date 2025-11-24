export const ArrowDoodle = ({ className = "" }: { className?: string }) => (
  <svg
    className={`absolute ${className}`}
    width="80"
    height="60"
    viewBox="0 0 80 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 30C15 20, 35 15, 50 25C55 28, 60 35, 70 30"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
      className="text-primary"
    />
    <path
      d="M65 25L70 30L65 35"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-primary"
    />
  </svg>
);

export const CircleDoodle = ({ className = "" }: { className?: string }) => (
  <svg
    className={`absolute ${className}`}
    width="60"
    height="60"
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="30"
      cy="30"
      r="25"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeDasharray="5 5"
      fill="none"
      className="text-secondary"
    />
  </svg>
);

export const StarDoodle = ({ className = "" }: { className?: string }) => (
  <svg
    className={`absolute ${className}`}
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 5L22 18L28 10L25 20L38 20L27 25L32 35L20 28L8 35L13 25L2 20L15 20L12 10L18 18L20 5Z"
      fill="currentColor"
      className="text-primary"
    />
  </svg>
);

export const SquiggleDoodle = ({ className = "" }: { className?: string }) => (
  <svg
    className={`absolute ${className}`}
    width="100"
    height="40"
    viewBox="0 0 100 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 20C15 10, 25 30, 35 20C45 10, 55 30, 65 20C75 10, 85 30, 95 20"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
      className="text-secondary"
    />
  </svg>
);

export const UnderlineDoodle = ({ className = "" }: { className?: string }) => (
  <svg
    className={`absolute ${className}`}
    width="200"
    height="20"
    viewBox="0 0 200 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 10C30 8, 60 12, 90 9C120 6, 150 11, 180 10"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
      className="text-primary"
    />
  </svg>
);

export const CrossDoodle = ({ className = "" }: { className?: string }) => (
  <svg
    className={`absolute ${className}`}
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 5L25 25M25 5L5 25"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      className="text-secondary"
    />
  </svg>
);

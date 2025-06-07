import type React from 'react';

interface PizzaIconProps extends React.SVGProps<SVGSVGElement> {
  // You can add specific props here if needed
}

const PizzaIcon: React.FC<PizzaIconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
    <path d="M12 2L7 12H17L12 2Z" />
    <path d="M6 18C6 18 7.66667 16 12 16C16.3333 16 18 18 18 18" />
    <circle cx="10" cy="10" r="1" />
    <circle cx="14" cy="10" r="1" />
    <circle cx="12" cy="14" r="1" />
  </svg>
);

export default PizzaIcon;

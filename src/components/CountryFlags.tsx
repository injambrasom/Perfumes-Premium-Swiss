import React from 'react';

interface FlagProps {
  className?: string;
}

export const SwissFlagIcon: React.FC<FlagProps> = ({ className = "w-5 h-5" }) => (
  <svg className={`${className} shrink-0 inline-block rounded-xs shadow-sm align-middle border border-white/20`} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="3" fill="#D52B1E" />
    <path d="M13 7H19V13H25V19H19V25H13V19H7V13H13V7Z" fill="white" />
  </svg>
);

export const FranceFlagIcon: React.FC<FlagProps> = ({ className = "w-5 h-5" }) => (
  <svg className={`${className} shrink-0 inline-block rounded-xs shadow-sm align-middle border border-white/20`} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="3" fill="white" />
    <path d="M0 0H10.67V32H0V0Z" fill="#002395" />
    <path d="M10.67 0H21.33V32H10.67V0Z" fill="#FFFFFF" />
    <path d="M21.33 0H32V32H21.33V0Z" fill="#ED2939" />
  </svg>
);

export const UaeFlagIcon: React.FC<FlagProps> = ({ className = "w-5 h-5" }) => (
  <svg className={`${className} shrink-0 inline-block rounded-xs shadow-sm align-middle border border-white/20`} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="3" fill="white" />
    <path d="M0 0H32V10.67H0V0Z" fill="#007A3D" />
    <path d="M0 10.67H32V21.33H0V10.67Z" fill="#FFFFFF" />
    <path d="M0 21.33H32V32H0V21.33Z" fill="#000000" />
    <path d="M0 0H8V32H0V0Z" fill="#FF0000" />
  </svg>
);

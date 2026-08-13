import React from 'react';

export const FlowGenLogo = ({ className = "w-8 h-8", textClassName = "font-extrabold text-xl text-slate-900 tracking-tight", showText = true, subtitle = null }) => {
  const gradientId = React.useId();

  return (
    <div className="flex items-center space-x-2.5 shrink-0 select-none group">
      {/* Official FlowGen SVG Logo with Animated Glow & Path Draw */}
      <svg
        className={`${className} shrink-0 logo-animated transition-transform duration-300 group-hover:scale-110`}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="draw-path"
          d="M10 28 C10 16, 20 8, 28 12 C34 15, 34 25, 26 28 C20 30, 14 20, 20 12"
          stroke={`url(#${gradientId})`}
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="50%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#25d366" />
          </linearGradient>
        </defs>
      </svg>

      {showText && (
        <div>
          <div className="flex items-center space-x-1.5">
            <span className={`${textClassName} group-hover:text-blue-600 transition-colors`}>Flowgen</span>
          </div>
          {subtitle && (
            <p className="text-[10px] text-blue-700 font-mono font-semibold leading-none">{subtitle}</p>
          )}
        </div>
      )}
    </div>
  );
};

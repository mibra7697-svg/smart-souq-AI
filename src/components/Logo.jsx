import React from 'react';

const Logo = ({ size = 'medium', variant = 'full' }) => {
  const sizes = {
    small: { width: 40, height: 40, fontSize: '0.8rem' },
    medium: { width: 60, height: 60, fontSize: '1rem' },
    large: { width: 100, height: 100, fontSize: '1.5rem' },
    xlarge: { width: 150, height: 150, fontSize: '2rem' }
  };

  const { width, height, fontSize } = sizes[size];

  const LogoIcon = () => (
    <svg width={width} height={height} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="95" fill="#22c55e" opacity="0.1" />
      <path d="M70,140 L130,140 L140,80 L60,80 Z" fill="white" stroke="#22c55e" strokeWidth="8" />
      <path d="M75,140 L75,50 Q75,35 90,35 L110,35 Q125,35 125,50 L125,140" 
            fill="none" stroke="#22c55e" strokeWidth="8" />
      <path d="M40,100 Q60,80 80,100 T120,100 T160,100" 
            fill="none" stroke="#16a34a" strokeWidth="5" strokeLinecap="round" />
      <path d="M30,110 Q55,90 85,110 T135,110 T170,110" 
            fill="none" stroke="#0d8a3a" strokeWidth="5" strokeLinecap="round" />
      <circle cx="60" cy="60" r="4" fill="#22c55e" />
      <circle cx="100" cy="50" r="4" fill="#22c55e" />
      <circle cx="140" cy="60" r="4" fill="#22c55e" />
      <circle cx="80" cy="90" r="4" fill="#16a34a" />
      <circle cx="120" cy="90" r="4" fill="#16a34a" />
      <circle cx="100" cy="100" r="95" fill="none" stroke="#22c55e" strokeWidth="2" />
    </svg>
  );

  const LogoText = () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      fontFamily: 'Cairo, sans-serif'
    }}>
      <div style={{ 
        fontSize: fontSize, 
        fontWeight: '900', 
        color: '#22c55e',
        lineHeight: '1.2'
      }}>
        سمارت سوق <span style={{ color: '#3b82f6' }}>AI</span>
      </div>
      <div style={{ 
        fontSize: `calc(${fontSize} * 0.7)`, 
        color: '#64748b',
        fontWeight: '500',
        letterSpacing: '1px'
      }}>
        SMART SOUQ AI
      </div>
    </div>
  );

  if (variant === 'icon') return <LogoIcon />;
  if (variant === 'text') return <LogoText />;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <LogoIcon />
      <LogoText />
    </div>
  );
};

export default Logo;
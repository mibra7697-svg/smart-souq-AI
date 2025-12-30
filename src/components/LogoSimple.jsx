import React from 'react';

const LogoSimple = ({ type = 'horizontal', size = 'normal', color = 'gradient' }) => {
  const colors = {
    gradient: { primary: '#3b82f6', secondary: '#8b5cf6' },
    blue: { primary: '#3b82f6', secondary: '#2563eb' },
    purple: { primary: '#8b5cf6', secondary: '#7c3aed' },
    teal: { primary: '#0d9488', secondary: '#14b8a6' }
  };

  const sizes = {
    small: { icon: 18, text: '0.8rem', subtext: '0.65rem' },
    normal: { icon: 24, text: '0.95rem', subtext: '0.7rem' },
    large: { icon: 32, text: '1.1rem', subtext: '0.8rem' }
  };

  const { primary, secondary } = colors[color];
  const { icon, text, subtext } = sizes[size];

  const Icon = () => (
    <div style={{
      width: `${icon}px`,
      height: `${icon}px`,
      background: `linear-gradient(135deg, ${primary}, ${secondary})`,
      borderRadius: '6px',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: `0 2px 8px ${primary}40`
    }}>
      {/* رمز موجات الذكاء الاصطناعي */}
      <div style={{
        position: 'relative',
        width: `${icon * 0.6}px`,
        height: `${icon * 0.4}px`,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
      }}>
        {[1, 2, 3].map(i => (
          <div key={i} style={{
            width: `${icon * 0.1}px`,
            height: `${(icon * 0.25) * (i/3)}px`,
            background: 'white',
            borderRadius: '1px',
            animation: `pulse 1.5s ease-in-out ${i * 0.2}s infinite`
          }}></div>
        ))}
      </div>
      
      {/* رمز AI صغير */}
      <div style={{
        position: 'absolute',
        bottom: '1px',
        right: '1px',
        color: 'white',
        fontSize: `${icon * 0.18}px`,
        fontWeight: 'bold',
        opacity: '0.9'
      }}>AI</div>
    </div>
  );

  const Text = () => (
    <div style={{ textAlign: 'right', lineHeight: '1.2' }}>
      <div style={{
        fontSize: text,
        fontWeight: '800',
        background: `linear-gradient(135deg, ${primary}, ${secondary})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        سمارت سوق
      </div>
      <div style={{
        fontSize: subtext,
        color: '#64748b',
        fontWeight: '500',
        letterSpacing: '0.3px'
      }}>
        Smart Souq AI
      </div>
    </div>
  );

  if (type === 'icon') return <Icon />;
  if (type === 'text') return <Text />;

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center',
      gap: type === 'horizontal' ? '8px' : '4px',
      flexDirection: type === 'vertical' ? 'column' : 'row'
    }}>
      <Icon />
      <Text />
    </div>
  );
};

export default LogoSimple;
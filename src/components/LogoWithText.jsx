import React from 'react';

const LogoWithText = ({ color = 'green', showTagline = true }) => {
  const colors = {
    green: { primary: '#22c55e', secondary: '#16a34a' },
    blue: { primary: '#3b82f6', secondary: '#2563eb' },
    purple: { primary: '#8b5cf6', secondary: '#7c3aed' }
  };

  const { primary, secondary } = colors[color] || colors.green;

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      padding: '1rem'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '1rem' 
      }}>
        <div style={{
          position: 'relative',
          width: '80px',
          height: '80px',
          backgroundColor: primary,
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: '15px'
        }}>
          <div style={{
            width: '40px',
            height: '30px',
            backgroundColor: 'white',
            borderRadius: '5px',
            position: 'relative',
            marginBottom: '5px'
          }}>
            <div style={{
              position: 'absolute',
              top: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '25px',
              height: '10px',
              backgroundColor: 'white',
              border: `3px solid ${primary}`,
              borderRadius: '5px'
            }}></div>
          </div>
          
          <div style={{
            position: 'absolute',
            bottom: '15px',
            width: '60px',
            height: '10px',
            display: 'flex',
            justifyContent: 'space-around'
          }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{
                width: '4px',
                height: `${8 + i * 4}px`,
                backgroundColor: 'white',
                borderRadius: '2px'
              }}></div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <h1 style={{
            margin: 0,
            fontSize: '2.2rem',
            fontWeight: '900',
            color: primary,
            lineHeight: '1.1'
          }}>
            سمارت سوق
          </h1>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            marginTop: '5px'
          }}>
            <span style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: secondary
            }}>AI</span>
            <span style={{
              fontSize: '0.9rem',
              color: '#64748b',
              letterSpacing: '1px'
            }}>SMART SOUQ</span>
          </div>
        </div>
      </div>

      {showTagline && (
        <div style={{
          fontSize: '0.9rem',
          color: '#64748b',
          textAlign: 'center',
          padding: '0.5rem 1rem',
          backgroundColor: '#f8fafc',
          borderRadius: '10px',
          marginTop: '0.5rem'
        }}>
          الذكاء الاصطناعي لمقارنة الأسعار والتوقعات
        </div>
      )}
    </div>
  );
};

export default LogoWithText;
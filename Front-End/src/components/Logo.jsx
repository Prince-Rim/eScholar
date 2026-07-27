import React from 'react';
import escholarLogo from '../assets/escholar_logo.png';

const Logo = ({ size = 'normal', color = '#1e3a8a', onClick, style = {} }) => {
  const isLarge = size === 'large';
  const logoHeight = isLarge ? '80px' : '64px';

  return (
    <div 
      style={{ display: 'flex', alignItems: 'center', cursor: onClick ? 'pointer' : 'default', ...style }}
      onClick={onClick}
    >
      <img 
        src={escholarLogo} 
        alt="eScholar" 
        style={{ height: logoHeight, objectFit: 'contain' }} 
      />
    </div>
  );
};

export default Logo;

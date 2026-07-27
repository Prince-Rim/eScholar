import React from 'react';
import escholarLogo from '../assets/escholar_logo.png';

const Logo = ({ size = 'normal', color = '#1e3a8a', onClick, style = {} }) => {
  const isLarge = size === 'large';
  const logoHeight = isLarge ? '75px' : '44px';

  return (
    <div 
      style={{ display: 'flex', alignItems: 'center', cursor: onClick ? 'pointer' : 'default', ...style }}
      onClick={onClick}
    >
      <img 
        src={escholarLogo} 
        alt="eScholar" 
        style={{ height: logoHeight, width: 'auto', objectFit: 'contain', maxHeight: '100%' }} 
      />
    </div>
  );
};

export default Logo;

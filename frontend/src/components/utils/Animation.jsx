import React, { useEffect, useState } from 'react';

// import CSS
import './animation.css';

const animation = ({ children, animationClass }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      // (class="animsition t10 fade-in")
      className={`animsition ${animationClass} ${isVisible ? 'fade-in' : ''}`}
    >
      {children}
    </div>
  );
};

export default animation;

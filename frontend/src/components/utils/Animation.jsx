// Hooks
import React, { useEffect, useState } from 'react';

// CSS
import './Animation.css';

/**
 * 화면 전환 시 fade-in 효과를 주는 애니메이션 컴포넌트입니다.
 *
 * @param {React.ReactNode} props.children - 애니메이션 효과를 적용할 자식 요소입니다.
 * @param {string} [props.animationClass] - 추가 애니메이션 클래스를 지정합니다 (선택 사항).
 * @returns {JSX.Element} 애니메이션 효과가 적용된 컨테이너 요소입니다.
 */
const Animation = ({ children, animationClass }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`animsition ${animationClass} ${isVisible ? 'fade-in' : ''}`}
    >
      {children}
    </div>
  );
};

export default Animation;

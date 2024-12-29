// Hooks
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * 페이지 이동 시 스크롤을 최상단으로 전환하는 컴포넌트입니다.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // window.scrollTo(0, 0); // 스크롤하듯이 이동
    window.scroll({ top: 0, behavior: 'instant' }); // 즉시 상단으로 이동
  }, [pathname]);

  return null;
};

export default ScrollToTop;

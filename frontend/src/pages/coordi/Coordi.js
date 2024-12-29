// Hooks
import { Routes } from 'react-router-dom';

// Components
import coordiRoutes from './coordiRoutes';

/**
 *  코디자랑 게시판 관련 페이지의 라우트를 처리하는 컴포넌트입니다.
 *  coordiRoutes 배열에 정의된 하위 경로를 렌더링합니다.
 */
const Coordi = () => {
  return <Routes>{coordiRoutes}</Routes>;
};

export default Coordi;

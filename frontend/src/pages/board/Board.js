// Hooks
import { Routes } from 'react-router-dom';

// Components
import boardRoutes from './boardRoutes';

/**
 *  자유게시판 관련 페이지의 라우트를 처리하는 컴포넌트입니다.
 *  boardRoutes 배열에 정의된 하위 경로를 렌더링합니다.
 */
const Board = () => {
  return <Routes>{boardRoutes}</Routes>;
};

export default Board;

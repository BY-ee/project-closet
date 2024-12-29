// Hooks
import { Route } from 'react-router-dom';

// Components
import BoardList from './routes/BoardList';
import BoardDetail from './routes/BoardDetail';
import BoardWrite from './routes/BoardWrite';
import BoardEdit from './routes/BoardEdit';

/**
 *  자유게시판 관련 페이지의 하위 라우트 경로를 정의한 배열입니다.
 *  각 경로는 자유게시판 페이지의 특정 기능입니다.
 */
const boardRoutes = [
  <Route path="" element={<BoardList />} key="board" />,
  <Route path="/:boardId" element={<BoardDetail />} key="detail" />,
  <Route path="/write" element={<BoardWrite />} key="write" />,
  <Route path="/edit/:boardId" element={<BoardEdit />} key="edit" />,
];

export default boardRoutes;

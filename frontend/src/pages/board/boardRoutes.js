import { Route } from 'react-router-dom';
import BoardList from './BoardList';
import BoardDetail from './BoardDetail';
import WritePost from './WritePost';
import EditPost from './EditPost';

const communityRoutes = [
  <Route path="" element={<BoardList />} key="board" />,
  <Route path="/:boardId" element={<BoardDetail />} key="detail" />,
  <Route path="/write" element={<WritePost />} key="write" />,
  <Route path="/edit/:boardId" element={<EditPost />} key="edit" />,
];

export default communityRoutes;

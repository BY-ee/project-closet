// Hooks
import { Route } from 'react-router-dom';

// Components
import CoordiList from './routes/CoordiList';
import UploadCoordi from './routes/UploadCoordi';

/**
 *  코디자랑 게시판 관련 페이지의 하위 라우트 경로를 정의한 배열입니다.
 *  각 경로는 코디자랑 게시판 페이지의 특정 기능입니다.
 */
const coordiRoutes = [
  <Route path="" element={<CoordiList />} key="coordi" />,
  <Route path="/upload" element={<UploadCoordi />} key="upload" />,
];

export default coordiRoutes;

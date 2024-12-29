// Hooks
import { Route } from 'react-router-dom';

// Components
import HomeAdmin from './routes/HomeAdmin';
import UserAdmin from './routes/UserAdmin';
import OrderAdmin from './routes/OrderAdmin';
import ItemAdmin from './routes/ItemAdmin';
import PageAdmin from './routes/PageAdmin';

/**
 *  관리자 페이지의 하위 라우트 경로를 정의한 배열입니다.
 *  각 경로는 관리자 페이지의 특정 기능입니다.
 */
const adminRoutes = [
  <Route path="" element={<HomeAdmin />} key="home" />,
  <Route path="user" element={<UserAdmin />} key="user" />,
  <Route path="order" element={<OrderAdmin />} key="order" />,
  <Route path="item" element={<ItemAdmin />} key="item" />,
  <Route path="page" element={<PageAdmin />} key="page" />,
];

export default adminRoutes;

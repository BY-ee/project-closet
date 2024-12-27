import { Route } from 'react-router-dom';
import HomeAdmin from './adminDetail/HomeAdmin';
import UserAdmin from './adminDetail/UserAdmin';
import OrderAdmin from './adminDetail/OrderAdmin';
import ItemAdmin from './adminDetail/ItemAdmin';
import PageAdmin from './adminDetail/PageAdmin';

// 관리자 페이지의 하위 라우트 경로를 정의한 배열입니다.
// 각 경로는 관리자 페이지의 특정 기능입니다.
const adminRoutes = [
  <Route path="" element={<HomeAdmin />} key="home" />,
  <Route path="user" element={<UserAdmin />} key="user" />,
  <Route path="order" element={<OrderAdmin />} key="order" />,
  <Route path="item" element={<ItemAdmin />} key="item" />,
  <Route path="page" element={<PageAdmin />} key="page" />,
];

export default adminRoutes;

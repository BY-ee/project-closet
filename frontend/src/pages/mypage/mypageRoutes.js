// Hooks
import { Route } from 'react-router-dom';

// Components
import MypageHome from './routes/MypageHome';
import MyPoints from './routes/MyPoints';
import MyInfo from './routes/MyInfo';
import MyReservation from './routes/MyReservation';
import MyReviews from './routes/MyReviews';
import MyInquiries from './routes/MyInquiries';
import MyOrderHistory from './routes/MyOrderHistory';

/**
 *  마이페이지의 하위 라우트 경로를 정의한 배열입니다.
 *  각 경로는 마이페이지의 특정 기능입니다.
 */
const mypageRoutes = [
  <Route path="" element={<MypageHome />} key="mypageHome" />,
  <Route path="/points" element={<MyPoints />} key="myPoints" />,
  <Route path="/info" element={<MyInfo />} key="myInfo" />,
  <Route path="/reviews" element={<MyReviews />} key="myReviews" />,
  <Route path="/reservation" element={<MyReservation />} key="myReservation" />,
  <Route path="/inquiries" element={<MyInquiries />} key="myinquiry" />,
  <Route path="/payments" element={<MyOrderHistory />} key="myOrderHistory" />,
];

export default mypageRoutes;

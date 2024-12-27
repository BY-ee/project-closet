import { Route } from 'react-router-dom';
import MypageHome from './MypageHome';
import MyPoint from './MyPoint';
import MyMemberInfo from './MyMemberInfo';
import MyReservation from './MyReservation';
import MyReviews from './MyReviews';
import Myinquiry from './Myinquiry';
import MyPurchaseHistory from './MyPurchaseHistory';

// 마이페이지의 하위 라우트 경로를 정의한 배열입니다.
// 각 경로는 마이페이지의 특정 기능입니다.
const mypageRoutes = [
  <Route path="" element={<MypageHome />} key="mypageHome" />,
  <Route path="/points" element={<MyPoint />} key="myPoint" />,
  <Route path="/info" element={<MyMemberInfo />} key="myMemberInfo" />,
  <Route path="/reviews" element={<MyReviews />} key="myReviews" />,
  <Route path="/reservation" element={<MyReservation />} key="myReservation" />,
  <Route path="/inquiries" element={<Myinquiry />} key="myinquiry" />,
  <Route
    path="/payments"
    element={<MyPurchaseHistory />}
    key="myPurchaseHistory"
  />,
];

export default mypageRoutes;

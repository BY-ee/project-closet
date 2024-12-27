import { Route } from 'react-router-dom';
import OAuth2RedirectHandler from './OAuth2RedirectHandler ';
import Login from './Login';
import SignUp from './SignUp';
import ChangePassword from './ChangePassword';
import FindId from './FindId';
import ResetPassword from './ResetPassword';

// 인증 관련 페이지의 하위 라우트 경로를 정의한 배열입니다.
// 각 경로는 인증 페이지의 특정 기능입니다.
const authRoutes = [
  <Route path="/Login" element={<Login />} key="login" />,
  <Route
    path="/oauth2/redirect"
    element={<OAuth2RedirectHandler />}
    key="oauth2RedirectHandler"
  />,
  <Route path="/SignUp" element={<SignUp />} key="signUp" />,
  <Route
    path="/change-password"
    element={<ChangePassword />}
    key="change-password"
  />,
  <Route path="find-id" element={<FindId />} key="findId" />,
  <Route
    path="/reset-password"
    element={<ResetPassword />}
    key="resetPassword"
  />,
];

export default authRoutes;

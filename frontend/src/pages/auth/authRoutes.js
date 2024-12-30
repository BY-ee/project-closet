// Hooks
import { Route } from 'react-router-dom';

// Components
import OAuth2RedirectHandler from '../../components/features/auth/OAuth2RedirectHandler';
import Login from './routes/Login';
import Signup from './routes/Signup';
import FindId from './routes/FindId';
import ResetPassword from './routes/ResetPassword';
import ChangePassword from './routes/ChangePassword';

/**
 *  인증 관련 페이지의 하위 라우트 경로를 정의한 배열입니다.
 *  각 경로는 인증 페이지의 특정 기능입니다.
 */
const authRoutes = [
  <Route path="/login" element={<Login />} key="login" />,
  <Route path="/signup" element={<Signup />} key="signup" />,
  <Route path="/find-id" element={<FindId />} key="findId" />,
  <Route
    path="/reset-password"
    element={<ResetPassword />}
    key="resetPassword"
  />,
  <Route
    path="/change-password"
    element={<ChangePassword />}
    key="change-password"
  />,
  <Route
    path="/oauth2/redirect"
    element={<OAuth2RedirectHandler />}
    key="oauth2RedirectHandler"
  />,
];

export default authRoutes;

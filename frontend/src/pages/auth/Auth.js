import { Routes } from 'react-router-dom';
import authRoutes from './authRoutes';

// 인증 관련 페이지의 라우트를 처리하는 컴포넌트입니다.
// authRoutes 배열에 정의된 하위 경로를 렌더링합니다.
const Auth = () => {
  return <Routes>{authRoutes}</Routes>;
};

export default Auth;

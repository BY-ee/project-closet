// Hooks
import { Routes } from 'react-router-dom';

// Components
import adminRoutes from './adminRoutes';

/**
 *  관리자 페이지의 라우트를 처리하는 컴포넌트입니다.
 *  adminRoutes 배열에 정의된 하위 경로를 렌더링합니다.
 */
const Admin = () => {
  return <Routes>{adminRoutes}</Routes>;
};

export default Admin;

// Hooks
import { Routes } from 'react-router-dom';

// Components
import MypageHeader from './MypageHeader';
import mypageRoutes from './mypageRoutes';

/**
 *  마이페이지의 라우트를 처리하는 컴포넌트입니다.
 *  mypageRoutes 배열에 정의된 하위 경로를 렌더링합니다.
 */
const Mypage = () => {
  return (
    <>
      <MypageHeader />
      <Routes>{mypageRoutes}</Routes>
    </>
  );
};

export default Mypage;

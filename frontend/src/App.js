// React 기본 및 라우팅 관련 라이브러리
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// 외부 CSS 및 아이콘 라이브러리
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap 스타일
import 'font-awesome/css/font-awesome.min.css'; // Font Awesome 아이콘
import 'material-design-iconic-font/dist/css/material-design-iconic-font.min.css'; // Material Design 아이콘

// 페이지 컴포넌트 (Others 는 2개 이상일 경우 별도로 나눌 예정)
import Home from './pages/main/Home';

/** ./pages/auth  */
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';

/** ./pages/MyPage  */
import MyPoint from './pages/mypage/MyPoint';
import MyPageHome from './pages/mypage/MyPageHome';
import MemberInfo from './pages/mypage/MemberInfo';
import MyInquirement from './pages/mypage/MyInquirement';
/** ./pages/Other  */
import Detail from './pages/DetailItem/Detail';
import Recommend from './pages/comunity/recommend/Recommend';
import ShoppingCart from './pages/cart/ShoppingCart';

// 공통 애니메이션과 레이아웃
import Layout from './store/Layout'; // Header/Footer 포함 여부를 제어하는 레이아웃
import Animation from './hooks/Animation'; // 페이지 전환 애니메이션 효과

/**
 * 공통적으로 사용하는 Route 생성 함수
 * @param {string} path - 라우트 경로
 * @param {JSX.Element} component - 렌더링할 컴포넌트
 * @param {boolean} includeHeaderFooter - Header/Footer 포함 여부 (기본값: true)
 * @returns {JSX.Element} - Route 컴포넌트
 */

const renderRoute = (path, component, includeHeaderFooter = true) => (
  <Route
    path={path}
    element={
      <Layout includeHeaderFooter={includeHeaderFooter}>{component}</Layout>
    }
  />
);

/**
 * App 전체 라우팅을 관리하는 컴포넌트
 * @returns {JSX.Element} - 전체 라우팅 구성
 */

const AppRoutes = () => (
  <Router>
    {/* 애니메이션으로 감싸 모든 페이지 전환에 효과 적용 */}
    <Animation>
      <Routes>
        {/* 각 경로별 컴포넌트 연결 */}
        {renderRoute('/', <Home />)} {/* 메인 페이지 */}
        {renderRoute('/Detail', <Detail />)} {/* 상품 상세 페이지 */}
        {renderRoute(
          '/Recommend',
          <Recommend />
        )} {/* 추천 페이지 */}
        {renderRoute(
          '/ShoppingCart',
          <ShoppingCart />
        )} {/* 장바구니 페이지 */}
        {renderRoute(
          '/MyPageHome',
          <MyPageHome />
        )} {/* 마이페이지 홈 */}
        {renderRoute('/Login', <Login />)} {/* 로그인 페이지 */}
        {renderRoute('/SignUp', <SignUp />)} {/* 회원가입 페이지 */}
        {renderRoute('/MyPoint', <MyPoint />)} {/* 포인트 페이지 */}
        {renderRoute(
          '/MemberInfo',
          <MemberInfo />
        )} {/* 포인트 페이지 */}
        {renderRoute(
          '/MyInquirement',
          <MyInquirement />
        )} {/* 포인트 페이지 */}
      </Routes>
    </Animation>
  </Router>
);

export default AppRoutes;

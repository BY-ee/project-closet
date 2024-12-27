// React 기본 및 라우팅 관련 라이브러리
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// 외부 CSS 및 아이콘 라이브러리
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap 스타일
import 'font-awesome/css/font-awesome.min.css'; // Font Awesome 아이콘
import 'material-design-iconic-font/dist/css/material-design-iconic-font.min.css'; // Material Design 아이콘

// 전역 상태
import { BasketProvider } from './contexts/BasketContext';
import { UserProvider } from './contexts/UserContext';

// 공통 애니메이션과 레이아웃
import scrollToTop from './utils/scrollToTop';
import animation from './utils/animation'; // 페이지 전환 애니메이션 효과

// 컴포넌트
import Home from './pages/Home';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import Auth from './pages/auth/Auth';
import Mypage from './pages/mypage/Mypage';

import Shop from './pages/shop/Shop';
import ProductDetail from './pages/product/ProductDetail';
import CheckoutPage from './pages/checkout/CheckoutPage';
import ImageComponent from './pages/cart/ImageComponent';

import Board from './pages/board/Board';
import Coordi from './pages/coordi/Coordi';
import Styling from './pages/styling/Styling';

import Admin from './pages/admin/Admin';
import Page404 from './components/main/Page404';

/**
 * App 전체 라우팅을 관리하는 컴포넌트
 * @returns {JSX.Element} - 전체 라우팅 구성
 */
function App() {
  return (
    <UserProvider>
      <BasketProvider>
        <animation>
          <Router>
            <Header />
            <scrollToTop />
            <Routes>
              {/* -------------------------------------------------------------------------- */}
              {/* 메인 페이지 */}
              <Route path="/" element={<Home />} />
              {/* 이용안내 페이지 */}
              <Route path="/guide" element={<GuidesOfService />} />
              {/* 이용약관 페이지 */}
              <Route path="/terms" element={<TermsSwitcher />} />
              {/* 개인정보처리방침 페이지 */}
              <Route path="/privacy" element={<PrivacyPolicy />} />
              {/* -------------------------------------------------------------------------- */}
              {/* 회원 관련 라우트 */}
              <Route path="/*" element={<Auth />} />
              {/* 마이페이지 */}
              <Route path="/mypage/*" element={<Mypage />} />
              {/* -------------------------------------------------------------------------- */}
              {/* 상품 페이지  */}
              <Route path="/products" element={<Shop />} />
              {/* 상품 상세 페이지 */}
              <Route path="/products/:productId" element={<ProductDetail />} />
              {/* 추천 페이지 */}
              <Route path="/styling" element={<Styling />} />
              {/* 장바구니 페이지 */}
              <Route path="/checkout" element={<CheckoutPage />} />
              {/* -------------------------------------------------------------------------- */}
              {/* 커뮤니티 페이지 */}
              <Route path="/board/*" element={<Board />} />
              <Route path="/coordi/*" element={<Coordi />} />
              {/* -------------------------------------------------------------------------- */}
              {/* 관리자 페이지 */}
              <Route path="/admin/*" element={<Admin />} />
              {/* ------------------------------------------------------------------- */}
              {/* 에러 페이지 */}
              <Route path="/ImageComponent" element={<ImageComponent />} />
              {/* 에러 페이지 */}
              <Route path="/*" element={<Page404 />} />
            </Routes>
            <Footer />
          </Router>
        </animation>
      </BasketProvider>
    </UserProvider>
  );
}

export default App;

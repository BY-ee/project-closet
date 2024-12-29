// Hooks
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // 라우트 관련 훅

// CSS
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import 'font-awesome/css/font-awesome.min.css'; // FontAwesome CSS
import 'material-design-iconic-font/dist/css/material-design-iconic-font.min.css'; // Material Design CSS

// Context API Components
import { BasketProvider } from './contexts/BasketContext';
import { UserProvider } from './contexts/UserContext';

// Utility Components
import Animation from './components/utils/Animation';
import ScrollToTop from './components/utils/ScrollToTop';

// Page Components / Routes Components
import Home from './pages/Home';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import GuidesOfService from './components/features/policy/GuidesOfService';
import TermsSwitcher from './components/features/policy/TermsSwitcher';
import PrivacyPolicy from './components/features/policy/PrivacyPolicy';

import Auth from './pages/auth/Auth';
import Mypage from './pages/mypage/Mypage';

import ProductList from './pages/product/ProductList';
import ProductDetail from './pages/product/ProductDetail';
import CheckoutPage from './pages/checkout/CheckoutPage';
import ImageComponent from './pages/checkout/ImageComponent';

import Board from './pages/board/Board';
import Coordi from './pages/coordi/Coordi';
import Styling from './pages/styling/Styling';

import Admin from './pages/admin/Admin';
import NotFound from './pages/error/NotFound';

/**
 * App 전체 라우팅을 관리하는 컴포넌트입니다.
 * @returns {JSX.Element} - 전체 라우팅 구성
 */
function App() {
  return (
    <UserProvider>
      <BasketProvider>
        <Animation>
          <BrowserRouter>
            <Header />
            <ScrollToTop />
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
              <Route path="/products" element={<ProductList />} />
              {/* 상품 상세 페이지 */}
              <Route path="/products/:productId" element={<ProductDetail />} />
              {/* 추천 페이지 */}
              <Route path="/styling" element={<Styling />} />
              {/* 상품구매 페이지 */}
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
              <Route path="/*" element={<NotFound />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </Animation>
      </BasketProvider>
    </UserProvider>
  );
}

export default App;

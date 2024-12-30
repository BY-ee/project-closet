// Hooks
import React from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'; // 라우트 관련 훅

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

import Mypage from './pages/mypage/Mypage';

import ProductList from './pages/product/ProductList';
import ProductDetail from './pages/product/ProductDetail';
import CheckoutPage from './pages/checkout/CheckoutPage';

import Board from './pages/board/Board';
import Coordi from './pages/coordi/Coordi';
import Styling from './pages/styling/Styling';

import Admin from './pages/admin/Admin';
import NotFound from './pages/error/NotFound';
import authRoutes from './pages/auth/authRoutes';

/**
 * Header, Footer가 포함된 기본 레이아웃입니다.
 *
 * @param {JSX.Element} children 리액트 컴포넌트입니다.
 * @returns
 */
const DefaultLayout = () => (
  <>
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
);

/**
 * Header, Footer가 없는 레이아웃입니다.
 *
 * @param {JSX.Element} children 리액트 컴포넌트입니다.
 * @returns
 */
const MinimalLayout = () => (
  <>
    <main>
      <Outlet />
    </main>
  </>
);

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
            <ScrollToTop />
            <Routes>
              {/* -------------------------------------------------------------------------- */}
              <Route element={<DefaultLayout />}>
                <Route path="/" element={<Home />} />

                <Route path="/guide" element={<GuidesOfService />} />
                <Route path="/terms" element={<TermsSwitcher />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />

                <Route path="/mypage/*" element={<Mypage />} />

                <Route path="/products" element={<ProductList />} />
                <Route
                  path="/products/:productId"
                  element={<ProductDetail />}
                />
                <Route path="/checkout" element={<CheckoutPage />} />

                <Route path="/styling" element={<Styling />} />

                <Route path="/board/*" element={<Board />} />
                <Route path="/coordi/*" element={<Coordi />} />
              </Route>
              {/* -------------------------------------------------------------------------- */}

              <Route element={<MinimalLayout />}>
                {authRoutes}

                <Route path="/admin/*" element={<Admin />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </Animation>
      </BasketProvider>
    </UserProvider>
  );
}

export default App;

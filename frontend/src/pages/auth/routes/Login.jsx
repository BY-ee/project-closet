// Hooks
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../contexts/UserContext';

// CSS
import '../../../assets/styles/auth/auth.css';

// Images
import closetImage from '../../../assets/images/closet_logo.png';
import NaverImage from '../../../assets/images/naver_login_button.png';
import KaKaoImage from '../../../assets/images/kakao_login_button.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [theme, setTheme] = useState('auto'); // 테마 토글 기본값
  const { login } = useUser();
  const navigator = useNavigate();

  // 회원가입 페이지로 이동
  const goToSignUp = () => {
    navigator('/SignUp');
  };

  // 테마 변경 함수
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    document.body.setAttribute('data-bs-theme', newTheme); // 테마 적용
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    // 로그인API 함수 호출
    try {
      await login({ username, password });
      navigator('/'); // 로그인 성공 시 메인홈페이지로 이동
    } catch (error) {
      setErrorMessage(error.message || '로그인에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // OAuth2 로그인 버튼 클릭시 백엔드 OAuth2 인증 엔드 엔드포인트로 리다이렉트
  const handleOAuthLogin = (provider) => {
    const oauthUrls = {
      naver: 'http://localhost:8090/oauth2/authorization/naver',
      kakao: 'http://localhost:8090/oauth2/authorization/kakao',
    };

    if (provider && oauthUrls[provider]) {
      window.location.href = oauthUrls[provider];
    } else {
      console.error('Invalid provider specified for OAuth login.');
    }
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center bg-body-tertiary">
      {/* 테마 토글 */}
      <div className="dropdown position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle">
        <button
          className="btn btn-bd-primary py-2 dropdown-toggle d-flex align-items-center"
          type="button"
          id="themeDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <svg className="bi my-1 theme-icon-active" width="1em" height="1em">
            <use href="#circle-half"></use>
          </svg>
          <span className="visually-hidden">Toggle theme</span>
        </button>
        <ul
          className="dropdown-menu dropdown-menu-end shadow"
          aria-labelledby="themeDropdown"
        >
          <li>
            <button
              className="dropdown-item d-flex align-items-center"
              onClick={() => changeTheme('light')}
            >
              <svg className="bi me-2 opacity-50" width="1em" height="1em">
                <use href="#sun-fill"></use>
              </svg>
              Light
              {theme === 'light' && (
                <svg className="bi ms-auto" width="1em" height="1em">
                  <use href="#check2"></use>
                </svg>
              )}
            </button>
          </li>
          <li>
            <button
              className="dropdown-item d-flex align-items-center"
              onClick={() => changeTheme('dark')}
            >
              <svg className="bi me-2 opacity-50" width="1em" height="1em">
                <use href="#moon-stars-fill"></use>
              </svg>
              Dark
              {theme === 'dark' && (
                <svg className="bi ms-auto" width="1em" height="1em">
                  <use href="#check2"></use>
                </svg>
              )}
            </button>
          </li>
          <li>
            <button
              className="dropdown-item d-flex align-items-center"
              onClick={() => changeTheme('auto')}
            >
              <svg className="bi me-2 opacity-50" width="1em" height="1em">
                <use href="#circle-half"></use>
              </svg>
              Auto
              {theme === 'auto' && (
                <svg className="bi ms-auto" width="1em" height="1em">
                  <use href="#check2"></use>
                </svg>
              )}
            </button>
          </li>
        </ul>
      </div>

      {/* 로그인 폼 */}
      <main className="form-signin w-100 m-auto">
        <form noValidate onSubmit={handleSubmit}>
          <img
            className="mb-4"
            src={closetImage}
            alt="Closet Logo"
            width="360"
            height="160"
          />
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="floatingInput">ID</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}{' '}
          {/* 에러 메시지 표시 */}
          <div className="form-check text-start my-3">
            <input
              className="form-check-input"
              type="checkbox"
              value="remember-me"
              id="flexCheckDefault"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Remember me
            </label>
          </div>
          <button
            className="btn btn-secondary w-100 py-2"
            type="submit"
            disabled={loading}
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
          <hr className="my-4" />
          <div className="social-login mt-3">
            {/* OAuth2 네이버 로그인 버튼 추가 */}
            <button type="button" onClick={() => handleOAuthLogin('naver')}>
              <img
                src={NaverImage} // 네이버 로고 URL
                alt="Naver Logo"
                width="175"
                height="45"
              />
            </button>
            &nbsp;&nbsp;
            {/* OAuth2 카카오 로그인 버튼 추가 */}
            <button type="button" onClick={() => handleOAuthLogin('kakao')}>
              <img
                src={KaKaoImage} // 카카오 로고 URL
                alt="Kakao Logo"
                width="175"
                height="45"
              />
            </button>
          </div>
          <hr className="my-4" />
          <div className="text-center mt-3">
            <a
              onClick={() => navigator('/find-id')}
              className="auth-link"
              role="button"
            >
              아이디 찾기
            </a>
            <span className="mx-2">|</span> {/* 구분선 */}
            <a
              onClick={() => navigator('/reset-password')}
              className="auth-link"
              role="button"
            >
              비밀번호 찾기
            </a>
          </div>
          <div className="text-center mt-2">
            <span>아직 회원이 아니신가요? </span>
            <a onClick={goToSignUp} className="signup-link" role="button">
              회원가입
            </a>
          </div>
          <p className="mt-5 mb-3 text-body-secondary">&copy; 2024</p>
        </form>
      </main>
    </div>
  );
};
export default Login;

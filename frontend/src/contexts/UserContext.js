// Hooks
import React, { createContext, useContext, useState, useEffect } from 'react';

// Components
import { call } from '../api/auth/ApiService';

const UserContext = createContext(null);

/**
 * 유저 데이터를 전역으로 관리하는 Context API 컴포넌트입니다.
 *
 * @component
 * @param {ReactNode} children - UserContext로 감싸는 하위 컴포넌트입니다.
 * @returns {JSX.Element} - 유저 데이터를 전역으로 제공하는 Context Provider입니다.
 */
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await call('/auth/me');
        const { password, ...userWithoutPassword } = userData;
        console.log(userWithoutPassword);
        setUser(userWithoutPassword);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        setUser(null);
      }
    };

    const token = localStorage.getItem('token'); // 토큰 확인

    if (!token) {
      setUser(null); // 명확히 초기화
      return; // fetchUser 호출하지 않음
    }

    if (!user) {
      fetchUser(); // user가 없을 때만 호출
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

/**
 * 유저와 관련된 로직을 전달받는 커스텀 훅입니다.
 *
 * @property {Users} user - 현재 로그인된 유저의 정보입니다.
 * @property {Function} setUser - 유저 정보를 설정하는 함수입니다.
 * @returns {Object} 해당 프로퍼티들을 전달합니다.
 *
 * @example
 * const { user, setUser } = useUser();
 */
export const useUser = () => {
  const context = useContext(UserContext);
  return context || { user: {}, setUser: () => {} };
};

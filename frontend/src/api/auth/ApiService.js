const API_BASE_URL = 'http://localhost:8090/api'; // 서버 URL

/**
 * API 호출을 처리하는 함수입니다.
 *
 * @param {string} api - API의 엔드포인트를 입력합니다.
 * @param {string} [method='GET'] - HTTP 메서드를 입력합니다('GET', 'POST' 등). 기본값은 'GET'입니다.
 * @param {Object} [request=null] - 서버에 전송할 데이터를 입력합니다 (선택 사항).
 * @returns {Promise<any>} 서버로부터의 응답 데이터입니다.
 */
export const call = async (api, method = 'GET', request = null) => {
  const url = `${API_BASE_URL}${api}`;
  const options = {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  if (request) {
    options.body = JSON.stringify(request);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw (
        errorData || {
          message: '알 수 없는 오류 발생',
          status: response.status,
        }
      );
    }

    // JSON 응답 여부 확인
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      return null;
    }
  } catch (error) {
    console.error('API 호출 중 오류 발생: ');
    console.error(error);
    throw error;
  }
};

export const signup = async (data) => {
  try {
    const response = await call('/auth/signup', 'POST', JSON.stringify(data));

    if (!response.ok) {
      return {
        success: false,
        message: response.error || '회원가입에 실패했습니다.',
      };
    }

    return { success: true, message: '회원가입에 성공했습니다!' };
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
    return {
      success: false,
      message: error.message || '서버와의 연결에 실패했습니다.',
    };
  }
};

// 로그아웃
export const logout = async () => {
  try {
    localStorage.removeItem('token');

    alert('정상적으로 로그아웃되었습니다.');
  } catch (error) {
    console.error('로그아웃 예외가 발생했습니다:', error);
  }
};

/**
 * 이메일 인증 코드 전송 함수
 *
 * @param {string} email - 인증 코드를 받을 이메일 주소
 * @returns {Promise<string>} 성공 메시지
 */
export const sendCode = async (email) => {
  try {
    // 이메일 중복 검사
    const isAvailable = await checkEmail(email);
    if (!isAvailable) {
      // throw new Error('이미 사용 중인 이메일입니다.');
    }

    // 중복이 없을 경우 인증 코드 전송
    const response = await call(`/email/code`, 'POST', { email });
    return response; // 성공 메시지 반환
  } catch (error) {
    console.error('인증 코드 전송 실패:', error);
    throw error;
  }
};

/**
 * 이메일 인증 코드 검증 함수
 *
 * @param {string} email - 이메일 주소
 * @param {string} code - 사용자가 입력한 인증 코드
 * @returns {Promise<string>} 성공 메시지
 */
export const verifyCode = async (email, code) => {
  try {
    const response = await call(`/email/code/verify`, 'POST', {
      email,
      code,
    });
    return response; // 성공 메시지 반환
  } catch (error) {
    console.error('이메일 인증 실패:', error);
    throw error;
  }
};

/**
 * 아이디 중복 검사 함수
 *
 * @param {string} username - 중복 검사를 수행할 아이디
 * @returns {Promise<boolean>} 사용 가능 여부 (true: 사용 가능, false: 중복)
 */
export const checkUsername = async (username) => {
  try {
    const isAvailable = await call(`/auth/check-username?username=${username}`);
    console.log('아이디 중복 검사 응답:', isAvailable); // 디버깅 로그 추가
    return isAvailable; // true 또는 false 반환
  } catch (error) {
    console.error('아이디 중복 검사 실패:', error);
    throw error;
  }
};

/**
 * 닉네임 중복 검사 함수
 *
 * @param {string} nickname - 중복 검사를 수행할 닉네임
 * @returns {Promise<boolean>} 사용 가능 여부 (true: 사용 가능, false: 중복)
 */
export const checkNickname = async (nickname) => {
  try {
    const isAvailable = await call(`/auth/check-nickname?nickname=${nickname}`);
    console.log('닉네임 중복 검사 응답:', isAvailable); // 디버깅 로그 추가
    return isAvailable; // true 또는 false 반환
  } catch (error) {
    console.error('닉네임 중복 검사 실패:', error);
    throw error;
  }
};

/**
 * 이메일 중복 검사 함수
 *
 * @param {string} email - 중복 검사를 수행할 이메일 주소
 * @returns {Promise<boolean>} 사용 가능 여부 (true: 사용 가능, false: 중복)
 */
export const checkEmail = async (email) => {
  try {
    const response = await call(`/auth/check-email?email=${email}`, 'GET');
    console.log('이메일 중복 검사 응답:', response); // 디버깅 로그
    return response; // true 또는 false 반환
  } catch (error) {
    console.error('이메일 중복 검사 실패:', error);
    throw error;
  }
};

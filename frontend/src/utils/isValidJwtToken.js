/**
 *  JWT 토큰의 유효성을 검증하는 함수입니다.
 *  @return {boolean}
 */
const isValidJwtToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return false; // JWT 토큰이 존재하지 않으면 false를 반환합니다.
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationDate = new Date(payload.exp * 1000);
    return expirationDate > new Date(); // JWT 토큰 만료 시 false, 만료 이전일시 true를 반환합니다.
  } catch (e) {
    console.error(`토큰이 유효하지 않습니다. ${e}`);
    return false; // 토큰이 유효하지 않다면 콘솔에 에러를 출력한 후 false를 반환합니다.
  }
};

export default isValidJwtToken;

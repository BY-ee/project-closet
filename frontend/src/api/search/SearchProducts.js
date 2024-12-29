// Components
import { call } from '../auth/ApiService';

// 검색 폼 제출
const SearchProducts = async (inputValue) => {
  const response = await call(
    `/product?key=${inputValue}`,
    'POST',
    JSON.stringify({ key: inputValue })
  );

  console.log(response);
  return response;
};

export default SearchProducts;

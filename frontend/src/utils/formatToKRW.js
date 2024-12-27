const formatToKRW = (price) => {
  // 금액을 한국 원화 형식으로 변환
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    maximumFractionDigits: 0, // 소수점 제거
  }).format(price);
};

export default formatToKRW;

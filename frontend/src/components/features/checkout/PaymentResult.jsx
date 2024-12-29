// Hooks
import React, { useEffect } from 'react';

// Components
import { call } from '../../../api/auth/ApiService';

const PaymentResult = () => {
  useEffect(() => {
    const handlePaymentResult = async () => {
      const params = new URLSearchParams(window.location.search);
      const resultCode = params.get('resultCode');
      const paymentId = params.get('paymentId');
      const merchantPayKey = localStorage.getItem('merchantPayKey');

      if (resultCode === 'Success') {
        console.log('결제 성공');
        const orderData = JSON.parse(localStorage.getItem('orderData'));
        const usePoints = localStorage.getItem('usePoints');

        try {
          if (usePoints && parseInt(usePoints, 10) > 0 && orderData) {
            await handlePointDeduction(orderData.userId, usePoints);
          }
          await saveOrderProcess(orderData);
          alert('결제가 성공적으로 완료되었습니다!');
        } catch (error) {
          console.error('결제 처리 중 오류:', error);
          alert('결제 처리 중 오류가 발생했습니다.');
        }
      } else {
        console.error('결제 실패');
        alert('결제가 실패했습니다. 다시 시도해주세요.');
        window.location.href = '/';
      }
    };

    handlePaymentResult();
  }, []);

  const handlePointDeduction = async (userId, points) => {
    try {
      const pointData = {
        userId,
        point: points,
        pointReason: '상품 구매',
        pointType: '차감',
        pointInsertType: 'purchase',
      };
      await call(
        'http://localhost:8090/api/point/saveReviewPoint',
        'POST',
        pointData
      );
      saveLog(`포인트 ${points} 차감 성공`);
    } catch (error) {
      saveLog(`포인트 차감 실패: ${error.message}`);
      console.error('포인트 차감 중 오류 발생:', error);
      throw error;
    }
  };

  const saveOrderProcess = async (orderData) => {
    try {
      const response = await call(
        'http://localhost:8090/api/orders',
        'POST',
        orderData
      );
      return { success: true, data: response.data };
    } catch (error) {
      saveLog(`주문 저장 중 오류: ${error.message}`);
      console.error('주문 저장 중 오류:', error);
      return { success: false, error };
    }
  };

  const saveLog = (message) => {
    const logs = JSON.parse(localStorage.getItem('logs')) || [];
    logs.push(`${new Date().toLocaleString()}: ${message}`);
    localStorage.setItem('logs', JSON.stringify(logs));
  };

  const updateBasketStatus = async (basketIds, status) => {
    console.log('updateBasketStatus Start:  ', basketIds, status);

    const payload = { basketIds, status };
    const response = await call(
      'http://localhost:8090/api/basket/updateStatus',
      'PATCH',
      payload
    );
    if (response.data && response.data.success) {
      return true;
    } else {
      // throw new Error('Failed to update basket status');
    }
  };

  const extractBasketIdsFromOrderData = (orderData) => {
    console.log('extractBasketIdsFromOrderData', orderData);
    // orderData.orderDetails에서 basketId를 추출하는 로직
    // orderData.orderDetails 각각의 객체에 basketId가 있다고 가정
    return orderData.orderDetails
      .filter((detail) => detail.basketId) // basketId가 있는 항목만
      .map((detail) => detail.basketId);
  };

  return <div>결제를 처리 중입니다...</div>;
};

export default PaymentResult;

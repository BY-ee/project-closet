// Hooks
import React from 'react';

const MypageHeader = ({ title, description }) => {
  return (
    <div>
      <header className="py-5">
        <div className="container px-lg-5">
          <div
            className="p-4 p-lg-5 bg-light rounded-3 text-center"
            style={{ marginTop: '60px' }}
          >
            <div className="m-4 m-lg-5">
              <h1 className="display-5 fw-bold">{title}</h1>
              <p className="fs-6 mt-3">{description}</p>
              <div className="d-flex justify-content-center me-2">
                {/* 홈 버튼 */}
                <button
                  className="btn me-2"
                  onClick={() => (window.location.href = '/')}
                >
                  <i className="bi-house"></i>
                </button>
                {/* 뒤로 가기 버튼 */}
                <button
                  className="btn me-2"
                  onClick={() => window.history.back()}
                >
                  <i className="bi-arrow-return-left"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default MypageHeader;

// Hooks
import { useState } from 'react';

// Components
import TermsOfService from './TermsOfService';
import TermsOfPoints from './TermsOfPoints';

const TermsSwitcher = () => {
  const [service, setService] = useState(true);
  const [points, setPoints] = useState(false);

  const handleService = () => {
    setService(true);
    setPoints(false);
  };

  const handlePoints = () => {
    setService(false);
    setPoints(true);
  };

  return (
    <>
      <div
        className="d-flex agreement-subtitle m-t-50 fs-16"
        style={{ justifyContent: 'center' }}
      >
        <button
          className={`p-all-20 p-lr-60 border ${service ? 'selected-btn' : ''}`}
          onClick={handleService}
        >
          서비스 이용약관
        </button>
        <button
          className={`p-all-20 p-lr-60 border ${points ? 'selected-btn' : ''}`}
          onClick={handlePoints}
        >
          상품권 이용약관
        </button>
      </div>

      <div className="container">
        <div className="row">
          <div
            className="col-8 pt-3 ps-5 agreement-content"
            style={{ margin: '0 auto' }}
          >
            <div className="agreement-box">
              {service ? (
                <TermsOfService />
              ) : points ? (
                <TermsOfPoints />
              ) : (
                <div style={{ textAlign: 'center', paddingRight: '33.75px' }}>
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsSwitcher;

import { Link } from 'react-router-dom';

// import CSS
import './Footer.css';

export default function Footer() {
  return (
    <footer className="bg3 p-t-50 p-b-32">
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-lg-4 p-b-20">
            <h4 className="stext-301 cl0 p-b-20 fs-4">About Closet</h4>

            <ul>
              <li className="p-b-10">
                <span className="fw-bold">회사명&nbsp;&nbsp;</span>(주)클로젯
              </li>
              <li className="p-b-10">
                <span className="fw-bold">대표자&nbsp;&nbsp;</span>정보영
                &nbsp;| &nbsp;
                <span className="fw-bold">전화&nbsp;&nbsp;</span>1588-0000
              </li>
              <li className="p-b-10">
                <span className="fw-bold">주소지&nbsp;&nbsp;</span>서울특별시
                강남구 에스코빌딩 7층, 703호
              </li>
              <li className="p-b-10">
                <span className="fw-bold">통신판매업 신고&nbsp;&nbsp;</span>
                2024-서울-0000
              </li>
              <li className="p-b-10">
                <span className="fw-bold">사업자등록번호&nbsp;&nbsp;</span>
                123-00-11111
              </li>
              <li className="p-b-10">
                <span className="fw-bold">개인정보보호책임자&nbsp;&nbsp;</span>
                이정민
              </li>
              <li className="p-b-50">
                <span className="fw-bold">제휴 문의&nbsp;&nbsp;</span>
                closet@closet.com
              </li>

              <li>
                <p className="stext-107 cl6">
                  Copyright &copy; 2024 Closet. All rights reserved
                </p>
              </li>
            </ul>
          </div>

          <div className="col-sm-6 col-lg-4 p-b-20">
            {/* 고객센터 */}
            <h4 className="stext-301 cl0 p-b-20 fs-4">Customer Service</h4>

            <li className="p-b-10">
              <span className="fw-bold">
                월-금&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              AM 9:00 - PM 6:00
            </li>
            <li className="p-b-10">
              <span className="fw-bold">
                토&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              AM 9:00 - PM 12:00
            </li>
            <li className="p-b-10">
              <span className="fw-bold">점심시간&nbsp;&nbsp;</span>
              PM 12:00 - PM 13:00
            </li>
            <li className="p-b-65">일요일, 공휴일 휴무</li>

            {/* 문의 버튼 */}
            <h4 className="stext-301 cl0 p-b-20 fs-4">
              <b>문의하기</b>
            </h4>
            <div className="btn-container">
              <div className="btn-box">
                <Link
                  to="#"
                  onClick={() => console.log('카카오톡 문의 버튼 클릭')}
                >
                  <span className="btn-elements">
                    <img src="./images/icons/kakaotalk.png" />
                    &nbsp;&nbsp;카카오톡 문의하기
                  </span>
                </Link>
              </div>

              <div className="btn-box">
                <Link
                  to="#"
                  onClick={() => console.log('네이버 문의 버튼 클릭')}
                >
                  <span className="btn-elements">
                    <img src="./images/icons/naver_talktalk.png" />
                    &nbsp;&nbsp;네이버 문의하기
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-lg-4 p-b-20">
            {/* Closet 설명 */}
            <h4 className="stext-301 cl0 p-b-20 fs-4">Introduce Closet</h4>

            <ul>
              <li className="p-b-10">
                🎁 오늘주문, 오늘출고
                <br />
                <p style={{ fontSize: '12px', color: '#777' }}>
                  단, 18시 이전 주문에 해당
                </p>
              </li>
              <li className="p-b-10">
                🌙 저녁주문, 샛별출고
                <br />
                <p style={{ fontSize: '12px', color: '#777' }}>
                  단, 23시 이전 주문에 해당
                </p>
              </li>
              <li className="p-b-20">
                ✨ 취향 맞춤 화상 코디네이션
                <br />
              </li>
              <li className="p-b-10">
                🛠 묻지도 따지지도 않는 교환/환불
                <br />
                <p
                  className="p-b-30"
                  style={{ fontSize: '12px', color: '#777' }}
                >
                  최대 월 2회, 연 10회
                </p>
              </li>
            </ul>

            {/* 소셜 */}
            <h4 className="stext-301 cl0 p-b-5 fs-4">Social</h4>

            <div>
              <Link to="#" className="fs-18 cl7 hov-cl1 trans-04 m-r-16">
                <i className="fa fa-facebook"></i>
              </Link>

              <Link to="#" className="fs-18 cl7 hov-cl1 trans-04 m-r-16">
                <i className="fa fa-instagram"></i>
              </Link>

              <Link to="#" className="fs-18 cl7 hov-cl1 trans-04 m-r-16">
                <i className="fa fa-google"></i>
              </Link>

              <Link to="#" className="fs-18 cl7 hov-cl1 trans-04 m-r-16">
                <i className="fa fa-telegram"></i>
              </Link>
            </div>
          </div>

          {/* 이메일 문의 입력란 */}
          {/* <div className="col-sm-6 col-lg-3 p-b-50">
            <h4 className="stext-301 cl0 p-b-30">Newsletter</h4>

            <form>
              <div className="wrap-input1 w-full p-b-4">
                <input
                  className="input1 bg-none plh1 stext-107 cl7"
                  type="text"
                  name="email"
                  placeholder="email@example.com"
                />
                <div className="focus-input1 trans-04"></div>
              </div>

              <div className="p-t-18">
                <button className="flex-c-m stext-101 cl0 size-103 bg1 bor1 hov-btn2 p-lr-15 trans-04">
                  Subscribe
                </button>
              </div>
            </form>
          </div> */}
        </div>

        {/* 카드사 리스트 */}
        {/* <div className="p-t-40">
          <div className="flex-c-m flex-w p-b-18">
            <Link to="#" className="m-all-1">
              <img src="images/icons/icon-pay-01.png" alt="ICON-PAY" />
            </Link>

            <Link to="#" className="m-all-1">
              <img src="images/icons/icon-pay-02.png" alt="ICON-PAY" />
            </Link>

            <Link to="#" className="m-all-1">
              <img src="images/icons/icon-pay-03.png" alt="ICON-PAY" />
            </Link>

            <Link to="#" className="m-all-1">
              <img src="images/icons/icon-pay-04.png" alt="ICON-PAY" />
            </Link>

            <Link to="#" className="m-all-1">
              <img src="images/icons/icon-pay-05.png" alt="ICON-PAY" />
            </Link>
          </div>
        </div> */}
      </div>
      <div className="section"></div>
      <div className="container">
        <ul className="footer-links">
          <li>
            <Link to="/guide">이용안내</Link>
          </li>
          <li>
            <Link to="/agreement">이용약관</Link>
          </li>
          <li>
            <Link to="/privacy">개인정보처리방침</Link>
          </li>
          <li>
            <Link to="/about">회사정보</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

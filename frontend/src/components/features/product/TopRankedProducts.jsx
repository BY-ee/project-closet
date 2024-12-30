// Hooks
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// CSS
import './TopRankedProducts.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Components
import Slider from 'react-slick';
import { call } from '../../../api/auth/ApiService';

const TopRankedProducts = () => {
  const [filter, setFilter] = useState('views'); // 조회수, 좋아요 등의 필터 상태
  const [range, setRange] = useState('week'); // 주간, 월간 랭킹 등의 날짜 상태
  const [rankedProducts, setRankedProducts] = useState([]); // 순위 상위권 상품

  // 순위 상위권 상품 가져오는 함수
  useEffect(() => {
    const fetchTopItems = async () => {
      try {
        const response = await call(
          `/products/top?filter=${filter}&range=${range}`
        );
        setRankedProducts(response);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };
    fetchTopItems();
  }, [filter, range]);

  // 날짜 필터링에 따른 소제목 한글화
  const convertRange = {
    day: '일간',
    week: '주간',
    month: '월간',
  };

  const convertFilter = {
    views: '조회수',
    likes: '좋아요',
    reviewCount: '리뷰',
  };

  // slick 속성
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  useEffect(() => {
    const prevButton = document.querySelector('button.slick-prev');
    const nextButton = document.querySelector('button.slick-next');
    if (prevButton) {
      prevButton.classList.add('nav-arrow', 'prev');
      prevButton.textContent = '<';
      prevButton.classList.remove('slick-arrow', 'slick-prev');
    }
    if (nextButton) {
      nextButton.classList.add('nav-arrow', 'next');
      nextButton.textContent = '>';
      nextButton.classList.remove('slick-arrow', 'slick-next');
    }
  }, []);

  // if (loading) return <div>로딩 중...</div>;
  // if (error) return <div>에러가 발생했습니다: {error.message}</div>;

  return (
    <div className="sec-banner bg0 p-t-80 p-b-50">
      <div className="container">
        <h3 className="ltext-103 cl5 m-b-30">
          <b>
            {convertRange[range]} {convertFilter[filter]} Top 3
          </b>
        </h3>

        {/* 슬라이더 */}
        <div className="slick-container">
          <Slider {...settings}>
            {rankedProducts.map((rankedItem) => (
              <div
                key={rankedItem.id}
                className="col-md-4 col-xl-4 p-b-30 m-lr-auto"
              >
                <div className="block1 wrap-pic-w">
                  <img
                    src={`images/${rankedItem.mainImage}`}
                    alt="IMG-BANNER"
                  />
                  <Link
                    to={`/products/${rankedItem.id}`}
                    className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3"
                  >
                    <div className="block1-txt-child1 flex-col-l">
                      <span className="block1-name ltext-102 trans-04 p-b-8">
                        {rankedItem.itemName}
                      </span>
                      <span className="block1-info stext-102 trans-04">
                        {rankedItem.itemPrice.toLocaleString()}원
                      </span>
                    </div>
                    <div className="block1-txt-child2 p-b-4 trans-05">
                      <div className="block1-link stext-101 cl0 trans-09">
                        Shop Now
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* 페이지의 width가 768px 이상일 때 일반 이미지 출력 */}
        <div className="image-container">
          <div className="row">
            {rankedProducts.map((rankedItem) => (
              <div
                key={rankedItem.id}
                className="col-md-4 col-xl-4 p-b-30 m-lr-auto"
              >
                <div className="block1 wrap-pic-w">
                  <img
                    src={`images/${rankedItem.mainImage}`}
                    alt="IMG-BANNER"
                  />

                  <Link
                    to={`/products/${rankedItem.id}`}
                    className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3"
                  >
                    <div className="block1-txt-child1 flex-col-l">
                      <span className="block1-name ltext-102 trans-04 p-b-8">
                        {rankedItem.itemName}
                      </span>

                      <span className="block1-info stext-102 trans-04">
                        {rankedItem.itemPrice.toLocaleString()}원
                      </span>
                    </div>

                    <div className="block1-txt-child2 p-b-4 trans-05">
                      <div className="block1-link stext-101 cl0 trans-09">
                        Shop Now
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopRankedProducts;

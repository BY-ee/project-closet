import React, { useState } from 'react';
import '../../assets/styles/components/main.css';
import '../../assets/styles/components/util.css';
import '../../assets/styles/DetailItem/Detail.css';
import StarRating from '../../components/Rating/StarRating';
import useProductQuantity from '../../hooks/useProductQuantity';

function Detail({}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false); // 확대 보기 상태
  const [activeTab, setActiveTab] = useState('description');
  const { quantity, increaseQuantity, decreaseQuantity } =
    useProductQuantity(1);

  const thumbnails = [
    'images/product-detail-01.jpg',
    'images/product-detail-02.jpg',
    'images/product-detail-03.jpg',
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? thumbnails.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === thumbnails.length - 1 ? 0 : prevIndex + 1
    );
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <>
      <div className="container">
        <div className="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
          <a href="/" className="stext-109 cl8 hov-cl1 trans-04">
            Home
            <i
              className="fa fa-angle-right m-l-9 m-r-10"
              aria-hidden="true"
            ></i>
          </a>

          <a href="product.html" className="stext-109 cl8 hov-cl1 trans-04">
            Top
            <i
              className="fa fa-angle-right m-l-9 m-r-10"
              aria-hidden="true"
            ></i>
          </a>

          <span className="stext-109 cl4">[CL33] 경량 재킷</span>
        </div>
      </div>

      <section className="sec-product-detail bg0 p-t-65 p-b-60">
        <div className="container">
          <div className="row">
            {/* Left Column for Images */}
            <div className="col-md-6 col-lg-7 p-b-30">
              <div className="p-l-25 p-r-30 p-lr-0-lg">
                <div className="flex">
                  {/* Thumbnail List */}
                  <div className="thumbnail-list">
                    {thumbnails.map((thumb, index) => (
                      <img
                        key={index}
                        src={thumb}
                        alt={`Thumbnail ${index + 1}`}
                        className={`thumbnail ${
                          currentIndex === index ? 'active' : ''
                        }`}
                        onClick={() => handleThumbnailClick(index)}
                      />
                    ))}
                  </div>

                  {/* Main Image with Navigation */}
                  <div className="main-image-container">
                    <button className="nav-arrow prev" onClick={handlePrev}>
                      &#8249;
                    </button>
                    <img
                      src={thumbnails[currentIndex]}
                      alt="Main Product"
                      className="main-image"
                    />
                    <i
                      className="fa fa-expand zoom-icon"
                      onClick={toggleZoom}
                    ></i>
                    <button className="nav-arrow next" onClick={handleNext}>
                      &#8250;
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-5 p-b-30">
              <div className="p-r-50 p-t-5 p-lr-0-lg">
                <h4 className="mtext-105 cl2 js-name-detail p-b-14">
                  [CL33] 경량 재킷
                </h4>

                <span className="mtext-106 cl2">75,000원</span>

                <p className="stext-102 cl3 p-t-23">
                  무난하게 입기 좋은 재킷입니다. 소매에 스트라이프 패턴을
                  추가하여 포인트를 주었습니다.
                </p>

                <div className="p-t-33">
                  <div className="flex-w flex-r-m p-b-10">
                    <div className="size-203 flex-c-m respon6">Size</div>

                    <div className="size-204 flex-w flex-m respon6-next">
                      <select className="custom-select">
                        <option>사이즈 선택</option>
                        <option>Size S</option>
                        <option>Size M</option>
                        <option>Size L</option>
                        <option>Size XL</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex-w flex-r-m p-b-10">
                    <div className="size-203 flex-c-m respon6">Color</div>

                    <div className="size-204 flex-w flex-m respon6-next">
                      <select className="custom-select">
                        <option>색상 선택</option>
                        <option>Red</option>
                        <option>Blue</option>
                        <option>White</option>
                        <option>Grey</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex-w flex-r-m p-b-10">
                    <div className="size-204 flex-w flex-m respon6-next">
                      <div className="wrap-num-product flex-w m-r-20 m-tb-10">
                        {/* 수량 감소 버튼 */}
                        <div
                          className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m"
                          onClick={decreaseQuantity}
                          style={{ cursor: 'pointer' }} // 버튼 클릭 가능 표시
                        >
                          <i className="fs-16 zmdi zmdi-minus"></i>
                        </div>

                        {/* 수량 표시 */}
                        <input
                          className="mtext-104 cl3 txt-center num-product"
                          type="number"
                          name="num-product"
                          value={quantity}
                          readOnly // 사용자가 직접 수정하지 못하도록 설정
                          style={{ textAlign: 'center' }}
                        />

                        {/* 수량 증가 버튼 */}
                        <div
                          className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"
                          onClick={increaseQuantity}
                          style={{ cursor: 'pointer' }} // 버튼 클릭 가능 표시
                        >
                          <i className="fs-16 zmdi zmdi-plus"></i>
                        </div>
                      </div>

                      <button className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail">
                        장바구니
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex-w flex-m p-l-100 p-t-40 respon7">
                  <div className="flex-m bor9 p-r-10 m-r-11">
                    <a
                      href="#"
                      className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 js-addwish-detail tooltip100"
                      data-tooltip="Add to Wishlist"
                    >
                      <i className="zmdi zmdi-favorite"></i>
                    </a>
                  </div>

                  <a
                    href="#"
                    className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                    data-tooltip="Facebook"
                  >
                    <i className="fa fa-facebook"></i>
                  </a>

                  <a
                    href="#"
                    className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                    data-tooltip="Twitter"
                  >
                    <i className="fa fa-twitter"></i>
                  </a>

                  <a
                    href="#"
                    className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                    data-tooltip="Google Plus"
                  >
                    <i className="fa fa-google-plus"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bor10 m-t-50 p-t-43 p-b-40">
            <div className="tab01">
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item p-b-10">
                  <button
                    className={`nav-link ${activeTab === 'description' ? 'active' : ''}`}
                    onClick={() => handleTabClick('description')}
                  >
                    상품설명
                  </button>
                </li>
                <li className="nav-item p-b-10">
                  <button
                    className={`nav-link ${activeTab === 'information' ? 'active' : ''}`}
                    onClick={() => handleTabClick('information')}
                  >
                    상품정보
                  </button>
                </li>
                <li className="nav-item p-b-10">
                  <button
                    className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`}
                    onClick={() => handleTabClick('reviews')}
                  >
                    리뷰 (1)
                  </button>
                </li>
              </ul>

              <div className="tab-content p-t-43">
                {/* Description Tab */}
                <div
                  className={`tab-pane fade ${activeTab === 'description' ? 'show active' : ''}`}
                  id="description"
                  role="tabpanel"
                >
                  <div className="how-pos2 p-lr-15-md">
                    <p className="stext-102 cl6">
                      Aenean sit amet gravida nisi. Nam fermentum est felis,
                      quis feugiat nunc fringilla sit amet. Ut in blandit ipsum.
                      Quisque luctus dui at ante aliquet, in hendrerit lectus
                      interdum. Morbi elementum sapien rhoncus pretium maximus.
                      Nulla lectus enim, cursus et elementum sed, sodales vitae
                      eros. Ut ex quam, porta consequat interdum in, faucibus eu
                      velit. Quisque rhoncus ex ac libero varius molestie.
                      Aenean tempor sit amet orci nec iaculis. Cras sit amet
                      nulla libero. Curabitur dignissim, nunc nec laoreet
                      consequat, purus nunc porta lacus, vel efficitur tellus
                      augue in ipsum. Cras in arcu sed metus rutrum iaculis.
                      Nulla non tempor erat. Duis in egestas nunc.
                    </p>
                  </div>
                </div>

                {/* Information Tab */}
                <div
                  className={`tab-pane fade ${activeTab === 'information' ? 'show active' : ''}`}
                  id="information"
                  role="tabpanel"
                >
                  <div className="row">
                    <div className="col-sm-10 col-md-8 col-lg-6 m-lr-auto">
                      <ul className="p-lr-28 p-lr-15-sm">
                        <li className="flex-w flex-t p-b-7">
                          <span className="stext-102 cl3 size-205">Weight</span>
                          <span className="stext-102 cl6 size-206">
                            0.79 kg
                          </span>
                        </li>
                        <li className="flex-w flex-t p-b-7">
                          <span className="stext-102 cl3 size-205">
                            Dimensions
                          </span>
                          <span className="stext-102 cl6 size-206">
                            110 x 33 x 100 cm
                          </span>
                        </li>
                        <li className="flex-w flex-t p-b-7">
                          <span className="stext-102 cl3 size-205">
                            Materials
                          </span>
                          <span className="stext-102 cl6 size-206">면 60%</span>
                        </li>
                        <li className="flex-w flex-t p-b-7">
                          <span className="stext-102 cl3 size-205">Color</span>
                          <span className="stext-102 cl6 size-206">
                            Black, Blue, Grey, Green, Red, White
                          </span>
                        </li>
                        <li className="flex-w flex-t p-b-7">
                          <span className="stext-102 cl3 size-205">Size</span>
                          <span className="stext-102 cl6 size-206">32-40</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Reviews Tab */}
                <div
                  className={`tab-pane fade ${activeTab === 'reviews' ? 'show active' : ''}`}
                  id="reviews"
                  role="tabpanel"
                >
                  <div className="row">
                    <div className="col-sm-10 col-md-8 col-lg-6 m-lr-auto">
                      <div className="p-b-30 m-lr-15-sm">
                        <div className="flex-w flex-t p-b-68">
                          <div className="wrap-pic-s size-109 bor0 of-hidden m-r-18 m-t-6">
                            <img
                              src="../../../public/images/avatar-01.jpg"
                              alt="AVATAR"
                            />
                          </div>
                          <div className="size-207">
                            <div className="flex-w flex-sb-m p-b-17">
                              <span className="mtext-107 cl2 p-r-20">
                                Ariana Grande
                              </span>
                              <span className="fs-18 cl11">
                                <i className="zmdi zmdi-star"></i>
                                <i className="zmdi zmdi-star"></i>
                                <i className="zmdi zmdi-star"></i>
                                <i className="zmdi zmdi-star"></i>
                                <i className="zmdi zmdi-star-half"></i>
                              </span>
                            </div>
                            <p className="stext-102 cl6">
                              Quod autem in homine praestantissimum atque
                              optimum est, id deseruit. Apud ceteros autem
                              philosophos
                            </p>
                          </div>
                        </div>
                        <form className="w-full">
                          <h5 className="mtext-108 cl2 p-b-7">Add a review</h5>
                          <p className="stext-102 cl6">
                            Your email address will not be published. Required
                            fields are marked *
                          </p>
                          <div className="flex-w flex-m p-t-50 p-b-23">
                            <span className="stext-102 cl3 m-r-16">별점</span>
                            <StarRating totalStars={5} />
                          </div>
                          <div className="row p-b-25">
                            <div className="col-12 p-b-5">
                              <label className="stext-102 cl3" htmlFor="review">
                                리뷰
                              </label>
                              <textarea
                                className="size-110 bor8 stext-102 cl2 p-lr-20 p-tb-10"
                                id="review"
                                name="review"
                              ></textarea>
                            </div>
                            <div className="col-sm-6 p-b-5">
                              <label className="stext-102 cl3" htmlFor="name">
                                이름
                              </label>
                              <input
                                className="size-111 bor8 stext-102 cl2 p-lr-20"
                                id="name"
                                type="text"
                                name="name"
                              />
                            </div>
                            <div className="col-sm-6 p-b-5">
                              <label className="stext-102 cl3" htmlFor="email">
                                이메일
                              </label>
                              <input
                                className="size-111 bor8 stext-102 cl2 p-lr-20"
                                id="email"
                                type="text"
                                name="email"
                              />
                            </div>
                          </div>
                          <button className="flex-c-m stext-101 cl0 size-112 bg7 bor11 hov-btn3 p-lr-15 trans-04 m-b-10">
                            리뷰 작성
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg6 flex-c-m flex-w size-302 m-t-73 p-tb-15">
          <span className="stext-107 cl6 p-lr-25">SKU: JAK-01</span>

          <span className="stext-107 cl6 p-lr-25">Categories: Jacket, Men</span>
        </div>
      </section>
    </>
  );
}

export default Detail;

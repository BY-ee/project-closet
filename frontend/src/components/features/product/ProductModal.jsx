// Hooks
import React, { useEffect, useState } from 'react';
import useProductQuantity from '../../../hooks/useProductQuantity';

// CSS
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ProductModal.css';

const ProductModal = ({ isOpen, onClose, product }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false); // 확대 보기 상태
  const { quantity, increaseQuantity, decreaseQuantity } =
    useProductQuantity(1);

  const thumbnails = [
    `images/${product.mainImage}`,
    `images/${product.detailImage}`,
  ];

  if (!isOpen) return null;

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
    <div className="wrap-modal1 js-modal1 p-t-60 p-b-20">
      <div className="overlay-modal1 js-hide-modal1" onClick={onClose}></div>

      <div className="container">
        <div className="bg0 p-t-60 p-b-30 p-lr-15-lg how-pos3-parent">
          <button
            className="how-pos3 hov3 trans-04 js-hide-modal1"
            onClick={onClose}
          >
            <img src="images/icons/icon-close.png" alt="CLOSE" />
          </button>

          <div className="row">
            {/* Left Column for Thumbnails and Main Image */}
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
                        className={`thumbnail ${currentIndex === index ? 'active' : ''}`}
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
                    <button className="nav-arrow next" onClick={handleNext}>
                      &#8250;
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {isZoomed && (
              <div className="zoom-overlay" onClick={toggleZoom}>
                <img
                  src={thumbnails[currentIndex]}
                  alt="Zoomed Product"
                  className="zoomed-image"
                />
              </div>
            )}

            {/* Right Column for Product Details */}
            <div className="col-md-6 col-lg-5 p-b-30">
              <div className="p-r-50 p-t-5 p-lr-0-lg">
                <h4 className="mtext-105 cl2 js-name-detail p-b-14">
                  {product.itemName}
                </h4>

                <span className="mtext-106 cl2">
                  {product.itemPrice.toLocaleString()}원
                </span>

                <p className="stext-102 cl3 p-t-23">{product.itemCategory}</p>

                <div className="p-t-33">
                  <div className="flex-w flex-r-m p-b-10">
                    <div className="size-203 flex-c-m respon6">Size</div>

                    <div className="size-204 flex-w flex-m respon6-next">
                      <select className="custom-select">
                        <option>사이즈 선택</option>
                        <option>S</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex-w flex-r-m p-b-10">
                    <div className="size-203 flex-c-m respon6">Color</div>

                    <div className="size-204 flex-w flex-m respon6-next">
                      <select className="custom-select">
                        <option>색상 선택</option>
                        <option>Red</option>
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
                    className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 tooltip100"
                  >
                    <i className="fa fa-facebook"></i>
                  </a>
                  <a
                    href="#"
                    className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 tooltip100"
                  >
                    <i className="fa fa-twitter"></i>
                  </a>
                  <a
                    href="#"
                    className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 tooltip100"
                  >
                    <i className="fa fa-google-plus"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;

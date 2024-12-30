// Hooks
import React, { useEffect, useState } from 'react';

// CSS
import '../assets/styles/common/main.css';
import '../assets/styles/common/util.css';
import './Home.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'material-design-iconic-font/dist/css/material-design-iconic-font.min.css';

// Components
import { call } from '../api/auth/ApiService';
import TopRankedProducts from '../components/features/product/TopRankedProducts';
import ProductCategoryList from '../components/features/product/ProductCategoryList';
import FilterSearchModal from '../components/features/home/FilterSearchModal';
import ProductCard from '../components/features/product/ProductCard';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('*'); // 카테고리 상태
  const [activeFilter, setActiveFilter] = useState('sortByRecent'); // 필터 상태
  const [products, setProducts] = useState([]);

  const handleCategory = (category) => {
    setActiveCategory(category);
  };

  const handleFilter = (filter) => {
    setActiveFilter(filter);
    console.log(`handleFilter에 입력된 filter: ${filter}`);
  };

  // 페이지 로드 시 GET 요청으로 상품 데이터를 받아옵니다.
  useEffect(() => {
    call('/products')
      .then((res) => {
        console.log('홈페이지 상품 데이터: ' + res);
        setProducts(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      {/* Slider */}
      <section className="section-slide">
        <div className="wrap-slick1">
          <div className="slick1">
            <div
              className="item-slick1"
              style={{ backgroundImage: 'url(images/slide-01.jpg)' }}
            >
              <div className="container h-full">
                <div className="flex-col-l-m h-full p-t-100 p-b-30 respon5">
                  <span className="ltext-101 cl2 respon2">
                    Women Collection 2024
                  </span>
                  <h2 className="ltext-201 cl2 p-t-19 p-b-43 respon1">
                    NEW SEASON
                  </h2>
                  <a
                    href="/shop"
                    className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04"
                  >
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner */}
      <TopRankedProducts />

      {/* Product Overview */}
      <section className="bg0 p-t-23 p-b-140">
        <div className="container">
          <div className="p-b-10">
            <h3 className="ltext-103 cl5">
              <b>상품 미리보기</b>
            </h3>
          </div>

          {/* Category & Filter & Search */}
          <div className="flex-w flex-sb-m p-b-52">
            <ProductCategoryList
              activeCategory={activeCategory}
              handleCategory={handleCategory}
            />
            <FilterSearchModal
              activeFilter={activeFilter}
              handleFilter={handleFilter}
            />
          </div>

          {/* Product */}
          <ProductCard
            products={products}
            activeCategory={activeCategory}
            activeFilter={activeFilter}
          />

          {/*Load more*/}
          <div className="flex-c-m flex-w w-full p-t-45">
            <a
              href="#"
              className="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn1 p-lr-15 trans-04"
            >
              Load More
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

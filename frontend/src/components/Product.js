import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Product({ products, activeCategory, activeFilter }) {
  const [isLiked, setIsLiked] = useState({});
  const navigator = useNavigate();

  const handleNavigate = (product) => {
    navigator(`/Detail`, { state: { productId: product.id } });
  };

  // itemName과 같이 camelCase로 수정
  const uniqueProducts = products.reduce((acc, product) => {
    const existing = acc.find((p) => p.itemName === product.itemName);
    if (!existing || product.id < existing.id) {
      return [...acc.filter((p) => p.itemName !== product.itemName), product];
    }
    return acc;
  }, []);

  const toggleLike = (id) => {
    console.log(`${id}번의 Like를 클릭하였습니다.`);
    setIsLiked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (products.length === 0) {
    return <div className="row isotope-grid">No products available</div>;
  }

  return (
      <div className="row isotope-grid">
        {uniqueProducts
            .filter((product) =>
                activeCategory === '*' || product.itemCategory === activeCategory
            )
            .sort((a, b) => {
              if (activeFilter === 'sortByRecent') {
                // 정렬 조건에 맞게 최신순 구현
                return new Date(b.createdAt) - new Date(a.createdAt);
              } else if (activeFilter === 'sortByPriceDesc') {
                // 높은 가격순
                return Number(b.itemPrice) - Number(a.itemPrice);
              } else if (activeFilter === 'sortByPriceAsc') {
                // 낮은 가격순
                return Number(a.itemPrice) - Number(b.itemPrice);
              } else if (activeFilter === 'sortByRating') {
                // 평점순 구현
                return b.rating - a.rating;
              } else if (activeFilter === 'sortByReviews') {
                // 리뷰 수순 정렬
                return (b.reviews?.length || 0) - (a.reviews?.length || 0);
              }
              return 0; // 조건이 없거나 일치하지 않으면 기본 유지
            })
            .map((product) => (
                <div
                    key={product.id}
                    className={`col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item ${product.itemCategory}`}
                >
                  <div className="block2">
                    <div className="block2-pic hov-img0">
                      <img src={`images/${product.mainImage}`} alt="IMG-PRODUCT" />

              <div className="block2-txt flex-w flex-t p-t-14">
                <div className="block2-txt-child1 flex-col-l ">
                  <button
                    className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                    onClick={() => handleNavigate(product)}
                  >
                    {product.itemName}
                  </button>

                    <div className="block2-txt flex-w flex-t p-t-14">
                      <div className="block2-txt-child1 flex-col-l ">
                        <button
                            className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                            onClick={() => handleNavigate(product)}
                        >
                          {product.itemName}
                        </button>

                        <span className="stext-105 cl3">￦{Number(product.itemPrice).toLocaleString()}</span>
                      </div>

                      <div className="block2-txt-child2 flex-r p-t-3">
                        <button
                            className="btn-addwish-b2 dis-block pos-relative js-addwish-b2"
                            onClick={() => toggleLike(product.id)}
                        >
                          <img
                              className="icon-heart1 dis-block trans-04"
                              src="images/icons/icon-heart-01.png"
                              alt="ICON"
                          />
                          <img
                              className={`${
                                  isLiked[product.id] === true ? 'icon-heart2-liked' : 'icon-heart2'
                              } dis-block trans-04 ab-t-l`}
                              src="images/icons/icon-heart-02.png"
                              alt="ICON"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="block2-txt-child2 flex-r p-t-3">
                  <button
                    className="btn-addwish-b2 dis-block pos-relative js-addwish-b2"
                    onClick={() => toggleLike(product.id)}
                  >
                    <img
                      className="icon-heart1 dis-block trans-04"
                      src="images/icons/icon-heart-01.png"
                      alt="ICON"
                    />
                    <img
                      className={`${
                        isLiked[product.id] === true
                          ? 'icon-heart2-liked'
                          : 'icon-heart2'
                      } dis-block trans-04 ab-t-l`}
                      src="images/icons/icon-heart-02.png"
                      alt="ICON"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Product;

import React, { useState, useEffect } from "react";
import "./Home.css";
import Product from "./Product";
import axios from "./axios";
import { useStateValue } from "./StateProvider";

function Home() {
  const [{ basket }, dispatch] = useStateValue();

  const [productsRows, setProductsRows] = useState([]);
  useEffect(() => {
    const getProductsRows = async () => {
      const response = await axios({
        method: "get",
        url: `/product/`,
      });
      setProductsRows(response.data.data.products);
    };

    getProductsRows();
  }, [basket]);
  // console.log("products", productsRow);
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt=""
        />
        {productsRows.map((productsRow) => (
          <div class="home__row">
            {productsRow.map((product) => (
              <Product
                id={product.id}
                title={product.title}
                price={product.price}
                image={product.image}
                rating={product.rating}
              />
            ))}
          </div>
        ))}
        {/* <div class="home__row">
          
          <Product
            id="450958"
            title="New Apple MacBook Pro (16-inch, 16GB RAM, 512GB Storage, 2.6GHz Intel Core i7) - Space Gray"
            price={2099.0}
            image="https://m.media-amazon.com/images/I/71pC69I3lzL._AC_UY218_.jpg"
            rating={4}
          />
        </div>

        <div class="home__row">
          <Product
            id="5498540"
            title="Samsung LC49Rg90SSUXEN 49' Curved LED Gaming Monitor"
            price={199.99}
            image="https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466.jpg"
            rating={3}
          />
          <Product
            id="9418504985"
            title="Amazon echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric"
            price={98.99}
            image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$"
            rating={5}
          />
          <Product
            id="495849058"
            title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128FB) - Silver (4th Generation)"
            price={598.99}
            image="https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385.jpg"
            rating={4}
          />
        </div>

        <div class="home__row">
          <Product
            id="49580768658"
            title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440"
            price={1094.99}
            image="https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355.jpg"
            rating={4}
          />
        </div> */}
      </div>
    </div>
  );
}

export default Home;

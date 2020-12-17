import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./style.css";

import axios from "axios";

export default class Popular extends Component {
  intervalID

  state = {
    popularProducts: []
  }

  getPopularProducts = async () => {
    // const url = "https://b2bd74521743.ngrok.io/products/";
    const url = "http://localhost:8007/products/";
    await axios
      .get(url)
      .then((res) => {
        const popularProducts = res.data.data.products;
        this.setState({ popularProducts });
      })
      .catch((err) => err);
  }

  setPrice = (price) => {
    localStorage.setItem('price', price)
  }

  componentDidMount() {
    setTimeout(()=> {this.getPopularProducts()},1000)
  }

  
  render() {
    return (
      <>
        <div className="tittle">
          <h2 style={{ fontSize: "34px" }}> Popular </h2>
          <div className="d-flex justify-content-between">
            <p style={{ fontSize: "12px", color: "gray" }}>
              find clothes that are trending recently
            </p>
          </div>
        </div>

        <div className="row-catalog">
          {this.state.popularProducts.map((popularProduct, id,) => {
            return (
              <div key={id} className="card card-catalog">
                <Link to={`/detail/${popularProduct.id}`} onClick={() => this.setPrice(popularProduct.product_price)}>
                  <img
                    src={JSON.parse(popularProduct.product_photo).shift()}
                    alt=""
                    className="card-img-top img-news"
                    width="238"
                    height="136"
                  />
                  <div className="card-body">
                    <p className="card-catalog-title">
                      {popularProduct.product_name}
                    </p>
                    <p className="card-catalog-price">
                      {popularProduct.product_price}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

      </>
    )
  }
}

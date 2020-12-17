import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./style.css";

import axios from "axios";

export default class Catalog extends Component {
  intervalID;

  state = {
    productsNews: [],
  };

  getAllNewsProducts = () => {
    // const url = "https://b2bd74521743.ngrok.io/sorting?keyword=";
    const url = "http://localhost:8007/sorting?keyword=";
    axios
      .get(url + "created_at DESC")
      .then((res) => {
        const productsNews = res.data.data;
        this.setState({ productsNews });
      })
      .catch((err) => err);
  };

  setPrice = (price) => {
    localStorage.setItem('price', price)
  }

  componentDidMount() {
    setTimeout(() => {this.getAllNewsProducts()},1000)
    
  }
  render() {
    return (
      <>
        <div className="tittle">
          <h2 style={{ fontSize: "34px" }}> New </h2>
          <div className="d-flex justify-content-between">
            <p style={{ fontSize: "12px", color: "gray" }}>
              You've never seen it before
            </p>
           
          </div>
        </div>

        <div className="row-catalog">
          {this.state.productsNews.map((productNew, id,) => {
            return (
              <div key={id} className="card card-catalog">
                <Link to={`/detail/${productNew.id}`} onClick={()=> this.setPrice(productNew.product_price)}>
                  <img
                    src={JSON.parse(productNew.product_photo).shift()}
                    alt=""
                    className="card-img-top img-news"
                    width="238"
                    height="136"
                  />
                  <div className="card-body">
                    <p className="card-catalog-title">
                      {productNew.product_name}
                    </p>
                    <p className="card-catalog-price">
                      {productNew.product_price}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

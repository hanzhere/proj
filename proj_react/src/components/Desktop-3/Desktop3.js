import React, { useState, useEffect } from "react";
import "./style.css";

import axios from "axios";
import Webcam from "react-webcam";

export default function Desktop3(props) {
  const axios = require("axios").default;

  const { userName } = props;
  const [price, setPrice] = useState("125,000");

  const [products, setProducts] = useState([]);
  // webcam declare

  var mockData = [];

  var myVar;

  useEffect(() => {
    myVar = setInterval(() => {
      capture();
    }, 3000);
  }, [myVar]);
  const videoConstraints = {
    width: 920,
    height: 580,
    facingMode: "user",
  };

  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();

    if (imageSrc) {
      //   console.log(imageSrc.slice(23));
      axios
        .post("http://192.168.0.103:6868/detect", {
          products: imageSrc.slice(23),
        })
        .then((res) => {
          console.log(res.data);
          mockData = [];
          for (let product in res.data) {
            // const i = mockData.indexOf(JSON.parse(`{"${product}": ${res.data[product]}}`))
            // console.log('i: ', i);
            // if ( i == -1) {
            let obj = `{"name": ${product}, "count": ${res.data[product]}}`;
            mockData.push(JSON.parse(obj));

            console.log(mockData);
            // }
          }

          // console.log(mockData[0]);
        });
    }
  }, [webcamRef]);

  return (
    <div className="desktop3">
      <div className="desktop3__scan">
        <div className="desktop3__title">
          👋 Hello, <span>{userName}</span>
        </div>
        {/* <div className="desktop3__cam"></div> */}
        <Webcam
          className="desktop3__cam"
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />
      </div>
      <div className="desktop3__check-list">
        <div className="desktop3__check-list__title">Your cart</div>
        <div className="desktop3__check-list__products">
          <div className="desktop3__check-list__product">
            <div className="desktop3__check-list__product__img">Image</div>
            <div className="desktop3__check-list__product__info">
              {/* {mockData[0].name} */}
            </div>
          </div>
        </div>
        <div className="desktop3__check-list__price">
          <div>Total</div>
          <div>{price}</div>
        </div>
        <button className="desktop3__check-list__button-payment">
          Payment
        </button>
      </div>
    </div>
  );
}

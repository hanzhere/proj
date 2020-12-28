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

  var mockData = {
      'banana': 0,
      'cell phone': 0,
      'bottle': 0,
      'orange': 0
  }
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
            for (let product of res.data) {
                if (product in mockData) {
                    mockData[product] = product;
                }
            }
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
          {/* There are something in this className */}
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

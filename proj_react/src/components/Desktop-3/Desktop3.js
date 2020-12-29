import React, { useState, useEffect } from "react";
import "./style.css";

import { db } from "../../firebaseConfig";

import axios from "axios";
import Webcam from "react-webcam";

import { PRODUCTS } from "./products";

import Desktop4 from "../Desktop-4/Desktop4";

export default function Desktop3(props) {
  const axios = require("axios").default;

  const { userName, userId } = props;

  const [isPayment, setIsPayment] = useState(false);

  const [totalPrice, setTotalPrice] = useState(0);
  console.log("id: ", userId);
  var mockData = [];

  // const MOCKDATA = [
  //   {
  //     name: "banana",
  //     price: 5000,
  //     url:
  //       "https://product.hstatic.net/1000359458/product/chuoi_ebd2f19011df4297ad55113e4a40f97a.png",
  //     quantity: 2,
  //   },
  //   {
  //     name: "orange",
  //     price: 15000,
  //     url:
  //       "https://i.pinimg.com/736x/05/79/5a/05795a16b647118ffb6629390e995adb.jpg",
  //     quantity: 3,
  //   },
  // ];
  // webcam declare

  var myVar;

  useEffect(() => {
    myVar = setInterval(() => {
      capture();
    }, 2000);
    isPaymentFunction();
    getTotalPrice();
  }, [myVar]);
  const videoConstraints = {
    width: 920,
    height: 580,
    facingMode: "user",
  };

  const webcamRef = React.useRef(null);

  const getTotalPrice = () => {
    db.ref(`transaction/${userId}/`).on("value", (snapshot) => {
      console.log(snapshot.val());
      if (snapshot.val()) {
        setTotalPrice(snapshot.val().total_price);
        // setUserName(snapshot.val().user_name);
      }
    });
  };
  const isPaymentFunction = () => {
    db.ref(`transaction/${userId}/`).on("value", (snapshot) => {
      console.log(snapshot.val());
      if (snapshot.val().is_payment) {
        setIsPayment(snapshot.val().is_payment);
        clearInterval(myVar);
      }
    });
  };
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();

    if (imageSrc) {
      //   console.log(imageSrc.slice(23));
      axios
        .post("http://192.168.0.103:6868/detect", {
          products: imageSrc.slice(23),
        })
        .then((res) => {
          mockData = [];
          // db.ref("transaction/" + 3927 + "/products/").set({});

          for (let product in res.data) {
            let tmp;
            console.log(product);

            switch (product) {
              case "banana":
                tmp = "banana";
                break;
              case "apple":
                tmp = "apple";
                break;
              case "orange":
                tmp = "orange";
                break;
              case "bottle":
                tmp = "bottle";
                break;
              default:
                tmp = "bottle";
                break;
            }

            if (product) {
              const obj = `{"name":"${tmp}","price":"${PRODUCTS[tmp].price}","url":"${PRODUCTS[tmp].url}",
                "quantity":"${res.data[product]}"}`;

              let flag = false;
              if (mockData.length == 0) {
                mockData.push(JSON.parse(obj));
              } else {
                for (let i = 0; i < mockData.length; i++) {
                  if (mockData[i].name === JSON.parse(obj).name) {
                    flag = true;
                    mockData[i] = JSON.parse(obj);
                  }
                }
                flag === false && mockData.push(JSON.parse(obj));
              }
            }
          }
        });
      console.log(mockData);
      if (mockData.length === 0) {
        db.ref("transaction/" + userId).update({ products: [] });
      }
      mockData.map((data, index) => {
        // console.log(data);

        // db.ref("transaction/" + 3927+"/").set({
        //   products: {
        //     [index]: {
        //           name: data.name,
        //           price: data.price,
        //           quantity: data.quantity,
        //           url: data.url,
        //         },
        //   }
        // })
        db.ref("transaction/" + userId + "/products/").update({
          [index]: {
            name: data.name,
            price: data.price,
            quantity: data.quantity,
            url: data.url,
          },
        });
        // .set({
        //   name: data.name,
        //   price: data.price,
        //   quantity: data.quantity,
        //   url: data.url,
        // })
        // .then((res) => {
        //   console.log("res", res);
        // });
      });
    }
  }, [webcamRef]);

  return (
    <>
      {isPayment ? (
        <Desktop4 userId={userId} />
      ) : (
        <div className="desktop3">
          <div className="desktop3__scan">
            <div className="desktop3__title">
              👋 Hello,
              <span>{userName}</span>
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
          {/* <div className="desktop3__check-list">
            <div className="desktop3__check-list__title">Your cart</div>
            <div className="desktop3__check-list__products">
              <div className="desktop3__check-list__product">
                <div className="desktop3__check-list__product__img">Image</div>
                {db
                  .ref(`transaction/${userId}/products`)
                  .on("value", (snapshot) => {
                    if (snapshot.val() != undefined && snapshot.val() != null) {
                      snapshot.val().map((data) => <div>{data.name}</div>);
                    }
                  })}
              </div>
            </div>
            <div className="desktop3__check-list__price">
              
            </div> */}

          {/* <button className="desktop3__check-list__button-payment">
              Payment
            </button> */}
          <div className="desktop3__check-list__price">
            <div>Total</div>
            <div>{totalPrice}</div>
          </div>
        </div>
        //</iv>d
      )}
    </>
  );
}

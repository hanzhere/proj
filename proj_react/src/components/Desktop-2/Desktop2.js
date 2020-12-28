import React, { useEffect, useState } from "react";
import "./style.css";

import "firebase/database";
import { db } from "../../firebaseConfig";

import QrReader from "react-qr-reader";

import Desktop3 from "../Desktop-3/Desktop3";

export default function Desktop2(props) {
  const [result, setResult] = useState("");

  const [isLogin, setIsLogin] = useState(false);

  //   console.log(setIsLogin);

  const [userData, setUserData] = useState("");
  const [userName, setUserName] = useState("");

  const createNewBranch = (userId, userName) => {
    db.ref("transaction/" + userId)
      .set({
        user_id: userId,
        user_name: userName,
        is_login: true,
        is_payment: false,
        total_price: 0
      })
      .then(setIsLogin(true));
  };

  const handleScan = (data) => {
    if (data != null) {
      //   setUserData(data);
      db.ref("user/" + data).on("value", (snapshot) => {
        setUserName(snapshot.val().name);
        createNewBranch(data, snapshot.val().name);
      });
    }
  };

  const handleError = (err) => {
    console.log(err);
  };
  return (
    <>
      {isLogin ? (
        <div className="desktop2">
          <div className="title">Scan your QR Code</div>
          <QrReader
            className="cam"
            delay={10}
            onError={handleError}
            onScan={handleScan}
          />
        </div>
      ) : (
        <Desktop3 userName={userName}/>
      )}
    </>
  );
}

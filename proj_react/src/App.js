import "firebase/database"
import { db } from './firebaseConfig'
import React, { useEffect, useState, useRef } from 'react'
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import QrReader from 'react-qr-reader'
import { drawRect } from './util'

function App() {
  useEffect(() => {
    db.ref('user/').on('value', snapshot => {
      console.log(snapshot.val().address)
    })
  }, [])

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Main function
  const runCoco = async (userId) => {
    const net = await cocossd.load();
    console.log("Handpose model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      detect(net, userId);
    }, 500);
  };

  const detect = async (net, userId) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const obj = await net.detect(video);

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");

      let productArr = new Set()

      if (obj.length !== 0) {
        console.log(obj[0].class)
        // postToDatabase()
        // productArr.add(obj[0].class)
        // getProductData(obj[0].class)

        db.ref("products/" + obj[0].class).once('value', snapshot => {
          let productData = snapshot.val()
          // console.log(temp.price)
          if (productData !== null) {
            db.ref("transaction/" + userId + "/products/" + productData.name).set({
              'id': productData.id,
              'price': productData.price,
              'name': productData.name
            })
          }

        })

      }
      // productArr.forEach(e => getProductData(e))
      // console.log(obj)
      drawRect(obj, ctx);
    }
  };

  const handleErr = err => console.log(err)

  const [userData, setUserData] = useState('')
  const [userName, setUserName] = useState('')

  const handleScan = data => {
    console.log(data)
    if (data != null) {
      setUserData(data)
      db.ref('user/' + data).on('value', snapshot => {
        setUserName(snapshot.val().name)
        createNewBranch(data, snapshot.val().name)
      })
    }
  }

  const createNewBranch = (userId, userName) => {
    db.ref('transaction/' + userId).set({
      user_id: userId,
      user_name: userName,
      is_login: true,
      is_payment: false,
    }).then(runCoco(userId))
  }

  useEffect(() => {

  }, [])
  return (
    <>
      {userData ? null : <QrReader
        delay={300}
        onError={handleErr}
        onScan={handleScan}
        style={{ width: 300, height: 300 }}
      />}
      {userName ? <h1>
        hello, {userName}
      </h1> : null}
      <Webcam
        ref={webcamRef}
        muted={true}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zindex: 9,
          width: 640,
          height: 480,
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zindex: 8,
          width: 640,
          height: 480,
        }}
      />
    </>
  );
}

export default App;

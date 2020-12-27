import React, { useState, useEffect } from 'react'
import { Button, TextInput, View, Text } from 'react-native'
import { db } from './firebaseConfig';
import QRCode from 'react-native-qrcode-svg';

export const Home = () => {
    const [name, onChangeName] = useState('');
    const [userId, onChangeUserId] = useState('')
    const [isLogin, onChangeIsLogin] = useState(false)

    const postToDB = () => {
        const id = Math.floor(Math.random() * 10000);
        db.ref('user/' + id.toString()).set({
            name: name,
            id: id.toString()
        }).then(
            getUserId(id),
        ).then(checkLogin(id))
    }

    const getUserId = (id) => {
        db.ref('user/' + id.toString()).on('value', snapshot => {
            // console.log(snapshot.val()),
            onChangeUserId(id.toString())
        })
    }

    const checkLogin = (id) => {
        db.ref('transaction/' + id.toString()).on('value', snapshot => {
            onChangeIsLogin(snapshot.val())
            // console.log(snapshot.val())
        })
        getProduct(id)
    }

    const [productData, setProductData] = useState({});

    const getProduct = (id) => {
        db.ref('transaction/' + id + '/products/').on('value', snapshot => {
            // console.log(id)
            setProductData(snapshot.val())
        })
    }

    const [keys, setKeys] = useState([])

    const showProduct = (object) => {
        var keys = [];
        for (const key in object) {
            if (Object.hasOwnProperty.call(object, key)) {
                const element = object[key];
                keys.push(element);

            }
        }
        console.log(keys)
        // setKeys(keys)
        return keys.map(e => (
            <View style={{ backgroundColor: "white" }}>
                <Text style={{ fontSize: 20, color: "black" }}>{e.name}</Text>
                <Text>{e.price}</Text>
            </View>
        ))
        // keys.map(e => console.log(e.id))
    }

    return (
        <>
            <TextInput
                placeholder="name"
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => onChangeName(text)}
                value={name}
            />
            <View style={{
                margin: 50
            }}>
                {isLogin ? null : <QRCode
                    style={{ marginLeft: 40 }}
                    value={userId ? userId : "a"}
                    size={250}
                    color="black"
                    backgroundColor="white"
                />}

            </View>
            {userId ? null : <Button style={{ height: 100, width: 100 }} title="abc" onPress={postToDB} />}

            {/* {console.log(productData)} */}
            <View style={{ width: 500, height: 700 }}>
                {showProduct(productData)}
                {/* {keys.map(e => (<Text>{e.name}</Text>))} */}

            </View>

        </>
    );
}

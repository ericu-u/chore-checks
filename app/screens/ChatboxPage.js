//@refresh _reset

import React, { useState, useEffect, useCallback } from "react";
import {
  GiftedChat,
  Composer,
  Act,
  onLongPress,
} from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, TextInput, View, Button, ActionSheet } from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";
import ImgPicker from "./ImagePicker";

var householdIDD = "hHeLFGtKHEHl6PPMwf9ek";
const firebaseConfig = {
  apiKey: "AIzaSyBXrzMPWBxF9GBbtxLL1rqGeSVmz7C1KKw",
  authDomain: "chores-97427.firebaseapp.com",
  projectId: "chores-97427",
  storageBucket: "chores-97427.appspot.com",
  messagingSenderId: "409040868260",
  appId: "1:409040868260:web:f017bd7c65851944802731",
  measurementId: "G-4NVH0ELYEG",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const chatsRef = db.collection("/houses/" + householdIDD + "/Messages");
// const chatsRef = db.collection("/chat2");

export default function App() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    readUser();
    const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
      const messagesFirestore = querySnapshot
        .docChanges()
        .filter(({ type }) => type === "added")
        .map(({ doc }) => {
          const message = doc.data();

          return { ...message, createdAt: message.createdAt.toDate() };
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      appendMessages(messagesFirestore);
    });
    return () => unsubscribe();
  }, []);

  const appendMessages = useCallback(
    (messages) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    },
    [messages]
  );

  async function readUser() {
    const user = await AsyncStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }
  async function handlePress() {
    const _id = Math.random().toString(36).substring(7);
    const user = { _id, name };
    await AsyncStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  }
  async function handleSend(messages) {
    const writes = messages.map((m) => chatsRef.add(m));
    await Promise.all(writes);
  }

  const db = firebase.firestore();
  function handleDelete(v) {
    db.collection("/houses/")
      .doc(householdIDD)
      .collection("/Messages/")
      .doc(v)
      .delete();
    console.log(v);
  }

  function handleLongPress(context, pressed_message) {
    if (pressed_message.text !== "") {
      console.log(context, pressed_message);
      const options = ["Delete", "Cancel"];
      const cancelButtonIndex = options.length;
      context
        .actionSheet()
        .showActionSheetWithOptions(
          { options, cancelButtonIndex },
          (buttonIndex) => {
            switch (buttonIndex) {
              case 1:
                let result = handleDelete(pressed_message); //deleting logic here
                break;
            }
          }
        );
    }
  }

  if (!user) {
    return (
      <View alignitmes="center">
        <TextInput
          placeholder="Future google signin"
          value={name}
          onChangeText={setName}
        />
        <Button onPress={handlePress} title="type here" />
      </View>
    );
  }

  // onTextChange = (value, props) => {
  //     const lastChar = this.state.messageText.substr(this.state.messageText.length - 1)
  //     const currentChar = value.substr(value.length - 1)
  //     const spaceCheck = /[^@A-Za-z_]/g
  //     props.onTextChanged(value)
  //     this.setState({
  //       messageText: value
  //     })
  //     if(value.length === 0) {
  //       this.setModalVisible(false)
  //     } else {
  //       if (spaceCheck.test(lastChar) && currentChar != '@') {
  //         this.setModalVisible(false)
  //       } else {
  //         const checkSpecialChar = currentChar.match(/[^@A-Za-z_]/)
  //         if (checkSpecialChar === null || currentChar === '@') {
  //           const pattern = new RegExp(`\\B@[a-z0-9_-]+|\\B@`, `gi`);
  //           const matches = value.match(pattern) || []
  //           if (matches.length > 0) {
  //             this.getUserSuggestions(matches[matches.length - 1])
  //             this.setModalVisible(true)
  //           } else {
  //             this.setModalVisible(false)
  //           }
  //         } else if (checkSpecialChar != null) {
  //           this.setModalVisible(false)
  //         }
  //       }
  //     }
  //   }

  // getUserSuggestions = (keyword) => {
  //     this.setState({
  //       isLoading: true
  //     }, () => {
  //       if(Array.isArray(userList)) {
  //         if(keyword.slice(1) === '') {
  //           this.setState({
  //             userData: [...userList],
  //             isLoading: false
  //           })
  //         } else {
  //           const userDataList = userList.filter(obj => obj.name.indexOf(keyword.slice(1)) !== -1)
  //           this.setState({
  //             userData: [...userDataList],
  //             isLoading: false
  //           })
  //         }
  //       }
  //     })
  //   }

  return (
    <GiftedChat
      messages={messages}
      user={user}
      onSend={handleSend}
      onLongPress={handleLongPress}
      renderUsernameOnMessage
      renderAvatarOnTop
      messagesContainerStyle={{ backgroundColor: "#7ab5ca" }}
      renderActions={() => (
        <React.Fragment>
          <ImgPicker />
        </React.Fragment>
      )}
    />
  );
}

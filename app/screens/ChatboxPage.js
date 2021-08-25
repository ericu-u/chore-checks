//@refresh _reset
import React, { useState, useEffect, useCallback } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, TextInput, View, Button } from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";
import ImgPicker from "./ImagePicker";

var householdIDD = "hDmQmaXM0qoZP6TuaPK4u";
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

// const chatsRef = db.collection("/chat2");

export default function App() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    var unsubscribe = () => {
      console.log("UNSUBBED EARLY!!!!!!!!!!!!!!!!!!q");
    };
    const db = firebase.firestore();

    (async () => {
      const uid = firebase.auth().currentUser.uid;
      db.doc("users/" + uid).onSnapshot((doc) => {
        householdIDD = doc.data().householdID;
        const chatsRef = db.collection("/houses/" + householdIDD + "/Messages");

        AsyncStorage.removeItem("user");
        readUser();
        unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
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
      });
    })();

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
    // const _id = Math.random().toString(36).substring(7);
    // const user = { _id, name };
    const _id = firebase.auth().currentUser.uid;
    const name = firebase.auth().currentUser.displayName;
    const avatar = firebase.auth().currentUser.photoURL;
    const user = { _id, name, avatar };
    await AsyncStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  }
  async function handleSend(messages) {
    const chatsRef = firebase.firestore().collection("/houses/" + householdIDD + "/Messages");

    const writes = messages.map((m) => chatsRef.add(m));
    await Promise.all(writes);
  }

  if (!user) {
    handlePress();
  }

  return (
    <GiftedChat
      messages={messages}
      user={user}
      onSend={handleSend}
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

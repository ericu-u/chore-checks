//@refresh _reset

import React, { useState, useEffect, useCallback } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, TextInput, View, Button } from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";
import * as GoogleAuthentication from "expo-google-app-auth";

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
const chatsRef = db.collection("chat2");

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

  AsyncStorage.removeItem("user");

  async function readUser() {
    const user = await AsyncStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }
  async function handlePress() {
    const _id = firebase.auth().currentUser.uid;
    const name = firebase.auth().currentUser.displayName;
    const avatar = firebase.auth().currentUser.photoURL;
    console.log("avatar", avatar);
    const user = { _id, name, avatar };
    await AsyncStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  }
  async function handleSend(messages) {
    const writes = messages.map((m) => chatsRef.add(m));
    await Promise.all(writes);
  }

  // console.log("refresheds");
  console.log("curr user:", firebase.auth().currentUser.photoURL);

  // firebase
  //   .auth()
  //   .signOut()
  //   .then(() => {
  //     console.log("signed out");
  //     console.log(firebase.auth().currentUser);
  //   })
  //   .catch((error) => {
  //     // An error happened.
  //   });

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button onPress={handlePress} title="Sign in" />
      </View>
    );
  }

  return (
    <GiftedChat
      messages={messages}
      user={user}
      onSend={handleSend}
      renderUsernameOnMessage
      renderAvatarOnTop
      messagesContainerStyle={{ backgroundColor: "#7ab5ca" }}
    />
  );
}

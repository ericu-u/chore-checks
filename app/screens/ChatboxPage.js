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
import { doc, deleteDoc } from "firebase/firestore";

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

  // async function _delete(id) {
  //   const db = firebase.firestore();
  //   await db
  //     .collection("/houses/")
  //     .doc(householdIDD)
  //     .collection("/Messages/")
  //     .doc(v)
  //     .delete();
  //   console.log(v);
  // }

  function handleonLongPress(context, pressed_message) {
    // console.log(context, pressed_message);
    const options = ["Delete", "Cancel"];
    const cancelButtonIndex = options.length;
    //var to_delete = pressed_message.docRef.id();
    // console.log(messages)
    // console.log(messages.pop());
    // setMessages(messages);

    context
      .actionSheet()
      .showActionSheetWithOptions(
        { options, cancelButtonIndex },
        (buttonIndex) => {
          switch (buttonIndex) {
            case 0:
              let db = firebase.firestore();

              db.collection("/houses/hDmQmaXM0qoZP6TuaPK4u/Messages")
                .where("_id", "==", pressed_message._id)
                .get()
                .then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log("firebase id is:", doc.id);
                    var ind;
                    for (var i = 0; i < messages.length; i++) {
                      if (messages[i]._id === pressed_message._id) {
                        ind = i;
                        console.log("message gone for u:", messages[i]);
                      }
                    }
                    messages.splice(ind, 1);

                    db.collection("houses")
                      .doc("hDmQmaXM0qoZP6TuaPK4u")
                      .collection("Messages")
                      .doc(doc.id) // this line works if you hardcode the id
                      .delete()
                      .then(() => {
                        console.log("Deleted");
                      });
                  });
                })
                .catch((error) => {
                  console.log("Error getting documents: ", error);
                });
            // console.log("id: ", pressed_message._id)
            // db.collection("houses")
            //   .doc("hDmQmaXM0qoZP6TuaPK4u")
            //   .collection("Messages")
            //   .where("_id", "==", pressed_message._id) // this line works if you hardcode the id
            //   .deleteDoc()
            //   .then(() => {
            //     console.log("Deleted");
            //   });
          }
        }
      );
  }

  if (!user) {
    handlePress();
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
      onLongPress={handleonLongPress}
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

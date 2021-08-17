import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import LoginPage from "./app/screens/LoginPage";
import HouseholdPage from "./app/screens/HouseholdPage";
import ChatboxPage from "./app/screens/ChatboxPage";
import * as firebase from "firebase";
import "firebase/firestore";
import config from "./config";
import Test from "./app/screens/Test";
import SettingsPage from "./app/screens/SettingsPage";
import Drawer from "./app/screens/Drawer";
import HouseholdPage2 from "./app/screens/HouseholdPage2";
import { TasksPage2 } from "./app/screens/TasksPage2";
import { HousePage3 } from "./app/screens/HouseHoldPage3";
import BigChat from "./app/screens/chatMasterThing";
import ScuffedLogin from "./app/screens/ScuffedLogin";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import "react-native-gesture-handler";
import ProfilePage from "./app/screens/ProfilePage";

// firebase.auth().signOut();
var firebaseConfig = {
  apiKey: config.FIREBASE_KEY,
  authDomain: "chores-97427.firebaseapp.com",
  projectId: "chores-97427",
  storageBucket: "chores-97427.appspot.com",
  messagingSenderId: "409040868260",
  appId: "1:409040868260:web:7b6d1f00e29554af802731",
  measurementId: "G-8D3XVC7R9T",
};
// Initialize Firebase

// console.log("refreshed");
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const db = firebase.firestore();
var docRef = db.doc("/messages/XBdku2O78W9iwkbev3y2");
docRef.get().then((doc) => {
  //  console.log(doc.data());
});

const AuthStack = createStackNavigator();

export default function App() {
  // To display your page on the app, comment out the current element and add the page you are working on/want to see
  return (
    /*
    <NavigationContainer independent={true}>
      <AuthStack.Navigator independent={true}>
        <AuthStack.Screen
          independent={true}
          name="LoginPage"
          component={LoginPage}
          options={{ headerShown: false }}
        />

        <AuthStack.Screen
          independent={true}
          name="Drawer"
          component={Drawer}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    </NavigationContainer>*/
    <Drawer></Drawer>
    // <LoginPage></LoginPage>
    // <Help></Help>
    // <Help2></Help2>
    // <ProfilePage></ProfilePage>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a6ddf1",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "contain",
  },
  titleText: {
    fontSize: 40,
    color: "white",
  },
  text: {
    fontSize: 20,
  },
});

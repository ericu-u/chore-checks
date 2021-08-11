import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableHighlight,
  Button,
  FlatList,
  StatusBar,
} from "react-native";
import { Header } from "react-native-elements";

console.log("refreshed");
function Test(props) {
  const signInWithGoogle = () =>
    GoogleAuthentication.logInAsync({
      androidStandaloneAppClientId:
        "409040868260-be16db3vja57mkd4oqt5es9ns9p5f78v.apps.googleusercontent.com",
      iosStandaloneAppClientId:
        "409040868260-hjdgccs3h9l57685tq800le3rh3e9jsg.apps.googleusercontent.com",
      scopes: ["profile", "email"],
    })
      .then((logInResult) => {
        if (logInResult.type === "success") {
          const { idToken, accessToken } = logInResult;
          const credential = firebase.auth.GoogleAuthProvider.credential(
            idToken,
            accessToken
          );

          return firebase.auth().signInWithCredential(credential);
          // Successful sign in is handled by firebase.auth().onAuthStateChanged
        }
        return Promise.reject(); // Or handle user cancelation separatedly
      })
      .catch((error) => {
        // ...
      });

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button onPress={handlePress} title="Sign in" />
    </View>
  );
  async function handlePress() {
    console.log("i am being pressed");

    
    // var provider = new firebase.auth.GoogleAuthProvider();
    // firebase.auth().signInWithRedirect(provider);
  }
}

export default Test;

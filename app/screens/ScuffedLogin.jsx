import React, { Component } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";
import * as Google from "expo-google-app-auth";

console.log("refreshed");
export default class ScuffedLogin extends Component {
  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };

  onSignIn = (googleUser) => {
    console.log("Google Auth Response", googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(
      function (firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );

          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(function () {
              console.log("user signed in");
            })
            .catch((error) => {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        } else {
          console.log("User already signed-in Firebase.");
        }
      }.bind(this)
    ); // Sketch
  };

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        behavior: "web",
        androidClientId:
          "409040868260-ahtufk4tk7f54bap4bi9e061dihn9grr.apps.googleusercontent.com",
        iosClientId:
          "409040868260-m4u2ubmsmbpgdqnk4f8g3frclv1k6mtn.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  login = async () => {
    // await firebase.auth().signOut();

    if (firebase.auth().currentUser === null) {
      const result = await Google.logInAsync({
        behavior: "web",
        androidClientId:
          "409040868260-ahtufk4tk7f54bap4bi9e061dihn9grr.apps.googleusercontent.com",
        iosClientId:
          "409040868260-m4u2ubmsmbpgdqnk4f8g3frclv1k6mtn.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } else {
      console.log(":)", firebase.auth());
    }
  };

  logout = async () => {
    await firebase.auth().signOut();
    console.log("signed out");
  };
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="login"
          onPress={() => {
            this.props.navigation.navigate("MenuPage");
          }}
        />
        <Button
          title="logout"
          color="#ff0000"
          onPress={() => {
            console.log("logout");
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

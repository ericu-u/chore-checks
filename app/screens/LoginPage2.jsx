import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Header } from "react-native-elements";
import { set } from "react-native-reanimated";
import * as firebase from "firebase";
import * as Google from "expo-google-app-auth";
import AppLoading from "expo-app-loading";
import { useFonts } from "@expo-google-fonts/montserrat";
import segoesc from "../assets/fonts/segoesc.ttf";
import { FontAwesome } from "@expo/vector-icons";
import Person from "../classes/person";

function LoginPage({ navigation }) {
  const [oatmealfact, setFact] = useState("");

  //const [unsub, setUnsub] = useState(null);
  const [unsubscriber, setUnsubscriber] = useState(null);

  console.log("tits");
  firebase.auth().signOut();
  useEffect(() => {
    const please = firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        const db = firebase.firestore();

        (async () => {
          var docRef = db.doc("users/" + user.uid);
          var doc = await docRef.get();
          console.log("boobs2");

          if (doc.exists) {
            console.log("doc exists!!!!!!!!!!!!!!!!");
            navigation.reset({
              index: 0,
              routes: [{ name: "Drawer" }],
            });
          } else {
            console.log("first time!!!!!");
            var newP = new Person(
              user.uid,
              user.displayName,
              user.photoURL,
              null,
              0,
              0,
              0,
              0,
              true,
              true,
              true,
              true,
              true
            );

            await docRef.withConverter(Person.personConverter).set(newP);
            navigation.reset({
              index: 0,
              routes: [{ name: "Drawer" }],
            });
          }
        })();
      } else {
        // No user is signed in.
      }
    });
    return function cleanup() {
      // unsub();
      if (unsubscriber !== null && unsubscriber !== undefined) {
        unsubscriber();
      }
      please();
    };
  });

  /*
  setUnsub(
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        const db = firebase.firestore();

        (async () => {
          var docRef = db.doc("users/" + user.uid);
          var doc = await docRef.get();
          console.log("boobs2");

          if (doc.exists) {
            console.log("doc exists!!!!!!!!!!!!!!!!");
            navigation.reset({
              index: 0,
              routes: [{ name: "Drawer" }],
            });
          } else {
            console.log("first time!!!!!");
            var newP = new Person(
              user.uid,
              user.displayName,
              user.photoURL,
              null,
              0,
              0,
              0,
              0,
              true,
              true,
              true,
              true,
              true
            );

            await docRef.withConverter(Person.personConverter).set(newP);
            navigation.reset({
              index: 0,
              routes: [{ name: "Drawer" }],
            });
          }
        })();
      } else {
        // No user is signed in.
      }
    })
  );
*/
  useEffect;
  () => {
    console.log("effect");
    var oatmealfacts_array = [
      "Oatmeal fact ",
      "Oatmeal fact2",
      "Oatmeal fact3",
    ];
    setFact =
      oatmealfacts_array[Math.floor(Math.random() * oatmealfactsarray.length)];
  };

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
    // console.log("Google Auth Response", googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(
      function (firebaseUser) {
        unsubscribe();
        setUnsubscriber(unsubscribe);
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
      console.log("already logged in");
    }
  };

  const handleTap = () => console.log("sign in to google");

  let [fontsLoaded] = useFonts({
    segoesc: require("../assets/fonts/segoesc.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 0.25 }}></View>
        <View style={{ flex: 1.25 }}>
          <Image
            source={require("../assets/oatmeal-logo.jpg")}
            style={styles.image}
          />
        </View>

        <View
          style={
            (styles.container,
            {
              flex: 0.5,
              alignItems: "center",
              justifyContent: "center",
              marginTop: "5%",
              marginBottom: "5%",
            })
          }
        >
          <Text style={styles.titleText}>Chore Checks</Text>
        </View>

        <TouchableOpacity onPress={login}>
          <Image
            style={{ resizeMode: "contain", width: 300, height: 60 }}
            source={require("../assets/Gsignin.png")}
          ></Image>
        </TouchableOpacity>

        <View
          style={{ flex: 2, alignItems: "center", justifyContent: "center" }}
        >
          <Text>
            Oats contain more soluble fiber than whole wheat, rice or corn!
          </Text>
        </View>

        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }
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
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
  },
  titleText: {
    fontSize: 40,
    color: "white",
    fontFamily: "segoesc",
  },
  text: {
    fontSize: 20,
  },
});

export default LoginPage;

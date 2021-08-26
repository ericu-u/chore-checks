import * as React from "react";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { IconButton, Colors } from "react-native-paper";
import * as firebase from "firebase";

// var householdIDD = "hHeLFGtKHEHl6PPMwf9ek";
// var householdIDD = "hDmQmaXM0qoZP6TuaPK4u";
// Source: https://github.com/shnrndk/office_messenger/blob/master/Components/ImagePicker/ImgPicker.js
export default class ImgPicker extends React.Component {
  state = {
    image: null,
    imageURL: null,
    householdID: "empty",
    unsubscribe: () => {
      console.log("IMAGE PICKER DISMOUNTED EARLY");
    },
  };

  render() {
    let { image } = this.state;

    return (
      <IconButton
        icon="camera"
        color={Colors.red500}
        size={20}
        onPress={this._pickImage}
      />
    );
  }

  componentDidMount() {
    const firebaseConfig = {
      apiKey: "AIzaSyBXrzMPWBxF9GBbtxLL1rqGeSVmz7C1KKw",
      authDomain: "chores-97427.firebaseapp.com",
      projectId: "chores-97427",
      storageBucket: "chores-97427.appspot.com",
      messagingSenderId: "409040868260",
      appId: "1:409040868260:web:f017bd7c65851944802731",
      measurementId: "G-4NVH0ELYEG",
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app();
    }
    const db = firebase.firestore();

    const uid = firebase.auth().currentUser.uid;
    var unsub = db.doc("users/" + uid).onSnapshot((doc) => {
      this.setState({ householdID: doc.data().householdID });
    });

    this.setState({ unsubscribe: unsub });

    this.getPermissionAsync();
  }

  componentWillUnmount() {
    // This method runs whenever we stop rendering the component
    this.state.unsubscribe(); // We end the subscription here so we don't waste resources
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        // allowsEditing: false,
        // aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
        this.uploadImage(result.uri)
          .then((res) => {
            console.log("Success");
          })
          .catch((error) => {
            alert(error);
          });
      }

      console.log("result:", result);
    } catch (E) {
      console.log(E);
    }
  };
  uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const imageId = new Date().getTime().toString();
    const uploadTask = firebase.storage().ref(`images/${imageId}`).put(blob);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        //setProgress(progress);
        console.log(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        firebase
          .storage()
          .ref("images")
          .child(`${imageId}`)
          .getDownloadURL()
          .then((url) => {
            this.setState({
              ...this.state,
              imageURL: url,
            });

            console.log("url: ", this.state.imageURL);
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
            const _id = Math.random().toString(36).substring(7);

            const chatsRef = db.doc(
              "/houses/" + this.state.householdID + "/Messages/" + _id
            );
            chatsRef.set({
              _id: _id,
              createdAt: firebase.firestore.Timestamp.now(),
              image: this.state.imageURL,
              user: {
                _id: firebase.auth().currentUser.uid,
                avatar: firebase.auth().currentUser.photoURL,
                name: firebase.auth().currentUser.displayName,
              },
            });
          });
      }
    );
    return uploadTask;
  };
}

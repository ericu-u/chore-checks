import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { ScrollView } from "react-native";
import Dialog from "react-native-dialog";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableHighlight,
  TouchableOpacity,
  Switch,
} from "react-native";
import ProfilePage from "./ProfilePage";
import AppLoading from "expo-app-loading";
import { useFonts, Montserrat_500Medium } from "@expo-google-fonts/montserrat";
import * as firebase from "firebase";
import Household from "../classes/household";

const Stack = createNativeStackNavigator();

const JoinHousehold = () => {
  const [visible, setVisible] = useState(false);
  const [code, setCode] = useState("");
  const navigation = useNavigation();
  var householdCode = code;

  useEffect(() => {
    (async () => {
      console.log("rrr");

      const uid = firebase.auth().currentUser.uid;
      const db = firebase.firestore();
      console.log(uid);
      // const oldID = await db.doc("users/" + uid).get().data().householdID;
      db.doc("users/" + uid).update({ householdID: null });


    })();
  }, []);

  const showDialogJoin = () => {
    setVisible(true);
  };

  const handleCancelJoin = () => {
    setVisible(false);
  };

  const handleConfirmJoin = () => {
    console.log("join", householdCode);
    (async () => {
      setVisible(false);
      const db = firebase.firestore();
      const uid = firebase.auth().currentUser.uid;

      db.doc("users/" + uid).update({ householdID: householdCode });
      navigation.navigate("Drawer");
    })();
  };

  return (
    <TouchableHighlight style={styles.joinBackground} onPress={showDialogJoin}>
      <View style={styles.container}>
        <Text style={styles.buttonText}>Join Existing {"\n"} Household</Text>
        <Dialog.Container visible={visible}>
          <Dialog.Title>Enter Household Code</Dialog.Title>
          <Dialog.Description>
            Please enter the full household code of an existing household.
          </Dialog.Description>
          <Dialog.Input
            clearButtonMode="while-editing"
            clearTextOnFocus={true}
            maxLength={21}
            placeholder="Your Household Code"
            placeholderTextColor="#777"
            onChangeText={(householdCode) => setCode(householdCode)}
            defaultValue={householdCode}
          ></Dialog.Input>
          <Dialog.Button label="Cancel" onPress={handleCancelJoin} />
          <Dialog.Button label="Confirm" onPress={handleConfirmJoin} />
          {/*<Changehouse />*/}
        </Dialog.Container>
      </View>
    </TouchableHighlight>
  );
};

const CreateHousehold = () => {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const navigation = useNavigation();
  var householdName = name;
  const showDialogCreate = () => {
    setVisible(true);
  };

  const handleCancelCreate = () => {
    setVisible(false);
  };

  const handleConfirmCreate = () => {
    console.log(householdName);

    const db = firebase.firestore();

    (async () => {
      const id = "id lol";
      const h = new Household(householdName, id);
      var newRef = db.doc("/houses/" + id);
      newRef.withConverter(Household.houseConverter).set(h);

      const uid = firebase.auth().currentUser.uid;
      console.log("new hh made");
      db.doc("users/" + uid).update({ householdID: id });

      setVisible(false);
      navigation.navigate("Drawer");
    })();
  };

  return (
    <TouchableHighlight
      style={styles.createBackground}
      onPress={showDialogCreate}
    >
      <View style={styles.container}>
        <Text style={styles.buttonText}>Create New {"\n"} Household</Text>
        <Dialog.Container visible={visible}>
          <Dialog.Title>Enter Household Name</Dialog.Title>
          <Dialog.Description>
            Please enter the full household name. This cannot be undone.
          </Dialog.Description>
          <Dialog.Input
            clearButtonMode="while-editing"
            clearTextOnFocus={true}
            maxLength={20}
            placeholder="Your Household Name"
            placeholderTextColor="#777"
            onChangeText={(householdName) => setName(householdName)}
            defaultValue={householdName}
          ></Dialog.Input>
          <Dialog.Button label="Cancel" onPress={handleCancelCreate} />
          <Dialog.Button label="Confirm" onPress={handleConfirmCreate} />
          {/*<Changehouse />*/}
        </Dialog.Container>
      </View>
    </TouchableHighlight>
  );
};

function HouseholdSelectionPage({ navigation }) {
  let [fontsLoaded] = useFonts({
    Montserrat_500Medium,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Profile" component={ProfilePage} />
          </Stack.Navigator>
        </NavigationContainer>
      ),
      (
        <ImageBackground
          style={{ flex: 1 }}
          source={require("../assets/background-gradient.jpg")}
        >
          <SafeAreaView style={styles.container}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../assets/householdSelect.png")}
                style={styles.image}
              />
              <Text style={styles.titleText}>Would you like to...</Text>
            </View>

            <View
              style={{
                flex: 1.2,
                flexDirection: "column",
                justifyContent: "space-evenly",
              }}
            >
              <JoinHousehold />
              <CreateHousehold />
            </View>
          </SafeAreaView>
        </ImageBackground>
      )
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "contain",
    width: 230,
    height: 230,
  },
  titleText: {
    fontSize: 30,
    color: "black",
    textAlign: "center",
    marginBottom: "16%",
    fontFamily: "Montserrat_500Medium",
  },
  text: {
    fontSize: 20,
  },
  joinBackground: {
    flex: 0.3,
    backgroundColor: "#DAECF0",
    borderRadius: 6,
    borderColor: "black",
    borderWidth: 1,
    marginLeft: "5%",
    marginRight: "2%",
    marginBottom: "8%",
    height: "100%",
  },
  createBackground: {
    flex: 0.3,
    backgroundColor: "#FFC681",
    borderRadius: 6,
    borderColor: "black",
    borderWidth: 1,
    marginLeft: "5%",
    marginRight: "2%",
    marginBottom: "4%",
    height: "100%",
  },
  buttonText: {
    marginLeft: "10%",
    marginTop: "2%",
    marginRight: "10%",
    marginBottom: "2%",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Montserrat_500Medium",
  },
});

export default HouseholdSelectionPage;

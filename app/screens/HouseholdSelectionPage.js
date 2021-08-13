import React, { useState } from "react";
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

function Changehouse({ navigation }) {
  navigation = useNavigation();
  return (
    <Dialog.Button
      label="Confirm"
      onPress={() => navigation.navigate("ProfilePage")}
    />
  );
}

const Stack = createNativeStackNavigator();

function HouseholdSelectionPage(navigation) {
  const handleJoin = () => console.log("Join Household");
  //const handleCreate = () => console.log("Create Household");
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  var householdName = name;
  const showDialogCreate = () => {
    setVisible(true);
  };

  const handleCancelCreate = () => {
    setVisible(false);
  };

  const handleConfirmCreate = (text) => {
    console.log(text);
    setVisible(false);
    navigation = useNavigation({ ProfilePage });
    navigation.navigate("ProfilePage");
  };

  return (
    (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ProfilePage">
          <Stack.Screen name="ProfilePage" component={ProfilePage} />
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
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
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
              alignItems: "space-evenly",
            }}
          >
            <TouchableHighlight
              style={styles.joinBackground}
              onPress={handleJoin}
            >
              <View style={styles.container}>
                <Text style={styles.buttonText}>
                  Join Existing {"\n"} Household
                </Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.createBackground}
              onPress={showDialogCreate}
            >
              <View style={styles.container}>
                <Text style={styles.buttonText}>
                  Create New {"\n"} Household
                </Text>
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
                  <Changehouse />
                </Dialog.Container>
              </View>
            </TouchableHighlight>
          </View>
        </SafeAreaView>
      </ImageBackground>
    )
  );
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
    fontSize: 35,
    color: "black",
    textAlign: "center",
    marginBottom: "16%",
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
  },
});

export default HouseholdSelectionPage;

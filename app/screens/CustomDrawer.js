import React from "react";
import { Image, StyleSheet, Button, View, Text } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { DrawerNavigator } from "react-navigation";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { TouchableOpacity } from "react-native-gesture-handler";

function Sidebar(props) {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />

        <View style={styles.horizontalLine} />
        {/* change household button */}
        <View style={styles.changeHouseholdButton}>
          <TouchableOpacity
            onPress={() => {
              console.log("household changed2");
              props.navigation.navigate("Change Household");
            }}
          >
            <Text style={styles.changeHouseholdText}>Change Household</Text>
          </TouchableOpacity>
        </View>
        {/* sign out button */}
        <View style={styles.signOutButton}>
          <TouchableOpacity
            onPress={
              () => {
                console.log("signed out button2");
                props.navigation.navigate("Log out");
              } // gotta change this part
            }
          >
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    );
  }
}

const styles = StyleSheet.create({
  horizontalLine: {
    flex: 1,
    height: 1,
    margin: "10%",
    marginTop: "-45%",
    backgroundColor: "black",
  },
  changeHouseholdButton: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "4%",
    paddingBottom: "4%",
    paddingRight: "4%",
    paddingLeft: "4%",
    marginTop: "6%",
    borderRadius: 50,
    borderColor: "black",
    borderWidth: 1,
  },
  changeHouseholdText: {
    color: "blue",
    fontSize: 20,
    fontFamily: "Montserrat_500Medium",
  },
  signOutButton: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "4%",
    paddingBottom: "4%",
    paddingRight: "4%",
    paddingLeft: "4%",
    marginTop: "12%",
    borderRadius: 50,
    borderColor: "black",
    borderWidth: 1,
  },
  signOutText: {
    color: "#D21404",
    fontSize: 20,
    fontFamily: "Montserrat_500Medium",
  },
});

export default Sidebar;

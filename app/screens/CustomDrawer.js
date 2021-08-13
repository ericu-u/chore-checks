import React from "react";
import { Image, StyleSheet, Button, View, Text } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

function Sidebar({ ...props }) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View style={styles.horizontalLine} />
      <View style={styles.container}>
        <View>
          <Image
            source={require("../assets/rounded-square.png")}
            style={styles.square}
          />
          <View style={styles.textBorder}>
            <Text style={styles.titleText}>Bubloo 7</Text>
            <Text style={styles.bodyText}>{"\u2022"} Bubloo 7 house</Text>
            <Text style={styles.bodyText}>{"\u2022"} -1 points </Text>
          </View>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  horizontalLine: {
    flex: 1,
    height: 1,
    margin: "10%",
    marginTop: "8%",
    marginBottom: "7%",
    backgroundColor: "black",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  square: {
    width: 220,
    height: 220,
  },
  textBorder: {
    position: "absolute",
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    paddingTop: "10%",
    paddingBottom: "10%",
    paddingLeft: "10%",
    paddingRight: "10%",
  },
  titleText: {
    paddingBottom: "10%",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 27,
  },
  bodyText: {
    paddingBottom: "8%",
    paddingLeft: "10%",
    paddingRight: "10%",
    fontSize: 20,
  },
});

export default Sidebar;

import React from "react";
import { StyleSheet, ImageBackground } from "react-native";
import AccessoryBar from "./AccessoryBar";

function ProfilePage(props) {
  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require("../assets/background-gradient.jpg")}
    ></ImageBackground>
  );
}

const styles = StyleSheet.create({});

export default ProfilePage;

import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import LoadingScreen from "./chatLoadingScreen";
import Dashboard from "./chatDashboard";
import LoginScreen from "./chatLoginScreen";
import firebase from "firebase";

console.log("hi");
export default class BigChat extends React.Component {
  render() {
    return <AppNavigator></AppNavigator>;
  }
}
const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LoginScreen: LoginScreen,
  DashboardScreen: Dashboard,
});

const AppNavigator = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

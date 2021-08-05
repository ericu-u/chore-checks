import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import ChatboxPage2 from "./ChatboxPage2"

class Dashboard extends Component {
  render() {
    return <ChatboxPage2></ChatboxPage2>;
  }
}

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

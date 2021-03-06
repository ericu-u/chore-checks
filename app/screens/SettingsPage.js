import React, { useState } from "react";
import { render } from "react-dom";
import { ScrollView } from "react-native";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  ImageBackground,
  Button,
  TouchableHighlight,
  Switch,
  TouchableOpacity,
} from "react-native";
import { Header, withTheme } from "react-native-elements";
import { sub } from "react-native-reanimated";
import { moderateScale } from "react-native-size-matters";

export class SettingsPage extends React.Component {
  /*Variables for specific the notifications*/
  state = {
    TaskNotifcations: false,
    TnApproach: false,
    TnDeadlinePass: false,
    TnTaskInc: false,
    TnHousemateComplete: false,
    ChatNotifcations: false,
  };

  /*Allows true or false of specific settings to change*/
  toggleTaskNotifcations = (value) => {
    this.setState({ TaskNotifcations: value });
  };
  toggleTnApproach = (value) => {
    this.setState({ TnApproach: value });
  };
  toggleTnDeadlinePass = (value) => {
    this.setState({ TnDeadlinePass: value });
  };
  toggleTnTaskInc = (value) => {
    this.setState({ TnTaskInc: value });
  };
  toggleTnHousemateComplete = (value) => {
    this.setState({ TnHousemateComplete: value });
  };
  toggleChatNotifications = (value) => {
    this.setState({ ChatNotifications: value });
  };
  render() {
    return (
      <ImageBackground
        style={{ flex: 1 }}
        source={require("../assets/background-gradient.jpg")}
      >
        <SafeAreaView>
          <View style={styles.settingsBox}>
            {/*Task Notifications button setting*/}
            <View style={styles.textAlign}>
              <Text style={{ fontSize: 24 }}>Task Notifications</Text>
              <View style={styles.largeButton}>
                <Switch
                  onValueChange={this.toggleTaskNotifcations}
                  value={this.state.TaskNotifcations}
                />
              </View>
            </View>

            {/*Approaching deadline button setting*/}
            <View style={styles.subTextAlign}>
              <Text>Approaching deadline</Text>
              <View style={styles.smallButton}>
                <Switch
                  style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
                  onValueChange={this.toggleTnApproach}
                  value={this.state.TnApproach}
                />
              </View>
            </View>

            {/*Deadline passed button setting*/}
            <View style={styles.subTextAlign}>
              <Text>Deadline passed</Text>
              <View style={styles.smallButton}>
                <Switch
                  style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
                  onValueChange={this.toggleTnDeadlinePass}
                  value={this.state.TnDeadlinePass}
                />
              </View>
            </View>

            {/*Task incomplete button setting*/}
            <View style={styles.subTextAlign}>
              <Text>Task incomplete</Text>
              <View style={styles.smallButton}>
                <Switch
                  style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
                  onValueChange={this.toggleTnTaskInc}
                  value={this.state.TnTaskInc}
                />
              </View>
            </View>

            {/*Housemate completion button setting*/}
            <View style={styles.subTextAlign}>
              <Text>Housemate completion</Text>
              <View style={styles.smallButton}>
                <Switch
                  style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
                  onValueChange={this.toggleTnHousemateComplete}
                  value={this.state.TnHousemateComplete}
                />
              </View>
            </View>

            {/*Chat notifications*/}
            <View style={styles.textAlign}>
              <Text style={{ fontSize: 24 }}>Chat Notifications</Text>
              <View style={styles.largeButton}>
                <Switch
                  onValueChange={this.toggleChatNotifications}
                  value={this.state.ChatNotifications}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
        <SafeAreaView style={styles.bottomTextStart}>
          {/*Change Household button link*/}
          <Button
            title="Change Household"
            color="black"
            onPress={() => Alert.alert("Button with adjusted color pressed")}
          />

          {/*Sign out button*/}
          <Button
            color="red"
            onPress={() => Alert.alert("Button with adjusted color pressed")}
            title="Sign Out"
          ></Button>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#52a7d1",
  },
  statusHeader: {
    justifyContent: "center",
    marginTop: "6%",
    marginBottom: "6%",
  },
  statusHeaderText: {
    fontSize: 25,
    justifyContent: "center",
    textAlign: "center",
  },
  settingsBox: {
    backgroundColor: "white",
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: "4%",
    borderRadius: 6,
    borderColor: "black",
    borderWidth: 1,
    height: "93%",
    paddingTop: "2%",
  },

  textAlign: {
    paddingTop: "3%",
    fontSize: 24,
    paddingLeft: "8%",
    flexDirection: "row",
  },

  subTextAlign: {
    paddingTop: "3%",
    fontSize: 18,
    paddingLeft: "12%",
    flexDirection: "row",
  },

  bottomTextStart: {
    position: "absolute",
    alignSelf: "center",
    //textAlign: 'center',
    //paddingBottom: "3%",
    //fontSize: 30,
    //paddingTop: "90%",
    //marginTop: "100%",
    //height: "90%",
    alignItems: "center",
    //alignContent: 'flex-end',
    //justifyContent: 'center',
    //marginLeft:"25%",
    bottom: "4%",
  },

  bottomTextResume: {
    textAlign: "center",
    fontSize: 30,
    color: "red",
  },
  largeButton: {
    //flex: 1,
    position: "absolute",
    alignItems: "center",
    marginLeft: "85%",
    paddingTop: "4%",
  },
  smallButton: {
    //flex: 1,
    position: "absolute",
    alignItems: "center",
    marginLeft: "90%",
    paddingTop: "2%",
  },
});

export default SettingsPage;

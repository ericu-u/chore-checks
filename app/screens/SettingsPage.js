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
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
} from "@expo-google-fonts/montserrat";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import Drawer from "./Drawer";
import HouseholdPage from "./HouseholdPage";

/* Function to navigate to household page */

const Stack = createNativeStackNavigator();

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
      /* container for any navigation needed */
      (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="HouseholdPage">
            <Stack.Screen name="Household" component={HouseholdPage} />
          </Stack.Navigator>
        </NavigationContainer>
      ),
      (
        ////* the UI of the whole settings *////
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





        {/* TODO: FIX FONT TO THIS!!! <Text style={{ fontSize: 16, fontFamily: "Montserrat_500Medium" }}>Approaching deadline</Text>
 */}



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





{/*TODO: FIX FONT!!! <Text style={{ fontSize: 16, fontFamily: "Montserrat_500Medium" }}>Deadline passed</Text>
 */}




 
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




{/*TODO: FIX FONT!!! <Text style={{ fontSize: 16, fontFamily: "Montserrat_500Medium" }}>Deadline passed</Text>
 */}






 
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




{/*TODO: FIX FONT!!! <Text style={{ fontSize: 16, fontFamily: "Montserrat_500Medium" }}>Deadline passed</Text>
 */}




 
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





{/*TODO: FIX FONT!!! <Text style={{ fontSize: 24, fontFamily: "Montserrat_500Medium" }}>Deadline passed</Text>
 */}







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

          <View style={styles.bottomTextStart}>
            {/*Change Household button link*/}
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("HouseholdSelectionPage")
                }
              >
                <Text
                  style={{
                    fontSize: 20,
                    paddingBottom: "3%",
                  }}
                >
                  Change Household
                </Text>
              </TouchableOpacity>
            </View>
            {/*Sign out button*/}
            <Button
              color="red"
              onPress={() => Alert.alert("Button with adjusted color pressed")}
              title="Sign Out"
            ></Button>
          </View>
        </ImageBackground>
      )
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
    alignItems: "center",
    bottom: "4%",
  },

  bottomTextResume: {
    textAlign: "center",
    fontSize: 30,
    color: "red",
  },
  largeButton: {
    position: "absolute",
    alignItems: "center",
    marginLeft: "85%",
    paddingTop: "4%",
  },
  smallButton: {
    position: "absolute",
    alignItems: "center",
    marginLeft: "90%",
    paddingTop: "2%",
  },
});

export default SettingsPage;
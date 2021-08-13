import React, { Component } from "react";
import { Image, StyleSheet, Button, View, Text } from "react-native";
import { Header } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";

import ProfilePage from "./ProfilePage";
import TasksPage from "./TasksPage";
import { TasksPage2 } from "./TasksPage2"
import ChatboxPage from "./ChatboxPage";
import HouseholdPage from "./HouseholdPage";
import SettingsPage from "./SettingsPage";
import CustomDrawer from "./CustomDrawer";
import HouseholdSelectionPage from "./HouseholdSelectionPage";
const Drawer = createDrawerNavigator();

// drawer navigator screens
function MyDrawer() {
  return (
    <Drawer.Navigator
      independent={true}
      drawerStyle={{ backgroundColor: "#e5e5e5" }}
      drawerContent={(props) => <CustomDrawer {...props} />}
      drawerContentOptions={{
        inactiveTintColor: "black",
        itemStyle: { marginVertical: 15 },
        labelStyle: { fontSize: 20, fontFamily: "Montserrat_400Regular" },
      }}
    >
      <Drawer.Screen
        independent={true}
        name="Profile"
        component={ProfileNavigator}
        options={{
          drawerIcon: () => (
            <Image
              source={require("../assets/question-mark.png")}
              style={styles.icon}
            />
          ),
        }}
      />
      <Drawer.Screen
        independent={true}
        name="Tasks"
        component={TasksNavigator}
        options={{
          drawerIcon: () => (
            <Image
              source={require("../assets/tasks.png")}
              style={styles.icon}
            />
          ),
        }}
      />
      <Drawer.Screen
        independent={true}
        name="Chatbox"
        component={ChatboxNavigator}
        options={{
          drawerIcon: () => (
            <Image
              source={require("../assets/chat.png")}
              style={styles.chatIcon}
            />
          ),
        }}
      />
      <Drawer.Screen
        independent={true}
        name="Household"
        component={HouseholdNavigator}
        options={{
          drawerIcon: () => (
            <Image
              source={require("../assets/house.png")}
              style={styles.icon}
            />
          ),
        }}
      />
      <Drawer.Screen
        independent={true}
        name="Settings"
        component={SettingsNavigator}
        options={{
          drawerIcon: () => (
            <Image
              source={require("../assets/settings.png")}
              style={styles.icon}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 40,
    height: 40,
    marginLeft: "6%",
  },
  chatIcon: { width: 40, height: 37, marginLeft: "6%" },
  menuIcon: {
    marginLeft: 20,
  },
});

export default function MenuPage() {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer independent={true}>
        <MyDrawer independent={true}/>
      </NavigationContainer>
    );
  }
}

// stack navigator screens
const ProfileStack = createStackNavigator();

function ProfileNavigator() {
  return (
    <ProfileStack.Navigator independent={true}>
      <ProfileStack.Screen
        independent={true}
        name="Profile"
        component={ProfilePage}
        options={({ navigation }) => ({
          title: "Profile",
          headerTitleStyle: {
            fontFamily: "Montserrat_600SemiBold",
            fontSize: 20,
          },
          headerLeft: () => (
            <MaterialIcons
              style={styles.menuIcon}
              name="menu"
              size={30}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
          headerStyle: {
            backgroundColor: "#2B88D8",
            shadowColor: "#656565",
            shadowOpacity: 10,
            shadowRadius: 10,
            shadowOffset: {
              height: 5,
            },
          },
        })}
      />
    </ProfileStack.Navigator>
  );
}

const TasksStack = createStackNavigator();

function TasksNavigator() {
  return (
    <TasksStack.Navigator independent={true}>
      <TasksStack.Screen
        independent={true}
        name="Tasks"
        component={TasksPage2}
        options={({ navigation }) => ({
          title: "Tasks",
          headerTitleStyle: {
            fontFamily: "Montserrat_600SemiBold",
            fontSize: 20,
          },
          headerLeft: () => (
            <MaterialIcons
              style={styles.menuIcon}
              name="menu"
              size={30}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
          headerStyle: {
            backgroundColor: "#2B88D8",
            shadowColor: "#656565",
            shadowOpacity: 10,
            shadowRadius: 10,
            shadowOffset: {
              height: 5,
            },
          },
        })}
      />
    </TasksStack.Navigator>
  );
}

const ChatboxStack = createStackNavigator();

function ChatboxNavigator() {
  return (
    <ChatboxStack.Navigator independent={true}>
      <ChatboxStack.Screen
        independent={true}
        name="Chatbox"
        component={ChatboxPage}
        options={({ navigation }) => ({
          title: "Chatbox",
          headerTitleStyle: {
            fontFamily: "Montserrat_600SemiBold",
            fontSize: 20,
          },
          headerLeft: () => (
            <MaterialIcons
              style={styles.menuIcon}
              name="menu"
              size={30}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
          headerStyle: {
            backgroundColor: "#2B88D8",
            shadowColor: "#656565",
            shadowOpacity: 10,
            shadowRadius: 10,
            shadowOffset: {
              height: 5,
            },
          },
        })}
      />
    </ChatboxStack.Navigator>
  );
}

const HouseholdStack = createStackNavigator();

function HouseholdNavigator() {
  return (
    <HouseholdStack.Navigator independent={true}>
      <HouseholdStack.Screen
        independent={true}
        name="Household"
        component={HouseholdPage}
        options={({ navigation }) => ({
          title: "Household",
          headerTitleStyle: {
            fontFamily: "Montserrat_600SemiBold",
            fontSize: 20,
          },
          headerLeft: () => (
            <MaterialIcons
              style={styles.menuIcon}
              name="menu"
              size={30}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
          headerStyle: {
            backgroundColor: "#2B88D8",
            shadowColor: "#656565",
            shadowOpacity: 10,
            shadowRadius: 10,
            shadowOffset: {
              height: 5,
            },
          },
        })}
      />
    </HouseholdStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();

function SettingsNavigator() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Settings"
        component={SettingsPage}
        options={({ navigation }) => ({
          title: "Settings",
          headerTitleStyle: {
            fontFamily: "Montserrat_600SemiBold",
            fontSize: 20,
          },
          headerLeft: () => (
            <MaterialIcons
              style={styles.menuIcon}
              name="menu"
              size={30}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
          headerStyle: {
            backgroundColor: "#2B88D8",
            shadowColor: "#656565",
            shadowOpacity: 10,
            shadowRadius: 10,
            shadowOffset: {
              height: 5,
            },
          },
        })}
      />
      <SettingsStack.Screen
        name="HouseholdSelectionPage"
        component={HouseholdSelectionPage}
      ></SettingsStack.Screen>
    </SettingsStack.Navigator>
  );
}
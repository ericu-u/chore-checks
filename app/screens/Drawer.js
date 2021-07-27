import React, { Component } from "react";
import { Header } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";

// import ProfilePage from "./ProfilePage";
import TasksPage from "./TasksPage";
// import ChatboxPage from "./ChatboxPage";
import HouseholdPage from "./HouseholdPage";
// import SettingsPage from "./SettingsPage";

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      {/* <Drawer.Screen name="Profile" component={ProfilePage} /> */}
      <Drawer.Screen name="Tasks" component={TasksPage} />
      {/* <Drawer.Screen name="Chatbox" component={ChatboxPage} /> */}
      <Drawer.Screen name="Household" component={HouseholdPage} />
      {/* <Drawer.Screen name="Settings" component={SettingsPage} /> */}
    </Drawer.Navigator>
  );
}

export default function MenuPage() {
    return (
      <NavigationContainer>
        <MyDrawer />
      </NavigationContainer>
    );
  }
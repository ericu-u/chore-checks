import React, { Component } from "react";
import { Image, StyleSheet, Button } from "react-native";
import { Header } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";

// import ProfilePage from "./ProfilePage";
import TasksPage from "./TasksPage";
// import ChatboxPage from "./ChatboxPage";
import HouseholdPage from "./HouseholdPage";
// import SettingsPage from "./SettingsPage";

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      {/* <Drawer.Screen
        name="Profile"
        component={ProfilePage}
        // options={{
        //   drawerIcon: () => (
        //   <Image source={require("../assets/question-mark.png")} style={styles.icon} />
        //   )
        // }}
      /> */}
      <Drawer.Screen
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
      {/* <Drawer.Screen
        name="Chatbox"
        component={ChatboxNavigator}
        // options={{
        //   drawerIcon: () => (
        //   <Image source={require("../assets/chat.png")} style={styles.icon} />
        //   )
        // }}
      /> */}
      <Drawer.Screen
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
      {/* <Drawer.Screen
        name="Settings"
        component={SettingsNavigator}
        // options={{
        //   drawerIcon: () => (
        //   <Image source={require("../assets/settings.png")} style={styles.icon} />
        //   )
        // }}
      /> */}
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 40,
    height: 40,
  },
});

export default function MenuPage() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}

// stack navigators
const ProfileStack = createStackNavigator();

// function ProfileNavigator() {
//   return (
//     <ProfileStack.Navigator>
//       <ProfileStack.Screen
//         name="Profile"
//         component={ProfilePage}
//         options={({ navigation }) => ({
//           title: "Profile",
//           headerLeft: () => (
//             <MaterialIcons
//               name="menu"
//               size={28}
//               onPress={() => navigation.toggleDrawer()}
//             />
//           ),
//         })}
//       />
//     </ProfileStack.Navigator>
//   );
// }

const TasksStack = createStackNavigator();

function TasksNavigator() {
  return (
    <TasksStack.Navigator>
      <TasksStack.Screen
        name="Tasks"
        component={TasksPage}
        options={({ navigation }) => ({
          title: "Tasks",
          headerLeft: () => (
            <MaterialIcons
              name="menu"
              size={28}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </TasksStack.Navigator>
  );
}

// const ChatboxStack = createStackNavigator();

// function ChatboxNavigator() {
//   return (
//     <ChatboxStack.Navigator>
//       <ChatboxStack.Screen
//         name="Chatbox"
//         component={ChatboxPage}
//         options={({ navigation }) => ({
//           title: "Chatbox",
//           headerLeft: () => (
//             <MaterialIcons
//               name="menu"
//               size={28}
//               onPress={() => navigation.toggleDrawer()}
//             />
//           ),
//         })}
//       />
//     </ChatboxStack.Navigator>
//   );
// }

const HouseholdStack = createStackNavigator();

function HouseholdNavigator() {
  return (
    <HouseholdStack.Navigator>
      <HouseholdStack.Screen
        name="Household"
        component={HouseholdPage}
        options={({ navigation }) => ({
          title: "Household",
          headerLeft: () => (
            <MaterialIcons
              name="menu"
              size={28}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </HouseholdStack.Navigator>
  );
}

// const SettingsStack = createStackNavigator();

// function SettingsNavigator() {
//   return (
//     <SettingsStack.Navigator>
//       <SettingsStack.Screen
//         name="Settings"
//         component={SettingsPage}
//         options={({ navigation }) => ({
//           title: "Tasks",
//           headerLeft: () => (
//             <MaterialIcons
//               name="menu"
//               size={28}
//               onPress={() => navigation.toggleDrawer()}
//             />
//           ),
//         })}
//       />
//     </SettingsStack.Navigator>
//   );
// }

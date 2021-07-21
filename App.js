import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import LoginPage from './app/screens/LoginPage';
import TasksPage from './app/screens/TasksPage';
import HouseholdPage from './app/screens/HouseholdPage';


export default function App() {
  
  // To display your page on the app, comment out the current element and add the page you are working on/want to see
  return (
   //<TasksPage></TasksPage>
   //<LoginPage></LoginPage>
   <HouseholdPage></HouseholdPage>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a6ddf1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
  titleText: {
    fontSize: 40,
    color: 'white'
  },
  text: {
    fontSize: 20
  }
});

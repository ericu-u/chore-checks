import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import LoginPage from './app/screens/LoginPage';
import TasksPage from './app/screens/TasksPage';


// Add navigation header section (diff color than page)

export default function App() {
  

  return (
   <TasksPage></TasksPage>
   //<LoginPage></LoginPage>
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

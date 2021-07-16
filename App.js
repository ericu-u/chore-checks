import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';


// Add navigation header section (diff color than page)

export default function App() {
  const handleTap = () => console.log('i suck pp');

  return (
    <SafeAreaView style={styles.container}>

      <View style={{ flex: 0.25 }}></View>
      <View style={{ flex: 1.25 }}>

        <Image source={require("./app/assets/oatmeal_logo.jpg")} style={styles.image}/>

      </View>

      <View style={styles.container, { flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>

        <Text style={styles.titleText} onPress={handleTap}>Chore Checks</Text>

      </View>

      <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.text} onPress={handleTap}>Google Sign-in here</Text>
      </View>

      <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>

        <Text style={styles.text} onPress={handleTap}>Fun Fact: Quaker Oats was founded in 1877!</Text>

      </View>
      
      <StatusBar style="auto" />
    </SafeAreaView>
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

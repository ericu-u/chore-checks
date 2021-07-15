import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';

export default function App() {
  const handleTap = () => console.log('i suck pp');

  return (
    <SafeAreaView style={styles.container}>

      <View style={{ flex: 0.25, backgroundColor: "dodgerblue" }}></View>
      <View style={{ flex: 1.25, backgroundColor: "dodgerblue" }}>

        <Image source={require("./app/assets/oatmeal_logo.jpg")} style={styles.image}/>

      </View>

      <View style={styles.container, { flex: 0.5, backgroundColor: "gold", alignItems: 'center', justifyContent: 'center' }}>

        <Text style={styles.titleText} onPress={handleTap}>Chore Check</Text>

      </View>

      <View style={{ flex: 2, backgroundColor: "dodgerblue", alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.text} onPress={handleTap}>Google Sign-in here</Text>
      </View>

      <View style={{ flex: 0.5, backgroundColor: "gold", alignItems: 'center', justifyContent: 'center' }}>

        <Text style={styles.text} onPress={handleTap}>Fun Fact: Quaker Oats was founded in 1877!</Text>

      </View>
      
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
  titleText: {
    fontSize: 40
  },
  text: {
    fontSize: 20
  }
});

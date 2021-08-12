import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, StatusBar, ImageBackground } from 'react-native';
import { Header } from 'react-native-elements';
import { set } from 'react-native-reanimated';


function LoginPage(props) {

  const[oatmealfact, setFact]= useState("")

    useEffect;() => {
      var oatmealfacts_array = ["Oatmeal fact ", "Oatmeal fact2","Oatmeal fact3"]
      setFact = oatmealfacts_array[Math.floor(Math.random()*oatmealfactsarray.length)];
      
    }

    const handleTap = () => console.log('sign in to google');

    return (
        <SafeAreaView style={styles.container}>

            <View style={{ flex: 0.25 }}></View>
            <View style={{ flex: 1.25 }}>

                <Image source={require("../assets/oatmeal-logo.jpg")} style={styles.image}/>

            </View>

            <View style={styles.container, { flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.titleText}>Chore Checks</Text>
            </View>

            <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.text} onPress={handleTap}>Google Sign-in here</Text>
            </View>

            <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                <Text >{oatmealfact}</Text>
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

      width: 200,
      height: 200,
      borderRadius: 200/2,
    },
    titleText: {
      fontSize: 40,
      color: 'white',
      fontFamily: 'ZenLoop-Regular'
    },
    text: {
      fontSize: 20
    }
  });


export default LoginPage;


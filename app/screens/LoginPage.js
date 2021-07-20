import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import { Header } from 'react-native-elements';

function LoginPage(props) {

    const handleTap = () => console.log('sign in to google');

    return (
        <SafeAreaView style={styles.container}>

            <View style={{ flex: 0.25 }}></View>
            <View style={{ flex: 1.25 }}>

                <Image source={require("../assets/oatmeal_logo.jpg")} style={styles.image}/>

            </View>

            <View style={styles.container, { flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.titleText}>Chore Checks</Text>
            </View>

            <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.text} onPress={handleTap}>Google Sign-in here</Text>
            </View>

            <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.text}>Fun Fact: Quaker Oats was founded in 1877!</Text>
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

export default LoginPage;
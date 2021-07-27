import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView, View, Text, StyleSheet, Image, StatusBar, ImageBackground, Button, TouchableHighlight } from 'react-native';
import { Header, withTheme } from 'react-native-elements';

function SettingsPage(props) {
    return (
        <ImageBackground
            style={{flex:1}}
            source={require("../assets/background-gradient.jpg")}
        >
            <Header
                leftComponent={{ icon: 'menu', color: '#fff', iconStyle: { color: '#fff' } }}
                centerComponent={{ text: 'Settings', style: { color: '#fff' } }}
            />

        <View style={styles.settingsBox}>
            <Text style={styles.textAlign}>Task Notifications</Text>

            <Text style={styles.subTextAlign}>Approaching deadline</Text>

            <Text style={styles.subTextAlign}>Deadline passed</Text>

            <Text style={styles.subTextAlign}>Task incomplete</Text>

            <Text style={styles.subTextAlign}>Housemate completion</Text>

            <Text style={styles.textAlign}>Chat Notifications</Text>

            
            <Text style={styles.bottomTextStart}>Change Household</Text>
            <Text style={styles.bottomTextResume}>Sign Out</Text>
        </View>


        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#52a7d1',
    },
    statusHeader: {
        //height: "30%", //replace with relative positioning based on device
        justifyContent: 'center',
        marginTop: "6%",
        marginBottom: "6%",
    },
    statusHeaderText: {
        fontSize: 25,
        justifyContent: 'center',
        textAlign: 'center',
    },
    settingsBox: {
        //justifyContent: 'space-evenly',
        backgroundColor: 'white',
        marginLeft: "10%",
        marginRight: "10%",
        marginTop: "4%",
        borderRadius: 6,
        borderColor: 'black',
        borderWidth: 1,
        height: "84%",
        paddingTop:"2%",
    },

    textAlign: {
        paddingTop: "3%",
        fontSize:24,
        paddingLeft: "8%",
    },

    subTextAlign: {
        paddingTop: "3%",
        fontSize: 18,
        paddingLeft: "12%",
    },

    bottomTextStart: {
        textAlign: 'center',
        marginTop: "128%",
        paddingBottom: "3%",
        fontSize: 30,
    },

    bottomTextResume: {
        textAlign: 'center',
        fontSize:30,
         color: 'red',
    }
})

export default SettingsPage; 
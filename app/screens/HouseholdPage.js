import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView, View, Text, StyleSheet, Image, StatusBar, ImageBackground, Button, TouchableHighlight } from 'react-native';
import { Header, withTheme } from 'react-native-elements';
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
} from "@expo-google-fonts/montserrat";

function onPressButton() {
    alert('Change status'); // TODO: Alert and/or Button to be replaced
}

function HouseholdPage(props) {
    let [fontsLoaded] = useFonts({
        Montserrat_400Regular,
        Montserrat_500Medium,
      });

    if (!fontsLoaded) {
       return <AppLoading />;
    }
    else {
    return ( //replace all margins/paddings with relative positioning based on device

        
        <ImageBackground
            style={{flex:1}}
            source={require("../assets/background-gradient.jpg")}
        >

            <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <View style={ styles.statusHeader }>
                    <Text style={ styles.statusHeaderText }>Sort By Points</Text>
                </View>
            </View>
            
            <ScrollView>
            <View style={ styles.individualGroup }>
                <View style={ styles.individualPoints }>
                    <View style ={styles.avatarPosition}>
                        <Image source={require("../assets/standard-account90.png")} />
                    </View>
                    <View style={styles.topRight }>
                        <Image source={require("../assets/gold-trophy.png")} /> 
                    </View>
                    <Text style={{fontSize:18, flex:1, textAlign: 'center',paddingBottom: "3%",fontFamily: "Montserrat_500Medium",}}>Username</Text>
                    <Text style={{ textAlign: 'center',fontFamily: "Montserrat_400Regular",}}>Points: Placeholder</Text>
                    <Text style={{ textAlign: 'center',fontFamily: "Montserrat_400Regular",}}>Tasks Completed: Placeholder</Text>
                    <Text style={{ textAlign: 'center',fontFamily: "Montserrat_400Regular",}}>Completion Rate: Placeholder</Text>
                </View>
            </View>

            <View style={ styles.individualGroup }>
                <View style={ styles.individualPoints }>
                <View style ={styles.avatarPosition}>
                        <Image source={require("../assets/standard-account90.png")} />
                    </View>
                <View style={styles.topRight }>
                        <Image source={require("../assets/silver-trophy.png")} /> 
                    </View>
                    <Text style={{fontSize:18, flex:1, textAlign: 'center',paddingBottom: "3%",fontFamily: "Montserrat_500Medium",}}>Username</Text>
                    <Text style={{ textAlign: 'center',fontFamily: "Montserrat_400Regular",}}>Points: Placeholder</Text>
                    <Text style={{ textAlign: 'center',fontFamily: "Montserrat_400Regular",}}>Tasks Completed: Placeholder</Text>
                    <Text style={{ textAlign: 'center',fontFamily: "Montserrat_400Regular",}}>Completion Rate: Placeholder</Text>
                    
                </View>
            </View>

            <View style={ styles.individualGroup }>
                <View style={ styles.individualPoints }>
                <View style ={styles.avatarPosition}>
                        <Image source={require("../assets/standard-account90.png")} />
                    </View>
                <View style={styles.topRight }>
                        <Image source={require("../assets/bronze-trophy.png")} /> 
                    </View>
                    <Text style={{fontSize:18, flex:1, textAlign: 'center',paddingBottom: "3%",fontFamily: "Montserrat_500Medium",}}>Username</Text>
                    <Text style={{ textAlign: 'center',fontFamily: "Montserrat_400Regular",}}>Points: Placeholder</Text>
                    <Text style={{ textAlign: 'center',fontFamily: "Montserrat_400Regular",}}>Tasks Completed: Placeholder</Text>
                    <Text style={{ textAlign: 'center',fontFamily: "Montserrat_400Regular",}}>Completion Rate: Placeholder</Text>
                </View>
            </View>

            <View style={ styles.individualGroup }>
                <View style={ styles.individualPoints }>
                    <View style ={styles.avatarPosition}>
                        <Image source={require("../assets/standard-account90.png")} />
                    </View>
                    <Text style={{fontSize:18, flex:1, textAlign: 'center',paddingBottom: "3%",fontFamily: "Montserrat_500Medium",}}>Username</Text>
                    <Text style={{ textAlign: 'center',fontFamily: "Montserrat_400Regular",}}>Points: Placeholder</Text>
                    <Text style={{ textAlign: 'center',fontFamily: "Montserrat_400Regular",}}>Tasks Completed: Placeholder</Text>
                    <Text style={{ textAlign: 'center',fontFamily: "Montserrat_400Regular",}}>Completion Rate: Placeholder</Text>
                </View>
            </View>
            </ScrollView>
            

  
        </ImageBackground>
    );
}
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
        fontFamily: "Montserrat_500Medium",
    },
    individualGroup: {
        justifyContent: 'space-evenly',
        //alignItems: "center",
        // set a max height (maybe)
    },
    individualPoints: {
        //height: "100%", //replace with relative positioning based on device
        // set alternating background color
        justifyContent: 'flex-start',
        // set PROPER borders
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: 'white',
        paddingLeft: "35%",
        marginLeft: "7%",
        marginRight: "7%",
        paddingTop: "7%",
        paddingBottom: "7%",
        //justifyContent: 'space-evenly',  
        marginBottom: "4%",    
        borderRadius: 6,  
        overflow: 'hidden',
    },
    
    topRight: {
        position: 'absolute',
        paddingLeft:"112%",
        paddingTop: "3%",
        //height: "1%",
        //width: "1%",
        ///margin: 'auto',
    },

    avatarPosition: {
        position: 'absolute',
        //height: "30%",
        //width: "30%",
        //margin: 'auto',
        paddingLeft: '20%',
        paddingTop: '15%',
    }
})

export default HouseholdPage;
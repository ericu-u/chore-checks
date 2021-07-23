import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView, View, Text, StyleSheet, Image, StatusBar, ImageBackground } from 'react-native';
import { Header, withTheme } from 'react-native-elements';

function HouseholdPage(props) {
    return ( //replace all margins/paddings with relative positioning based on device

        <ImageBackground
            style={{flex:1}}
            source={require("../assets/background-gradient.jpg")}
        >

            <Header
                leftComponent={{ icon: 'menu', color: '#fff', iconStyle: { color: '#fff' } }}
                centerComponent={{ text: 'Household', style: { color: '#fff' } }}
            />


            <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <View style={ styles.statusHeader }>
                    <Text style={ styles.statusHeaderText }>Sort By Points</Text>
                </View>
            </View>
            <ScrollView>
            <View style={ styles.individualGroup }>
                <View style={ styles.individualPoints }>
                    <Text style={{fontSize:18, flex:1, textAlign: 'center',paddingBottom: "3%",}}>Username Placeholder</Text>
                    <Text style={{ textAlign: 'center'}}>Points: Placeholder</Text>
                    <Text style={{ textAlign: 'center',}}>Tasks Completed: Placeholder</Text>
                    <Text style={{ textAlign: 'center',}}>Completion Rate: Placeholder</Text>
                </View>
            </View>

            <View style={ styles.individualGroup }>
                <View style={ styles.individualPoints }>
                    <Text style={{fontSize:18, flex:1, textAlign: 'center',paddingBottom: "3%",}}>Username Placeholder</Text>
                    <Text style={{ textAlign: 'center'}}>Points: Placeholder</Text>
                    <Text style={{ textAlign: 'center',}}>Tasks Completed: Placeholder</Text>
                    <Text style={{ textAlign: 'center',}}>Completion Rate: Placeholder</Text>
                </View>
            </View>

            <View style={ styles.individualGroup }>
                <View style={ styles.individualPoints }>
                    <Text style={{fontSize:18, flex:1, textAlign: 'center',paddingBottom: "3%",}}>Username Placeholder</Text>
                    <Text style={{ textAlign: 'center'}}>Points: Placeholder</Text>
                    <Text style={{ textAlign: 'center',}}>Tasks Completed: Placeholder</Text>
                    <Text style={{ textAlign: 'center',}}>Completion Rate: Placeholder</Text>
                </View>
            </View>

            <View style={ styles.individualGroup }>
                <View style={ styles.individualPoints }>
                    <Text style={{fontSize:18, flex:1, textAlign: 'center',paddingBottom: "3%",}}>Username Placeholder</Text>
                    <Text style={{ textAlign: 'center'}}>Points: Placeholder</Text>
                    <Text style={{ textAlign: 'center',}}>Tasks Completed: Placeholder</Text>
                    <Text style={{ textAlign: 'center',}}>Completion Rate: Placeholder</Text>
                </View>
            </View>
            </ScrollView>
            

  
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
    }
})

export default HouseholdPage;
import React from 'react';
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


            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
                <View style={ styles.statusHeader }>
                    <Text style={ styles.statusHeaderText }>Sort By Points</Text>
                </View>
                <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
            </View>

            <View style={ styles.taskGroup }>
                <View style={ styles.individualPoints }>
                    <Text style={{flex:2, textAlign: 'center',}}>Username Placeholder</Text>
                    <Text style={{flex:1, textAlign: 'center'}}>Points: Placeholder</Text>
                    <Text style={{flex:1, textAlign: 'center',}}>Tasks Complete: Placeholder</Text>
                    <Text style={{flex:1, textAlign: 'center',}}>Completion Rate: Placeholder</Text>
                </View>
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
        height: 80, //replace with relative positioning based on device
        justifyContent: 'center',
    },
    statusHeaderText: {
        fontSize: 25,
        textAlign: 'center',
    },
    taskGroup: {
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        borderTopWidth: 0.5,
        // set a max height (maybe)
    },
    individualPoints: {
        height: 90, //replace with relative positioning based on device
        // set alternating background color
        justifyContent: 'flex-start',
        // set PROPER borders
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
        borderTopWidth: 0.5,
        backgroundColor: 'white',
    }
})

export default HouseholdPage;
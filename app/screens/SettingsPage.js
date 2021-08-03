import React, {useState} from 'react';
import { render } from 'react-dom';
import { ScrollView } from 'react-native';
import { SafeAreaView, View, Text, StyleSheet, Image, StatusBar, ImageBackground, Button, TouchableHighlight, Switch } from 'react-native';
import { Header, withTheme } from 'react-native-elements';


export class SettingsPage extends React.Component {
    state={
        TaskNotifcations:false,
        TnApproach:false,
        TnDeadlinePass:false,
        TnTaskIn:false,
        TnHousemateComplete:false,
        ChatNotifcations:false,
    }
    /*toggleSwitch = (value) => {
        this.setState({TaskNotifcations:value})
        this.setState({TnApproach:value})
        this.setState({TnDeadlinePass:value})
        this.setState({TnTaskIn:value})
        this.setState({TnHousemateComplete:value})
        this.setState({ChatNotifcations:value})

    }*/
    toggleTaskNotifcations = (value) => {
        this.setState({TaskNotifcations:value})
    }
    toggleTnApproach = (value) => {
        this.setState({TnApproach:value})
    }
    toggleTnDeadlinePass = (value) => {
        this.setState({TnDeadlinePass:value})
    }
    toggleTnTaskInc = (value) => {
        this.setState({TnTaskInc:value})
    }
    toggleTnHousemateComplete = (value) => {
        this.setState({TnHousemateComplete:value})
    }
    toggleChatNotifications = (value) => {
        this.setState({ChatNotifications:value})
    }
    render(){
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
                <View style={styles.largeButton}>
                <Switch onValueChange={this.toggleTaskNotifcations}
                    value={this.state.TaskNotifcations}/>
                </View>

            <Text style={styles.subTextAlign}>Approaching deadline</Text>
            <View style={styles.largeButton}>
                <Switch onValueChange={this.toggleTnApproach}
                    value={this.state.TnApproach}/>
                </View>

            <Text style={styles.subTextAlign}>Deadline passed</Text>
            <View style={styles.largeButton}>
                <Switch onValueChange={this.toggleTnDeadlinePass}
                    value={this.state.TnDeadlinePass}/>
                </View>

            <Text style={styles.subTextAlign}>Task incomplete</Text>
            <View style={styles.largeButton}>
                <Switch onValueChange={this.toggleTnTaskInc}
                    value={this.state.TnTaskInc}/>
                </View>

            <Text style={styles.subTextAlign}>Housemate completion</Text>
            <View style={styles.largeButton}>
                <Switch onValueChange={this.toggleTnHousemateComplete}
                    value={this.state.TnHousemateComplete}/>
                </View>

            <Text style={styles.textAlign}>Chat Notifications</Text>
            <View style={styles.largeButton}>
                <Switch onValueChange={this.toggleChatNotifications}
                    value={this.state.ChatNotifications}/>
                </View>
            
            <Text style={styles.bottomTextStart}>Change Household</Text>
            <Text style={styles.bottomTextResume}>Sign Out</Text>
        </View>

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
    },
    largeButton: {
        //position: 'absolute',
        flex: 1,
        //backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: "70%",
        //marginBottom: "4%",
        //paddingBottom:"2%"
        
    }
})

export default SettingsPage;

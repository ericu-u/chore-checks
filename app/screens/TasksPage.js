import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ImageBackground, ScrollView, TouchableHighlight, Button } from 'react-native';
import { Header } from 'react-native-elements';

function TasksPage(props) {

    function onPressButton() {
        alert('Change status'); // TODO: Alert and/or Button to be replaced
    }
    
    const task = <View style={ styles.individualTask }>
                    <Text style={{flex:1, backgroundColor: 'pink', textAlign: 'center',}}>Points Placeholder</Text>
                    <Text style={{flex:2, backgroundColor: 'aqua', textAlign: 'center'}}>Name Placeholder</Text>
                    <View style={{flex:1, backgroundColor: 'gold'}}>
                        <Button title='Button' onPress={onPressButton}></Button> 
                    </View>
                </View>;

    return ( // TODO: replace all margins/paddings with relative positioning based on device

        <ImageBackground
            style={{flex:1}}
            source={require("../assets/background-gradient.jpg")}
        >
            <ScrollView>

                <Header
                    leftComponent={{ icon: 'menu', color: '#fff', iconStyle: { color: '#fff' } }}
                    centerComponent={{ text: 'Tasks', style: { color: '#fff' } }}
                />

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex: 1, height: 1, backgroundColor: 'black', marginRight: 20, marginLeft: 20}} />
                    <View style={ styles.statusHeader }>
                        <Text style={ styles.statusHeaderText }>Active</Text>
                    </View>
                    <View style={{flex: 1, height: 1, backgroundColor: 'black', marginRight: 20, marginLeft: 20}} />
                </View>

                <View style={ styles.taskGroup }>
                    {task}
                    {task}
                    {task}
                    {task}
                    {task}
                </View>


                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex: 1, height: 1, backgroundColor: 'black', marginRight: 20, marginLeft: 20}} />
                    <View style={ styles.statusHeader }>
                        <Text style={ styles.statusHeaderText }>Inactive</Text>
                    </View>
                    <View style={{flex: 1, height: 1, backgroundColor: 'black', marginRight: 20, marginLeft: 20}} />
                </View>

                <View style={ styles.taskGroup }>
                    {task}
                    {task}
                    {task}
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
        height: 80, // TODO: replace with relative positioning based on device
        justifyContent: 'center',
    },
    statusHeaderText: {
        fontSize: 25,
        textAlign: 'center',
        width: 100,
    },
    taskGroup: {
        justifyContent: 'flex-start',
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
        // TODO: set a max height (maybe)
    },
    individualTask: {
        height: 90, // TODO: replace with relative positioning based on device
        // TODO: set alternating background color/opacity
        justifyContent: 'flex-start',
        // TODO: set PROPER borders
        flexDirection: 'row',
        alignContent: 'space-around',
        alignItems: 'center',
    }
})

export default TasksPage;
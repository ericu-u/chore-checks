import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
// import LinearGradient from 'react-native-linear-gradient';

function TasksPage(props) {
    return ( //replace all margins/paddings with relative positioning based on device
        <View style={ styles.background }>
            <Header
                leftComponent={{ icon: 'menu', color: '#fff', iconStyle: { color: '#fff' } }}
                centerComponent={{ text: 'Tasks', style: { color: '#fff' } }}
            />

            <View style={ styles.statusHeader }>
                <Text style={ styles.statusHeaderText }>Active</Text>
            </View>

            <View style={ styles.individualTask }>
                <View style={ styles.individualTask }>
                    <Text style={{backgroundColor: '#52a7d1',}}>Points Placeholder</Text>
                    <Text>Name Placeholder</Text>
                    <Text>Status Placeholder</Text>
                </View>
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#52a7d1',
    },
    statusHeader: {
        height: 80, //replace with relative positioning based on device
        backgroundColor: '#52a7d1',
        justifyContent: 'center',
    },
    statusHeaderText: {
        fontSize: 25,
        textAlign: 'center',
    },
    individualTask: {
        height: 90, //replace with relative positioning based on device
        backgroundColor: '#b7daeb',
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        flexDirection: 'row',
        alignContent: 'space-around'
    }
})

export default TasksPage;
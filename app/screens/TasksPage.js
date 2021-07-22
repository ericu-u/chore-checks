import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Header } from 'react-native-elements';
// import LinearGradient from 'react-native-linear-gradient';

function TasksPage(props) {
    
    const task = <View style={ styles.individualTask }>
                    <Text style={{flex:1, backgroundColor: 'pink', textAlign: 'center',}}>Points Placeholder</Text>
                    <Text style={{flex:2, backgroundColor: 'aqua', textAlign: 'center',}}>Name Placeholder</Text>
                    <Text style={{flex:1, backgroundColor: 'gold', textAlign: 'center',}}>Button Placeholder</Text>
                </View>;

    return ( //replace all margins/paddings with relative positioning based on device

        <ImageBackground
            style={{flex:1}}
            source={require("../assets/background-gradient.jpg")}
        >

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
        width: 100,
    },
    taskGroup: {
        justifyContent: 'flex-start',
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
        // set a max height (maybe)
    },
    individualTask: {
        height: 90, //replace with relative positioning based on device
        // set alternating background color
        justifyContent: 'flex-start',
        // set PROPER borders
        flexDirection: 'row',
        alignContent: 'space-around',
        alignItems: 'center',
    }
})

export default TasksPage;
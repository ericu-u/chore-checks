import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
// import LinearGradient from 'react-native-linear-gradient';

function Tasks(props) {
    return (
        <View style={ styles.background }>
            <Header
                leftComponent={{ icon: 'menu', color: '#fff', iconStyle: { color: '#fff' } }}
                centerComponent={{ text: 'Tasks', style: { color: '#fff' } }}
            />

            <View style={ styles.statusHeader }>
                <Text style={{ textAlign: 'center', marginTop: 20 }}>Active</Text>
            </View>

            <View style={ styles.individualTask }>
                <View style={ styles.individualTask }></View>
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
        flex: 1,
        backgroundColor: '#52a7d1',
    },
    individualTask: {
        flex: 1,
        height: 100,
        backgroundColor: '#b7daeb',
        justifyContent: 'flex-start',
    }
})

export default Tasks;
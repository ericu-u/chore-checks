import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
// import LinearGradient from 'react-native-linear-gradient';

function Tasks(props) {
    return (
        <View style={styles.background}>
            <Header
                style={styles.background}
                leftComponent={{ icon: 'menu', color: '#fff', iconStyle: { color: '#fff' } }}
                centerComponent={{ text: 'Tasks', style: { color: '#fff' } }}
            />
        </View>
    );
}

//#52a7d1

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#52a7d1',
    },
})

export default Tasks;
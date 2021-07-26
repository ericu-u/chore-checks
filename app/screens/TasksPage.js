import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ImageBackground, ScrollView, TouchableHighlight, Button, FlatList, StatusBar, SectionList } from 'react-native';
import { Header } from 'react-native-elements';

function TasksPage(props) {

    //const taskGroupHeight;

    function onPressButton() {
        alert('Change status'); // TODO: Alert and/or Button to be replaced
    }

    function addTask(taskName, points, dueDate) {

    }

    var testData = [
        {
            title: 'Active',
            data: ['Do the Dishes', 'Walk the dog', 'Take out trash', 'Shower']
        },
        {
            title: 'Inactive',
            data: ['Cook dinner']
        },
    ];

    const Item = ({ title }) => (
        <View style={ styles.item }>
                    <Text style={{flex:1, backgroundColor: 'pink', textAlign: 'center',}}>Points Placeholder</Text>
                    <Text style={{flex:2, backgroundColor: 'aqua', textAlign: 'center'}}>{title}</Text>
                    <View style={{flex:1, backgroundColor: 'gold'}}>
                        <Button title='Button' onPress={onPressButton}></Button> 
                    </View>
                </View>
    );

    const renderItem = ({ item }) => (
        <Item title={item.taskName} />
    );
    
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

            <Header
                leftComponent={{ icon: 'menu', color: '#fff', iconStyle: { color: '#fff' } }}
                centerComponent={{ text: 'Tasks', style: { color: '#fff' } }}
            />

                    <SectionList
                        sections={testData}
                        keyExtractor={(item, index) => item + index}
                        renderItem={({ item }) => <Item title={item} />}
                        renderSectionHeader={({ section: { title } }) => (
                            <View style={styles.statusHeader}>
                                <View style={{flex: 1, height: 1, backgroundColor: 'black', marginRight: '5%', marginLeft: '10%'}} />
                                <View style={{justifyContent: 'center'}}>
                                    <Text style={ styles.statusHeaderText }>{title}</Text>
                                </View>
                                <View style={{flex: 1, height: 1, backgroundColor: 'black', marginRight: '10%', marginLeft: '5%'}} />
                            </View>
                        )}
                    />


                    

                

            

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    statusHeader: {
        height: 80, // TODO: replace with relative positioning based on device
        justifyContent: 'center',
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    statusHeaderText: {
        fontSize: 25,
        textAlign: 'center',
        width: '100%',
    },
    item: {
        flexDirection: 'row',
        //padding: 20,
        //marginVertical: 8,
        //marginHorizontal: 16,
        height: 60
    },
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
})

export default TasksPage;
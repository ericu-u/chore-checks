import React from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableHighlight,
  Modal,
  StatusBar,
  SectionList,
  Pressable,
  FlatList,
  TouchableOpacity,
  clickHandler,
} from "react-native";
import config from "../../config";
import * as firebase from "firebase";
import "firebase/firestore";
import Household from "../classes/household";
import Task from "../classes/task";
import { Header } from "react-native-elements";
import _, { map } from 'underscore';
import { FAB } from 'react-native-paper';

export class TasksPage2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [], // List of task objects
      unsubscribe: null, // Firebase subscription. Calling this method will mean we stop listening to firebase for updates whenever the database changes
      sectionedTasks: [],
      modalVisible: true, 
    };
  }

  componentDidMount() {
    // This method is called when the component is first rendered
    // Set up firebase stuff
    var firebaseConfig = {
      apiKey: config.FIREBASE_KEY,
      authDomain: "chores-97427.firebaseapp.com",
      projectId: "chores-97427",
      storageBucket: "chores-97427.appspot.com",
      messagingSenderId: "409040868260",
      appId: "1:409040868260:web:7b6d1f00e29554af802731",
      measurementId: "G-8D3XVC7R9T",
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app();
    }
    const db = firebase.firestore();

    // Firestore subscription. Listens to database for changes.
    var unsub = db
      .collection("/houses/h38219/Tasks")
      .withConverter(Task.taskConverter)
      .onSnapshot((querySnapshot) => {
        // Whenever there is a change in firestore, this method runs
        var tempTasks = []; // This temp array will store all the Tasks from firestore
        querySnapshot.forEach((doc) => {
          tempTasks.push(doc.data());
        });
        console.log("updated tasks");
        this.setState({ tasks: tempTasks }); // Makes the state.tasks equal tempTasks
        var activeTasks = _.where(this.state.tasks, {completed: null});
        var completedTasks = _.reject(this.state.tasks, function(task){ return task.completed != null; });
        var sections = [{
          title: 'Active',
          data: activeTasks
        }, {
          title: 'Inactive',
          data: completedTasks
        }];
        this.setState({ sectionedTasks: sections});
      });
    this.setState({ unsubscribe: unsub }); // We save our subscription so we can end it later
  }
  componentWillUnmount() {
    // This method runs whenever we stop rendering the component
    this.state.unsubscribe(); // We end the subscription here so we don't waste resources
  }

  state = {
    modalVisible: true, 
  }
  
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  render() {
    // Returns what we want the user to see

    return (
      // TODO: replace all margins/paddings with relative positioning based on device

      <ImageBackground
        style={{ flex: 1 }}
        source={require("../assets/background-gradient.jpg")}
      >
        <Header
          leftComponent={{
            icon: "menu",
            color: "#fff",
            iconStyle: { color: "#fff" },
          }}
          centerComponent={{ text: "Tasks", style: { color: "#fff" } }}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalHeader}>Task Name Here</Text>
              <FlatList
                data={[
                  {key: 'Task Property 1'},
                  {key: 'Task Property 2'},
                  {key: 'Task Property 3'},
                  {key: 'Task Property 4'},
                  {key: 'Task Property 5'},
                  {key: 'Task Property 6'},
                ]}
                renderItem={({item}) => <Text style={{ fontSize: 15, textAlign: 'left', margin: 5 }}>{item.key}</Text>}
              />
              <View style={{ position: 'absolute', bottom: 10 }}>
                <Button
                  style={styles.modalButton}
                  onPress={() => this.setModalVisible(!this.state.modalVisible)}
                  title="Close"
                />
              </View>
            </View>
          </View>
        </Modal>

        

        <SectionList
          sections={this.state.sectionedTasks }
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <Item task={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.statusHeader}>
              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: "black",
                  marginRight: "5%",
                  marginLeft: "10%",
                }}
              />
              <View style={{ justifyContent: "center" }}>
                <Text style={styles.statusHeaderText}>{title}</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: "black",
                  marginRight: "10%",
                  marginLeft: "5%",
                }}
              />
            </View>
          )}
        />

        <AddButton></AddButton>
      </ImageBackground>
    );
  }
}



const AddButton = () => (
  <FAB
    style={styles.fab}
    small
    icon="plus"
    color="white"
    onPress={() => console.log('Pressed')}
  />
);

const Item = ({ task }) => (
  <View style={styles.item}>

    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginLeft: 20}}>
      <Image
        source={require('../assets/hexagon.png')}
        style={{ height: 50, width: 50 }}
      />
      <Text style={{position: 'absolute'}}>{task.points}</Text>
    </View>

    <View style={{ flex: 4, marginLeft: 30, flexDirection: 'column' }}>
      <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => this.setModalVisible(!this.state.modalVisible)}
        >
          <Text style={{ fontSize: 18 }}>{task.name}</Text>
        </Pressable>
      
      <Text style={{ fontSize: 13, color: '#db1414' }}>
        Due Date: {new Date(task.deadline).getMonth()} / {new Date(task.deadline).getDate()} {/* TODO: Add if statement to display time if less than 24 hours */}
      </Text>
    </View>
    
    <View style={{ flex: 2, justifyContent: "center" }}>
      <TouchableHighlight
        style={styles.claimStatus}
        onPress={onPressButton}
        underlayColor='#96c7eb'>
        <Text style={styles.statusText}>Taken</Text>
      </TouchableHighlight>
    </View>
  </View>
);

function onPressButton() {
  alert("Status has been changed."); // TODO: Alert and/or Button to be replaced
}

const styles = StyleSheet.create({

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  claimStatus: {
    marginRight: 20,
    marginLeft: 10,
    //marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#2588cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  claimedStatus: {
    marginRight: 20,
    marginLeft: 10,
    //marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'gray',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 5,
    bottom: 5,
    backgroundColor: '#071b7a'
  },
  item: {
    flexDirection: "row",
    //padding: 20,
    //marginVertical: 8,
    //marginHorizontal: 16,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButton: {
    borderRadius: 20,
    padding: 10,
    margin: 30,
    elevation: 2,
    position: 'absolute',
  },
  modalHeader: {
    fontSize: 25,
    textAlign: "center",
    margin: 10,
  },
  modalView: {
    margin: 20,
    height: 400,
    width: 300,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  statusHeader: {
    height: 70, // TODO: replace with relative positioning based on device
    justifyContent: "center",
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#569dd1",
    opacity: 0.8,
  },
  statusHeaderText: {
    fontSize: 25,
    textAlign: "center",
    width: "100%",
  },
  statusText: {
    color: '#fff',
    textAlign: 'center',
  },
  takenStatus: {
    marginRight: 20,
    marginLeft: 10,
    //marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'red',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
});

// export default TasksPage2;

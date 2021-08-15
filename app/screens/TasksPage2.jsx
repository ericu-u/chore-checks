import React from "react";
import {
  Button,
  Dimensions,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableHighlight,
  Modal,
  SectionList,
  Pressable,
  FlatList,
  TextInput,
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
      modalVisible: false,
      inputModalVisible: false,
      selectedTask: null,
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
        var activeTasks = _.where(this.state.tasks, {completed: null}); // Gets tasks without completion

        // For loop that appends completed tasks
        var completedTasks = [];
        for (let task of this.state.tasks) {
          if (typeof task.completed == 'string') {
            completedTasks.push(task)
          }
        }

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

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  setInputModalVisible = (visible) => {
    this.setState({ inputModalVisible: visible });
  }

  setTask = (task) => {
    this.setState({ selectedTask: task });
  }

  render() {
    // Returns what we want the user to see
    return (
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

        <SectionList
          sections={ this.state.sectionedTasks }
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <Item task={item} setModalVisible={this.setModalVisible} modalVisible={this.state.modalVisible} setTask={this.setTask} />}
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

        <TaskModal
          stateStuff={this.state}
          modalVisible={this.state.modalVisible}
          setModalVisible={this.setModalVisible}
          selectedTask={this.state}
          inputModalVisible={this.state.inputModalVisible}
          setInputModalVisible={this.setInputModalVisible}
        />

        <AddButton
          inputModalVisible={this.state.inputModalVisible}
          setInputModalVisible={this.setInputModalVisible}
        />
      </ImageBackground>
    );
  }
}

const AddButton = (props) => (
  <FAB
    style={styles.fab}
    icon="plus"
    color="white"
    onPress={() => { props.setInputModalVisible(!props.inputModalVisible) }}
  />
);

const TaskModal = (props) => {

  if (props.inputModalVisible == true) {
    return (
      <InputModal
        inputModalVisible={props.inputModalVisible}
        setInputModalVisible={props.setInputModalVisible}
      />
    )
  }

  let error = new TypeError('temp error');

  try {

    var selectedTask = props.selectedTask.selectedTask;

    if (!selectedTask.inProgressBy) {
      var inProgressPerson = 'Not claimed yet!';
    }
    else {
      var inProgressPerson = selectedTask.inProgressBy;
    }

    listData = [
      {
        key: 'Deadline',
        property: new Date(selectedTask.deadline).toDateString()
      },
      {
        key: 'In progress by',
        property: inProgressPerson
      },
      {
        key: 'Points',
        property: selectedTask.points
      },
      {
        key: 'Start Date',
        property: new Date(selectedTask.startDate).toDateString()
      },
      {
        key: 'Description',
        property: selectedTask.description
      },
    ];

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          props.setModalVisible(!props.modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalHeader}>{selectedTask.name}</Text>
            <FlatList
              data={listData}
              renderItem={({item}) => <Text style={{ fontSize: 15, textAlign: 'left', margin: 5 }}>{item.key}: {item.property}</Text>}
            />
            <View style={{ position: 'absolute', bottom: 10 }}>
              <Button
                style={styles.modalButton}
                onPress={() => props.setModalVisible(!props.modalVisible)}
                title="Close"
              />
            </View>
          </View>
        </View>
      </Modal>
    )

  } catch (error) {
    return null;
  }
}

const InputModal = (props) => {

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.inputModalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        props.setInputModalVisible(!props.inputModalVisible);
      }}
    >

      <View style={styles.centeredView}>
        <View style={styles.modalView}>

          <TextInput 
            style={styles.inputHeader}
            underlineColorAndroid = "transparent"
            placeholder = "Task Name"
            placeholderTextColor = "#788fb3"
            autoCapitalize = "sentences"
            onChangeText = {() => null}
          />

          <View style={styles.inputRow}>
            <Text 
              style={{flex: 1}}
              numberOfLines={1}
              allowFontScaling={true}
              adjustsFontSizeToFit={true}
            >
              Deadline: 
            </Text>
            <TextInput
              style = {styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "Task Name"
              placeholderTextColor = "#788fb3"
              autoCapitalize = "sentences"
              onChangeText = {() => null}
            />
          </View>

          

          <View style={{ position: 'absolute', bottom: 10 }}>
            <Button
              style={styles.modalButton}
              onPress={() => props.setInputModalVisible(!props.inputModalVisible)}
              title="Close"
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const StatusButton = (task) => {

  if (task.props.inProgress == 'claimed') { //personID equal to user
    return <TouchableHighlight
    style={styles.claimedStatus}
    onPress={onPressButton}
    underlayColor='#96c7eb'>
    <Text style={styles.statusText}>Claimed!</Text>
  </TouchableHighlight>
  }
  else if (task.props.inProgress == 'taken') { //personID not equal to user
    return <TouchableHighlight
    style={styles.takenStatus}
    onPress={onPressButton}
    underlayColor='#c26969'>
    <Text style={styles.statusText}>Taken</Text>
  </TouchableHighlight>
  }
  else if (task.props.completed) {
    return <TouchableHighlight
    style={styles.doneStatus}
    onPress={onPressButton}
    underlayColor='#69c272'>
    <Text style={styles.statusText}>Done</Text>
  </TouchableHighlight>
  }
  else if (!task.props.inProgress) { //inProgress = null
    return <TouchableHighlight
    style={styles.claimStatus}
    onPress={onPressButton}
    underlayColor='#96c7eb'>
    <Text style={styles.statusText}>Claim</Text>
  </TouchableHighlight>
  }
  else {
    return <Text>temporary error</Text>
  }
}
  
const Item = ({ task, setModalVisible, modalVisible, setTask }) => {

  var deadline = new Date(task.deadline);
  var currTime = new Date();
  var timeLeft = task.deadline - currTime.valueOf()

  function msToTime(duration) {
    var seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return hours + ":" + minutes + ":" + seconds;
  }

  if (timeLeft < 0 ) {
    var timeDisplay = (
      <Text style={{ fontSize: 13, color: '#db1414' }}>
        Due Date: Overdue!
      </Text>
    )
  }
  else if ((task.deadline - currTime.valueOf()) < 86400000 ) {
    var timeDisplay = (
      <Text style={{ fontSize: 13, color: '#db1414' }}>
        Due in: {msToTime(task.deadline - currTime.valueOf())}
      </Text>
    )
  }
  else {
    var timeDisplay = (
      <Text style={{ fontSize: 13, color: '#db1414' }}>
        Due Date: {deadline.getMonth() + 1} / {deadline.getDate()}
      </Text>
    )
  }

return (
  <View style={styles.item}>

    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginLeft: 20}}>
      <Image
        source={require('../assets/stroke5.png')}
        style={{ height: 45, width: 53 } /* 44.44444 for hexagon_green_1.png */}
      />
      <Text style={{position: 'absolute', bottom: 3, /*color: 'white'*/}}>{task.points}</Text>
    </View>

    <View style={{ flex: 4, marginLeft: 30, flexDirection: 'column' }}>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => { setModalVisible(!modalVisible.modalVisible); setTask(task); }}
      >
        <Text style={{ fontSize: 18 }}>{task.name}</Text>
        {timeDisplay}
      </Pressable>
    </View>
    
    <View style={{ flex: 2, justifyContent: "center" }}>
      <StatusButton props={task} />
    </View>
  </View>
)
}

function onPressButton() {
  alert("Status has been changed."); // TODO: Alert and/or Button to be replaced
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// TODO: STYLE USING DIMENSIONS
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
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'gray',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  doneStatus: {
    marginRight: 20,
    marginLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'green',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 5,
    bottom: 5,
    backgroundColor: '#071b7a'
  },
  input: {
    flex: 3,
    margin: 15,
    height: 20,
    width: 200,
    borderColor: '#192e4f',
    borderWidth: 1
  },
  inputHeader: {
    margin: 15,
    height: 40,
    width: 200,
    borderColor: '#192e4f',
    borderWidth: 1
  },
  inputRow: {
    flexDirection: 'row',
    backgroundColor: 'red',
    width: 250//styles.modalView.width * ( 4/5 )
  },
  item: {
    flexDirection: "row",
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

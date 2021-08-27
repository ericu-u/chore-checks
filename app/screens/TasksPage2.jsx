import React from "react";
import {
  Button,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableHighlight,
  SectionList,
  ScrollView,
  Pressable,
  FlatList,
  TextInput,
} from "react-native";
import config from "../../config";
import * as firebase from "firebase";
import "firebase/firestore";
import Household from "../classes/household";
import Task from "../classes/task";
import _, { map } from "underscore";
import { FAB } from "react-native-paper";
import Modal from "react-native-modal";
import { MonthDateYearField } from "react-native-datefield";
import { SelectMultipleButton } from "react-native-selectmultiple-button";
import {
  useFonts,
  Montserrat_500Medium
} from "@expo-google-fonts/montserrat";

export class TasksPage2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [], // List of task objects
      unsubscribe: null, // Firebase subscription. Calling this method will mean we stop listening to firebase for updates whenever the database changes
      sectionedTasks: [],
      unsubscribe2: null,

      // modal visibilities
      modalVisible: false,
      inputModalVisible: false,
      editModalVisible: false,

      selectedTask: null,
      householdID: "empty",

      // new task properties
      newName: null,
      newPoints: null,
      newDeadline: null,
      newStartDate: null,
      newDescription: null,
      newRepeat: null,
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

    const uid = firebase.auth().currentUser.uid;
    var unsub2 = db.doc("users/" + uid).onSnapshot((doc) => {
      console.log("id set!:", doc.data().householdID);
      this.setState({ householdID: doc.data().householdID });
      console.log("state id is:", this.state.householdID);

      var unsub = db
        .collection("/houses/" + this.state.householdID + "/Tasks")
        .withConverter(Task.taskConverter)
        .onSnapshot((querySnapshot) => {
          // Whenever there is a change in firestore, this method runs
          var tempTasks = []; // This temp array will store all the Tasks from firestore
          querySnapshot.forEach((doc) => {
            tempTasks.push(doc.data());
          });
          console.log("updated tasks");
          this.setState({ tasks: tempTasks }); // Makes the state.tasks equal tempTasks
          var activeTasks = _.where(this.state.tasks, { completed: null }); // Gets tasks without completion

          // For loop that appends completed tasks
          var completedTasks = [];
          for (let task of this.state.tasks) {
            if (typeof task.completed == "string") {
              completedTasks.push(task);
            }
          }

          var sections = [
            {
              title: "Active",
              data: activeTasks,
            },
            {
              title: "Inactive",
              data: completedTasks,
            },
          ];
          this.setState({ sectionedTasks: sections });
        });
      this.setState({ unsubscribe: unsub }); // We save our subscription so we can end it later
    });

    this.setState({ unsubscribe2: unsub2 }); // We save our subscription so we can end it later

    // Firestore subscription. Listens to database for changes.
  }
  componentWillUnmount() {
    // This method runs whenever we stop rendering the component
    this.state.unsubscribe(); // We end the subscription here so we don't waste resources
    this.state.unsubscribe2();
  }

  updateTaskStatus(task, userID, householdID ) {
    var tRef = firebase.firestore().doc("/houses/" + householdID + "/Tasks/" + task.taskID);
    tRef.withConverter(Task.taskConverter).update({
      inProgress: userID
    }).then(() => {
      console.log('Task Status updated!');
      alert("You have claimed this task!");
    });
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  setInputModalVisible = (visible) => {
    this.setState({ inputModalVisible: visible });
  };

  setEditModalVisible = (visible) => {
    this.setState({ editModalVisible: visible });
  };

  setButtonStatus = (status) => {
    this.setState({ buttonStatus: status });
  };

  setTask = (task) => {
    this.setState({ selectedTask: task });
  };

  setNewName = (name) => {
    this.setState({ newName: name });
  };

  setNewPoints = (points) => {
    this.setState({ newPoints: points });
  };

  setNewDeadline = (deadline) => {
    this.setState({ newDeadline: deadline });
  };

  setNewRepeat = (valueTap, repeat) => {
    this.setState({ newRepeat: repeat });
  }

  setNewStartDate = (startDate) => {
    this.setState({ newStartDate: startDate });
  };

  setNewDescription = (description) => {
    this.setState({ newDescription: description });
  };

  render() {
    // Returns what we want the user to see
    return (
      <ImageBackground
        style={{ flex: 1 }}
        source={require("../assets/background-gradient.jpg")}
      >
        <SectionList
          sections={this.state.sectionedTasks}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <Item
              task={item}
              setModalVisible={this.setModalVisible}
              modalVisible={this.state.modalVisible}
              setTask={this.setTask}
              userID={firebase.auth().currentUser.uid}
              householdID={this.state.householdID}
              updateTaskStatus={this.updateTaskStatus}
            />
          )}
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
          ListFooterComponent={<View style={{height: windowHeight * 0.1,}}></View>}
        />

        <ModalRedirector
          modalVisible={this.state.modalVisible}
          setModalVisible={this.setModalVisible}
          selectedTask={this.state.selectedTask}

          inputModalVisible={this.state.inputModalVisible}
          setInputModalVisible={this.setInputModalVisible}
          setNewName={this.setNewName}
          setNewDeadline={this.setNewDeadline}
          setNewDescription={this.setNewDescription}
          setNewPoints={this.setNewPoints}
          setNewRepeat={this.setNewRepeat}
          setNewStartDate={this.setNewStartDate}
          newName={this.state.newName}
          newDeadline={this.state.newDeadline}
          newDescription={this.state.newDescription}
          newPoints={this.state.newPoints}
          newRepeat={this.state.newRepeat}

          editModalVisible={this.state.editModalVisible}
          setEditModalVisible={this.setEditModalVisible}
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
    onPress={() => {
      props.setInputModalVisible(!props.inputModalVisible);
    }}
  />
);

const ModalRedirector = (props) => {

  if (props.modalVisible && props.selectedTask) {
    return (
      <TaskModal
        modalVisible={props.modalVisible}
        setModalVisible={props.setModalVisible}
        setEditModalVisible={props.setEditModalVisible}
        selectedTask={props.selectedTask}
      />
    )
  }

  if (props.inputModalVisible) {
    return (
      <InputModal
        inputModalVisible={props.inputModalVisible}
        setInputModalVisible={props.setInputModalVisible}
        setNewName={props.setNewName}
        setNewDeadline={props.setNewDeadline}
        setNewDescription={props.setNewDescription}
        setNewPoints={props.setNewPoints}
        setNewRepeat={props.setNewRepeat}
        setNewStartDate={props.setNewStartDate}
        
        newDeadline={props.newDeadline}
        newDescription={props.newDescription}
        newName={props.newName}
        newPoints={props.newPoints}
        newRepeat={props.newRepeat}
      />
    );
  }

  if (props.editModalVisible) {
    return (
      <EditModal
        editModalVisible={props.editModalVisible}
        setEditModalVisible={props.setEditModalVisible}
        selectedTask={props.selectedTask}
        setModalVisible={props.setModalVisible}
      />
    )
  }

  return null;
}

const TaskModal = (props) => {

  var selectedTask = props.selectedTask;

  if (!selectedTask.inProgressBy) {
    var inProgressPerson = "Not claimed yet!";
  } else {
    var inProgressPerson = selectedTask.inProgressBy;
  }

    var listData = [
      {
        key: "Deadline",
        property: new Date(selectedTask.deadline).toDateString(),
      },
      {
        key: "In progress by",
        property: inProgressPerson,
      },
      {
        key: "Points",
        property: selectedTask.points,
      },
      {
        key: "Start Date",
        property: new Date(selectedTask.startDate).toDateString(),
      },
      {
        key: "Description",
        property: selectedTask.description,
      },
    ];

    return (
      <Modal
        isVisible={props.modalVisible}
        backdropOpacity={0.3}
        animationOut="slideOutDown"
        onBackdropPress={() => props.setModalVisible(false)}
        useNativeDriver={true}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalHeader}>{selectedTask.name}</Text>
            <FlatList
              data={listData}
              renderItem={({ item }) => (
                <Text style={{ fontSize: 16, textAlign: "left", margin: 5, fontFamily: 'Montserrat_500Medium', }}>
                  {item.key}: {item.property}
                </Text>
              )}
            />
            <View style={styles.modalButtons}>
              <Button
                style={styles.modalButton}
                color="red"
                onPress={() => props.setModalVisible(false)}
                title="Close"
              />
              <Button
                style={styles.modalButton}
                title="Edit Task"
                onPress={() => {
                  props.setEditModalVisible(true);
                  props.setModalVisible(false);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    )
};

const InputModal = (props) => {

  var inputData = [
    {
      key: "Deadline:",
      property: (
        <MonthDateYearField
          labelDate="Day"
          labelMonth="Month"
          labelYear="Year"
          containerStyle={[styles.input, {borderWidth: 0}]}
          styleInput={{
            height: windowHeight * 0.05,
            width: windowWidth * 0.171,
            borderRadius: 10,
            borderColor: '#192e4f',
            borderWidth: 1.5,
            fontFamily: 'Montserrat_500Medium',
          }}
          placeholderTextColor="#788fb3"
          onSubmit={(value) => {props.setNewDeadline(value.valueOf() + 86399999)}}
        />
        
      ),
    },
    {
      key: "Points:",
      property: (
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          keyboardType='number-pad'
          maxLength={2}
          placeholder="Points"
          placeholderTextColor="#788fb3"
          onEndEditing={(text) => {props.setNewPoints(text.nativeEvent.text)}}
        />
      ),
    },
    {
      key: "Repeated (optional):",
      property: (
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: 'center',
            marginTop: windowHeight * 0.017,
            marginLeft: windowWidth * 0.013,
            marginRight: windowWidth * 0.013,
            height: windowHeight * 0.08,
            width: windowWidth * 0.625,
            borderWidth: 1.5,
            borderColor: "#192e4f",
            borderRadius: 10,
            backgroundColor: "#FFFFFF",
          }}
        >
          <Text
            style={{color: '#788fb3', fontFamily: 'Montserrat_500Medium', }}
          >
            Repeated (optional):
          </Text>
          <ScrollView
            style={{
              flexDirection: 'row'
            }}
            horizontal={true}
          >
          {['Daily', 'Weekly', 'Bi-Weekly', 'Monthly'].map(selection => (
            <SelectMultipleButton
              key={selection}
              value={selection}
              displayValue={selection}
              textStyle={{fontFamily: 'Montserrat_500Medium'}}
              highLightStyle={{
                borderColor: "gray",
                backgroundColor: "transparent",
                textColor: "#192e4f",
                borderTintColor: "#192e4f",
                backgroundTintColor: "#192e4f",
                textTintColor: "white",
              }}
              buttonViewStyle={{
                borderRadius: 10,
                height: windowHeight * 0.0415
              }}
              selected={props.newRepeat == selection}
              singleTap={valueTap =>
                {props.setNewRepeat(valueTap, selection)}
              }
            />
          ))}
          </ScrollView>
        </View>
      ),
    },
    {
      key: "Description:",
      property: (
        <TextInput
          style={[styles.input, { height: windowHeight * 0.1, }]}
          underlineColorAndroid="transparent"
          multiline={true}
          blurOnSubmit={true}
          placeholder="Description"
          placeholderTextColor="#788fb3"
          autoCapitalize="sentences"
          onEndEditing={(text) => {props.setNewDescription(text.nativeEvent.text)}}
        />
      ),
    },
  ];

  if (!props.newName || !props.newDeadline || !props.newPoints) {
    var buttonElement = (
      <Button
        style={styles.modalButton}
        title="Create"
        disabled={true}
      />
    )
  }
  else {
    var buttonElement = (
      <Button
        style={styles.modalButton}
        title="Create"
        onPress={() => {
          var tID = Math.random().toString(36).substring(7);
          var newT = new Task(
            props.newName,
            props.newDeadline,
            props.newPoints,
            props.newRepeat,
            Date.now(),
            props.newDescription,
            "h38219",
            null,
            null,
            null,
            tID
          );
          console.log("new Task: ", newT)
          var db = firebase.firestore()
          var tRef = db.doc("/houses/" + props.householdID + "/Tasks/" + tID);
          tRef.withConverter(Task.taskConverter).set(newT);
          props.setInputModalVisible(!props.inputModalVisible);
          props.setNewRepeat(null)
        }}
      />
    )
  }

  return (
    <Modal
      isVisible={props.inputModalVisible}
      backdropOpacity={0.3}
      animationOut="bounceOut"
      onBackdropPress={() =>
        props.setInputModalVisible(!props.inputModalVisible)
      }
      useNativeDriver={true}
    >
      <KeyboardAvoidingView
        style={styles.centeredView}
        behavior='padding'
      >
        <Pressable
          onPress={Keyboard.dismiss}
        >
          <View style={styles.modalView}>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.inputHeader}
                underlineColorAndroid="transparent"
                placeholder="Task Name"
                placeholderTextColor="#788fb3"
                autoCapitalize="sentences"
                onEndEditing={(text) => {props.setNewName(text.nativeEvent.text)}}
              />
            </View>

            <FlatList
              data={inputData}
              renderItem={({ item }) => {
                return <View style={styles.inputRow}>{item.property}</View>;
              }}
            />

            <View style={styles.modalButtons}>
              <Button
                style={styles.modalButton}
                color="red"
                onPress={() => {
                  props.setInputModalVisible(!props.inputModalVisible);
                  props.setNewRepeat(null);
                }}
                title="Close"
              />
              {buttonElement}
            </View>
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const EditModal = (props) => {

  var selectedTask = props.selectedTask;

  if (!selectedTask.inProgressBy) {
    var inProgressPerson = "Not claimed yet!";
  } else {
    var inProgressPerson = selectedTask.inProgressBy;
  }

  var listData = [
    {
      key: "Deadline",
      property: (
        <MonthDateYearField
          labelDate="Day"
          labelMonth="Month"
          labelYear="Year"
          defaultValue={new Date(selectedTask.deadline)}
          containerStyle={[styles.input, {borderWidth: 0}]}
          styleInput={{
            height: windowHeight * 0.05,
            width: windowWidth * 0.12,
            borderRadius: 10,
            borderColor: '#192e4f',
            borderWidth: 1.5,
            fontFamily: 'Montserrat_500Medium',
          }}
          placeholderTextColor="#788fb3"
          //onSubmit={(value) => {props.setNewDeadline(value.valueOf())}}
        />
      ),
    },
    {
      key: "Points",
      property: (
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          keyboardType='number-pad'
          maxLength={2}
          placeholder="Points"
          placeholderTextColor="#788fb3"
          //onEndEditing={(text) => {props.setNewPoints(text.nativeEvent.text)}}
          value={String(selectedTask.points)}
        />
      )
    },
    {
      key: "Description",
      property: (
        <TextInput
          style={[styles.input, { height: windowHeight * 0.1, }]}
          underlineColorAndroid="transparent"
          multiline={true}
          blurOnSubmit={true}
          placeholder="Description"
          placeholderTextColor="#788fb3"
          autoCapitalize="sentences"
          value={selectedTask.description}
          //onEndEditing={(text) => {props.setNewDescription(text.nativeEvent.text)}}
        />
      )
    },
  ];

  return (
    <Modal
      isVisible={props.editModalVisible}
      backdropOpacity={0.3}
      animationOut="slideOutDown"
      onBackdropPress={() => props.setEditModalVisible(false)}
      useNativeDriver={true}
    >
      <View style={styles.centeredView}>
        <Pressable
          onPress={Keyboard.dismiss}
        >
          <View style={styles.modalView}>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.inputHeader}
                underlineColorAndroid="transparent"
                placeholder="Task Name"
                placeholderTextColor="#788fb3"
                autoCapitalize="sentences"
                value={selectedTask.name}
                //onEndEditing={(text) => {props.setNewName(text.nativeEvent.text)}}
              />
            </View>

            <FlatList
              data={listData}
              renderItem={({ item }) => {
                return (
                  <View style={styles.inputRow}>
                    <Text
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      style={{ flex: 0.5, fontSize: 16, textAlign: "left", marginTop: windowHeight * 0.017,
                      marginLeft: windowWidth * 0.013,
                      marginRight: windowWidth * 0.013, fontFamily: 'Montserrat_500Medium' }}
                    >
                      {item.key}:
                    </Text>
                    {item.property}
                  </View>
                );
              }}
            />

            <View style={styles.modalButtons}>
              <Button
                style={styles.modalButton}
                color="red"
                onPress={() => {props.setEditModalVisible(false); props.setModalVisible(true)}}
                title="Back"
              />
              <Button style={styles.modalButton} title="Confirm" />
            </View>
          </View>
        </Pressable>
      </View>
    </Modal>
  )
};

const StatusButton = (props) => {

  if (props.task.inProgress == props.userID) {
    //personID equal to user
    return (
      <TouchableHighlight
        style={styles.claimedStatus}
        onPress={
          () => { onPressButton; props.updateTaskStatus(props.task, props.userID, props.householdID) }
        }
        underlayColor="#96c7eb"
        disabled={true}
      >
        <Text style={styles.statusText}>Claimed!</Text>
      </TouchableHighlight>
    );
  } else if (props.task.inProgress && props.task.inProgress != props.userID) {
    //personID not equal to user
    return (
      <TouchableHighlight
        style={styles.takenStatus}
        onPress={onPressButton}
        underlayColor="#c26969"
        disabled={true}
      >
        <Text style={styles.statusText}>Taken</Text>
      </TouchableHighlight>
    );
  } else if (props.task.completed) {
    return (
      <TouchableHighlight
        style={styles.doneStatus}
        onPress={onPressButton}
        underlayColor="#69c272"
        disabled={true}
      >
        <Text style={styles.statusText}>Done</Text>
      </TouchableHighlight>
    );
  } else if (!props.task.inProgress) {
    //inProgress = null
    return (
      <TouchableHighlight
        style={styles.claimStatus}
        onPress={
          () => { onPressButton; props.updateTaskStatus(props.task, props.userID, props.householdID) }
        }
        underlayColor="#96c7eb"
      >
        <Text style={styles.statusText}>Claim</Text>
      </TouchableHighlight>
    );
  } else {
    return <Text>temporary error</Text>;
  }
};

const Item = ({ task, setModalVisible, modalVisible, setTask, userID, householdID, updateTaskStatus }) => {  
  var deadline = new Date(task.deadline);
  var currTime = new Date();
  var timeLeft = task.deadline - currTime.valueOf();

  function msToTime(duration) {
    var seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  }

  if (timeLeft < 0) {
    var timeDisplay = (
      <Text style={{ fontSize: 13, color: "#db1414", fontFamily: 'Montserrat_500Medium' }}>Due Date: Overdue!</Text>
    );
  } else if (task.deadline - currTime.valueOf() < 86400000) {
    var timeDisplay = (
      <Text style={{ fontSize: 13, color: "#db1414", fontFamily: 'Montserrat_500Medium' }}>
        Due in: {msToTime(task.deadline - currTime.valueOf())}
      </Text>
    );
  } else {
    var timeDisplay = (
      <Text style={{ fontSize: 13, color: "#db1414", fontFamily: 'Montserrat_500Medium' }}>
        Due Date: {deadline.getMonth() + 1} / {deadline.getDate()}
      </Text>
    );
  }

  return (
    <View style={styles.item}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 20,
        }}
      >
        <Image
          source={require("../assets/stroke5.png")}
          style={styles.oatmealPoints}
        />
        <Text style={{ position: "absolute", bottom: 3, fontFamily: 'Montserrat_500Medium' }}>
          {task.points}
        </Text>
      </View>

      <View style={styles.taskPreview}>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => {
            setModalVisible(!modalVisible.modalVisible);
            setTask(task);
          }}
        >
          <Text style={{ fontSize: 18, fontFamily: 'Montserrat_500Medium' }}>{task.name}</Text>
          {timeDisplay}
        </Pressable>
      </View>

      <View style={{ flex: 2, justifyContent: "center" }}>
        <StatusButton
          task={task}
          userID={userID}
          householdID={householdID}
          updateTaskStatus={updateTaskStatus}
        />
      </View>
    </View>
  );
};

function onPressButton() {
  alert("Status has been changed.");
}

const windowWidth = Dimensions.get("window").width; //390
const windowHeight = Dimensions.get("window").height; //844

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: windowHeight * 0.023696682464455,
  },
  claimStatus: {
    marginRight: windowWidth * 0.0512820512820513,
    marginLeft: windowWidth * 0.0256410256410256,
    paddingTop: windowHeight * 0.0118483412322275,
    paddingBottom: windowHeight * 0.0118483412322275,
    backgroundColor: "#2588cf",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
  },
  claimedStatus: {
    marginRight: windowWidth * 0.0512820512820513,
    marginLeft: windowWidth * 0.0256410256410256,
    paddingTop: windowHeight * 0.0118483412322275,
    paddingBottom: windowHeight * 0.0118483412322275,
    backgroundColor: "gray",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
  },
  doneStatus: {
    marginRight: windowWidth * 0.0512820512820513,
    marginLeft: windowWidth * 0.0256410256410256,
    paddingTop: windowHeight * 0.0118483412322275,
    paddingBottom: windowHeight * 0.0118483412322275,
    backgroundColor: "green",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
  },
  fab: {
    position: "absolute",
    margin: 20,
    right: windowWidth * 0.0128205128205128,
    bottom: windowHeight * 0.0059241706161137,
    backgroundColor: "#071b7a",
  },
  input: {
    flex: 1,
    marginTop: windowHeight * 0.02,
    marginLeft: windowWidth * 0.013,
    marginRight: windowWidth * 0.013,
    height: windowHeight * 0.05,
    width: windowWidth * 0.512,
    textAlign: "center",
    borderWidth: 1.5,
    borderColor: "#192e4f",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    fontFamily: 'Montserrat_500Medium'
  },
  inputHeader: {
    flex: 1,
    marginBottom: windowHeight * 0.012,
    marginLeft: windowWidth * 0.013,
    marginRight: windowWidth * 0.013,
    height: windowHeight * 0.05,
    width: windowWidth * 0.512,
    textAlign: "center",
    borderWidth: 1.5,
    borderColor: "#192e4f",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    fontFamily: 'Montserrat_500Medium'
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    width: windowWidth * 0.65,
  },
  item: {
    flexDirection: "row",
    height: windowHeight * 0.083,
    justifyContent: "center",
    alignItems: "center",
  },
  modalButton: {
    borderRadius: 20,
    padding: 10,
    margin: 30,
    elevation: 2,
    position: "absolute",
  },
  modalButtons: {
    position: "absolute",
    bottom: windowHeight * 0.0118483412322275,
    width: windowWidth * 0.65,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  modalHeader: {
    fontSize: 25,
    fontFamily: 'Montserrat_500Medium',
    textAlign: "center",
    marginBottom: windowHeight * 0.012,
  },
  modalView: {
    margin: 20,
    height: windowHeight * 0.6,
    width: windowWidth * 0.85,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  oatmealPoints: {
    height: windowHeight * 0.0533175355450237,
    width: windowWidth * 0.1358974358974359,
  },
  statusHeader: {
    height: windowHeight * 0.083,
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
    fontFamily: 'Montserrat_500Medium',
    textAlign: "center",
    width: "100%",
  },
  statusText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: 'Montserrat_500Medium',
  },
  takenStatus: {
    marginRight: windowWidth * 0.0512820512820513,
    marginLeft: windowWidth * 0.0256410256410256,
    paddingTop: windowHeight * 0.0118483412322275,
    paddingBottom: windowHeight * 0.0118483412322275,
    backgroundColor: "red",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
  },
  taskPreview: {
    flex: 4,
    marginLeft: windowWidth * 0.077,
    flexDirection: "column",
  },
});

// export default TasksPage2;
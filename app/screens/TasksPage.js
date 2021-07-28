import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableHighlight,
  Button,
  StatusBar,
  SectionList,
  
} from "react-native";
import { Header, Overlay, } from "react-native-elements";
import config from "../../config";
// import * as firebase from "firebase";
// import "firebase/firestore";
import Household from "../classes/household";
import Task from "../classes/task";
import Test from "./Test";

function TasksPage(props) {
  //const taskGroupHeight;

  const [tasks, setTasks] = useState();

  /*
  useEffect(() => {
    var tasksRef = db.collection("/houses/" + householdID + "/Tasks");
    tasksRef.withConverter(Task.taskConverter).onSnapshot((snapshot) => {
      var tempTask = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTasks(tempTask);
      console.log("pls", tasks);
    });
  }, []);


  useEffect(() => {
    db.collection("/houses/h38219/Tasks")
      .withConverter(Task.taskConverter)
      .onSnapshot((querySnapshot) => {
        var tempTasks = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          tempTasks.push(doc.data());
        });
        setTasks(tempTasks);
        console.log("tasks are:", tasks);
      });

    // Stop listening for updates when no longer required
  }, []);

  // Start of firebase stuff
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
  // TODO householdID of the user should be stored in the householdID variable. For now, I will just make it the only household we have
  const householdID = "h38219";

  async function tasksfromDb() {
    var houseRef = db.doc("/houses/" + householdID);

    var house = (
      await (await houseRef.withConverter(Household.houseConverter)).get()
    ).data();

    return await house.getTasks();
  }
*/
  // End of firebase stuff


  function onPressButton() {
    alert("Change status"); // TODO: Alert and/or Button to be replaced
  }

  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };


  // name, deadline, points, repeat, description, householdID
  var testTaskOne = new Task(
    "Do the Dishes", 
    Date.now() + 99999999, 
    10, 
    null, 
    "Wash and rinse dishes in the sink.", 
    12345);

  var testTaskTwo = new Task(
    "Walk the Dog",
    Date.now() + 99999999,
    10, 
    null, 
    "Take Freddy around the neighborhood.", 
    12345);

  var testData = [
    {
      title: "Active",
      data: [testTaskOne, testTaskTwo],
    },
    {
      title: "Inactive",
      data: [],
    },
  ];

  const Item = ({ task }) => (
    <View style={styles.item}>
      <Text style={{ flex: 1, textAlign: "center" }}>
        {task.points}
      </Text>
      <Text style={{ flex: 2, textAlign: "center" }} onPress={toggleOverlay}>
        {task.name} {"\n"} Due Date: {new Date(task.deadline).getMonth()} / {new Date(task.deadline).getDate()} {/* TODO: Add if statement to display time if less than 24 hours */}
      </Text>
      <View style={{ flex: 1, justifyContent: "center", backgroundColor: 'blue' }}>
        <TouchableHighlight onPress={onPressButton} underlayColor="aqua">
          <View style={{ alignItems: 'center' }}>
            <Text>Claim</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );

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

      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text>Hello testing</Text>
      </Overlay>

      <SectionList
        sections={testData}
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  statusHeader: {
    height: 80, // TODO: replace with relative positioning based on device
    justifyContent: "center",
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6495ED",
    opacity: 0.8,
  },
  statusHeaderText: {
    fontSize: 25,
    textAlign: "center",
    width: "100%",
  },
  item: {
    flexDirection: "row",
    //padding: 20,
    //marginVertical: 8,
    //marginHorizontal: 16,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});

export default TasksPage;

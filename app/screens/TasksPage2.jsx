import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableHighlight,
  Button,
  FlatList,
  StatusBar,
  SectionList,
} from "react-native";
import config from "../../config";
import * as firebase from "firebase";
import "firebase/firestore";
import Household from "../classes/household";
import Task from "../classes/task";
import { Header } from "react-native-elements";

export class TasksPage2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [], // List of task objects
      unsubscribe: null, // Firebase subscription. Calling this method will mean we stop listening to firebase for updates whenever the database changes
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
      });

    this.setState({ unsubscribe: unsub }); // We save our subscription so we can end it later
  }
  componentWillUnmount() {
    // This method runs whenever we stop rendering the component
    this.state.unsubscribe(); // We end the subscription here so we don't waste resources
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

        <SectionList
          sections={[{ title: "Task names", data: this.state.tasks }]}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <Item title={item} />}
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
}

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={{ flex: 1, backgroundColor: "pink", textAlign: "center" }}>
      {title.points}
    </Text>
    <Text style={{ flex: 2, backgroundColor: "aqua", textAlign: "center" }}>
      {title.name}
    </Text>

    <View style={{ flex: 1, backgroundColor: "gold" }}>
      <Button title="Button"></Button>
    </View>
  </View>
);

const styles = StyleSheet.create({
  statusHeader: {
    height: 80, // TODO: replace with relative positioning based on device
    justifyContent: "center",
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    flexDirection: "row",
    alignItems: "center",
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
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});

// export default TasksPage2;

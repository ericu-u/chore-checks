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

export class TaskPageClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      unsubscribe: null,
    };
  }

  componentDidMount() {
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
    var unsub = db
      .collection("/houses/hDmQmaXM0qoZP6TuaPK4u/Tasks")
      .withConverter(Task.taskConverter)
      .onSnapshot((querySnapshot) => {
        var tempTasks = [];
        querySnapshot.forEach((doc) => {
          //console.log(doc.data());
          tempTasks.push(doc.data());
        });
        // console.log(tempTasks);
        // setTasks(tasks);
        console.log("updated tasks");
        this.setState({ tasks: tempTasks });
      });

    this.setState({ unsubscribe: unsub });
  }
  componentWillUnmount() {
    this.state.unsubscribe();
  }

  render() {
    var testData = [
      {
        title: "Active",
        data: ["Do the Dishes", "Walk the dog", "Take out trash", "Shower"],
      },
      {
        title: "Inactive",
        data: ["Cook dinner"],
      },
    ];
    // console.log(this.state.tasks);
    return (
      <SafeAreaView style={{ flex: 1, paddingVertical: 100 }}>
        <SectionList
          sections={[{ title: "Task names", data: this.state.tasks }]}
          renderItem={({ item }) => (
            <SafeAreaView
              styles={{
                paddingVertical: 10,
                paddingHorizontal: 20,
              }}
            >
              <Text>{item.name}</Text>
            </SafeAreaView>
          )}
          renderSectionHeader={({ section }) => (
            <SafeAreaView
              styles={{
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}
            >
              <Text> {section.title} </Text>
            </SafeAreaView>
          )}
          keyExtractor={(item, index) => item + index}
        />
      </SafeAreaView>
    );
  }
}

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={{ flex: 1, backgroundColor: "pink", textAlign: "center" }}>
      Points Placeholder
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

// export default TaskPageClass;

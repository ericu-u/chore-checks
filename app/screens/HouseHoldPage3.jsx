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
  Image,
} from "react-native";
import config from "../../config";
import * as firebase from "firebase";
import "firebase/firestore";
import Household from "../classes/household";
import Task from "../classes/task";
import { Header } from "react-native-elements";
import Person from "../classes/person";

export class HousePage3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [], // List of Person objects
      unsubscribe: null, // Firebase subscription. Calling this method will mean we stop listening to firebase for updates whenever the database changes
      tasks: [], // 2D array. The i-th position of tasks contains all the tasks the person in the i-th person on people accomplished.
      unsubscribe2: null,
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
      .collection("/houses/h38219/People")
      .orderBy("points", "desc")
      .withConverter(Person.personConverter)
      .onSnapshot((querySnapshot) => {
        // Whenever there is a change in firestore, this method runs
        var tempPpl = []; // This temp array will store all the People from firestore
        var tempTasks = [];
        querySnapshot.forEach((doc) => {
          tempPpl.push(doc.data());
          tempTasks.push([]);
        });
        console.log("updated ppl");
        this.setState({ people: tempPpl }); // Makes the state.people equal tempPpl
        this.setState({ tasks: tempTasks });

        const setTasks = async () => {
          tempTasks = [];
          this.state.people.forEach(async (p) => {
            // var temtem = await p.getTasks();
            // console.log(p.personID, temtem);
            // tempTasks.push();
            // tempTasks.push(temtem);
            // this.setState({ tasks: tempTasks });
            // console.log("tasks", this.state.tasks);
            // console.log("people", this.state.people);
            tempTasks.push([]);
          });
          for (var i = 0; i < tempTasks.length; i++) {
            tempTasks[i] = await this.state.people[i].getTasks();
            this.setState({ tasks: tempTasks });
          }
        };
        setTasks();
      });

    var unsub2 = db
      .collection("/houses/h38219/Tasks")
      .withConverter(Task.taskConverter)
      .onSnapshot((querySnapshot) => {
        console.log("updated tasks");
        const setTasks = async () => {
          var tempTasks2 = [];
          this.state.people.forEach(async (p) => {
            // var temtem = await p.getTasks();
            // console.log(p.personID, temtem);
            // tempTasks.push();
            // tempTasks.push(temtem);
            // this.setState({ tasks: tempTasks });
            // console.log("tasks", this.state.tasks);
            // console.log("people", this.state.people);
            tempTasks2.push([]);
          });
          for (var i = 0; i < tempTasks2.length; i++) {
            var temptem = await this.state.people[i].getTasks();
            tempTasks2[i] = temptem;
            this.setState({ tasks: tempTasks2 });
          }
        };
        setTasks();
      });

    this.setState({ unsubscribe: unsub }); // We save our subscription so we can end it later
    this.setState({ unsubscribe2: unsub2 }); // We save our subscription so we can end it later
  }

  componentWillUnmount() {
    // This method runs whenever we stop rendering the component
    this.state.unsubscribe(); // We end the subscription here so we don't waste resources
    this.state.unsubscribe2();
  }
  render() {
    return (
      //replace all margins/paddings with relative positioning based on device

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
          centerComponent={{ text: "Household", style: { color: "#fff" } }}
        />

        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <View style={styles.statusHeader}>
            <Text style={styles.statusHeaderText}>Sort By Points</Text>
          </View>
        </View>

        <SectionList
          sections={[{ title: "Household", data: this.state.people }]}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item, index }) => (
            <Item title={item} index={index} tasksDone={this.state.tasks} />
          )}
          renderSectionHeader={({ section: { title } }) => <View></View>}
        />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#52a7d1",
  },
  statusHeader: {
    //height: "30%", //replace with relative positioning based on device
    justifyContent: "center",
    marginTop: "6%",
    marginBottom: "6%",
  },
  statusHeaderText: {
    fontSize: 25,
    justifyContent: "center",
    textAlign: "center",
  },
  individualGroup: {
    justifyContent: "space-evenly",
    //alignItems: "center",
    // set a max height (maybe)
  },
  individualPoints: {
    //height: "100%", //replace with relative positioning based on device
    // set alternating background color
    justifyContent: "flex-start",
    // set PROPER borders
    flexDirection: "column",
    alignContent: "center",
    alignItems: "flex-start",
    backgroundColor: "white",
    paddingLeft: "35%",
    marginLeft: "7%",
    marginRight: "7%",
    paddingTop: "7%",
    paddingBottom: "7%",
    //justifyContent: 'space-evenly',
    marginBottom: "4%",
    borderRadius: 6,
    overflow: "hidden",
  },

  topRight: {
    position: "absolute",
    paddingLeft: "112%",
    paddingTop: "3%",
    //height: "1%",
    //width: "1%",
    ///margin: 'auto',
  },

  avatarPosition: {
    position: "absolute",
    //height: "30%",
    //width: "30%",
    //margin: 'auto',
    paddingLeft: "20%",
    paddingTop: "15%",
  },
});

function Trophy(index) {
  if (index.index === 0) {
    return <Image source={require("../assets/gold-trophy.png")} />;
  } else if (index.index === 1) {
    return <Image source={require("../assets/silver-trophy.png")} />;
  } else if (index.index === 2) {
    return <Image source={require("../assets/bronze-trophy.png")} />;
  }
  return <View></View>;
}

function NumTasks(index) {
  try {
    return (
      <Text style={{ textAlign: "center" }}>
        Tasks Completed: {index.tasksDone[index.index].length}
      </Text>
    );
  } catch {
    return <Text style={{ textAlign: "center" }}>Tasks Completed: 0</Text>;
  }
}

const Item = ({ title, index, tasksDone }) => (
  <View style={styles.individualGroup}>
    <View style={styles.individualPoints}>
      <View style={styles.avatarPosition}>
        <Image source={require("../assets/standard-account90.png")} />
      </View>
      <View style={styles.topRight}>
        <Trophy index={index}></Trophy>
      </View>
      <Text
        style={{
          fontSize: 18,
          flex: 1,
          textAlign: "center",
          paddingBottom: "3%",
        }}
      >
        {title.name}
      </Text>
      <Text style={{ textAlign: "center" }}>Points: {title.points}</Text>
      <NumTasks index={index} tasksDone={tasksDone}></NumTasks>
      <Text style={{ textAlign: "center" }}>Completion Rate: Placeholder</Text>
    </View>
  </View>
);

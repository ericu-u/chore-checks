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
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
} from "@expo-google-fonts/montserrat";
import SelectDropdown from "react-native-select-dropdown";

const sortList = ["Points", "Completion Rate", "Tasks Completed"];

var householdIDD = "hDmQmaXM0qoZP6TuaPK4u";
export default class HouseholdPage extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      people: [], // List of Person objects
      unsubscribe: null, // Firebase subscription. Calling this method will mean we stop listening to firebase for updates whenever the database changes
      tasks: [], // 2D array. The i-th position of tasks contains all the tasks the person in the i-th person on people accomplished.
      unsubscribe2: null,
      orderBy: "points",
      hhid: "empty",
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
    const uid = firebase.auth().currentUser.uid;
    db.doc("users/" + uid).onSnapshot((doc) => {
      this.setState({ hhid: doc.data().householdID });
      console.log("household id in snapshot1:", this.state.hhid);
      var unsub = db
        .collection("/users")
        .where("householdID", "==", this.state.hhid)
        .orderBy(this.state.orderBy, "desc")
        .withConverter(Person.personConverter)
        .onSnapshot((querySnapshot) => {
          // Whenever there is a change in firestore, this method runs
          var tempPpl = []; // This temp array will store all the People from firestore
          var tempTasks = [];
          querySnapshot.forEach((doc) => {
            tempPpl.push(doc.data());
            tempTasks.push([]);
          });
          this.setState({ people: tempPpl }); // Makes the state.people equal tempPpl
          this.setState({ tasks: tempTasks });
        });

      this.setState({ unsubscribe: unsub }); // We save our subscription so we can end it later
    });
  }

  componentWillUnmount() {
    // This method runs whenever we stop rendering the component
    console.log("DISMOUNT!!!!!!!!!!!!!!!!!!");
    if (this.state.unsubscribe !== null) this.state.unsubscribe(); // We end the subscription here so we don't waste resources
  }
  render() {
    return (
      //replace all margins/paddings with relative positioning based on device

      <ImageBackground
        style={{ flex: 1 }}
        source={require("../assets/background-gradient.jpg")}
      >
        <View style={styles.statusHeader}>
          {/* THE CRUCIAL DROP DOWN MENU 
                FOR ACTUALLY SORTING      */}
          <SelectDropdown
            buttonStyle={styles.dropdown3BtnStyle}
            dropdownStyle={styles.dropdown3DropdownStyle}
            rowStyle={styles.dropdown3RowStyle}
            defaultButtonText={"Points"}
            data={sortList}
            onSelect={(selectedItem, index) => {
              if (selectedItem === "Points") {
                this.state.orderBy = "points";
              }
              if (selectedItem === "Completion Rate") {
                this.state.orderBy = "successRate";
              }
              if (selectedItem === "Tasks Completed") {
                this.state.orderBy = "tasksCompleted";
              }
              const db = firebase.firestore();
              var uR = db.collection("/users");
              var pain = [];
              uR.where("householdID", "==", this.state.hhid)
                .orderBy(this.state.orderBy, "desc")
                .withConverter(Person.personConverter)
                .get()
                .then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    // console.log(doc.id, " => ", doc.data());
                    pain.push(doc.data());
                  });
                  // this.setState({ tasks: pain });
                  this.setState({ people: pain });

                  // console.log(this.state.tasks);
                })
                .catch((error) => {
                  console.log("Error getting documents: ", error);
                });
              // console.log(this.state.orderBy, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
          />
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
    flexDirection: "row",
    //marginBottom: "6%",
  },
  statusHeaderText: {
    fontSize: 25,
    justifyContent: "center",
    //textAlign: "center",
    fontFamily: "Montserrat_500Medium",
    flexDirection: "row",
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
  dropdown3BtnStyle: {
    width: "50%",
    height: 30,
    backgroundColor: "#FFF",
    //paddingHorizontal: 0,
    borderWidth: 0.2,
    borderRadius: 4,
    borderColor: "black",
    marginBottom: "5%",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#dcf3fc",
  },
  dropdown3DropdownStyle: { backgroundColor: "slategray" },
  dropdown3RowStyle: {
    //backgroundColor: "slategray",
    borderBottomColor: "#444",
    height: 40,
  },
  dropdown3RowChildStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 18,
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
        <Image
          style={{ width: 90, height: 90, borderRadius: 90 / 2 }}
          source={{
            uri: title.profilePic,
          }}
        />
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
          fontFamily: "Montserrat_500Medium",
        }}
      >
        {title.name}
      </Text>
      <Text
        style={{ textAlign: "center", fontFamily: "Montserrat_400Regular" }}
      >
        Points: {title.points}
      </Text>
      <Text
        style={{ textAlign: "center", fontFamily: "Montserrat_400Regular" }}
      >
        Tasks Completed: {title.tasksCompleted}
      </Text>

      <Text
        style={{ textAlign: "center", fontFamily: "Montserrat_400Regular" }}
      >
        Completion Rate: {title.successRate}
      </Text>
    </View>
  </View>
);

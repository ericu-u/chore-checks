import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ImageBackground,
  TouchableHighlight,
} from "react-native";
import * as firebase from "firebase";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";
import Person from "../classes/person";

// const personIDD = firebase.auth().currentUser.uid;

// console.log(firebase.auth().currentUser);
function ProfilePage(props) {
  const [name, setName] = useState("Loading...");
  const [points, setPoints] = useState("Loading...");
  const [tasks, setTasks] = useState([{ key: "Loading..." }]);
  const [tasksdone, setTasksdone] = useState("Loading...");
  const [tasksfailed, setTasksfailed] = useState("Loading...");
  const [completion, setCompletion] = useState("Loading...");
  const [pfp, setPfp] = useState(
    "https://firebasestorage.googleapis.com/v0/b/chores-97427.appspot.com/o/standard-account90.png?alt=media&token=a8c59bff-000f-48cc-a690-c51e845bc6d6"
  );

  // const [ontime, setOntime] = useState("Loading...");
  // const [late, setLate] = useState("Loading...");

  useEffect(() => {
    const pls = firebase.auth().onAuthStateChanged(function (user) {
      (async () => {
        var pid = user.uid;
        const db = firebase.firestore();
        var pObj = (
          await db
            .doc("users/" + pid)
            .withConverter(Person.personConverter)
            .get()
        ).data();

        //console.log(pObj);
        var tObjs = await pObj.getTasks();
        // console.log("tasks", tObjs);
        var taskName = [];
        for (var i = 0; i < tObjs.length; i++) {
          taskName.push({ key: tObjs[i].name });
        }
        setName(pObj.name);
        setPoints(pObj.points + " points");
        setTasks(taskName);
        setTasksdone(pObj.tasksCompleted);
        setCompletion(pObj.successRate);
        setPfp(pObj.profilePic);
        setTasksfailed(pObj.tasksFailed);
      })();
    });

    return function cleanup() {
      pls();
    };
  }, []);

  //Replace profile picture with firebase profile
  //FlatList is default scrollable. Can be made unscrollable.
  //Most statistics are calculatable.
  let [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ImageBackground
        style={{ flex: 1 }}
        source={require("../assets/background-gradient.jpg")}
      >
        <SafeAreaView style={styles.container}>
          <View style={{ flex: 0.65 }}>
            <Image
              source={{
                uri: pfp,
              }}
              style={styles.image}
            />
            <Text style={styles.username}>{name}</Text>
          </View>

          <View style={styles.householdBackground}>
            <View style={styles.container}>
              <Text style={styles.householdName}>{points}</Text>
            </View>
          </View>
          <View
            style={{
              flex: 1.2,
              flexDirection: "row",
            }}
          >
            <View style={styles.nestedContainerBackground}>
              <View style={styles.container}>
                <Text style={styles.nestedContainerTitle}>Tasks</Text>
                <FlatList
                  data={tasks}
                  renderItem={({ item }) => (
                    <Text style={styles.list}>{item.key}</Text>
                  )}
                />
              </View>
            </View>
            <View style={styles.nestedContainerBackground}>
              <View style={styles.container}>
                <Text style={styles.nestedContainerTitle}>Statistics</Text>
                <FlatList
                  data={[
                    { key: "Tasks Done: " + tasksdone },
                    { key: "Late Tasks: " + tasksfailed },
                    { key: "Completion Rate: " + completion },
                  ]}
                  renderItem={({ item }) => (
                    <Text style={styles.list}>{item.key}</Text>
                  )}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

//All styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 0.8,
    resizeMode: "contain",
    width: 130,
    height: 130,
    borderRadius: 130 / 2,
    alignItems: "center",
    marginTop: "5%",
    marginLeft: "1.5%",
  },
  username: {
    fontSize: 28,
    fontWeight: "bold",
    bottom: "1%",
    left: "1.6%",
    textAlign: "center",
    fontFamily: "Montserrat_600SemiBold",
  },
  householdBackground: {
    flex: 0.15,
    backgroundColor: "white",
    borderRadius: 6,
    borderColor: "black",
    borderWidth: 1,
    marginLeft: "5%",
    marginRight: "2%",
    marginBottom: "4%",
    height: "83%",
  },
  householdName: {
    marginLeft: "10%",
    marginTop: "2%",
    marginRight: "10%",
    marginBottom: "2%",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Montserrat_600SemiBold",
  },
  nestedContainerBackground: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 6,
    borderColor: "black",
    borderWidth: 1,
    marginLeft: "5%",
    marginRight: "2%",
    height: "83%",
  },
  nestedContainerTitle: {
    marginLeft: "10%",
    marginTop: "5%",
    marginRight: "10%",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Montserrat_600SemiBold",
  },
  list: {
    marginLeft: "10%",
    marginTop: "7%",
    marginRight: "10%",
    fontSize: 17,
    textAlign: "left",
    fontFamily: "Montserrat_500Medium",
  },
});

export default ProfilePage;

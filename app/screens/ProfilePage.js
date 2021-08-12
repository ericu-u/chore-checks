import React from "react";
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

function ProfilePage(props) {
  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require("../assets/background-gradient.jpg")}
    >
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 0.65 }}>
          <Image
            source={require("../assets/standard-account90.png")}
            style={styles.image}
          />
          <Text style={styles.username}>Username</Text>
        </View>

        <View style={styles.householdBackground}>
          <View style={styles.container}>
            <Text style={styles.householdName}>Total Points</Text>
          </View>
        </View>
        <View
          style={{
            flex: 1.2,
            flexDirection: "row",
            alignItems: "space-evenly",
          }}
        >
          <View style={styles.nestedContainerBackground}>
            <View style={styles.container}>
              <Text style={styles.nestedContainerTitle}>Tasks</Text>
              <FlatList
                data={[
                  { key: "Walk the dog" },
                  { key: "Walk the other dog" },
                  { key: "Take a shower" },
                  { key: "Buy groceries" },
                  { key: "Invest this month's rent in Gamestop stonks" },
                  { key: "Lose it all" },
                ]}
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
                  { key: "Tasks Done: \n 60" },
                  { key: "Completion Rate: \n 91.7%" },
                  { key: "On Time Tasks: \n 50" },
                  { key: "Late Tasks: \n 5" },
                  { key: "Missed Tasks: \n 5" },
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
  },
  list: {
    marginLeft: "10%",
    marginTop: "7%",
    marginRight: "10%",
    fontSize: 17,
    textAlign: "left",
  },
});

export default ProfilePage;

import config from "../../config";
// import * as firebase from "firebase";
// import "firebase/firestore";
import Task from "./task";

export default class Person {
  /**
   *
   * @param {String} personID The id of the user
   * @param {String} name The name of the user
   * @param {String} profilePic A url of the profilePic of the user
   * @param {String} householdID The id of the household the person is in
   * @param {int} points The number of points the person has
   */
  constructor(personID, name, profilePic, householdID, points) {
    this.personID = personID;
    this.name = name;
    this.profilePic = profilePic;
    this.householdID = householdID;
    this.points = points;
  }

  /**
   * Static variable used to save and load Person object from firestore
   */
  static personConverter = {
    toFirestore: function (Person) {
      return {
        personID: Person.personID,
        name: Person.name,
        profilePic: Person.profilePic,
        householdID: Person.householdID,
        points: Person.points,
      };
    },

    fromFirestore: function (snapshot, options) {
      const data = snapshot.data(options);
      return new Person(
        data.personID,
        data.name,
        data.profilePic,
        data.householdID,
        data.points
      );
    },
  };

  /**
   * This method is used to get all the tasks the user has completed straight from firestore.
   * Note that this method needs to be awaited as it is async.
   * @returns A list of Task objects in the household.
   */
  async getTasks() {
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
    var colRef = db.collection("/houses/" + this.householdID + "/Tasks");

    const tasks = await colRef.get();

    //console.log(tasks);
    var allTasks = [];
    var allIDs = [];
    var snapshot = await colRef.get();
    snapshot.forEach((task) => {
      var dataRef = db.doc("/houses/" + this.householdID + "/Tasks/" + task.id);
      allIDs.push(task.id);
      console.log("first");
    });

    for (let i = 0; i < allIDs.length; i++) {
      var dataRef = db.doc(
        "/houses/" + this.householdID + "/Tasks/" + allIDs[i]
      );

      var putIn = await dataRef.withConverter(Task.taskConverter).get();
      var theData = putIn.data();
      if (theData["completedBy"] === this.personID) {
        allTasks.push(putIn.data());
      }
    }

    /*
      .then(async (querySnapshot) => {
        await querySnapshot.forEach(async (doc) => {
          console.log("first");
          var dataRef = await db.doc(
            "/houses/" + this.householdID + "/Tasks/" + doc.id
          );
          console.log("second");
          var help = (
            await dataRef.withConverter(Task.taskConverter).get()
          ).data();
          console.log("third");

          allTasks.push(help);
        });
      });
*/
    return allTasks;
  }
}

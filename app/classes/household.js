import config from "../../config";
import * as firebase from "firebase";
import "firebase/firestore";
import Task from "./task";
import Person from "./person";

export default class Household {
  /**
   *
   * @param {String} name Name of the house
   * @param {String} householdID ID of the house
   */
  constructor(name, householdID) {
    this.name = name;
    this.householdID = householdID;
  }

  /**
   * Static variable used to save and load Household object from firestore
   */
  static houseConverter = {
    toFirestore: function (Household) {
      return {
        name: Household.name,
        householdID: Household.householdID,
      };
    },

    fromFirestore: function (snapshot, options) {
      const data = snapshot.data(options);
      return new Household(data.name, data.householdID);
    },
  };

  /**
   * This method is used to get all the tasks in the household straight from firestore.
   * Note that this method needs to be awaited as it is async.
   * @returns A list of all the Task objects in the household
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
      allTasks.push(putIn.data());
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

  async getPeople() {
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
    var colRef = db.collection("/houses/" + this.householdID + "/People");

    const tasks = await colRef.get();

    //console.log(tasks);
    var allPpl = [];
    var allIDs = [];
    var snapshot = await colRef.get();
    snapshot.forEach((persons) => {
      allIDs.push(persons.id);
    });

    for (let i = 0; i < allIDs.length; i++) {
      var dataRef = db.doc(
        "/houses/" + this.householdID + "/People/" + allIDs[i]
      );

      var putIn = await dataRef.withConverter(Person.personConverter).get();
      allPpl.push(putIn.data());
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
    return allPpl;
  }
}

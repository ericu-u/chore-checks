import config from "../../config";
import * as firebase from "firebase";
import "firebase/firestore";
import Task from "./task";

export default class Person {
  /**
   * @param {String} personID The id of the user
   * @param {String} name The name of the user
   * @param {String} profilePic A url of the profilePic of the user
   * @param {String} householdID The id of the household the person is in
   * @param {int} points The number of points the person has
   * @param {int} tasksCompleted The number of tasks the person completed
   * @param {int} tasksFailed The number of tasks the person failed
   * @param {String} successRate Percentage of tasks they finished
   * @param {boolean} approachingDeadlineNotif If they have notifications enabled for approaching deadlines
   * @param {boolean} deadlinePassedNotif If they have notifications enabled for deadlines passed
   * @param {boolean} taskCompleteNotif if they have notifications enabled for tasks completed
   * @param {boolean} housemateCompleteNotif if they have notifications enabled for when a housemate completes a task
   * @param {boolean} chatNotif if they have notifications enabled for chat
   */
  constructor(
    personID,
    name,
    profilePic,
    householdID,
    points,
    tasksCompleted,
    tasksFailed,
    successRate,
    approachingDeadlineNotif,
    deadlinePassedNotif,
    taskCompleteNotif,
    housemateCompleteNotif,
    chatNotif
  ) {
    this.personID = personID;
    this.name = name;
    this.profilePic = profilePic;
    this.householdID = householdID;
    this.points = points;
    this.tasksCompleted = tasksCompleted;
    this.tasksFailed = tasksFailed;
    this.successRate = successRate;
    this.approachingDeadlineNotif = approachingDeadlineNotif;
    this.deadlinePassedNotif = deadlinePassedNotif;
    this.taskCompleteNotif = taskCompleteNotif;
    this.housemateCompleteNotif = housemateCompleteNotif;
    this.chatNotif = chatNotif;
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
        tasksCompleted: Person.tasksCompleted,
        tasksFailed: Person.tasksFailed,
        successRate: Person.successRate,
        approachingDeadlineNotif: Person.approachingDeadlineNotif,
        deadlinePassedNotif: Person.deadlinePassedNotif,
        taskCompleteNotif: Person.taskCompleteNotif,
        housemateCompleteNotif: Person.housemateCompleteNotif,
        chatNotif: Person.chatNotif,
      };
    },

    fromFirestore: function (snapshot, options) {
      const data = snapshot.data(options);
      return new Person(
        data.personID,
        data.name,
        data.profilePic,
        data.householdID,
        data.points,
        data.tasksCompleted,
        data.tasksFailed,
        data.successRate,
        data.approachingDeadlineNotif,
        data.deadlinePassedNotif,
        data.taskCompleteNotif,
        data.housemateCompleteNotif,
        data.chatNotif
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

    //console.log(tasks);
    var allTasks = [];
    var allIDs = [];
    var snapshot = await colRef.get();
    snapshot.forEach((task) => {
      allIDs.push(task.id);
    });

    for (let i = 0; i < allIDs.length; i++) {
      var dataRef = db.doc(
        "/houses/" + this.householdID + "/Tasks/" + allIDs[i]
      );

      var putIn = await dataRef.withConverter(Task.taskConverter).get();
      // console.log("putin", putIn.data());
      var theData = putIn.data();
      if (theData["completed"] === this.personID) {
        allTasks.push(putIn.data());
      }
    }
    return allTasks;
  }
}

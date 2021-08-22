var faker = require("faker");
var firebase = require("firebase");

// TODO SCROLL TO THE BOTTOM OF THE FILE DO NOT EDIT ANYTHING ELSE. Please run this program with node data_gen2.js

class Person {
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
}

class Task {
  /**
   * This constructor is intended to be used when loading an object from firebase but it can be used for when a user creates a new object as well.
   * @param {String} name Name of the task
   * @param {int} deadline When the task is due. Maybe use Date.now()? Date.now() returns the number of milliseconds since January 1, 1970, 00:00:00 UTC.
   * @param {int} points How many points is the task worth
   * @param {int} repeat How often should the task repeat? We could use milliseconds since Date.now() uses milliseconds. If it does not repeat, you could pass in null.
   * @param {int} startDate when the task was made
   * @param {String} description A brief description of the task
   * @param {String} householdID The id of the household this task belongs to
   * @param {String} completed Null if task is incomplete. personID of person who completed the task if the task is complete
   * @param {String} inProgress Null if task is not in progress. personID of person who completed the task if the task is in progress
   * @param {String} assigned Who was assigned the task
   * @param {String} taskID the id of the task
   */
  constructor(
    name,
    deadline,
    points,
    repeat,
    startDate,
    description,
    householdID,
    completed,
    inProgress,
    assigned,
    taskID
  ) {
    this.name = name;
    this.deadline = deadline;
    this.points = points;
    this.repeat = repeat;
    this.startDate = startDate;
    this.description = description;
    this.householdID = householdID;
    this.completed = completed;
    this.inProgress = inProgress;
    this.assigned = assigned;
    this.taskID = taskID;
  }

  /**
   * Static variable used to save and load Task object from firestore
   */
  static taskConverter = {
    toFirestore: function (Task) {
      return {
        name: Task.name,
        deadline: Task.deadline,
        points: Task.points,
        repeat: Task.repeat,
        startDate: Task.startDate,
        description: Task.description,
        householdID: Task.householdID,
        completed: Task.completed,
        inProgress: Task.inProgress,
        assigned: Task.assigned,
        taskID: taskID,
      };
    },

    fromFirestore: function (snapshot, options) {
      const data = snapshot.data(options);
      return new Task(
        data.name,
        data.deadline,
        data.points,
        data.repeat,
        data.startDate,
        data.description,
        data.householdID,
        data.completed,
        data.inProgress,
        data.assigned,
        data.taskID
      );
    },
  };
}

/**
 * Helper method to generate IDs. Source: https://stackoverflow.com/questions/1497481/javascript-password-generator
 * @param {String} char Character to be appended to the start of the ID. m for messages, p for people etc.
 * @returns a randomly generated ID
 */
function generateID(char) {
  var length = 20,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return char + retVal;
}

/**
 * Helper method that generates a random integer. Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 * @param {int} max The max number to be generated (exclusive)
 * @returns random integer
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

async function newPerson(householdID, num) {
  var firebaseConfig = {
    apiKey: "AIzaSyBXrzMPWBxF9GBbtxLL1rqGeSVmz7C1KKw",
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

  var ids = [];

  for (var i = 0; i < num; i++) {
    var id = generateID("p");

    var completed = getRandomInt(10);

    var failed = getRandomInt(10);

    var approachingDeadlineNotif = getRandomInt(2) === 0;
    var deadlinePassedNotif = getRandomInt(2) === 0;
    var taskCompleteNotif = getRandomInt(2) === 0;
    var housemateCompleteNotif = getRandomInt(2) === 0;
    var chatNotif = getRandomInt(2) === 0;

    var newPerson = new Person(
      id,
      faker.name.findName(),
      faker.image.avatar(),
      householdID,
      getRandomInt(1000),
      completed,
      failed,
      ((completed / (completed + failed)) * 100).toFixed(2) + "%",
      approachingDeadlineNotif,
      deadlinePassedNotif,
      taskCompleteNotif,
      housemateCompleteNotif,
      chatNotif
    );
    ids.push(id);
    await db.doc("/users/" + id).set(Object.assign({}, newPerson));
  }

  return ids;
}

/**
 * Adds num Tasks to the given household
 * @param {String} householdID Household you want to add tasks into
 * @param {number} num number of tasks you want to add
 * @param {Array} personIDs List of ppl in the household
 * @returns list containing ids of all the tasks you just added
 */
async function newTask(householdID, num, personIDs) {
  var firebaseConfig = {
    apiKey: "AIzaSyBXrzMPWBxF9GBbtxLL1rqGeSVmz7C1KKw",
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

  var ids = [];

  for (var i = 0; i < num; i++) {
    var completeProgress = getRandomInt(3);

    var completed, inProgress, assigned, repeat;

    if (getRandomInt(2) === 0) {
      repeat = getRandomInt(12096000);
    } else {
      repeat = null;
    }

    if (getRandomInt(2) === 0) {
      assigned = null;
    } else {
      assigned = personIDs[getRandomInt(personIDs.length)];
    }

    if (completeProgress === 0) {
      completed = assigned;
      inProgress = null;
    } else if (completeProgress === 1) {
      completed = null;
      inProgress = assigned;
    } else {
      completed = null;
      inProgress = null;
    }

    var id = generateID("t");

    ids.push(id);

    var startDate = Date.now() + getRandomInt(12096000);

    var newTask = new Task(
      faker.lorem.words(),
      startDate + getRandomInt(12096000),
      getRandomInt(90) + 10,
      repeat,
      startDate,
      faker.lorem.sentence(),
      householdID,
      completed,
      inProgress,
      assigned,
      id
    );
    await db
      .doc("/houses/" + householdID + "/Tasks/" + id)
      .set(Object.assign({}, newTask));
  }

  return ids;
}

async function newTxtMessage(householdID, nums, personIDs) {
  var firebaseConfig = {
    apiKey: "AIzaSyBXrzMPWBxF9GBbtxLL1rqGeSVmz7C1KKw",
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

  var ids = [];

  for (var i = 0; i < nums; i++) {
    var num = getRandomInt(9);
    var id = generateID("m");

    ids.push(id);
    var photoURL, personID, text;
    if (num === 0) {
      photoURL = faker.image.imageUrl();
      text = faker.lorem.words();
    } else if (num === 1) {
      photoURL = null;
      text = faker.lorem.paragraphs();
    } else if (num === 2) {
      photoURL = null;
      text = faker.lorem.lines();
    } else if (num === 3) {
      photoURL = null;
      text = faker.lorem.word();
    } else if (num === 4) {
      photoURL = null;
      text = faker.lorem.words();
    } else {
      photoURL = null;
      text = faker.lorem.sentence();
    }

    var timestamp = firebase.firestore.Timestamp.now();
    timestamp.seconds = timestamp.seconds - getRandomInt(86400 * 2);
    var personID = personIDs[getRandomInt(personIDs.length)];

    var person = (await db.doc("users/" + personID).get()).data();
    var newMsg = {
      _id: generateID("m"),
      createdAt: timestamp,
      text: text,
      user: {
        _id: personID,
        avatar: person.profilePic,
        name: person.name,
      },
    };

    await db
      .doc("/houses/" + householdID + "/Messages/" + id)
      .set(Object.assign({}, newMsg));
  }

  return ids;
}

async function create(numPpl, numTasks, numMsgs) {
  var firebaseConfig = {
    apiKey: "AIzaSyBXrzMPWBxF9GBbtxLL1rqGeSVmz7C1KKw",
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
  var houseID = generateID("h");
  await db.doc("houses/" + houseID).set({
    householdID: houseID,
    name: faker.name.findName() + "'s house",
  });
  var pplIDs = await newPerson(houseID, numPpl);

  await db.doc("houses/" + houseID).update({ people: pplIDs });
  await newTask(houseID, numTasks, pplIDs);

  await newTxtMessage(houseID, numMsgs, pplIDs);
  return houseID;
}

(async () => {
  /* Use the create function to create a household. First parameter is the number of ppl, 
  second parameter is the number of tasks, third parameter is the number of messages.
  The below statement creates a household with 3 ppl, 2 tasks, 17 messages.
  */
  console.log("new house at:", await create(3, 2, 17));

  console.log("Data added. Press CTRL-C to close the program.");
})();

var faker = require("faker");
var firebase = require("firebase");

// TODO SCROLL TO THE BOTTOM OF THE FILE DO NOT EDIT ANYTHING ELSE. Please run this program with node data_gen.js

// All classes except its just the constructors

class Household {
  /**
   * @param {String} name Name of the house
   * @param {String} householdID ID of the house
   */
  constructor(name, householdID) {
    this.name = name;
    this.householdID = householdID;
  }

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
}

class Person {
  /**
   * @param {String} personID The id of the user
   * @param {String} name The name of the user
   * @param {String} profilePic A url of the profilePic of the user
   * @param {String} householdID The id of the household the person is in
   * @param {int} points The number of points the person has
   * @param {int} tasksCompleted The number of tasks the person completed
   * @param {int} tasksFailed The number of tasks the person failed
   * @param {int} successRate Percentage of tasks they finished
   */
  constructor(
    personID,
    name,
    profilePic,
    householdID,
    points,
    tasksCompleted,
    tasksFailed,
    successRate
  ) {
    this.personID = personID;
    this.name = name;
    this.profilePic = profilePic;
    this.householdID = householdID;
    this.points = points;
    this.tasksCompleted = tasksCompleted;
    this.tasksFailed = tasksFailed;
    this.successRate = successRate;
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
        data.successRate
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

class Message {
  /**
   *
   * @param {String} photoURL The url of the photo assosiated with the photo, if it exists
   * @param {String} text The text of the message
   * @param {String} messageID the id of the message
   * @param {String} personID The id of the user who sent the msg
   * @param {String} householdID The id of the household
   */
  constructor(text, photoURL, messageID, personID, householdID) {
    this.text = text;
    this.photoURL = photoURL;
    this.messageID = messageID;
    this.personID = personID;
    this.householdID = householdID;
  }

  /**
   * Static variable used to save and load Message object from firestore
   */
  static messageConverter = {
    toFirestore: function (Message) {
      return {
        text: Message.text,
        photoURL: Message.photoURL,
        messageID: Message.messageID,
        personID: Message.personID,
        householdID: Message.householdID,
      };
    },

    fromFirestore: function (snapshot, options) {
      const data = snapshot.data(options);
      return new Message(
        data.text,
        data.photoURL,
        data.messageID,
        data.personID,
        data.householdID
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

/**
 * Adds new households to the database
 * @param {number} num Number of new households to add
 * @returns list containing all the households you just added
 */
async function newHousehold(num) {
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

  var ids = [];

  for (var i = 0; i < num; i++) {
    const db = firebase.firestore();
    var id = generateID("h");
    ids.push(id);
    var newHouse = new Household(faker.name.findName() + "'s house", id);
    await db.doc("/houses/" + id).set(Object.assign({}, newHouse));
  }
  return ids;
}

/**
 * Adds num People to the househould with the given householdID
 * @param {String} householdID Household you want to add the person to
 * @param {number} num How many people do you want
 * @returns list containing ids of all the ppl u just added
 */
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

    var newPerson = new Person(
      id,
      faker.name.findName(),
      faker.image.avatar(),
      householdID,
      getRandomInt(1000),
      completed,
      failed,
      ((completed / (completed + failed)) * 100).toFixed(2) + "%"
    );
    ids.push(id);
    await db
      .doc("/houses/" + householdID + "/People/" + id)
      .set(Object.assign({}, newPerson));
  }

  return ids;
}

/**
 * Adds num Tasks to the given household
 * @param {String} householdID Household you want to add tasks into
 * @param {number} num number of tasks you want to add
 * @returns list containing ids of all the tasks you just added
 */
async function newTask(householdID, num) {
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

  var pplRef = db.collection("/houses/" + householdID + "/People");

  var personIDs = [];

  var pppl = await pplRef.get();

  pppl.forEach((data) => {
    personIDs.push(data.data().personID);
  });

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

/**
 * Adds nums messages into the given household
 * @param {String} householdID household you want to add the messages into
 * @param {number} nums number of messages you want to add
 * @returns list containing all the messages you just added
 */
async function newMessage(householdID, nums) {
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

  var pplRef = db.collection("/houses/" + householdID + "/People");

  var personIDs = [];

  var pppl = await pplRef.get();

  pppl.forEach((data) => {
    personIDs.push(data.data().personID);
  });

  var ids = [];

  for (var i = 0; i < nums; i++) {
    var num = getRandomInt(9);
    var id = generateID("m");

    ids.push(id);
    var photoURL, personID, text;
    if (num === 0) {
      photoURL = faker.image.imageUrl();
      text = null;
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

    personID = personIDs[getRandomInt(personIDs.length)];
    var newMsg = new Message(text, photoURL, id, personID, householdID);

    await db
      .doc("/houses/" + householdID + "/Messages/" + id)
      .set(Object.assign({}, newMsg));
  }

  return ids;
}

/**
 * Creates everything. Creates numHouseholds Households with numPpl People, numTasks tasks and numMsg messages.
 * @param {number} numHouseholds Number of households u want
 * @param {number} numPpl Number of ppl u want in each household
 * @param {number} numTasks Number of tasks you want in each household
 * @param {number} numMsg Number of messages you want in each househould
 */
async function create(numHouseholds, numPpl, numTasks, numMsg) {
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

  // Stores all of the freshly created households
  var houseIDs = await newHousehold(numHouseholds);

  for (var i = 0; i < houseIDs.length; i++) {
    // Current household to add to
    var curr = houseIDs[i];

    // Adds numPpl People to the current household
    await newPerson(curr, numPpl);

    // Adds numTasks Tasks to the current household
    await newTask(curr, numTasks);

    // Adds numMsg Messages to the current household
    await newMessage(curr, numMsg);
  }
}

/**
 * Creates everything but more random. Creates numHouseholds Households with numPpl People, numTasks tasks and numMsg messages. Adds rng all households have different number of ppl, tasks, and msgs
 * @param {number} numHouseholds Number of households u want
 * @param {number} numPpl Number of ppl u want in each household
 * @param {number} numTasks Number of tasks you want in each household
 * @param {number} numMsg Number of messages you want in each househould
 * @param {number} rngPpl +- How many ppl u want
 * @param {number} rngTasks +- How many tasks u want
 * @param {number} rngMsg +- How many msgs u want
 */
async function createRNG(
  numHouseholds,
  numPpl,
  numTasks,
  numMsg,
  rngPpl,
  rngTasks,
  rngMsg
) {
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

  var houseIDs = await newHousehold(numHouseholds);

  for (var i = 0; i < houseIDs.length; i++) {
    var curr = houseIDs[i];
    await newPerson(curr, numPpl + getRandomInt(rngPpl * 2) - rngPpl);
    await newTask(curr, numTasks + getRandomInt(rngTasks * 2) - rngTasks);
    await newMessage(curr, numMsg + getRandomInt(rngMsg * 2) - rngMsg);
  }
}

// TODO LOOK HERE TO SEE HOW TO ADD RANDOM INFO TO DATABASE. YOU CAN ONLY EDIT STUFF BELOW THIS/
(async () => {
  // This creates two new households
  // console.log(await newHousehold(2));

  // This creates 5 new ppl in the househould with ID h38219.
  // console.log(await newPerson("h38219", 5));

  // This creates 5 new tasks in the househould with ID h38219
  // console.log(await newTask("h38219", 9));

  // This creates 5 new messages in the househould with ID h38219
  // console.log(await newMessage("h38219", 125));

  // This creates 10 households with 5 ppl, 20 tasks and 250 msgs
  // await create(10, 5, 20, 250);

  // This creates 10 households each with 5 (+- 3) ppl, 20 (+- 10) tasks and 250 (+- 200) msgs with
  // await createRNG(10, 5, 20, 250, 3, 10, 200);
  console.log("Data added. Press CTRL-C to close the program.");
})();

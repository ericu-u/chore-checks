// I made this file because I thought it is a good reference and could help us use firebase

// use npm i -S firebase and npm i react-native-dotenv
// If you have a ton of warnings follow this: https://stackoverflow.com/questions/44603362/setting-a-timer-for-a-long-period-of-time-i-e-multiple-minutes
// I also reccomend getting the firebase explorer extension on vscode

// Initialize Firebase
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
var docRef;

// We need to create a refernce to the data we want to read before we can actually read the data
// How to reference a house
docRef = db.doc("/houses/{houseID}");
// For example: docRef = db.doc("/houses/h38219");

// How to reference a person
docRef = db.doc("/houses/{houseID}/People/{personID}");
// For example: docRef = db.doc("/houses/h38219/People/p19348");

// How to reference a task
docRef = db.doc("/houses/{houseID}/Tasks/{taskID}");
// For example: docRef = db.doc("/houses/h38219/Tasks/t30183");

// After docRef points to the data u wanna read, do this:
docRef
  .get()
  .then((doc) => {
    // You have to use asynchronous programming which is a pain ):
    if (doc.exists) {
      console.log("Document data:", doc.data());
      // The data you want read will be stored in doc.data()!!! You have to use the data inside this method unfortunately since it is asynchronous
      // To access a field, of the data you're reading, it's the exact same as a javascript object. For example, if docRef points to a Task, you can do doc.data()["name"] or doc.data().name to get the name of the task or doc.data()["points"] or doc.data().points to get its points.
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  })
  .catch((error) => {
    console.log("Error getting document:", error);
  });

// You can also read all the data from a collection/folder, for example all the tasks inside the the Tasks folder of a household

var colRef;

// Use the same db variable

// To get all tasks, do this
colRef = db.collection("/houses/{houseID}/Tasks");
// For example: colRef = db.collection("/houses/h38219/Tasks");

// To get all people, do this
colRef = db.collection("/houses/{houseID}/People");
// For example: colRef = db.collection("/houses/h38219/People");

// To get all households, do this
colRef = db.collection("/houses");
// For example: colRef = db.collection("/houses");

// Then, do this to go through each document in the collection.
colRef.get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    // This is essentially a for-each loop where doc is a document in the collection
    // doc.data() is never undefined for query doc snapshots
    // doc.data() is the data of the document, similar to when we looked at each document by itself
    console.log(doc.id, " => ", doc.data());
  });
});

// How do we store our object to the database? It's surprisingly easy. Lets use our task object because that's the only class I've implemented so far lol
//First, make the object
var a = new Task(
  "Pet the dog",
  247,
  100,
  1212,
  1111,
  "dog wants attention",
  "h29093",
  false,
  null,
  null,
  true,
  "Akil",
  null,
  "Akil"
);

// Then do
var newRef = db.doc("/houses/{houseID}/Tasks/{taskID}");
newRef.withConverter(Task.taskConverter).set(a);
// and you are done the object will stored.
// Now how do we load the object we just stored later?

// It is also pretty easy

// Make a refernce to the task you want to load
var docRef = db.doc("/houses/{houseID}/Tasks/{taskID}");

docRef
  .withConverter(Task.taskConverter)
  .get()
  .then((doc) => {
    if (doc.exists) {
      var obj = doc.data();
      console.log(obj);
      // obj is now the task!
    } else {
      console.log("No such document!");
    }
  })
  .catch((error) => {
    console.log("Error getting document:", error);
  });

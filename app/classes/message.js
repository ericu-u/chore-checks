import config from "../../config";
import * as firebase from "firebase";
import "firebase/firestore";
import Task from "./task";

export default class Message {
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
        data.householdID,
      );
    },
  };

  
}
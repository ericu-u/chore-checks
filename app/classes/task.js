export default class Task {
  /*
  NVM I need to get rid of this constructor because a class can't have multiple constructors in js ):
  /**
   * Task constructor. This constructor should ideally be used when a user decides to create a new task as it automatically fills out some of the instance variables. 
   * @param {String} name Name of the task
   * @param {int} deadline When the task is due. Maybe use Date.now()? Date.now() returns the number of milliseconds since January 1, 1970, 00:00:00 UTC.
   * @param {int} points How many points is the task worth
   * @param {int} repeat How often should the task repeat? We could use milliseconds since Date.now() uses milliseconds. If it does not repeat, you could pass in null.
   * @param {String} description A brief description of the task
   * @param {String} householdID The id of the household this task belongs to
   
  constructor(name, deadline, points, repeat, description, householdID) {
    this.name = name;
    this.deadline = deadline;
    this.points = points;
    this.repeat = repeat;
    this.startDate = Date.now();
    this.description = description;
    this.householdID = householdID;

    // When we first construct the object, these values will be empty. We can modify them with methods.
    this.completed = false; // Is the task finished?
    this.completedBy = null; // Person who finished the task
    this.completionTime = null; // When the task was finished
    this.inProgress = false; // Is the task in progress?
    this.inProgressBy = null; // Person who is currently doing the task
    this.duration = null; // How long the task took. This might not be useful im not sure.
    this.assigned = null; // Who was assigned the task
  }
  */

  /**
   * This constructor is intended to be used when loading an object from firebase but it can be used for when a user creates a new object as well.
   * @param {String} name Name of the task
   * @param {int} deadline When the task is due. Maybe use Date.now()? Date.now() returns the number of milliseconds since January 1, 1970, 00:00:00 UTC.
   * @param {int} points How many points is the task worth
   * @param {int} repeat How often should the task repeat? We could use milliseconds since Date.now() uses milliseconds. If it does not repeat, you could pass in null.
   * @param {String} description A brief description of the task
   * @param {String} householdID The id of the household this task belongs to
   * @param {boolean} completed Is the task completed?
   * @param {String} completedBy Who completed the task.
   * @param {int} completionTime When the task was finished.
   * @param {boolean} inProgress Is the task in progress?
   * @param {String} inProgressBy Who is doing the task
   * @param {int} duration How long the task took
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
    completedBy,
    completionTime,
    inProgress,
    inProgressBy,
    duration,
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
    this.completedBy = completedBy;
    this.completionTime = completionTime;
    this.inProgress = inProgress;
    this.inProgressBy = inProgressBy;
    this.duration = duration;
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
        completedBy: Task.completedBy,
        completionTime: Task.completionTime,
        inProgress: Task.inProgress,
        inProgressBy: Task.inProgressBy,
        duration: Task.duration,
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
        data.completedBy,
        data.completionTime,
        data.inProgress,
        data.inProgressBy,
        data.duration,
        data.assigned,
        data.taskID
      );
    },
  };

  /**
   * Function for having a task repeat
   */
  update() {
    if (this.repeat != null && Date.now() >= this.startDate + this.repeat) {
      this.deadline = this.deadline + this.repeat;

      this.completed = false;
      this.completedBy = null;
      this.completionTime = null;
      this.inProgress = false;
      this.inProgressBy = null;
      this.claimTime = null;
    }
  }

  /**
   * This method is called when a user claims this task.
   * @param {String} user The personID of the person who claimed the task
   */
  claim(user) {
    if (this.completed || this.inProgress) throw "Task cannot be claimed!";

    this.inProgress = true;
    this.inProgressBy = user;
    this.claimTime = Date.now();
  }

  /**
   * When the user who claimed a task says the task is completed
   */
  complete() {
    this.completed = true;
    this.completedBy = this.inProgressBy;

    // TODO
    // After I make the user class, I need a way to increment how many points the user has here.

    this.inProgress = false;
    this.inProgressBy = null;
    this.completionTime = Date.now();
    this.duration = this.completionTime - this.claimTime;
  }

  assign(user) {
    if (this.completed || this.inProgress) throw "Task cannot be assigned!";

    this.assigned = user;
  }
}

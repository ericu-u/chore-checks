export default class Task {
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

  /**
   * Function for having a task repeat
   */
  update() {
    if (this.repeat != null && Date.now() >= this.startDate + this.repeat) {
      this.deadline = this.deadline + this.repeat;

      this.completed = null;
      this.inProgress = null;
    }
  }

  /**
   * This method is called when a user claims this task.
   * @param {String} user The personID of the person who claimed the task
   */
  claim(user) {
    if (this.completed !== null || this.inProgress !== null)
      throw "Task cannot be claimed!";

    this.inProgress = user;
  }

  /**
   * When the user who claimed a task says the task is completed
   */
  complete() {
    this.completed = this.inProgress;
    // TODO
    // After I make the user class, I need a way to increment how many points the user has here.

    this.inProgress = null;
  }

  assign(user) {
    if (this.completed !== null || this.inProgress !== null)
      throw "Task cannot be assigned!";

    this.assigned = user;
  }
}

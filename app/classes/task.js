class Task {
  /**
   * Task constructor
   * @param {String} name Name of the task
   * @param {int} deadline When the task is due. Maybe use Date.now()? Date.now() returns the number of milliseconds since January 1, 1970, 00:00:00 UTC.
   * @param {int} points How many points is the task worth
   * @param {int} repeat How often should the task repeat? We could use milliseconds since Date.now() uses milliseconds. If it does not repeat, you could pass in null.
   * @param {String} description A brief description of the task
   */
  constructor(name, deadline, points, repeat, description) {
    this.name = name;
    this.deadline = deadline;
    this.points = points;
    this.repeat = repeat;
    this.startDate = Date.now();
    this.description = description;

    // When we first construct the object, these values will be empty. We can modify them with methods.
    this.completed = false; // Is the task finished?
    this.completedBy = null; // Person who finished the task
    this.completionTime = null; // When the task was finished
    this.inProgress = false; // Is the task in progress?
    this.inProgressBy = null; // Person who is currently doing the task
    this.duration = null; // How long the task took. This might not be useful im not sure.
    this.assigned = null;
  }

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
   * @param {User} user The user who claimed the task
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

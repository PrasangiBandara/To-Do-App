interface ToDo {
  name: string;
  completed: boolean;
}

class Todo {
  private task: ToDo[];

  constructor() {
    this.task = [];
  }
}

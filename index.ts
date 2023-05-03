interface ToDo {
  name: string;
  completed: boolean;
}

class Todo {
  private task: ToDo[];

  constructor() {
    this.task = [];
  }

  //add task
  addToList(taskName: string): void {
    const trimmedTaskName = taskName.trim();
    if (trimmedTaskName !== "") {
      const task1: ToDo = {
        name: trimmedTaskName,
        completed: false,
      };
    }
  }

  //edit task
  editDoList(index: number, taskNameNew: string): void {
    //accesses the 'name' property of specified indexed task
    this.task[index].name = taskNameNew;
    this.functioningTask();
  }

  //delete task
  deleteToDoList(index: number): void {
    this.task.splice(index, 1);
    this.functioningTask();
  }

  //complete task
  //toggling the completed status of a task
  completeTask(index: number): void {
    this.task[index].completed = !this.task[index].completed;
    this.functioningTask();
  }

  //functions for tasks
  //updating html representation of current state
  functioningTask(): void {
    const doList = document.getElementById("list")!; //access list and all elements
    const allAboutTasks = document.getElementById("all")!;
    let count = 0;

    //clear the previous list before add update list
    if (doList) {
      doList.innerHTML = "";
    }

    //function once for each array element
    this.task.forEach((task: ToDo, index: number) => {
      //creates a new HTML element
      const listItem = document.createElement("li");
      listItem.className = "task-item";
      if (task.completed) {
        //modified html element
        listItem.classList.add("completed");
        count++;
      }

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      //add a "change" event listener to the checkbox. When the checkbox is changed
      checkbox.addEventListener("change", () => {
        this.completeTask(index);
      });

      // sets the text content of the span element to the name of the task
      //use to css file
      const taskName = document.createElement("span");
      taskName.textContent = task.name;
      taskName.className = "task-name";

      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.className = "edit-button";
      //attach event listners to button
      editButton.addEventListener("click", () => {
        //used to ask the user for a new name for a task
        const newTaskName = prompt("Edit Your Task :", task.name);

        if (newTaskName) {
          this.editDoList(index, newTaskName);
        }
      });

      //Delete button with 'delete-button' class
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.className = "delete-button";
      deleteButton.addEventListener("click", () => {
        this.deleteToDoList(index);
      });

      //add the created HTML elements as child elements
      listItem.appendChild(checkbox);
      listItem.appendChild(taskName);
      listItem.appendChild(editButton);
      listItem.appendChild(deleteButton);
      doList.appendChild(listItem);
    });

    //calculation
    const Total = this.task.length;
    const Incomplete = Total - count;

    //show task labels with count
    allAboutTasks.innerHTML = `<p>Total tasks: <span>${Total}</span></p>
                               <p>Completed tasks: <span>${count}</span></p>
                               <p>Incomplete tasks: <span>${Incomplete}</span></p>`;
  }
}

//creates a new instance of the 'Todo' class
const todo = new Todo();

//getting references to two HTML elements using their ids
const Input = document.getElementById("taskInput") as HTMLInputElement;
const addButton = document.getElementById("add-button")!;

// add event listener to the button
addButton.addEventListener("click", () => {
  const taskName = Input.value.trim();

  //input field clear
  if (taskName) {
    todo.addToList(taskName);
    Input.value = "";
  }
});

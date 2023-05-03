var Todo = /** @class */ (function () {
    function Todo() {
        this.task = [];
    }
    //add task
    Todo.prototype.addToList = function (taskName) {
        var task = {
            name: taskName,
            completed: false,
        };
        this.task.push(task);
        this.functioningTask();
    };
    //edit task
    Todo.prototype.editDoList = function (index, taskName) {
        this.task[index].name = taskName;
        this.functioningTask();
    };
    //delete task
    Todo.prototype.deleteToDoList = function (index) {
        this.task.splice(index, 1);
        this.functioningTask();
    };
    //tick complete task
    Todo.prototype.completeTask = function (index) {
        this.task[index].completed = !this.task[index].completed;
        this.functioningTask();
    };
    //functions for tasks
    Todo.prototype.functioningTask = function () {
        var _this = this;
        var doList = document.getElementById("list");
        var allAboutTasks = document.getElementById("all");
        var count = 0;
        doList.innerHTML = "";
        this.task.forEach(function (task, index) {
            var listItem = document.createElement("li");
            listItem.className = "task-item";
            if (task.completed) {
                listItem.classList.add("completed");
                count++;
            }
            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed;
            checkbox.addEventListener("change", function () {
                _this.completeTask(index);
            });
            var taskName = document.createElement("span");
            taskName.textContent = task.name;
            taskName.className = "task-name";
            var editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.className = "edit-button";
            editButton.addEventListener("click", function () {
                var newTaskName = prompt("Edit Your Task :", task.name);
                if (newTaskName) {
                    _this.editDoList(index, newTaskName);
                }
            });
            var deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "delete-button";
            deleteButton.addEventListener("click", function () {
                _this.deleteToDoList(index);
            });
            listItem.appendChild(checkbox);
            listItem.appendChild(taskName);
            listItem.appendChild(editButton);
            listItem.appendChild(deleteButton);
            doList.appendChild(listItem);
        });
        var Total = this.task.length;
        var Incomplete = Total - count;
        allAboutTasks.innerHTML = "<p>Total tasks: <span>".concat(Total, "</span></p>\n                               <p>Completed tasks: <span>").concat(count, "</span></p>\n                               <p>Incomplete tasks: <span>").concat(Incomplete, "</span></p>");
    };
    return Todo;
}());
var todo = new Todo();
var Input = document.getElementById("taskInput");
var addButton = document.getElementById("add-button");
addButton.addEventListener("click", function () {
    var taskName = Input.value.trim();
    if (taskName) {
        todo.addToList(taskName);
        Input.value = "";
    }
});



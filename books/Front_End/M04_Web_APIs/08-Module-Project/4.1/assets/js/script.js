var agga = document.querySelector("#save-task");
var nyana = document.querySelector("#tasks-to-do");

var createTaskHandler = function() {
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  listItemEl.textContent = "This is a new task.";
  nyana.appendChild(listItemEl);
};

agga.addEventListener("click", createTaskHandler);

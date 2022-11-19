//Save todos in localStorage
const saveToDos = function (todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
};

//Fetch existing todo from localStorage
const getSavedTodos = function () {
  const todosJSON = localStorage.getItem("todos");

  if (todosJSON !== null) {
    return JSON.parse(todosJSON);
  } else {
    return [];
  }
};

//Render application todos based in filters
const renderTodos = function (todos, filters) {
  const filteredTodos = todos.filter(function (todo) {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;
    return searchTextMatch && hideCompletedMatch;
  });

  //line of the incomplete todos
  const incompleteTodos = filteredTodos.filter(function (todo) {
    return !todo.complited;
  });

  //delets all the duplicatess searchText
  document.querySelector("#todos").innerHTML = "";

  //render line of the incomplete todos
  document
    .querySelector("#todos")
    .appendChild(generateSummaryDOM(incompleteTodos));

  //render all the todos left
  filteredTodos.forEach(function (todo) {
    document.querySelector("#todos").appendChild(generateTodoDOM(todo));
  });
};

//Get the DOM elements for an indivdual doto
const generateTodoDOM = function (todo) {
  const todoEL = document.createElement("div");
  const checkbox = document.createElement("input");
  const todoText = document.createElement("span");
  const removeButton = document.createElement("button");

  //setup todo checkbox
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = todo.completed;
  todoEL.appendChild(checkbox);
  checkbox.addEventListener("change", function () {
    toggleTodo(todo.id);
    saveToDos(todos);
    renderTodos(todos, filters);
  });

  //setup the todo text
  todoText.textContent = todo.text;
  todoEL.appendChild(todoText);

  //Remove a todo from the list
  const removeTodo = function (id) {
    const todoIndex = todos.findIndex(function (todo) {
      return todo.id === id;
    });

    if (todoIndex > -1) {
      todos.splice(todoIndex, 1);
    }
  };

  //Toggle the completed value for a given todos
  const toggleTodo = function (id) {
    const todo = todos.find(function (todo) {
      return todo.id === id;
    });

    if (todo !== undefined) {
      todo.complited = !todo.complited;
    }
  };

  //setup the remove button
  removeButton.textContent = "X";
  todoEL.appendChild(removeButton);
  removeButton.addEventListener("click", function () {
    removeTodo(todo.id);
    saveToDos(todos);
    renderTodos(todos, filters);
  });

  return todoEL;
};

//Get the DOM elements for list summary
const generateSummaryDOM = function (incompleteTodos) {
  const summary = document.createElement("h2");
  summary.textContent = `You have ${incompleteTodos.length} todos left`;
  return summary;
};

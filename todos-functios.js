//Save todos in localStorage
const saveToDos = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

//Fetch existing todo from localStorage
const getSavedTodos = () => {
  const todosJSON = localStorage.getItem("todos");

  if (todosJSON !== null) {
    return JSON.parse(todosJSON);
  } else {
    return [];
  }
};

//Render application todos based in filters
const renderTodos = (todos, filters) => {
  const filteredTodos = todos.filter((todo) => {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;
    return searchTextMatch && hideCompletedMatch;
  });

  //line of the incomplete todos
  const incompleteTodos = filteredTodos.filter((todo) => !todo.completed);

  //delets all the duplicatess searchText
  document.querySelector("#todos").innerHTML = "";

  //render line of the incomplete todos
  document
    .querySelector("#todos")
    .appendChild(generateSummaryDOM(incompleteTodos));

  //render all the todos left
  filteredTodos.forEach((todo) => {
    document.querySelector("#todos").appendChild(generateTodoDOM(todo));
  });
};

//Get the DOM elements for an indivdual doto
const generateTodoDOM = (todo) => {
  const todoEL = document.createElement("div");
  const checkbox = document.createElement("input");
  const todoText = document.createElement("span");
  const removeButton = document.createElement("button");

  //setup todo checkbox
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = todo.completed;
  todoEL.appendChild(checkbox);
  checkbox.addEventListener("change", () => {
    toggleTodo(todo.id);
    saveToDos(todos);
    renderTodos(todos, filters);
  });

  //setup the todo text
  todoText.textContent = todo.text;
  todoEL.appendChild(todoText);

  //Remove a todo from the list
  const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => {
      return todo.id === id;
    });

    if (todoIndex > -1) {
      todo.splice(todoIndex, 1);
    }
  };

  //setup the remove button
  removeButton.textContent = "X";
  todoEL.appendChild(removeButton);
  removeButton.addEventListener("click", () => {
    removeTodo(todo.id);
    saveToDos(todos);
    renderTodos(todos, filters);
  });

  return todoEL;
};

//Toggle the completed value for a given todos
const toggleTodo = (id) => {
  const todo = todos.find((todo) => {
    return todo.id === id;
  });

  if (todo !== undefined) {
    todo.completed = !todo.completed;
  }
};

//Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
  const summary = document.createElement("h2");
  summary.textContent = `You have ${incompleteTodos.length} todos left`;
  return summary;
};

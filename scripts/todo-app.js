"use strict";

let todos = getSavedTodos();

const filters = {
  searchText: "",
  hideCompleted: false,
};

renderTodos(todos, filters);

//listen to the searcText.value and renderTodos
document.querySelector("#search-text").addEventListener("input", (e) => {
  filters.searchText = e.target.value;
  renderTodos(todos, filters);
});

document.querySelector("#new-todo").addEventListener("submit", (e) => {
  const text = e.target.elements.text.value.trim();
  e.preventDefault();

  if (text.length > 0) {
    todos.push({
      id: uuidv4(),
      text,
      completed: false,
    });
    saveTodos(todos);
    renderTodos(todos, filters);

    //delets the neww text from the new todo input
    e.target.elements.text.value = "";
  }
});

document.querySelector("#hide-completed").addEventListener("change", (e) => {
  filters.hideCompleted = e.target.checked;
  renderTodos(todos, filters);
});

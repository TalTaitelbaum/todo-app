"use strict";
const todos = getSavedTodos();

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
  e.preventDefault();
  todos.push({
    id: uuidv4(),
    text: e.target.elements.text.value,
    completed: false,
  });

  saveTodos(todos);
  renderTodos(todos, filters);

  //delets the neww text from the new todo input
  e.target.elements.text.value = "";
});

document.querySelector("#hide-completed").addEventListener("change", (e) => {
  console.log(e.target.checked);
  filters.hideCompleted = e.target.checked;

  renderTodos(todos, filters);
});

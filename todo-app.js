const todos = getSavedTodos();

const filters = {
  searchText: "",
  hideCompleted: false,
};

renderTodos(todos, filters);

//listen to the searcText.value and renderTodos
document.querySelector("#search-text").addEventListener("input", function (e) {
  filters.searchText = e.target.value;
  renderTodos(todos, filters);
});

document.querySelector("#new-todo").addEventListener("submit", function (e) {
  e.preventDefault();
  todos.push({
    id: uuidv4(),
    text: e.target.elements.text.value,
    completed: false,
  });

  saveToDos(todos);
  renderTodos(todos, filters);

  //delets the neww text from the new todo input
  e.target.elements.text.value = "";
});

document
  .querySelector("#hide-complited")
  .addEventListener("change", function (e) {
    console.log(e.target.checked);
    filters.hideCompleted = e.target.checked;

    renderTodos(todos, filters);
  });

const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Render
function renderTodos() {
  list.innerHTML = "";

  if (todos.length === 0) {
    list.innerHTML = `<p class="empty">Nessun task ancora</p>`;
    return;
  }

  todos.forEach((todo) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span class="${todo.completed ? "completed" : ""}">
        ${todo.text}
      </span>
      <div>
        <button onclick="toggleTodo(${todo.id})">✔</button>
        <button onclick="deleteTodo(${todo.id})">❌</button>
      </div>
    `;

    list.appendChild(li);
  });

  saveTodos();
}

// Aggiungi task
function addTodo() {
  const text = input.value.trim();

  if (text === "") return;

  const newTodo = {
    id: Date.now(),
    text,
    completed: false
  };

  todos.push(newTodo);
  input.value = "";

  renderTodos();
}

// Eventi
addBtn.addEventListener("click", addTodo);

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});

// Toggle completato
function toggleTodo(id) {
  todos = todos.map(todo =>
    todo.id === id
      ? { ...todo, completed: !todo.completed }
      : todo
  );

  renderTodos();
}

// Elimina
function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos();
}

// Salva
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Init
renderTodos();
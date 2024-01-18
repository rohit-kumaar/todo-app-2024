import "./style.css";

interface ITodo {
  _id: string;
  title: string;
  isComplete: boolean;
}

const todoList: Array<ITodo> = [];

const form = document.querySelector("#form") as HTMLFormElement;
const input = document.querySelector("#input") as HTMLInputElement;
const todoWrapper = document.querySelector(".todo-wrapper") as HTMLDivElement;

form.addEventListener("submit", function (e: SubmitEvent) {
  e.preventDefault();

  const todo: ITodo = {
    _id: String(Math.floor(Math.random() * 10000000)),
    title: input.value,
    isComplete: false,
  };

  if (input.value == "") {
    alert("Please Add A Todo");
  } else {
    todoList.push(todo);
    input.value = "";
    localStorage.setItem("todo", JSON.stringify(todoList));
    renderTodo(todoList);
  }
});

function renderTodo(todos: ITodo[]) {
  todoWrapper.innerText = "";
  todos.forEach((todo) =>
    generateTodoList(todo._id, todo.isComplete, todo.title)
  );
}

function generateTodoList(_id: string, isComplete: boolean, title: string) {
  const label: HTMLLabelElement = document.createElement("label");

  // creating input
  const input: HTMLInputElement = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.checked = isComplete;

  // creating span element
  const span: HTMLSpanElement = document.createElement("span");
  span.innerText = title;

  input.addEventListener("change", () => {
    todoList.find((item) => {
      if (item._id === _id) item.isComplete = input.checked;
    });

    span.className = input.checked ? " checked" : "";
  });

  // creating button
  const button = document.createElement("button");
  button.innerText = "Delete";
  button.id = "delete";
  button.addEventListener("click", () => {
    deleteTodo(_id);
    localStorage.removeItem(_id);
  });

  label.append(input, span, button);

  todoWrapper?.append(label);
}

function deleteTodo(id: string) {
  const idx = todoList.findIndex((item) => item._id == id);
  todoList.splice(idx, 1);
  renderTodo(todoList);
}

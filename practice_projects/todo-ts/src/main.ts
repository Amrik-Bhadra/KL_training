import "./style.css"

interface ITodo {
  readonly id: string;
  title: string;
  isComplete: boolean;
}

let todos: ITodo[] = [];

const todosContainer = document.querySelector('.todo-container') as HTMLDivElement;
const todosInput = document.getElementById('todo-title') as HTMLInputElement;
const myForm = document.getElementById('myForm') as HTMLFormElement;

// onSubmit event on form to create a new todo
myForm.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();
  const todo: ITodo = {
    title: todosInput.value,
    isComplete: false,
    id: String(Math.random() * 1000)
  }

  todos.push(todo);
  todosInput.value = "";

  renderTodo(todos);
}

// function to create a todoItem element
const generateTodoItem = (todo: ITodo) => {
  // creating a div
  const todoElement: HTMLDivElement = document.createElement('div');
  todoElement.className = "todo";
  
  // creating checkbox
  const checkBoxElement: HTMLInputElement = document.createElement('input');
  checkBoxElement.setAttribute('type', 'checkbox');
  checkBoxElement.classList.add('isCompleted');
  checkBoxElement.checked = todo.isComplete;

  // creating p for title
  const todoParaElement: HTMLParagraphElement = document.createElement('p');
  todoParaElement.innerText = todo.title;
  todoParaElement.className = checkBoxElement.checked ? "text-cut" : ""

  // creating delete button
  const btnElement: HTMLButtonElement = document.createElement('button');
  btnElement.innerText = 'X';
  btnElement.className = 'deleteBtn';

  // append to todoElement
  todoElement.append(checkBoxElement, todoParaElement, btnElement);
  todosContainer.append(todoElement);

  // operations
  checkBoxElement.onchange = () => {
    todoParaElement.className = checkBoxElement.checked ? "text-cut" : "";
    toggleTodoCompletion(todo);
  }

  btnElement.onclick = () => deleteTodo(todo.id);
}

// function to render todo items in todo-container
const renderTodo = (todos: ITodo[]) => {
  todosContainer.innerHTML = "";
  todos.forEach((todo) => {
    generateTodoItem(todo);
  });
}

const toggleTodoCompletion = (todo: ITodo) => {
  todo.isComplete = !todo.isComplete;
}

const deleteTodo = (id: string) => {
  // reassign todos to the filtered list
  todos = todos.filter((todo) => todo.id !== id);
  renderTodo(todos);
}

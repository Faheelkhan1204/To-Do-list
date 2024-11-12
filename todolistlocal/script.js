const listValue = document.querySelector(".Value");
const to_doLists = document.querySelector(".To-DoList");
let todoListValue = [];

const getTodoListFromLS = () => {
    const todos = JSON.parse(localStorage.getItem("todoYoutube"));
    return todos ? todos : [];
};

const addTodoListLocalStorage = (todo) => {
    todoListValue.push(todo);
    localStorage.setItem("todoYoutube", JSON.stringify(todoListValue));
};


const removeTodoFromLS = (index) => {
    todoListValue.splice(index, 1);
    localStorage.setItem("todoYoutube", JSON.stringify(todoListValue));
};

const renderTodos = () => {
    to_doLists.innerHTML = "";
    todoListValue.forEach((todo, index) => {
        const liElement = document.createElement("li");
        liElement.innerHTML = `
            ${todo}
            <button class="deleteBtn" data-index="${index}">Delete</button>
        `;
        to_doLists.appendChild(liElement);
    });
};

const addTodoList = (e) => {
    e.preventDefault();
    let newTodo = listValue.value.trim();

    if (newTodo !== "") {
        todoListValue = getTodoListFromLS(); 
        addTodoListLocalStorage(newTodo);
        renderTodos();
        listValue.value = "";
    }
};


const handleDelete = (e) => {
    if (e.target.classList.contains("deleteBtn")) {
        const index = parseInt(e.target.getAttribute("data-index"), 10); 
        removeTodoFromLS(index);
        renderTodos();
    }
};

document.addEventListener("DOMContentLoaded", () => {
    todoListValue = getTodoListFromLS();
    renderTodos();
});

document.querySelector(".AddBtn").addEventListener("click", addTodoList);
to_doLists.addEventListener("click", handleDelete);

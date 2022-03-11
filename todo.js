/* Elementler */
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-list");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");
const checkbox = document.querySelector("#flexSwitchCheckDefault");

eventListeners();

function eventListeners(){
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    clearButton.addEventListener("click", clearAllTodos);
    checkbox.addEventListener("change", switchMode);
}

function switchMode(){
    const card = document.querySelector(".card")
    card.setAttribute("style", "transition: 0.5s linear")

    if(card.className === "card"){
        card.className = "card text-white bg-dark mb-3";
        clearButton.className = "btn btn-danger"
    }
    else{
        card.className = "card";
    }
}

function filterTodos(e){
    const filtervalue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if(text.indexOf(filtervalue) === -1){
            listItem.setAttribute("style", "display : none !important");
        }
        else {
            listItem.setAttribute("style", "display : block");
        }

    })
}

function loadAllTodosToUI(){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}

function deleteTodo(e){

    if (e.target.className ===  'fa-solid fa-trash-can'){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent)
        showAlert("success", "Todonuz silindi.")
    }

}

function clearAllTodos(e){
   if(confirm("Bütün todoları silmək istədiyinizi təsdiqləyirsiniz?")){
       while (todoList.firstElementChild != null){
           todoList.removeChild(todoList.firstElementChild);
           localStorage.removeItem("todos");
       }
   }
}

function deleteTodoFromStorage(deletetodo){
    
    let todos = getTodosFromStorage();
    todos.forEach(function(todo, index){

        if (todo === deletetodo){
            todos.splice(index,1); //Arrayden todonu silmek
        }
    })

    localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo(e){
    const newTodo = todoInput.value.trim();
    if(newTodo === ""){
        showAlert("danger", "Boş buraxıla bilməz!");
    } 
    else {
        showAlert("success", "Todo əlavə olundu!");
        addTodoToStorage(newTodo);
        addTodoToUI(newTodo);
    }

    e.preventDefault();
}

function showAlert(type, message){
    const alert = document.createElement("div")

    alert.className = `alert alert-${type}`
    alert.textContent = message;

    firstCardBody.appendChild(alert);
    
    setTimeout(function(){
        alert.remove();
    }, 2000)
}

function getTodosFromStorage(newTodo){
    let todos;

    if (localStorage.getItem("todos") === null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    return todos;
}

function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos", JSON.stringify(todos));
}


function addTodoToUI(newTodo){ //Stringi list item olarak elave etmek

    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between";

    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class='fa-solid fa-trash-can'></i>"

    listItem.appendChild(document.createTextNode(newTodo))
    listItem.appendChild(link);

    // TodoList-e elave etmek

    todoList.appendChild(listItem);

    todoInput.value = null;


}


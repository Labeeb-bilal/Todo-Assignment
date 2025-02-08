
//start
let todos = [];
renderTodos();

//handles the adding functionality
function AddTodo() {
    const task = document.getElementById('input').value;

    if (task.length > 0) {
        todos.push({ text: task, completed: false });
        const prevtodos = JSON.parse(localStorage.getItem('todos')) || [];

        localStorage.setItem('todos', JSON.stringify([...prevtodos, { text: task, completed: false }]));
        document.getElementById('input').value = '';

        renderTodos();
    }
}

//rendering the todos which we have created
function renderTodos(todos = null) {
    const todoSec = document.querySelector('.Todo-sec'); // Get the todo container

    // Use the passed todos if provided, otherwise get from localStorage
    const todosToRender = todos || JSON.parse(localStorage.getItem('todos')) || [];
    let todoHTML = '';

    if (todosToRender.length > 0) {
        todosToRender.forEach((todo, index) => {
            todoHTML += `
                <div class="${todo.completed ? 'todo checked' : 'todo'}">
                    <label>
                        <input 
                            type="checkbox" 
                            ${todo.completed ? 'checked' : ''} 
                            onchange="toggleComplete(${index})" 
                            aria-label="Mark ${todo.text} as ${todo.completed ? 'incomplete' : 'complete'}"
                        />
                        ${todo.text}
                    </label>
                    <div>
                        <button class="delete-btn" onclick="deleteTodo(${index})" aria-label="Delete ${todo.text}">Delete</button>
                        <button class="edit-btn" onclick="editTodo(${index})" aria-label="Edit ${todo.text}">Edit</button>
                    </div>
                </div>
            `;
        });
    } else {
        // Handle case where there are no todos eg first time
        todoHTML = `<div class="todo">
                     <p>No Todos Available</p>
                   </div>`;
    }

    // Update the DOM with the generated HTML
    todoSec.innerHTML = todoHTML;
}

//handles the delete functionality
function deleteTodo(index) {
    let LocalTodos = JSON.parse(localStorage.getItem('todos')) || [];

    const updatedTodos = LocalTodos.filter((todo, idx) => index !== idx);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));

    console.log(updatedTodos);

    renderTodos();
}

//handles getting data of particular todo in updateInput onclick
function editTodo(index) {
    let LocalTodos = JSON.parse(localStorage.getItem('todos')) || [];

    document.getElementById('form-box').style.display = "block"; 
    let updateInput = document.getElementById('updateinput'); // Getting updateinput
    updateInput.value = LocalTodos[index].text; // Setting previous todo in updateinput 

    updateInput.setAttribute('data-index', index);
}

//handles the Update functionality when user click on Save changes
function Updatechange() {
    let updateInput = document.getElementById('updateinput'); // Getting updateinput
    const index = updateInput.getAttribute('data-index');

    let LocalTodos = JSON.parse(localStorage.getItem('todos')) || [];

    LocalTodos[index] = { text: updateInput.value, completed: LocalTodos[index].completed };
    localStorage.setItem('todos', JSON.stringify(LocalTodos));

    updateInput.value = '';
    document.getElementById('form-box').style.display = "none";
    renderTodos();
}

//handles the Completed/uncomplete functionality when user click on checbox
function toggleComplete(index) {
    let LocalTodos = JSON.parse(localStorage.getItem('todos')) || [];

    LocalTodos[index].completed = !LocalTodos[index].completed;

    localStorage.setItem('todos', JSON.stringify(LocalTodos));

    console.log(todos);
    renderTodos();
}
// handles filter dropdown functionality
function filterTasks() {
    const filterValue = document.getElementById('filter').value;
    let AllTodos = JSON.parse(localStorage.getItem('todos')) || [];

    const Filteredtodos = AllTodos.filter((todo) => {
        if (filterValue === 'completed') return todo.completed == true;
        if (filterValue === 'uncompleted') return todo.completed == false;
        return true;
    });

    renderTodos(Filteredtodos);
}
// handles Clear All functionality
function handleclear(){
  localStorage.setItem('todos',JSON.stringify([]));
  renderTodos();
}

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const tasksInput = document.querySelector('#task');

form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeItem);

function addTask(e) {
    if (!tasksInput.value){alert('add task!');}

    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(tasksInput.value));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
    tasksInput.value='';

    e.preventDefault();
}

function removeItem(e) {
    if(e.target.classList.contains('fa-remove')){
        e.target.parentElement.parentElement.remove();
    }
}
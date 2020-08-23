  
// Define UI Vars
const form = document.querySelector('#task-form');        // form
const taskList = document.querySelector('.collection');  // ul
const clearBtn = document.querySelector('.clear-tasks'); // clear button
const filter = document.querySelector('#filter');        // filter input
const taskInput = document.querySelector('#task');       // input task

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  //DOM load event
  document.addEventListener('DOMContentLoaded', getTasks)
  // Add task event
  form.addEventListener('submit', addTask);

  // remove task event
  taskList.addEventListener('click', removeTask)

  //clear task event
  clearBtn.addEventListener('click', clearTasks)

  // filter tasks
  filter.addEventListener('keyup', filterTasks)
}

//get tasks from ls

function getTasks() {
  let tasks
  if(localStorage.getItem('tasks') === null){
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.forEach(function(task) {
    //create li element
    const li = document.createElement('li')
    
    //add collection-item class
    li.classList.add('collection-item')
    //create textNode and append to li
    li.appendChild(document.createTextNode(task))
    //create new link element
    const link = document.createElement('a')
    // add class to the link element
    link.classList.add('delete-item')
    
    //add icon HTML
    link.innerHTML = `<i class="far fa-window-close cancel"></i>`

    //append link to li
    li.appendChild(link)

    // Append li to ul
    taskList.appendChild(li);
    })
}
function addTask(e) {
  
  if(taskInput.value === '') {
    alert('Please Add A Task')
  }

  //create li element
  const li = document.createElement('li')
  
  //add collection-item class
  li.classList.add('collection-item')
  //create textNode and append to li
  li.appendChild(document.createTextNode(taskInput.value))
  //create new link element
  const link = document.createElement('a')
  // add class to the link element
  link.classList.add('delete-item')
  
  //add icon HTML
  link.innerHTML = `<i class="far fa-window-close cancel"></i>`

  //append link to li
  li.appendChild(link)


  //append li to ul
  taskList.appendChild(li)


  //store in local storage
  storeTaskInLocalStorage(taskInput.value)

  //clear input
  taskInput.value = ''
  e.preventDefault()
}

// store in local storage
function storeTaskInLocalStorage(task) {
  let tasks
  if(localStorage.getItem('tasks') === null){
    tasks = []
  } else {
      tasks = JSON.parse(localStorage.getItem('tasks'))    
  }
  tasks.push(task)

    // we store string in local storage
    localStorage.setItem('tasks',JSON.stringify(tasks))
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks
  if(localStorage.getItem('tasks') === null){
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.forEach(function (task, index) {
    if(taskItem.textContent === task) {
      tasks.splice(index, 1)
    }
  })
  localStorage.setItem('tasks', JSON.stringify(tasks))
}
//removeTask
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you sure, you want to delete the task?')){
      e.target.parentElement.parentElement.remove();

      // remove from local storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement)
    }
    
  }
}


//clearTasks
function clearTasks() {
  //better not to use it
  //taskList.innerHTML = '';

  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild)
  }
  clearTasksFromLocalStorage()
}

// clear tasks from localstorage 
function clearTasksFromLocalStorage() {
  localStorage.clear()
}

//filter Tasks

function filterTasks(e) {
  const textEntered = e.target.value.toLowerCase()
  document.querySelectorAll('.collection-item').forEach(function(task){
    if(task.firstChild.textContent.toLowerCase().includes(textEntered)) {
      task.style.display = 'block'
    } else {
      task.style.display = 'none'
    }
  })
}

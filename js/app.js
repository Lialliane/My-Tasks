let task_list = [];
let task_input = document.getElementById("task-name");
let priority = document.getElementById("priority-range");
let add_button = document.getElementById("add-button");
let task_list_Dom = document.getElementById("task-list");
let checkbox = document.getElementsByClassName("finished-task-checkbox");
let button_undone = document.getElementById("undone-header");
let button_done = document.getElementById("done-header");
let unDoneTab = true;
let removeButtons;
let editButtons;

add_button.addEventListener("click", addTask);
button_undone.addEventListener("click", toggleTab);
button_done.addEventListener("click", toggleTab);


function addTask() {
    if(task_input.value == "" 
        || task_input.value == undefined
        || task_input.value == null)
        {
        return ;
    }
    task_list.push(
        {
            name: task_input.value,
            priority: priority.value,
            done: false
        }
    );
    renderList();
    task_input.value = "";
}

function renderList() {
    task_list_Dom.innerHTML = "";
    task_list = reArrangeItemPriority();
    let current_element_in_dom_tree = 0;
    
    for (let i = 0; i < task_list.length; i++) {
        if(unDoneTab == task_list[i].done)
            continue;
        task_list_Dom.innerHTML +=
            `<li class="task-list-item"> 
                <label>
                    <input id="checkbox-${current_element_in_dom_tree}" type="checkbox" 
                    value="finished-task" 
                    class="finished-task-checkbox"
                    data-index="${i}"
                    ${task_list[i].done ? "checked" : ""}>
                    <span></span>
                </label>
                
                <label for="finished-task">${task_list[i].name}</label> 
                <button class="task-list-button edit-button"  data-index="${i}"><img  src="src/edit-button.png"/></button> 
                <button class="task-list-button delete-button"  data-index="${i}"><img  src="src/close.png"/></button>
            <p id="priority-text" class="${priorityText(task_list[i].priority).toLowerCase()}">${priorityText(task_list[i].priority)}</p>
            </li>`;
        current_element_in_dom_tree++;
    }
    checkbox = document.getElementsByClassName("finished-task-checkbox");

    for (let box of checkbox) {
    box.addEventListener("click", (event) => {
        const index = parseInt(event.target.dataset.index);
        toggleDone(event, index);
    });
    }

    removeButtons = document.getElementsByClassName("delete-button");

    for (let button of removeButtons) {
    button.addEventListener("click", (event) => {
        const index = parseInt(event.currentTarget.dataset.index);
        removeElement(event, index);
    });
    }

    editButtons = document.getElementsByClassName("edit-button");

    for (let button of editButtons) {
    button.addEventListener("click", (event) => {
        const index = parseInt(event.currentTarget.dataset.index);
        editElement(event, index);
    });
    }
}

function reArrangeItemPriority() {
    let tempArray = [];
    let current_priority = 3;
    while (tempArray.length != task_list.length) {
        for (let i = 0; i < task_list.length; i++) {
            if (task_list[i].priority == current_priority) {
                tempArray.push(task_list[i]);
            }
        }
        current_priority--;
    }

    return tempArray;
}

function priorityText(priority){
    return priority == 3? "Important":
        priority == 2? "Nomral":
        "Low";
}

function toggleTab()
{
    unDoneTab = !unDoneTab;
    if(button_undone.classList[0] == "inActiveTab")
    {
        button_undone.classList.remove("inActiveTab");
        button_undone.classList.add("activeTab");
        button_done.classList.remove("activeTab");
        button_done.classList.add("inActiveTab");
    }
    else{
        button_done.classList.remove("inActiveTab");
        button_done.classList.add("activeTab");
        button_undone.classList.remove("activeTab");
        button_undone.classList.add("inActiveTab");
    }
    renderList();
}


function toggleDone(event,index){
    task_list[index].done = !task_list[index].done;
    renderList();
}

function removeElement(event,index)
{
    task_list.splice(index, 1);
    renderList();
}

function editElement(event,index)
{
    task_input.value = task_list[index].name;
    priority.value = task_list[index].priority;
    removeElement(event,index);
}
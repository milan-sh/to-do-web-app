let input = document.getElementById("input");
let addButton = document.getElementById("add");
let selectedDiv = document.getElementById("added-task");
let deleteAll = document.getElementById("delete-all");
let counter = 0;

addButton.addEventListener("click", (event) => {
  if (input.value == "") {
    return;
  } else {
    event.preventDefault();
    event.stopPropagation();
    let date = new Date();
    selectedDiv.innerHTML += createTask(input)

    function createTask (input){
      return `
    <div class="task">
                <div class="left">
                  <input class="completed-check" type="checkbox" >
                  <p class="clip">${input.value}</p>
                </div>
                <p class="created-time">Added at: <span>${date.toLocaleTimeString()}</span></p>
                <button class="delete">Delete task</button>
    </div>
    `;
    }

    counter += 1;

    input.value = "";

    const deleteButtons = document.getElementsByClassName("delete");
    let taskArray = Array.from(deleteButtons);

    //deleting an element from my task list
    taskArray.forEach((element) => {
      element.addEventListener("click", deleteElement);
    });
    

    //delete parentNode function
    function deleteElement(event) {
      event.preventDefault();
      event.stopPropagation();
      event.currentTarget.parentNode.remove();
    }


    //keeping hidden all delete elements button
    if (counter >= 3) {
      deleteAll.classList.remove("hide");
    }
    //delete all the task if task are more than 3
    deleteAll.addEventListener("click", (e) => {
      e.preventDefault();
      selectedDiv.innerHTML = ""
    });

    
    //complete task function
    const checkBoxEl = document.getElementsByClassName("completed-check")
    let checkBoxArray = Array.from(checkBoxEl)
    function completeTask(e) {
      let date = new Date()
      e.currentTarget.disabled = true;
      e.currentTarget.style.cursor=  "not-allowed";
      e.currentTarget.parentNode.parentNode.classList.add("filter")
      e.currentTarget.parentNode.parentNode.innerHTML += `
      <p class="completed-time">Completed at: ${date.toLocaleTimeString()}</p>
      `
      

    }
    checkBoxArray.forEach(element => {
        element.addEventListener("click", completeTask)
    });
    
  }
});

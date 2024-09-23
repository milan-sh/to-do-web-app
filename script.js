let input = document.getElementById("input");
let addButton = document.getElementById("add");
let selectedDiv = document.getElementById("added-task");
let deleteAll = document.getElementById("delete-all");
let counter = 0;
let isEditingOpen = false;
let currentEditElement = null;  // Keep track of the element being edited

function changeContent(currentValue, newValue) {
  currentValue.innerHTML = newValue;
  isEditingOpen = false;
  currentEditElement = null;
}

addButton.addEventListener("click", (event) => {
  if (input.value === "") {
    return;
  } else if (isEditingOpen && currentEditElement) {
    // If in edit mode, update the task content
    changeContent(currentEditElement, input.value);
    input.value = "";  // Clear input after editing
    return;  // Exit early since we're editing, not adding
  } else {
    event.preventDefault();
    event.stopPropagation();
    let date = new Date();
    selectedDiv.innerHTML += createTask(input);

    function createTask(input) {
      return `
    <div class="task">
                <div class="left">
                  <input class="completed-check" type="checkbox" >
                  <p class="clip">${input.value}</p>
                </div>
                <p class="created-time">Added at: <span>${date.toLocaleTimeString()}</span></p>
                <img class='edit' src="./icons8-edit.svg" alt="">                
                <button class="delete">Delete task</button>
    </div>
    `;
    }

    input.value = "";
    counter += 1;
    
    // Show or hide the delete-all button based on task count
    if (counter >= 3) {
      deleteAll.classList.remove("hide");
    } else {
      deleteAll.classList.add("hide");
    }

    // Add event listeners for the newly created tasks
    addEventListeners();
  }
});

function addEventListeners() {
  // Event delegation for delete buttons
  const deleteButtons = document.getElementsByClassName("delete");
  let taskArray = Array.from(deleteButtons);
  taskArray.forEach((element) => {
    element.addEventListener("click", deleteElement);
  });

  // Complete task functionality
  const checkBoxEl = document.getElementsByClassName("completed-check");
  let checkBoxArray = Array.from(checkBoxEl);
  checkBoxArray.forEach((element) => {
    element.addEventListener("click", completeTask);
  });

  // Edit task functionality
  const editElements = document.getElementsByClassName("edit");
  const editElementsArray = Array.from(editElements);
  editElementsArray.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      isEditingOpen = true;
      currentEditElement = e.currentTarget.parentNode.firstElementChild.lastElementChild; // Save the element being edited
      input.value = currentEditElement.innerText;  // Load current value into input field
    });
  });
}

// Delete element function
function deleteElement(event) {
  event.preventDefault();
  event.stopPropagation();
  event.currentTarget.parentNode.remove();
  counter -= 1;

  // Update the visibility of the delete-all button
  if (counter < 3) {
    deleteAll.classList.add("hide");
  }
}

// Complete task function
function completeTask(e) {
  let date = new Date();
  e.currentTarget.disabled = true;
  e.currentTarget.style.cursor = "not-allowed";
  e.currentTarget.parentNode.parentNode.classList.add("filter");
  e.currentTarget.parentNode.parentNode.innerHTML += `
      <p class="completed-time">Completed at: ${date.toLocaleTimeString()}</p>
  `;
}

// Delete all tasks if tasks are more than 3
deleteAll.addEventListener("click", (e) => {
  e.preventDefault();
  selectedDiv.innerHTML = "";
  counter = 0; // Reset counter
  deleteAll.classList.add("hide");
});

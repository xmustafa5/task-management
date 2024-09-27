const btn = document.getElementById("btn");
const categories = document.getElementById("categories");

const checkExistingInput = () => {
  const existingInput = categories.querySelector("input:not([style*='display: none'])");
  btn.disabled = !!existingInput;
};

// Save the current categories to localStorage
const saveToLocalStorage = () => {
  const data = [];
  categories.querySelectorAll(".box").forEach((box) => {
    const text = box.querySelector("p")?.textContent || "";
    const tasks = [];
    box.querySelectorAll(".todo-list p").forEach((task) => {
      tasks.push(task.textContent);
    });
    data.push({ category: text, tasks });
  });
  localStorage.setItem("categories", JSON.stringify(data));
};

// Load categories from localStorage
const loadFromLocalStorage = () => {
  const savedData = JSON.parse(localStorage.getItem("categories") || "[]");
  savedData.forEach(({ category, tasks }) => {
    addNewBox(category, tasks);
  });
};

// Function to handle updating task paragraphs
const handleTaskUpdate = (taskElement, todoList) => {
  const editInput = document.createElement("input");
  editInput.value = taskElement.textContent; // Set input value to current task
  todoList.appendChild(editInput);
  taskElement.remove(); // Remove the paragraph
  editInput.focus();

  // Handle blur event to save the updated task
  editInput.addEventListener("blur", () => {
    const updatedTask = editInput.value || "No text entered"; // Default if empty
    const updatedP = document.createElement("p");
    updatedP.textContent = updatedTask;
    todoList.appendChild(updatedP);
    editInput.remove(); // Remove input after editing
    saveToLocalStorage(); // Save to localStorage after updating task

    // Allow clicking on the updated task for further editing
    updatedP.addEventListener("click", () => {
      handleTaskUpdate(updatedP, todoList); // Call the update function
    });
  });
};

// Function to add a new input box or paragraph
const addNewBox = (text = "", tasks = []) => {
  const newDiv = document.createElement("div");
  newDiv.classList.add("box");

  const input = document.createElement("input");
  input.setAttribute("placeholder", "Enter category");
  input.value = text;
  newDiv.appendChild(input);

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", () => {
    newDiv.remove(); // Remove the box from the DOM
    saveToLocalStorage(); // Update localStorage after deletion
    checkExistingInput();
  });
  newDiv.appendChild(deleteBtn); // Add delete button to the box

  const todoList = document.createElement("div");
  todoList.classList.add("todo-list");

  const addTaskBtn = document.createElement("button");
  addTaskBtn.textContent = "Add Task";
  addTaskBtn.classList.add("add-task-btn");
  newDiv.appendChild(addTaskBtn);

  addTaskBtn.addEventListener("click", () => {
    const taskInput = document.createElement("input");
    taskInput.setAttribute("placeholder", "Enter task");
    todoList.appendChild(taskInput);
    taskInput.focus();

    taskInput.addEventListener("blur", (e) => {
      const task = e.target.value;
      if (task) {
        const pr = document.createElement("p");
        pr.textContent = task;
        todoList.appendChild(pr);
        taskInput.remove(); // Remove input after task is entered
        saveToLocalStorage(); // Save to localStorage after adding task

        // Attach event listener for editing the task
        pr.addEventListener("click", () => {
          handleTaskUpdate(pr, todoList); // Call the update function
        });
      }
    });
  });

  newDiv.appendChild(todoList);

  // Load existing tasks
  if (tasks && tasks.length > 0) {
    tasks.forEach((task) => {
      const pr = document.createElement("p");
      pr.textContent = task;

      // Attach event listener for editing the task
      pr.addEventListener("click", () => {
        handleTaskUpdate(pr, todoList); // Call the update function
      });

      todoList.appendChild(pr);
    });
  }

  if (text) {
    // If text exists, switch to paragraph mode
    const p = document.createElement("p");
    p.textContent = text || "No text entered";
    newDiv.appendChild(p);
    input.style.display = "none"; // Hide input initially
    input.blur(); // Make sure input isn't focused

    // Allow click on the paragraph to turn it back into an input
    p.addEventListener("click", () => {
      input.style.display = "block";
      input.focus();
      p.remove();
      checkExistingInput();
    });
  }

  // When input loses focus, switch to paragraph mode
  input.addEventListener("blur", (e) => {
    const value = e.target.value || "No text entered";
    const p = document.createElement("p");
    p.textContent = value;

    newDiv.appendChild(p);
    input.style.display = "none"; // Hide input
    saveToLocalStorage(); // Save to localStorage after editing

    p.addEventListener("click", () => {
      input.style.display = "block";
      input.focus();
      p.remove();
      checkExistingInput();
    });
  });

  categories.appendChild(newDiv); // Add box to categories container
  input.focus(); // Automatically focus on the input

  checkExistingInput();
};

// Button click to add a new empty input
btn.addEventListener("click", () => {
  addNewBox();
});

// Load saved data from localStorage on page load
window.addEventListener("DOMContentLoaded", loadFromLocalStorage);

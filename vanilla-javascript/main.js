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

const handleTaskUpdate = (taskElement, todoList) => {
  const editInput = document.createElement("textarea");
  editInput.value = taskElement.textContent;
  todoList.insertBefore(editInput, taskElement); 
  taskElement.remove(); 
  editInput.focus();
  editInput.addEventListener("blur", () => {
    const updatedTask = editInput.value || "No text entered"; 
    const updatedP = document.createElement("p");
    updatedP.textContent = updatedTask;
    todoList.insertBefore(updatedP, editInput); 
    editInput.remove(); 
    saveToLocalStorage(); 
    updatedP.addEventListener("click", () => {
      handleTaskUpdate(updatedP, todoList); 
    });
  });
};


  const addNewBox = (text = "", tasks = []) => {
    const newDiv = document.createElement("div");
    newDiv.classList.add("box");
    const input = document.createElement("input");
    input.setAttribute("placeholder", "Enter category");
    input.value = text;
    newDiv.appendChild(input);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => {
      newDiv.remove(); // Remove the box from the DOM
      saveToLocalStorage(); // Update localStorage after deletion
      checkExistingInput();
    });
    newDiv.appendChild(deleteBtn);

    const todoList = document.createElement("div");
    todoList.classList.add("todo-list");

    const addTaskBtn = document.createElement("button");
    addTaskBtn.textContent = "Add Task";
    addTaskBtn.classList.add("add-task-btn");

    addTaskBtn.addEventListener("click", () => {
      const taskInput = document.createElement("textarea");
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


    if (tasks && tasks.length > 0) {
      tasks.forEach((task) => {
        const pr = document.createElement("p");
        pr.textContent = task;

        pr.addEventListener("click", () => {
          handleTaskUpdate(pr, todoList); 
        });

        todoList.appendChild(pr);
      });
    }

    if (text) {
      const p = document.createElement("p");
      p.textContent = text || "No text entered";
      newDiv.appendChild(p);
      input.style.display = "none"; 
      input.blur(); 
      p.addEventListener("click", () => {
        input.style.display = "block";
        input.focus();
        p.remove();
        checkExistingInput();
      });
    }

    input.addEventListener("blur", (e) => {
      const value = e.target.value || "No text entered";
      const p = document.createElement("p");
      p.textContent = value;
    
      newDiv.insertBefore(p, todoList);  
      input.style.display = "none"; 
      saveToLocalStorage();     
      p.addEventListener("click", () => {
        input.style.display = "block"; 
        input.focus();
        p.remove();  
        checkExistingInput();
      });
    });

    categories.appendChild(newDiv);
    input.focus(); 
    newDiv.appendChild(todoList);
    newDiv.appendChild(addTaskBtn);

    checkExistingInput();
  };

  btn.addEventListener("click", () => {
    addNewBox();
  });

  window.addEventListener("DOMContentLoaded", loadFromLocalStorage);

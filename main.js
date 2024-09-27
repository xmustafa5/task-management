const btn = document.getElementById("btn");
const categories = document.getElementById("categories");

const checkExistingInput = () => {
  const existingInput = categories.querySelector(
    "input:not([style*='display: none'])"
  );
  btn.disabled = !!existingInput;
};

// Save the current categories to localStorage
const saveToLocalStorage = () => {
  const data = [];
  categories.querySelectorAll(".box").forEach((box) => {
    const text = box.querySelector("p")?.textContent || "";
    data.push(text);
  });
  localStorage.setItem("categories", JSON.stringify(data));
};

// Load categories from localStorage
const loadFromLocalStorage = () => {
  const savedData = JSON.parse(localStorage.getItem("categories") || "[]");
  savedData.forEach((text) => {
    addNewBox(text); // Pass saved text to create boxes
  });
};

// Function to add a new input box or paragraph
const addNewBox = (text = "") => {
  const newDiv = document.createElement("div");
  newDiv.classList.add("box");

  const input = document.createElement("input");
  input.setAttribute("placeholder", "Enter text");
  input.value = text;
  newDiv.appendChild(input);
  //delete
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", () => {
    newDiv.remove(); // Remove the box from the DOM
    saveToLocalStorage(); // Update localStorage after deletion
    checkExistingInput();
  });
  newDiv.appendChild(deleteBtn); // Add delete button to the box

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



const btn = document.getElementById("btn");
const categories = document.getElementById("categories");

const checkExistingInput = () => {
  const existingInput = categories.querySelector(
    "input:not([style*='display: none'])"
  );
  btn.disabled = !!existingInput;
};

btn.addEventListener("click", () => {
  const newDiv = document.createElement("div");
  newDiv.classList.add("box");

  const input = document.createElement("input");
  input.setAttribute("placeholder", "Enter text");

  newDiv.appendChild(input);
  categories.appendChild(newDiv);

  input.addEventListener("blur", (e) => {
    const p = document.createElement("p");
    p.textContent = e.target.value || "No text entered"; // Default text if input is empty
    newDiv.appendChild(p);
    input.style.display = "none";
    checkExistingInput();

    p.addEventListener("click", () => {
      input.style.display = "block";
      p.remove();
      checkExistingInput();
    });
  });

  checkExistingInput();
});

const ulEl = document.querySelector("ul");

// When I click on the checkbox of a list item, I want to give the
// illusion I've completed the item by manipulating the HTML/CSS so
// it looks done. How did we do that when we hard coded our markup?
function toggleItem(id) {
  const rowEl = document.getElementById(id);
  rowEl.classList.toggle("done");
}

// When I click on the delete button, I want to delete the <li> tag
// in the DOM so it looks like we actually deleted the item.
function deleteItem(id) {
  if (confirm("Are you sure you want to delete?")) {
    const rowEl = document.getElementById(id);
    rowEl.remove();
  }
}

// When I add some in the text box and press enter, it should add
// a new LI and append it to the UL tag. I can do this a couple of
// ways, but either way requires me to retrieve what I typed in my
// form.

let listIndex = 1;

// ...or the longer and complete
// way, using createElement and the DOM.
function submitForm() {
  event.preventDefault();

  // querySelectors take in CSS looking stuff as a parameter
  const formInputEl = document.querySelector(".form-control");
  let taskId = "task-" + listIndex;

  // createElement: creates DOM elements
  const liEl = document.createElement("li");
  liEl.setAttribute("id", taskId);
  liEl.innerHTML = `<label><input onclick="toggleItem('${taskId}')" type="checkbox" />${formInputEl.value}</label>
        <button onclick="deleteItem('${taskId}')">
          Delete
        </button>`;

  // appendChild: appends that createElement'ed element to the DOM tree
  ulEl.appendChild(liEl);
  listIndex++;
}

// Call the GET items API when we load the client page
fetch("/api/items/")
  .then((response) => response.json())
  .then((data) => {
    console.log("From GET fetch", data);
  })
  .catch((error) => {
    console.error("Error", error);
  });

// I could have ALSO not used innerHTML at ALL, and used a combination
// of createElements, appendChilds, setAttributes and addEventListeners.

// What do you think are the pros and cons of both? Which ones do
// you like better?

// Finally, what if I wanted to not include onsubmit to the index.html form?
// What if I just wanted to include it dynamically inside this JavaScript?
document.querySelector("form").addEventListener("submit", submitForm);

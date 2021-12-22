const listItems = document.querySelectorAll(".list-item");
const lists = document.querySelectorAll(".list");

let draggedItem = null;

// Loop through each dragable item
listItems.forEach((item) => {
  // Fire event for drag start
  item.addEventListener("dragstart", function () {
    draggedItem = item;
    // Add timeout to keep the item visible until the event is complete
    setTimeout(function () {
      item.style.display = "none";
    }, 0);
  });
  // Fire event for drag end
  item.addEventListener("dragend", function () {
    setTimeout(function () {
      // Once completed, turn item back into flex
      draggedItem.style.display = "flex";
      draggedItem = null;
    }, 0);
  });
});

// Loop through each column
lists.forEach((list) => {
  // Fire event for dragover and prevent page reload
  list.addEventListener("dragover", function (e) {
    e.preventDefault();
  });
  // Fire event for enter
  list.addEventListener("dragenter", function (e) {
    e.preventDefault();
    this.style.background = "var(--lightblue)";
    this.style.border = "2px dashed var(--darkgrey)";
    this.style.borderRadius = "5px";
  });
  // Fire event for leave
  list.addEventListener("dragleave", function (e) {
    this.style.border = "";
    this.style.background = "";
  });
  // Fire event for drop
  list.addEventListener("drop", function (e) {
    console.log("drop");
    this.append(draggedItem);
    this.style.border = "";
    this.style.background = "";
  });
});

//
//
//
//
//

const settingBtn = document.querySelector("#setting-btn");
const buttons = document.querySelectorAll(".nav .button");

buttons.forEach((button) => {
  settingBtn.addEventListener("click", (e) => {
    button.classList.toggle("show");
  });
});

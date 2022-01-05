// FUNCTION: Hide/Show setting buttons
const settingBtn = document.querySelector("#setting-btn");
const buttons = document.querySelectorAll(".nav .button");
const clearBtn = document.querySelector(".btn-1");
const saveBtn = document.querySelector(".btn-2");
const randomBtn = document.querySelector(".btn-3");
const myCanvas = document.querySelector("#canvas");
const newParents = document.querySelectorAll(".new-parent");
const oldParent = document.querySelector(".old-parent");

// Toggle show classlist to all setting's buttons
buttons.forEach((button) => {
  settingBtn.addEventListener("click", (e) => {
    button.classList.toggle("show");
  });
});
// FUNCTION: Clear table
clearBtn.addEventListener("click", () => {
  newParents.forEach((newParent) => {
    while (newParent.children.length > 1) {
      console.log(newParent.children[newParent.children.length - 1]);
      oldParent.appendChild(newParent.children[newParent.children.length - 1]);
      // newParent.removeChild(newParent.lastChild);
    }
  });
});
//
//
//
// FUNCTION: API and display data on html
import FetchWrapper from "./fetch-wrapper.js";
const key = "?apiKey=5129b66ccd2e4b24bbf9a50c64043303" + "&";
//main key ?apiKey=93d3b9134b1d4c44ae5f9dd1b9800b0d danneytrieu
//backup key ?apiKey=98bce4c26d4a425bb4183176fc75629f hannah
//backup key ?apiKey=9cb20095529e4d41a996938e730404a6 danneytrieuwork
//backup key ?apiKey=a41414bac2184fb09f45f9c7fd1a3fc6 jlim
//backup key ?apiKey=5129b66ccd2e4b24bbf9a50c64043303 phanuyenryna

const API = new FetchWrapper("https://api.spoonacular.com/");
const generateMeals = async () => {
  const datas = await API.get(
    //endpoint details: https://spoonacular.com/food-api/docs#Search-Recipes-by-Nutrients
    //this endpoint allow to collect datas base on macro nutrients value
    `recipes/findByNutrients${key}?maxCalories=300&minCarbs=15&minProtein=15&minFat=15&number=31`
  );
  let card = "";
  //inject user's info: id (use to retrieve detail), image, title, calories, carbs, protein, fat
  datas.map((data) => {
    card += `
          <!-- single card  -->
          <li class="list-item" draggable="true">
            <div class="drag-icon">
              <i id="drag" class="fas fa-grip-vertical"></i>
              <i id="trash" class="far fa-trash-alt"></i>
            </div>
            <div class="img-wrapper">
              <button draggable="false" class="item-info">VIEW</button>
              <img
                class="item-img"
                src="${data.image}"
                draggable="false"
                alt="thumbnail"
              />
            </div>
            <article class="content-front">
              <h3 class="item-title">${data.title.substring(0, 20)}</h3>
              <p class="item-calories">(${data.calories} Kcal)</p>
            </article>
            <article class="content-back">
              <p class="item-protein">Protein: ${data.protein}</p>
              <p class="item-carbs">Carbs: ${data.carbs}</p>
              <p class="item-fat">Fat: ${data.fat}</p>
            </article>
            <div class="item-id">${data.id}</div>
          </li>
          <!-- end single card  -->`;
  });
  document.querySelector("#list").innerHTML = card;

  // FUNCTION: Move items into Weekly table
  const oldParent = document.querySelector(".old-parent");
  const newParents = document.querySelectorAll(".new-parent");

  newParents.forEach((newParent) => {
    while (newParent.children.length <= 3) {
      newParent.appendChild(oldParent.children[0]);
    }
  });

  //
  //
  //
  //
  //
  // FUNCTION: Trash button
  const trashBtns = document.querySelectorAll("#trash");
  // lopp through all trash btns and remove grandparent element
  trashBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.parentElement.parentElement.remove();
    });
  });
  //
  //
  //
  //
  //
  // FUNCTION: Dragable function
  const listItems = document.querySelectorAll(".list-item");
  const lists = document.querySelectorAll("#list");
  //
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
      e.currentTarget.style.background = "var(--lightblue)";
      e.currentTarget.style.border = "2px dotted var(--darkgrey)";
      e.currentTarget.style.borderRadius = "5px";
    });
    // Fire event for leave
    list.addEventListener("dragleave", function (e) {
      e.currentTarget.style.border = "";
      e.currentTarget.style.background = "";
    });
    // Fire event for drop
    list.addEventListener("drop", function (e) {
      e.currentTarget.append(draggedItem);
      e.currentTarget.style.border = "";
      e.currentTarget.style.background = "";
    });
  });

  //
  //
  //
  //
  //
  // FUNCTION: MODAL
  const modalOpenBtns = document.querySelectorAll(".item-info");
  const modalCloseBtn = document.querySelector(".modal-close");
  const modalContainer = document.querySelector(".modal-container");
  const modalContent = document.querySelector(".modal-content");

  // hide-show modal
  modalOpenBtns.forEach((btn) => {
    // handle hide modal
    btn.addEventListener("click", async (e) => {
      modalContainer.classList.add("show-hide");
      // receive mealID to use for recipe detail API
      const mealID =
        e.currentTarget.parentElement.parentElement.lastElementChild.innerHTML;
      const data = await API.get(
        `recipes/${mealID}/information${key}includeNutrition=true`
      );
      // insert content
      modalContent.innerHTML = `
          <h3 class="modal-title">${data.title}</h3>
          <h4 class="modal-type">Dish Type: ${data.dishTypes}</h4>
          <h5 class="modal-servings">Servings Size: ${data.servings}</h5>
          <p class="modal-summary">Summary: ${data.summary}</p>
          `;
    });
    //close modal
    modalCloseBtn.addEventListener("click", (e) => {
      modalContainer.classList.remove("show-hide");
    });
  });
};
TODO: generateMeals();

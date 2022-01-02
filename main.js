//
//
//
//
//
//
// FUNCTION: API for item card
import FetchWrapper from "./fetch-wrapper.js";
const key = "?apiKey=9cb20095529e4d41a996938e730404a6";
//9cb20095529e4d41a996938e730404a6 danneytrieuwork
//93d3b9134b1d4c44ae5f9dd1b9800b0d danneytrieu
const API = new FetchWrapper("https://api.spoonacular.com/");
const randomMeal = async () => {
  const datas = await API.get(
    //endpoint details: https://spoonacular.com/food-api/docs#Search-Recipes-by-Nutrients
    `recipes/findByNutrients${key}&?maxCalories=500&minCarbs=20&minProtein=20&minFat=20&number=31`
  );
  let card = "";
  //Todo: inject user's info: image, title, calories, carbs, protein, fat
  datas.map((data) => {
    card += `
          <!-- single card  -->
          <li class="list-item" draggable="true">
            <div class="drag-icon">
              <i id="drag" class="fas fa-grip-vertical"></i>
              <i id="trash" class="far fa-trash-alt"></i>
            </div>
            <div class="img-wrapper">
              <button draggable="false" class="item-info">
                <a draggable="false" href="#">VIEW</a>
              </button>
              <img
                class="item-img"
                src="${data.image}"
                draggable="false"
                alt="thumbnail"
              />
            </div>
            <article class="content-front">
              <h3 class="item-title">${data.title.substring(0, 20)}</h3>
              <p class="item-calories">(${data.calories} Cal)</p>
            </article>
            <article class="content-back">
              <p class="item-protein">Protein: ${data.protein}</p>
              <p class="item-carbs">Carbs: ${data.carbs}</p>
              <p class="item-fat">Fat: ${data.fat}</p>
            </article>
          </li>
          <!-- end single card  -->`;
  });
  document.querySelector("#list").innerHTML = card;
};
randomMeal(); 
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
// FUNCTION: Hide/Show buttons
const settingBtn = document.querySelector("#setting-btn");
const buttons = document.querySelectorAll(".nav .button");
// Toggle show classlist to all setting's buttons
buttons.forEach((button) => {
  settingBtn.addEventListener("click", (e) => {
    button.classList.toggle("show");
  });
});

//
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

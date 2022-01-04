// open modal
btn.addEventListener("click", async (e) => {
  modal.classList.add("show-hide");
  // fetch api and display inside modal
  const data = await API.get("url");
  modal.innerHTML = `
      <article class="modal">
          <h3 class="modal-title">${data.title}</h3>
          <button class="modal-close-btn">CLOSE</button>
        </article>`;
});
//close modal
modalCloseBtn.addEventListener("click", (e) => {
  modalContainer.classList.remove("show-hide");
});

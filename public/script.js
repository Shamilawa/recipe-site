const openForm = document.getElementById("open-form");
const formModalContainer = document.getElementById("form-modal-container");
const closeForm = document.getElementById("close-form");

openForm.addEventListener("click", function(){
    formModalContainer.classList.add("form-show");
});

closeForm.addEventListener("click", function(){
    formModalContainer.classList.remove("form-show");
});
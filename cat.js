let addCat = document.querySelector(".add_cat");
let addNewAnimal = document.querySelector(".add_new_animal");
addCat.onclick = () => {
    addNewAnimal.hidden = false
};

let closeRegForm = document.getElementById("close_reg_form");
closeRegForm.onclick = () => {
    addNewAnimal.hidden = true
};
let addDog = document.querySelector(".add_dog");
let addNewAnimal = document.querySelector(".add_new_dog");
addDog.onclick = () => {
    addNewAnimal.hidden = false
};

let closeRegForm = document.getElementById("close_reg_form");
closeRegForm.onclick = () => {
    addNewAnimal.hidden = true
};
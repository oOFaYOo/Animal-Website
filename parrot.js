let addParrot = document.querySelector(".add_parrot");
let addNewAnimal = document.querySelector(".add_new_parrot");
addParrot.onclick = () => {
    addNewAnimal.hidden = false
};

let closeRegForm = document.getElementById("close_reg_form");
closeRegForm.onclick = () => {
    addNewAnimal.hidden = true
};
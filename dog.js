let addDog = document.querySelector(".add_dog");
let addNewAnimal = document.querySelector(".add_new_dog");
addDog.onclick = () => {
    addNewAnimal.hidden = false
};

let closeRegForm = document.getElementById("close_reg_form");
closeRegForm.onclick = () => {
    addNewAnimal.hidden = true
};

let oldOwner = document.getElementById("old_owner");
let newOwner = document.getElementById("new_owner");
let descriptionNewOwner = document.getElementById("description_of_NewOwner");

oldOwner.onchange = () => {
    descriptionNewOwner.hidden = true;
    document.querySelector(".phone_OldOwner").hidden = false;
    document.getElementById("phone_num").disabled = "disabled";
    document.getElementById("name_of_owner").disabled = "disabled";

};
newOwner.onchange = () => {
    descriptionNewOwner.hidden = false;
    document.querySelector(".phone_OldOwner").hidden = true;
    document.getElementById("phone_num").removeAttribute("disabled");
    document.getElementById("name_of_owner").removeAttribute("disabled");
    document.getElementById("phone_OldOwner").disabled = "disabled";
};

document.getElementById("button_reset").onclick = () => {
    descriptionNewOwner.hidden = false;
    document.querySelector(".phone_OldOwner").hidden = true;
    document.getElementById("phone_num").removeAttribute("disabled");
    document.getElementById("name_of_owner").removeAttribute("disabled");
    document.getElementById("phone_OldOwner").disabled = "disabled";
};

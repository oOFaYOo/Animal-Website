// GET /pets
// PUT /pets
// GET /pets/types
// GET /pets/parrotFeathersColors
// GET /owners
// GET /owners/{ownerId}
// PUT /owners
// 192.168.0.104:5000 //ноут
// 192.168.0.101:5000 //комп

let oldOwner = document.getElementById("old_owner");
let newOwner = document.getElementById("new_owner");
let descriptionNewOwner = document.getElementById("description_of_NewOwner");
let phoneNum = document.getElementById("phone_num");
let nameOfOwner = document.getElementById("name_of_owner");
let phoneOldOwner = document.getElementById("phone_OldOwner");
let phoneOldOwnerArea = document.querySelector(".phone_OldOwner");

document.getElementById("close_reg_form").onclick = () => {
    document.getElementById("add_new_animal").hidden = true
};
document.getElementById("button_for_newAnimal").onclick = () => {
    document.getElementById("add_new_animal").hidden = false
};

oldOwner.onchange = () => {
    descriptionNewOwner.hidden = true;
    if (descriptionNewOwner.hidden === true) {
        phoneNum.disabled = "disabled";
        nameOfOwner.disabled = "disabled";
        phoneNum.removeAttribute("required");
        nameOfOwner.removeAttribute("required");
        phoneOldOwner.required = "required";
    }
    phoneOldOwnerArea.hidden = false;
    phoneOldOwner.removeAttribute("disabled");
    nameOfOwner.value = "";
    phoneNum.value = "";
};

newOwner.onchange = () => {
    if (descriptionNewOwner.hidden === false) {
        phoneOldOwner.disabled = "disabled";
    }
    phoneNum.required = "required";
    nameOfOwner.required = "required";
    phoneOldOwner.removeAttribute("required");
    descriptionNewOwner.hidden = false;
    phoneOldOwnerArea.hidden = true;
    phoneNum.removeAttribute("disabled");
    nameOfOwner.removeAttribute("disabled");
    phoneOldOwner.value = "";
};

document.getElementById("button_reset").onclick = () => {
    descriptionNewOwner.hidden = false;
    phoneOldOwnerArea.hidden = true;
    phoneNum.removeAttribute("disabled");
    nameOfOwner.removeAttribute("disabled");
    phoneOldOwner.disabled = "disabled";
};


let get_pets = new XMLHttpRequest();
get_pets.open("get", "http://192.168.0.101:5000/pets",false);

get_pets.send();
// JSON.parse(get_pets.response);
console.log(get_pets.response);
class animal {
    constructor(name, gender, breed, age){
    this.name = name;
    this.gender = gender;
    this.breed = breed;
    this.age = age;
}
}


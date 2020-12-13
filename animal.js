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
let allPetsWithTypeNum = JSON.parse(get_pets.response);

let pets_type = new XMLHttpRequest();
pets_type.open("get", "http://192.168.0.101:5000/pets/types", false);
pets_type.send();
let listOfPetsType = JSON.parse(pets_type.response);
let allPetsWithoutFeathersColor = [];
let allPets = [];


let parrotFeathersColors = new XMLHttpRequest();
parrotFeathersColors.open("get", "http://192.168.0.101:5000/pets/parrotFeathersColors", false);
parrotFeathersColors.send();
let feathersColors = JSON.parse(parrotFeathersColors.response);

function changeType (arr, obj) {
    for (let key in obj) {
        for (let part of arr) {
            if (`${part.Type}` === key) {
                part.Type = obj[key];
                allPetsWithoutFeathersColor.push(part);
            }
        }
   }
}
function choiceFeathersColor (arr, obj) {
    for (let key in obj) {
        for (let part of arr) {
            if (`${part.FeathersColor}` === key) {
                part.FeathersColor = obj[key];
            }
            allPets.push(part);
        }
    }
}

changeType(allPetsWithTypeNum, listOfPetsType);
choiceFeathersColor(allPetsWithoutFeathersColor, feathersColors)

class Animals {
    constructor(type, name, breed, age){
    this.type = type;
    this.name = name;
    this.breed = breed;
    this.age = age;
}
}
class Cats extends Animals{
}
class Dogs extends Animals{
    constructor(type, name, breed, age, size){
        super(type, name, breed, age);
        this.size = size;
    }
}
class Parrots extends Animals{
    constructor(type, name, breed, age, color){
        super(type, name, breed, age);
        this.color = color;
    }
}

function IdentifyAnimal(arrOfObj) {
    for (let part of arrOfObj) {
        switch (part.Type) {
            case "Cat":
                UnvalidatedCats.push(new Cats(part.Type, part.Name, part.Breed, part.Age));
                break;
            case "Dog":
                UnvalidatedDogs.push(new Dogs(part.Type, part.Name, part.Breed, part.Age, part.IsBigDog));
                break;
            case "Parrot":
                UnvalidatedParrots.push(new Parrots(part.Type, part.Name, part.Breed, part.Age, part.FeathersColor));
                break;
        }
    }
}

let UnvalidatedCats = [];
let UnvalidatedDogs = [];
let UnvalidatedParrots = [];

IdentifyAnimal(allPets);

let cats =[];
let dogs = [];
let parrots = [];

function animalValidation(arrOfAnimal) {
    for (let part of arrOfAnimal) {
        if (part.name !== null && part.name !== " " && part.name !== "" && isNaN(part.name) && part.breed !== " " && part.breed !== "" && isNaN(part.breed) && typeof (part.age) === "number") {
            if (part.type === "Cat")
                cats.push(part);
            if (part.type === "Dog")
                dogs.push(part);
            if (part.type === "Parrot")
                parrots.push(part);
        }
    }
}

animalValidation(UnvalidatedCats);
animalValidation(UnvalidatedDogs);
animalValidation(UnvalidatedParrots);

dogs = dogs.map((item)=>{
    if(item.size){item.size = "большой"; return item}
    else {item.size = "маленький"; return item}
});

console.log(cats);
console.log(dogs);
console.log(parrots);
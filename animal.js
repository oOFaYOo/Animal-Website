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


class ApiClient {
    static getPets = function(){
        let pets = new XMLHttpRequest();
        pets.open("get", "http://192.168.0.101:5000/pets",false);
        pets.send();
        return JSON.parse(pets.response);
    };
    static getPetsType = function() {
        let petsType = new XMLHttpRequest();
        petsType.open("get", "http://192.168.0.101:5000/pets/types", false);
        petsType.send();
        return JSON.parse(petsType.response);
    };
    static getFeathersColors = function () {
        let feathersColors = new XMLHttpRequest();
        feathersColors.open("get", "http://192.168.0.101:5000/pets/parrotFeathersColors", false);
        feathersColors.send();
        return JSON.parse(feathersColors.response);
    };
}

let allPets_noEditTypeAndColor = new ApiClient.getPets();
let typesOfAnimals = new ApiClient.getPetsType();
let feathersColors = new ApiClient.getFeathersColors();


function getCorrectType (arr, obj) {
    let someArr = [];
    for (let key in obj) {
        for (let part of arr) {
            if (`${part.Type}` === key) {
                part.Type = obj[key];
                someArr.push(part);
            }
        }
   }
    return someArr;
}

let allPets_noEditColor = getCorrectType(allPets_noEditTypeAndColor, typesOfAnimals);

function getCorrectFeathersColor (arr, obj) {
    let someArr = [];
    for (let part of arr) {
        if (part.FeathersColor !== undefined){
            for (let key in obj) {
                if (`${part.FeathersColor}` === key) {
                    part.FeathersColor = obj[key];
                }
            }
        }

        someArr.push(part);
    }
    return someArr;
}

let allPetsUnvalidatedUnidentified = getCorrectFeathersColor(allPets_noEditColor, feathersColors);


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

function IdentifyAnimals(arr) {
    let someArr = [];
    for (let part of arr) {
        switch (part.Type) {
            case "Cat":
                someArr.push(new Cats(part.Type, part.Name, part.Breed, part.Age));
                break;
            case "Dog":
                someArr.push(new Dogs(part.Type, part.Name, part.Breed, part.Age, part.IsBigDog));
                break;
            case "Parrot":
                someArr.push(new Parrots(part.Type, part.Name, part.Breed, part.Age, part.FeathersColor));
                break;
        }
    }
    return someArr;
}

let allPetsUnvalidated = IdentifyAnimals(allPetsUnvalidatedUnidentified);

function animalValidation(arr) {
    let someArr = [];
    for (let part of arr) {
        if (part.name !== null && part.name !== " " && part.name !== "" && isNaN(part.name) && part.breed !== " " && part.breed !== "" && isNaN(part.breed) && typeof (part.age) === "number") {
            someArr.push(part);
        }
    }
    return someArr;
}

let allPets = animalValidation(allPetsUnvalidated);

function setCorrectSize(obj){
    if(obj.size){
        obj.size = "Большой"}
    else if (obj.size === false){obj.size = "Маленький"}
}

allPets.map(setCorrectSize);



function constructAnimalElement(animal) {

    let container = document.createElement("details");
    container.className = "animal_description";
    container.innerHTML = `<summary class="name_of_animal_desc"><p class="Name">${animal.name}</p></summary>`;

    let gender = document.createElement("p");
    gender.innerHTML = "Пол: Мужской";
    container.append(gender);

    let breed = document.createElement("p");
    breed.innerHTML = "Порода: " + animal.breed;
    container.append(breed);

    let age = document.createElement("p");
    age.innerHTML = "Возраст: " + animal.age;
    container.append(age);

    if (animal.type.toLowerCase() === "parrot"){
        let color = document.createElement("p");
        color.innerHTML = "Цвет перьев: " + animal.color;
        container.append(color);
    }

    if (animal.type.toLowerCase() === "dog"){
        let size = document.createElement("p");
        size.innerHTML = "Размер: " + animal.size;
        container.append(size);
    }

    let ownerContainer = document.createElement("details");
    ownerContainer.className = "owner_description";
    ownerContainer.innerHTML = '<summary class="owner"><p>' + 'ВЛАДЕЛЕЦ' + '</p></summary>';
    container.append(ownerContainer);

    let ownerName = document.createElement("p");
    ownerName.className = "OwnerName";
    ownerName.innerHTML = "ФИО:";
    ownerContainer.append(ownerName);

    let ownerId = document.createElement("p");
    ownerId.className = "OwnerNum";
    ownerId.innerHTML = "Телефон:";
    ownerContainer.append(ownerId);

    return container;

}

function showInWebSite(animals) {
    let animalsList = document.getElementById("main_info");
    for (let animal of animals) {
        let animalElement = constructAnimalElement(animal);
        animalsList.append(animalElement);

    }

}

let animalTypeNow = document.getElementById("main_info").getAttribute("type");

let petsForShow = allPets.filter((item)=>item.type.toLowerCase() === animalTypeNow.toLowerCase());

showInWebSite(petsForShow);




// document.getElementById("button_submit").onclick = () => {
//     let regFormPet = new XMLHttpRequest();
//     regFormPet.open("put", "http://192.168.0.101:5000/pets", false);
//     regFormPet.send();
//     let regFormOwner = new XMLHttpRequest();
//     regFormOwner.open("put", "http://192.168.0.101:5000/owners", false);
//     regFormOwner.send();
// };
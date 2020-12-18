// GET /pets
// GET /pets/types
// GET /pets/parrotFeathersColors
// GET /owners
// GET /owners/{ownerId}
// PUT /pets
// PUT /owners
// 192.168.0.101:5000 //комп
// 192.168.0.104:5000 //ноут

const apiUrl = "http://192.168.0.104:5000/";

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
    static getPets = function () {
        let pets = new XMLHttpRequest();
        pets.open("get", apiUrl + "pets", false);
        pets.send();
        return JSON.parse(pets.response);
    };
    static getPetsType = function () {
        let petsType = new XMLHttpRequest();
        petsType.open("get", apiUrl + "pets/types", false);
        petsType.send();
        return JSON.parse(petsType.response);
    };
    static getFeathersColors = function () {
        let feathersColors = new XMLHttpRequest();
        feathersColors.open("get", apiUrl + "pets/parrotFeathersColors", false);
        feathersColors.send();
        return JSON.parse(feathersColors.response);
    };

    static getOwner(ownerID) {
        let owner = new XMLHttpRequest();
        owner.open("get", apiUrl + `owners/${ownerID}`, false);
        owner.send();
        if (owner.status !== 200) {
            return {fullName: " ", phoneNumber: " "}
        }
        return JSON.parse(owner.response);
    }

    static getGender = function () {
        let gender = new XMLHttpRequest();
        gender.open("get", apiUrl + "pets/sex", false);
        gender.send();
        return JSON.parse(feathersColors.response);
    };

    static putOwner = function (obj) {
        let regFormOwner = new XMLHttpRequest();
        regFormOwner.open("put", apiUrl + "owners", false);
        regFormOwner.setRequestHeader("Content-Type", "application/json");
        // regFormOwner.setRequestHeader("Access-Control-Allow-Origin", "*");
        regFormOwner.send(JSON.stringify(obj));

        if (regFormOwner.status === 200) {
            return regFormOwner.response;
        }

        throw new Error(regFormOwner.status);
    };

    static putPet = function (obj) {
        let regFormPet = new XMLHttpRequest();
        regFormPet.open("put", apiUrl + "pets", false);
        regFormPet.setRequestHeader("Content-Type", "application/json");
        regFormPet.setRequestHeader("Access-Control-Allow-Origin", "*");
        regFormPet.send(JSON.stringify(obj));
        if (regFormPet.status === 200) {
            return;
        }
        throw new Error(regFormPet.status)
    }
}


let allPets_noEditTypeAndColor = ApiClient.getPets();
let typesOfAnimals = ApiClient.getPetsType();
let feathersColors = ApiClient.getFeathersColors();


function setCorrectType(arr, obj) {
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

let allPets_noEditColor = setCorrectType(allPets_noEditTypeAndColor, typesOfAnimals);

function setCorrectFeathersColor(arr, obj) {
    let someArr = [];
    for (let part of arr) {
        if (part.FeathersColor !== undefined) {
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

let allPetsUnvalidatedUnidentified = setCorrectFeathersColor(allPets_noEditColor, feathersColors);

class Animals {
    constructor(type, name, breed, age, id, gender) {
        this.type = type;
        this.name = name;
        this.breed = breed;
        this.age = age;
        this.gender = gender;
        this.ownerName = ApiClient.getOwner(id).fullName;
        this.ownerPhone = ApiClient.getOwner(id).phoneNumber;
    }
}

class Cats extends Animals {
}

class Dogs extends Animals {
    constructor(type, name, breed, age, size, id, gender) {
        super(type, name, breed, age, id, gender);
        this.size = size;
    }
}

class Parrots extends Animals {
    constructor(type, name, breed, age, color, id, gender) {
        super(type, name, breed, age, id, gender);
        this.color = color;
    }
}

function IdentifyAnimals(arr) {
    let someArr = [];
    for (let part of arr) {
        switch (part.Type) {
            case "Cat":
                someArr.push(new Cats(part.Type, part.Name, part.Breed, part.Age, part.Owner, part.Sex));
                break;
            case "Dog":
                someArr.push(new Dogs(part.Type, part.Name, part.Breed, part.Age, part.IsBigDog, part.Owner, part.Sex));
                break;
            case "Parrot":
                someArr.push(new Parrots(part.Type, part.Name, part.Breed, part.Age, part.FeathersColor, part.Owner, part.Sex));
                break;
        }
    }
    return someArr;
}

let allPetsUnvalidated = IdentifyAnimals(allPetsUnvalidatedUnidentified);

function animalValidation(arr) {
    let someArr = [];
    for (let part of arr) {
        if (part.name !== null && part.name !== " " && part.name !== "" && isNaN(part.name) &&
            part.breed !== " " && part.breed !== "" && isNaN(part.breed) &&
            typeof (part.age) === "number" &&
            part.ownerName !== null && part.ownerName !== " " && part.ownerName !== "" && isNaN(part.ownerName)) {
            someArr.push(part);
        }
    }
    return someArr;
}


let allPets = animalValidation(allPetsUnvalidated);

function setCorrectSize(obj) {
    if (obj.size) {
        obj.size = "Большой"
    } else if (obj.size === false) {
        obj.size = "Маленький"
    }
}

function setCorrectGender(obj) {
    if (obj.gender === 1) {
        obj.gender = "Женский"
    } else if (obj.gender === 0) {
        obj.gender = "Мужской"
    }
}

allPets.map(setCorrectGender);

allPets.map(setCorrectSize);


function constructAnimalElement(animal) {

    let container = document.createElement("details");
    container.className = "animal_description";
    container.innerHTML = `<summary class="name_of_animal_desc"><p class="Name">${animal.name}</p></summary>`;

    let gender = document.createElement("p");
    gender.innerHTML = "Пол: " + animal.gender;
    container.append(gender);

    let breed = document.createElement("p");
    breed.innerHTML = "Порода: " + animal.breed;
    container.append(breed);

    let age = document.createElement("p");
    age.innerHTML = "Возраст: " + animal.age;
    container.append(age);

    if (animal.type.toLowerCase() === "parrot") {
        let color = document.createElement("p");
        color.innerHTML = "Цвет перьев: " + animal.color;
        container.append(color);
    }

    if (animal.type.toLowerCase() === "dog") {
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
    ownerName.innerHTML = "ФИО: " + animal.ownerName;
    ownerContainer.append(ownerName);

    let ownerId = document.createElement("p");
    ownerId.className = "OwnerNum";
    ownerId.innerHTML = "Телефон: " + animal.ownerPhone;
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

let petsForShow = allPets.filter((item) => item.type.toLowerCase() === animalTypeNow.toLowerCase());

showInWebSite(petsForShow);

function setColorsForWebsite(obj) {
    for (let key in obj) {
        let color = document.getElementById(`color${key}`);
        color.innerHTML = obj[key];
    }
}

if (animalTypeNow === "parrot") {
    setColorsForWebsite(ApiClient.getFeathersColors());
}


////////////////////////////////////////////////////////////////////////


document.getElementsByTagName("form")[0].onsubmit = registration;

function registration() {
    try {
        let ownerID = ApiClient.putOwner({
            phoneNumber: document.getElementById("phone_num").value,
            fullName: document.getElementById("name_of_owner").value
        });

        let animalForReg = {
            type: (() => {
                if (document.getElementsByTagName("form")[0].className === "parrot_reg") {
                    return 2
                } else if (document.getElementsByTagName("form")[0].className === "cat_reg") {
                    return 0
                } else if (document.getElementsByTagName("form")[0].className === "dog_reg") {
                    return 1
                }
            })(),
            name: document.getElementById("name_of_animal").value,
            sex: +document.getElementsByClassName("gender")[0],
            age: +document.getElementById("age_of_animal").value,
            breed: document.getElementById("breed_of_animal").value,
        };

        if (document.getElementsByTagName("form")[0].className === "dog_reg") {
            animalForReg.isBigDog = () => {
                if (document.getElementsByClassName("size")[0].value === "small") {
                    return false
                } else if (document.getElementsByClassName("size")[0].value === "big") {
                    return true
                }
            }
        }
        if (document.getElementsByTagName("form")[0].className === "parrot_reg") {
            animalForReg.feathersColor = +document.getElementsByClassName("color").selected === true
        }

        animalForReg.owner = ownerID;

        ApiClient.putPet(animalForReg);
        return true;
    } catch (e) {
        return false;
    }
}





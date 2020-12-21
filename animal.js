import {Api} from './api_client.js'

let ApiClient = new Api();

let allPets_noEditTypeAndColor = ApiClient.getPets();
let typesOfAnimals = ApiClient.getPetsType();
let feathersColors = ApiClient.getFeathersColors();
let allPets_noEditColor = allPets_noEditTypeAndColor.map(setCorrectType);
let allPetsUnvalidatedUnidentified = allPets_noEditColor.map(setCorrectFeathersColor);


function setCorrectType(obj) {
    for (let type in typesOfAnimals) {
        if (`${obj.Type}` === type) {
            obj.Type = typesOfAnimals[type];
        }
    }
    return obj;
}

function setCorrectFeathersColor(obj) {
    if (obj.FeathersColor !== undefined) {
        for (let color in feathersColors) {
            if (`${obj.FeathersColor}` === color) {
                obj.FeathersColor = feathersColors[color];
            }
        }
    }
    return obj;
}


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


function animalValidation(obj) {
    if (obj.name !== null && obj.name !== " " && obj.name !== "" && isNaN(obj.name) &&
        obj.breed !== " " && obj.breed !== "" && isNaN(obj.breed) &&
        typeof (obj.age) === "number" &&
        obj.ownerName !== null && obj.ownerName !== " " && obj.ownerName !== "" && isNaN(obj.ownerName)) {
        return true;
    }
}

let allPets = allPetsUnvalidated.filter(animalValidation);

function setCorrectSize(obj) {
    if (obj.size === true) {
        obj.size = "Большой"
    } else if (obj.size === false) {
        obj.size = "Маленький"
    }
}

allPets.map(setCorrectGender);

function setCorrectGender(obj) {
    if (obj.gender === 1) {
        obj.gender = "Женский"
    } else if (obj.gender === 0) {
        obj.gender = "Мужской"
    }
}

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


function getOwnerId() {
    if (document.getElementById("new_owner").checked === true) {
        return ApiClient.putOwner
        (
            {
                phoneNumber: document.getElementById("phone_num").value,
                fullName: document.getElementById("name_of_owner").value
            }
        )
    } else if (document.getElementById("old_owner").checked === true) {
        return ApiClient.findNumber(document.getElementById("phone_OldOwner").value).id;
    }
}

function registrationAnimalAndOwner() {
    try {
        let ownerID = getOwnerId();

        function choiceType() {
            if (document.getElementsByTagName("form")[0].className === "parrot_reg") {
                return 2
            } else if (document.getElementsByTagName("form")[0].className === "cat_reg") {
                return 0
            } else if (document.getElementsByTagName("form")[0].className === "dog_reg") {
                return 1
            }
        }

        function choiceGender() {
            if (document.getElementById("gen_m").checked === true) {
                return 0;
            } else if (document.getElementById("gen_f").checked === true) {
                return 1;
            }
        }

        function choiceSizeOfDog() {
            if (document.getElementById("size_small").checked === true) {
                return false;
            } else if (document.getElementById("size_big").checked === true) {
                return true;
            }
        }

        function choiceFeathersColor() {
            let arr = document.getElementsByTagName("option");
            for (let part of arr) {
                if (part.selected === true) {
                    return Number.parseInt(part.value);
                }
            }
        }

        let animalForReg = {
            type: choiceType(),
            name: document.getElementById("name_of_animal").value,
            sex: choiceGender(),
            age: +document.getElementById("age_of_animal").value,
            breed: document.getElementById("breed_of_animal").value,
        };

        if (document.getElementsByTagName("form")[0].className === "dog_reg") {
            animalForReg.isBigDog = choiceSizeOfDog();
        }

        if (document.getElementsByTagName("form")[0].className === "parrot_reg") {
            animalForReg.feathersColor = choiceFeathersColor()
        }

        animalForReg.owner = ownerID;
        ApiClient.putPet(animalForReg);

        return true;

    } catch (err) {
        return false;
    }
}

document.getElementsByTagName("form")[0].onsubmit = registrationAnimalAndOwner;



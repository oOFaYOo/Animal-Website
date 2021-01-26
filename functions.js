
export function setCorrectFeathersColor(obj, feathersColors) {
    if (obj.FeathersColor !== undefined) {
        for (let color in feathersColors) {
            if (`${obj.FeathersColor}` === color) {
                obj.FeathersColor = feathersColors[color];
            }
        }
    }
    return obj;
}

export function setCorrectType(obj, typesOfAnimals) {
    for (let type in typesOfAnimals) {
        if (`${obj.Type}` === type) {
            obj.Type = typesOfAnimals[type];
        }
    }
    return obj;
}

export function animalValidation(obj) {
    if (obj.name !== null && obj.name !== " " && obj.name !== "" && isNaN(obj.name) &&
        obj.breed !== " " && obj.breed !== "" && isNaN(obj.breed) &&
        typeof (obj.age) === "number" &&
        obj.ownerName !== null && obj.ownerName !== " " && obj.ownerName !== "" && isNaN(obj.ownerName)) {
        return true;
    }
}




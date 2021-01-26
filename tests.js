

mocha.setup('bdd');

import {setCorrectFeathersColor} from "./functions.js";

describe ("testing setCorrectFeathersColor", function () {

    it ("устанавливает нужный цвет (красный)", function () {
        let resultObject = setCorrectFeathersColor({FeathersColor:0}, {"0": "red"});
        chai.assert.equal(resultObject.FeathersColor, "red");
    });

    it ("устанавливает нужный цвет (зеленый)", function () {
        let resultObject = setCorrectFeathersColor({FeathersColor:1}, {"1": "green"});
        chai.assert.equal(resultObject.FeathersColor, "green");
    });

    it ("erorr", function () {
        chai.assert.equal(setCorrectFeathersColor({FeathersColor:undefined}, {"1": "black"}).FeathersColor, undefined)
    });
});

import {animalValidation} from "./functions.js";

describe ("testing animalValidation", function () {

    it ("валидирует объект", function () {
        chai.assert.equal(animalValidation({name:"Rozzy", breed: "poodle", age: 6, ownerName: "Иванов Иван Иванович"}), true)
    })

});

mocha.run();
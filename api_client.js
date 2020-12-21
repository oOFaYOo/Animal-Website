"use strict";

export class Api {

    constructor() {
        this.apiUrl = "http://192.168.0.101:5000/";
    }

    getPets = function () {
        let pets = new XMLHttpRequest();
        pets.open("get", this.apiUrl + "pets", false);
        pets.send();
        return JSON.parse(pets.response);
    };

    getPetsType = function () {
        let petsType = new XMLHttpRequest();
        petsType.open("get", this.apiUrl + "pets/types", false);
        petsType.send();
        return JSON.parse(petsType.response);
    };

    getFeathersColors = function () {
        let feathersColors = new XMLHttpRequest();
        feathersColors.open("get", this.apiUrl + "pets/parrotFeathersColors", false);
        feathersColors.send();
        return JSON.parse(feathersColors.response);
    };

    getOwner(ownerID) {
        let owner = new XMLHttpRequest();
        owner.open("get", this.apiUrl + `owners/${ownerID}`, false);
        owner.send();
        if (owner.status !== 200) {
            return {fullName: " ", phoneNumber: " "}
        }
        return JSON.parse(owner.response);
    }

    getGender = function () {
        let gender = new XMLHttpRequest();
        gender.open("get", this.apiUrl + "pets/sex", false);
        gender.send();
        return JSON.parse(feathersColors.response);
    };

    putOwner = function (obj) {
        let regFormOwner = new XMLHttpRequest();
        regFormOwner.open("put", this.apiUrl + "owners", false);
        regFormOwner.setRequestHeader("Content-Type", "application/json");
        // regFormOwner.setRequestHeader("Access-Control-Allow-Origin", "*");
        regFormOwner.send(JSON.stringify(obj));

        if (regFormOwner.status === 200) {
            return JSON.parse(regFormOwner.response);
        }

        throw new Error(regFormOwner.status);
    };

    putPet = function (obj) {
        let regFormPet = new XMLHttpRequest();
        regFormPet.open("put", this.apiUrl + "pets", false);
        regFormPet.setRequestHeader("Content-Type", "application/json");
        regFormPet.setRequestHeader("Access-Control-Allow-Origin", "*");
        regFormPet.send(JSON.stringify(obj));
        console.log(JSON.stringify(obj));
        if (regFormPet.status === 200) {
            return;
        }
        throw new Error(regFormPet.status)
    };

    findNumber = function (num) {
        let oldNum = new XMLHttpRequest();
        oldNum.open("get", this.apiUrl + "owners/find?phone=%2B" + `${num.slice(1)}`, false);
        oldNum.send();
        return JSON.parse(oldNum.response);
    }

}
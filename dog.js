let oldOwner = document.getElementById("old_owner");
let newOwner = document.getElementById("new_owner");
let descriptionNewOwner = document.getElementById("description_of_NewOwner");
let phoneNum = document.getElementById("phone_num");
let nameOfOwner = document.getElementById("name_of_owner");
let phoneOldOwner = document.getElementById("phone_OldOwner");
let phoneOldOwnerArea = document.querySelector(".phone_OldOwner");

document.querySelector(".add_dog").onclick = () => {
    document.querySelector(".add_new_dog").hidden = false
};

document.getElementById("close_reg_form").onclick = () => {
    document.querySelector(".add_new_dog").hidden = true
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
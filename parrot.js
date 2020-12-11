let addParrot = document.querySelector(".add_parrot");
let addNewAnimal = document.querySelector(".add_new_parrot");
addParrot.onclick = () => {
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
    if(descriptionNewOwner.hidden === true){document.getElementById("phone_num").disabled = "disabled";}
    if(descriptionNewOwner.hidden === true){document.getElementById("name_of_owner").disabled = "disabled";}
    if(descriptionNewOwner.hidden === true){document.getElementById("phone_num").removeAttribute("required");}
    if(descriptionNewOwner.hidden === true){document.getElementById("name_of_owner").removeAttribute("required");}
    if(descriptionNewOwner.hidden === true){document.getElementById("phone_OldOwner").required = "required";}
    document.querySelector(".phone_OldOwner").hidden = false;
    document.getElementById("phone_OldOwner").removeAttribute("disabled");
    document.getElementById("name_of_owner").value = "";
    document.getElementById("phone_num").value = "";
};
newOwner.onchange = () => {
    if(descriptionNewOwner.hidden === false){
        document.getElementById("phone_OldOwner").disabled = "disabled";
    }
    document.getElementById("phone_num").required = "required";
    document.getElementById("name_of_owner").required = "required";
    document.getElementById("phone_OldOwner").removeAttribute("required");
    descriptionNewOwner.hidden = false;
    document.querySelector(".phone_OldOwner").hidden = true;
    document.getElementById("phone_num").removeAttribute("disabled");
    document.getElementById("name_of_owner").removeAttribute("disabled");
    document.getElementById("phone_OldOwner").value = "";
};


document.getElementById("button_reset").onclick = () => {
    descriptionNewOwner.hidden = false;
    document.querySelector(".phone_OldOwner").hidden = true;
    document.getElementById("phone_num").removeAttribute("disabled");
    document.getElementById("name_of_owner").removeAttribute("disabled");
    document.getElementById("phone_OldOwner").disabled = "disabled";
};

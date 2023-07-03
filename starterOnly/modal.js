// DOM Elements
const toggleMenu = document.querySelector("#toggle-menu");
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeButton = document.querySelectorAll(".close");
const form = document.querySelector("form[name='reserve']");

// fontion de base pour basculer menu responsive
const editNav = () => {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// ouvrir et fermer la modale
const toggleModal = (action) => {
    if (action === 'open')
        modalbg.style.display = 'block';
    else
        modalbg.style.display = 'none';

};

// definition de donnees du formulaire
const messageInputError = {
    msg: "ce champ est obligatoire",
    firstName: {
        required: true,
        min: 2,
        msg: `Veuillez entrer 2 caractères ou plus pour le champ du prénom.`,
    },
    lastName: {
        min: 2,
        required: true,
        msg: "Veuillez entrer 2 caractères ou plus pour le champ du nom."
    },
    email: {
        required: true,
        msg: "Veuillez entrer une adresse email valide."
    },
    email: {
        required: true,
        msg: "Vous devez entrer votre date de naissance."
    },
    birthdate: {
        required: true,
        msg: "Vous devez entrer votre date de naissance."
    },
    quantity: {
        required: true,
        msg: "Vous devez entrer une valeur numérique pour le nombre de concours."
    },
    locations: {
        required: true,
        msg: "Vous devez choisir une option."
    },
    cgu: {
        required: true,
        msg: "Vous devez vérifier que vous acceptez les termes et conditions."
    }
}

// fonction pour verifier la longueur d'une chaine de caractere
const isBetween = (length, min) => length < min ? false : true;

// expression reguliere pour la validation de l'email
const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

// fonction pour afficher les messages d'erreur et les bordures des champs
const displayError = (input, errorMessage) => {
    // ajouter une classe input-error-border
    input.classList.add("input-error-border");
    // selectionner small qui dans le meme parent que l'input et lui ajouter et classe input-error
    const small = input.parentElement.querySelector("small");
    small.textContent = errorMessage;
    small.classList.add("input-error");
}

// fonction pour supprimer les messages d'erreur et les bordures des champs
const showSuccess = (input) => {

    // supprimer la classe input-error-border
    input.classList.remove("input-error-border");

    // selectionner small qui dans le meme parent que l'input et lui retirer la classe input-error et le texte
    const small = input.parentElement.querySelector("small");
    small.classList.remove("input-error");
    small.textContent = "";
}

// fonction de validité du date
const isValidDate =  (date) =>{

  // Convertir la date en objet Date
  let inputDate = new Date(date);

  // Vérifier si la date est invalide
  if (!date || isNaN(inputDate.getTime())) {
    return false;
  }

  // Obtenir la date du jour
  let today = new Date();

  // Vérifier si la date est inférieure à la date du jour
  if (today < inputDate) {
    return "La date doit être inférieure à la date du jour."
  }

  return true;
}

// Vérifier la validité du prénom et du nom
const checkName = (idInput, messageError) => {
    const input = document.getElementById(idInput);
    const name = input.value.trim();
    if (!isBetween(name.length, messageError.min)) {
        displayError(input, messageError.msg)
        return false
    } else {
        showSuccess(input);
        return true;
    }

}

// Vérifier la validité de l'adresse email
const checkEmail = () => {
    const emailInput = document.getElementById("email");
    const email = emailInput.value.trim();
    if (!isEmailValid(email)) {
        displayError(emailInput, messageInputError.email.msg)
        return false;
    } else {
        showSuccess(emailInput);
        return true;
    }
}

// fonction pour vérifier la validité de la date de naissance
const checkBirthdate = () => {
// verifier si la date est vide et doit etre inferieur a la date du jour
    const InputBirthdate = document.getElementById("birthdate");
    const birthdate = InputBirthdate.value.trim();

    if (!isValidDate(birthdate)) {
        displayError(InputBirthdate, messageInputError.birthdate.msg)
        return false;
    }
    else if ( typeof isValidDate(birthdate) === "string" ) {
        displayError(InputBirthdate, isValidDate(birthdate))
        return false;
    }

    showSuccess(InputBirthdate);
    return true;
}

// Vérifier si une valeur numérique est saisie pour le nombre de concours
const checkQuantity = () => {
    // selectionner l'input quantity et verifier si la valeur est un nombre positif
    const quantityInput = document.getElementById("quantity");
    let quantity = quantityInput.value.trim();

    if (isNaN(quantity) || quantity === "" || quantity < 0) {
        displayError(quantityInput, messageInputError.quantity.msg)
        return false;
    }
    showSuccess(quantityInput);
    return true;
}

// Vérifier si un bouton radio est sélectionné pour le tournoi
const checkLocation = () => {

    // selectionner les inputs location
    const locationInputs = document.getElementsByName("location");
    const locationChecked = document.querySelector("input[name='location']:checked");
    console.log("locationChecked", locationChecked);

    if (locationChecked === null) {
        displayError(locationInputs[0], messageInputError.locations.msg)
        return false;
    }
    showSuccess(locationInputs[0]);
    return true;
}

// Vérifier si la case des conditions générales est cochée
const checkCgu = () => {
    const checkboxInput = document.getElementById("checkbox1");
    const cguChecked = checkboxInput.checked;

    if (!cguChecked) {
        displayError(checkboxInput, messageInputError.cgu.msg)
        return false;
    }
    showSuccess(checkboxInput);
    return true;
}

// fonction verifier quuand il y a un changement dans les inputs
const handleInput = (e) => {

    switch (e.target.id) {
        case 'firstName':
            checkName("firstName", messageInputError.firstName);
            break;
        case 'lastName':
            checkName("lastName", messageInputError.lastName);
            break;
        case 'email':
            checkEmail();
            break;
        case 'birthdate':
            checkBirthdate();
            break;
        case 'quantity':
            checkQuantity();
            break;
        case 'checkbox1':
            checkCgu();
            break;

    }

    if(e.target.name === "location"){
        checkLocation();
    }

}


// addEventListener
toggleMenu.addEventListener("click", editNav)
// event ouvrir et fermer la modale
modalBtn.forEach(btn => btn.addEventListener("click", () => toggleModal('open')));
closeButton.forEach(btn => btn.addEventListener("click", () => toggleModal('close')));

form.addEventListener("submit", (e) => {

    // annuler le comportement par défaut du formulaire
    e.preventDefault();


    // Vérifier la validité du formulaire
    let isFirstNameValid = checkName("firstName", messageInputError.firstName),
        isLasttNameValid = checkName("lastName", messageInputError.lastName),
        isEmailValid = checkEmail(),
        isBirthdateValid = checkBirthdate(),
        isQuantityValid = checkQuantity()
    isLocationValid = checkLocation(),
        isCguValid = checkCgu();


    let isFormValid = isFirstNameValid && isLasttNameValid && checkName("lastName", messageInputError.lastName) && isEmailValid
    && isBirthdateValid && isQuantityValid && isLocationValid && isCguValid;


    // Si le formulaire est valide, afficher les données dans la console
    if (isFormValid) {
        const modalbody = document.querySelector(".modal-body");
        modalbody.innerHTML = `
                <div class="thanks">
                        <div class="thanks-text">
                            <p>Merci pour votre inscription</p>
                        </div>
                        <div class="thanks-btn"><button class="btn-submit thanks-btn-close">Fermer</button></div>
                    </div>
                `;
        const thanksBtnClose = document.querySelector(".thanks-btn-close");
        thanksBtnClose.addEventListener("click", () => toggleModal('close'));
    }


});
form.addEventListener('input', handleInput);

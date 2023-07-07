// DOM Elements
const toggleMenu = document.querySelector("#toggle-menu");
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeButton = document.querySelectorAll(".close");
const form = document.querySelector("form[name='reserve']");
let resetForm = false;

// Fonction de base pour basculer le menu responsive
const editNav = () => {
  const x = document.getElementById("myTopnav");
  x.className =
    x.className === "topnav container"
      ? "topnav container responsive"
      : "topnav container";
};

// Ouvrir et fermer la modale
const toggleModal = (action) => {
  modalbg.style.display = action === "open" ? "block" : "none";
};

// Définition des messages d'erreur du formulaire
const messageInputError = {
  msg: "Ce champ est obligatoire",
  firstName: {
    required: true,
    min: 2,
    msg: "Veuillez entrer 2 caractères ou plus pour le champ du prénom.",
  },
  lastName: {
    required: true,
    min: 2,
    msg: "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
  },
  email: {
    required: true,
    msg: "Veuillez entrer une adresse email valide.",
  },
  birthdate: {
    required: true,
    msg: "Vous devez entrer votre date de naissance.",
  },
  quantity: {
    required: true,
    msg: "Vous devez entrer une valeur numérique pour le nombre de concours.",
  },
  locations: {
    required: true,
    msg: "Vous devez choisir une option.",
  },
  cgu: {
    required: true,
    msg: "Vous devez vérifier que vous acceptez les termes et conditions.",
  },
};

// Fonction pour vérifier si une chaîne de caractères a une longueur supérieure ou égale à une valeur minimale
const isLengthValid = (str, min) => {
  return str.length >= min;
};

// Expression régulière pour la validation de l'email
const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

// Fonction pour afficher les messages d'erreur et les bordures des champs
const displayError = (input, errorMessage) => {
  input.classList.add("input-error-border");
  const small = input.parentElement.querySelector("small");
  small.textContent = errorMessage;
  small.classList.add("input-error");
};

// Fonction pour supprimer les messages d'erreur et les bordures des champs
const clearError = (input) => {
  input.classList.remove("input-error-border");
  const small = input.parentElement.querySelector("small");
  small.textContent = "";
  small.classList.remove("input-error");
};

// Fonction de validation de la date
const isValidDate = (date) => {
  const inputDate = new Date(date);
  if (!date || isNaN(inputDate.getTime())) {
    return false;
  }
  const today = new Date();
  if (today < inputDate) {
    return "La date doit être inférieure à la date du jour.";
  }
  return true;
};

// Vérifier la validité du prénom et du nom
const checkName = (idInput, messageError) => {
  const input = document.getElementById(idInput);
  const name = input.value.trim();
  if (!isLengthValid(name, messageError.min)) {
    displayError(input, messageError.msg);
    return false;
  } else {
    clearError(input);
    return true;
  }
};

// Vérifier la validité de l'adresse email
const checkEmail = () => {
  const emailInput = document.getElementById("email");
  const email = emailInput.value.trim();
  if (!isEmailValid(email)) {
    displayError(emailInput, messageInputError.email.msg);
    return false;
  } else {
    clearError(emailInput);
    return true;
  }
};

// Vérifier la validité de la date de naissance
const checkBirthdate = () => {
  const inputBirthdate = document.getElementById("birthdate");
  const birthdate = inputBirthdate.value.trim();
  if (!isValidDate(birthdate)) {
    displayError(inputBirthdate, messageInputError.birthdate.msg);
    return false;
  } else if (typeof isValidDate(birthdate) === "string") {
    displayError(inputBirthdate, isValidDate(birthdate));
    return false;
  }
  clearError(inputBirthdate);
  return true;
};

// Vérifier si une valeur numérique est saisie pour le nombre de concours
const checkQuantity = () => {
  const quantityInput = document.getElementById("quantity");
  const quantity = quantityInput.value.trim();
  if (isNaN(quantity) || quantity === "" || quantity < 0) {
    displayError(quantityInput, messageInputError.quantity.msg);
    return false;
  }
  clearError(quantityInput);
  return true;
};

// Vérifier si un bouton radio est sélectionné pour le tournoi
const checkLocation = () => {
  const locationInputs = document.getElementsByName("location");
  const locationChecked = document.querySelector(
    "input[name='location']:checked"
  );
  if (locationChecked === null) {
    displayError(locationInputs[0], messageInputError.locations.msg);
    return false;
  }
  clearError(locationInputs[0]);
  return true;
};

// Vérifier si la case des conditions générales est cochée
const checkCgu = () => {
  const checkboxInput = document.getElementById("checkbox1");
  const cguChecked = checkboxInput.checked;
  if (!cguChecked) {
    displayError(checkboxInput, messageInputError.cgu.msg);
    return false;
  }
  clearError(checkboxInput);
  return true;
};

// Gérer les événements lorsqu'il y a un changement dans les champs de saisie
const handleInput = (e) => {
  switch (e.target.id) {
    case "firstName":
      checkName("firstName", messageInputError.firstName);
      break;
    case "lastName":
      checkName("lastName", messageInputError.lastName);
      break;
    case "email":
      checkEmail();
      break;
    case "birthdate":
      checkBirthdate();
      break;
    case "quantity":
      checkQuantity();
      break;
    case "checkbox1":
      checkCgu();
      break;
  }
  if (e.target.name === "location") {
    checkLocation();
  }
};

const createMessageThank = () => {
  const modalBody = document.querySelector(".modal-body");
  const divThanks = document.createElement("div");
  divThanks.classList.add("thanks");
  divThanks.innerHTML = `
        <div class="thanks-text">
          <p>Merci pour votre inscription</p>
        </div>
        <div class="thanks-btn">
          <button class="btn-submit thanks-btn-close">Fermer</button>
        </div>`;
  modalBody.appendChild(divThanks);
};

const closeAndResetForm = () => {
  const thanks = document.querySelector(".thanks");
  const closeButton = document.querySelectorAll(".close");
  const thanksBtnClose = document.querySelector(".thanks-btn-close");
  const form = document.querySelector("form[name='reserve']");

  const resetForm = () => {
    form.reset();
    form.style.display = "block";
  };

  thanksBtnClose.addEventListener("click", () => {
    toggleModal("close");
    thanks.remove();
    resetForm();
  });

  closeButton.forEach((btn) => {
    btn.addEventListener("click", () => {
      toggleModal("close");
      thanks.remove();
      resetForm();
    });
  });
};

// Ajout des écouteurs d'événements

toggleMenu.addEventListener("click", editNav);

modalBtn.forEach((btn) =>
  btn.addEventListener("click", () => toggleModal("open"))
);

closeButton.forEach((btn) =>
  btn.addEventListener("click", () => toggleModal("close"))
);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let isFirstNameValid = checkName("firstName", messageInputError.firstName),
    isLastNameValid = checkName("lastName", messageInputError.lastName),
    isEmailValid = checkEmail(),
    isBirthdateValid = checkBirthdate(),
    isQuantityValid = checkQuantity(),
    isLocationValid = checkLocation(),
    isCguValid = checkCgu();

  let isFormValid =
    isFirstNameValid &&
    isLastNameValid &&
    isEmailValid &&
    isBirthdateValid &&
    isQuantityValid &&
    isLocationValid &&
    isCguValid;

  console.log("isFormValid", isFormValid);

  if (isFormValid) {
    // Cacher le formulaire
    form.style.display = "none";

    // Ajouter le contenu de remerciement
    createMessageThank();
    closeAndResetForm();
    isFormValid = false;
  }
});

form.addEventListener("input", handleInput);

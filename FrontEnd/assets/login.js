//Essai de recuperation des mots de passes depuis le serveur

const fieldEmail = document.getElementById("email");
const fieldPassword = document.getElementById("password");
const loginSubmit = document.getElementById("login-btn");
const errorMessage = document.getElementById("error-message");
const unknownErrorMessage = document.getElementById("unknown-error-message");
const url = 'http://localhost:5678/api/users/login';

function loginTry() {
    const inputEmail = fieldEmail.value;
    const inputPassword = fieldPassword.value;

    const loginRequest = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            email: inputEmail,
            password: inputPassword,
        }),


    };

    fetch(url, loginRequest)
        .then(response => {
            if (!response.ok) {
                throw Error(response.status);
            }
            return response.json();
        })
        .then(payload => {
            let token = payload.token;
            localStorage.setItem("Token", token);
            if (token) {
                window.location.href = "./backoffice.html";
                console.log('BRAVO');
            } /*else {
                errorMessage.classList.add("display-yes");
            }*/
        }).catch(error => {
            if (error === 404 || error === 401) {
                unknownErrorMessage.classList.remove("display");
                errorMessage.classList.add("display");
            }
            else {
                errorMessage.classList.remove("display");
                unknownErrorMessage.classList.add("display");
            }
        })
        ;
}

loginSubmit.addEventListener("click", loginTry);


fieldPassword.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        loginTry();
    }
});
fieldEmail.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        loginTry();
    }
}); 

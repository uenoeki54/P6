//Essai de recuperation des mots de passes depuis le serveur

const fieldEmail = document.getElementById("email");
const fieldPassword = document.getElementById("password");
const loginSubmit = document.getElementById("login-btn");
const errorMessage = document.getElementById("error-message");
const unknownErrorMessage = document.getElementById("unknown-error-message");
const errorMail = document.getElementById("error-mail")
const url = 'http://localhost:5678/api/users/login';
const expressionReguliere = /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;




function testEmail() {
    let inputEmail = fieldEmail.value;
    if (!expressionReguliere.test(inputEmail)) {
        fieldEmail.classList.add("border-red");
        errorMail.classList.add("display");
        console.log('format email incorrect');
    }
    else {
        fieldEmail.classList.remove("border-red");
        errorMail.classList.remove("display");
        console.log('format email correct');
    }
}


function loginTry() {
    let inputEmail = fieldEmail.value;

    errorMail.classList.remove("display");
    if (!expressionReguliere.test(inputEmail)) {
        errorMail.classList.add("display")
    }
    else {
        const inputPassword = fieldPassword.value
        const loginRequest = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                email: inputEmail,
                password: inputPassword,
            }),
            mode: "cors",
            credentials: "same-origin",

        }

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
                } 
            }).catch(error => {
                const errorCode = error.message;
                if (errorCode === '404' || errorCode === '401') {
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

fieldEmail.addEventListener("focus", () => {
    testEmail();
});

fieldEmail.addEventListener("blur", () => {
    testEmail();
});

fieldEmail.addEventListener("keyup", () => {
    testEmail();
});


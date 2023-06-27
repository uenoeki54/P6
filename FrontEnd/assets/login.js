//Essai de recuperation des mots de passes depuis le serveur

const fieldEmail = document.getElementById("email");
const fieldPassword = document.getElementById("password");
const loginSubmit = document.querySelector(".login-btn");
const errorMessage = document.getElementById("error-message");
let url = 'http://localhost:5678/api/users/login';

function loginTry() {
    const inputEmail = fieldEmail.value;
    const inputPassword = fieldPassword.value;

    let loginRequest = {
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
        .then(res => res.json())
        .then(data => {
            let token = data.token;
            localStorage.setItem("Token", token);
            if (token) {
              window.location.href = "./index.html";
              console.log('BRAVO');
            } else {
                errorMessage.classList.add("display-yes");
            }
        });
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

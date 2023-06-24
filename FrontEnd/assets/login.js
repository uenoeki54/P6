//Essai de recuperation des mots de passes depuis le serveur

const inputs = document.querySelectorAll("input");
const loginSubmit = document.querySelector(".login-btn");

function loginTry() {
    const emailEntered = inputs[0].value;
    const passwordEntered = inputs[1].value;

    let loginRequest = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            email: emailEntered,
            password: passwordEntered,
        }),

    };
    console.log(`email est ${emailEntered}`)
    console.log(`passsword est ${passwordEntered}`)
    console.log(loginRequest)
    console.log(`email est ${emailEntered}`)
}

loginSubmit.addEventListener("click", loginTry);
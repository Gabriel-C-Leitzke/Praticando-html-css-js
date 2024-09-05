function Voltarlogin() {
    window.location = "../index.html"
}
// function btncriarconta() {
//     Window.location = "../pages/criarconta.html"
// }

//Minha tentativa que deu errado:
// function criarconta() {
//     const password = document.getElementById("password").value;
//     const confirm_password = document.getElementById("confirm_password").value;
//     if (password === confirm_password) {
//         window.location = "../index.html"
//     } else {
//         alert("Senhas não coincidem!")
//     }
//     if (password && confirm_password >= 6) {
//         window.location = "../index.html"
//       } else {
//         alert("Senha deve ter mais que 6 caracteres")
//       }     
// }

function validarEmail(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]+))$/;
    return regex.test(email);
}
//A IA me ajudou com isso aqui e deu certo
function criarconta() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirm_password = document.getElementById("confirm_password").value;
    const email = document.getElementById("email").value; // Obter valor do input de email
    if (username.length >= 4) {

        if (validarEmail(email)) {
            // Se o email for válido, prossiga com a validação de senha e outras ações
            if (password === confirm_password) {
                if (password.length >= 6) {
                    if (/[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password)) {
                        window.location = "../index.html";
                    } else {
                        alert("Senha deve conter letras maiúsculas, minúsculas e números");
                    }
                } else {
                    alert("Senha deve ter mais que 6 caracteres");
                }
            } else {
                alert("Senhas não coincidem!");
            }
        } else {
            alert("Email inválido!");
        }
    } else {
        alert("Usuário deve conter mais que 4 caracteres")
    }
}



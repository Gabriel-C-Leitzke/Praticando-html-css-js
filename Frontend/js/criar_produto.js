function buttonsair() {
    window.location = "../index.html"
}
function paginainicial() {
    window.location = "./home.html"
}
function listadeprodutos() {
    window.location = "./lista_de_produtos.html"
}
function criarproduto() {
    window.location = "./Criar_produto.html"
}

// Function to handle form submission
async function handleFormSubmit(event) {
    event.preventDefault();

    const Nome = document.getElementById("Nome").value;
    const População = document.getElementById("População").value;
    const Estado = document.getElementById("Estado").value;
    const País = document.getElementById("País").value;

    try {
        const successMessage = await addCidade(Nome, População, Estado, País);
        console.log(successMessage); // Optional: Log success message
    } catch (error) {
        console.error("Erro ao cadastrar cidade:", error.message);
        // Display a user-friendly error message based on the error object
    }
}

// Function to clear input fields
function limparCampos() {
    document.getElementById("Nome").value = "";
    document.getElementById("População").value = "";
    document.getElementById("Estado").value = "";
    document.getElementById("País").value = "";
}

// Function to add a new cidade
async function addCidade(Nome, População, Estado, País) {
    try {
        const response = await fetch("http://localhost:3000/nova-cidade", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Nome,
                População,
                Estado,
                País,
            }),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error("Erro na API: " + errorMessage);
        } else {
            const data = await response.json();
            console.log(data);
            alert(`Parabéns! Você cadastrou a cidade: ${Nome}`);
            limparCampos();
            return "Cidade cadastrada com sucesso!";
        }
    } catch (error) {
        console.error("Erro:", error.message);
        return Promise.reject(error);
    }
}

// Event listener for form submission
const formCriarCidade = document.querySelector(".form-criar-cidade");
formCriarCidade.addEventListener("submit", handleFormSubmit);

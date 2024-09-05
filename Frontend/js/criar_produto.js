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

    const name = document.getElementById("name").value;
    const preco = document.getElementById("preco").value;
    const tipo = document.getElementById("Tipo").value;

    try {
        const successMessage = await addProduto(name, preco, tipo);
        console.log(successMessage); // Optional: Log success message
    } catch (error) {
        console.error("Erro ao cadastrar o novo produto:", error.message);
        // Display a user-friendly error message based on the error object
    }
}

// Function to clear input fields
function limparCampos() {
    document.getElementById("name").value = "";
    document.getElementById("preco").value = "";
    document.getElementById("tipo").value = "";
}

// Function to add a new Produto
async function addProduto(name, preco, tipo) {
    try {
        const response = await fetch("http://localhost:3000/novo-produto", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                preco,
                tipo,
            }),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error("Erro na API: " + errorMessage);
        } else {
            const data = await response.json();
            console.log(data);
            alert(`Parabéns! Você cadastrou o Produto: ${name}`);
            limparCampos();
            return "Produto cadastrado com sucesso!";
        }
    } catch (error) {
        console.error("Erro:", error.message);
        return Promise.reject(error);
    }
}

// Event listener for form submission
const formCriarProduto = document.querySelector(".form-criar-Produto");
formCriarProduto.addEventListener("submit", handleFormSubmit);

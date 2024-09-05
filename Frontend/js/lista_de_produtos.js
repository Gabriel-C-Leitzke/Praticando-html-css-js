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

//Carrega os produtos quando a página é carregada

document.addEventListener("DOMContentLoaded", (event) => {
    if (window.location.href.endsWith("lista_de_produtos.html")) {
        trazerProdutos();
    }
});

let Produtos = {};
let produtos_editar;

async function trazerProdutos() {
    try {
        const response = await fetch("http://localhost:3000/consultar-produtos", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        if (!response.ok) {
            throw new Error(`Problemas com a API: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log("meus dados da API", data);
        Produtos = data;
        renderizaProdutos();
    } catch (error) {
        console.log("Deu erro aqui", error);
    }
}

function renderizaProdutos() {
    const tabela = document
        .getElementById("MeusProdutos")
        .getElementsByTagName("tbody")[0];
    if (!tabela) {
        throw new Error("A tabela não conseguiu carregar")
    }

    tabela.innerHTML = "";

    Produtos.forEach((produtos) => {
        const row = tabela.insertRow();

        const CellID = row.insertCell(0);
        CellID.innerHTML = produtos.id;
        const Cellname = row.insertCell(1);
        Cellname.innerHTML = produtos.name;
        const Cellpreco = row.insertCell(2);
        Cellpreco.innerHTML = produtos.preco;
        const Celltipo = row.insertCell(3);
        Celltipo.innerHTML = produtos.tipo;

        const CellAcao = row.insertCell(4);
        CellAcao.classList.add("Coluna_acao")


        const btneditar = document.createElement("button");
        btneditar.textContent = "Editar";
        btneditar.classList.add("btn_editar");
        btneditar.addEventListener("click", () => {
            produtos_editar = Produtos.id;
            mostrarmodais(Produtos.Nome, Produtos.preco, Produtos.tipo);
        })

        const btndeletar = document.createElement("button");
        btndeletar.textContent = "Deletar";
        btndeletar.classList.add("btn_deletar");
        btndeletar.addEventListener("click", () => {
            deletarproduto(produtos.id);
            trazerProdutos();
        })

        CellAcao.appendChild(btneditar);
        CellAcao.appendChild(btndeletar);
    });
}

async function deletarproduto(id) {
    try {
        const response = await fetch(`http://localhost:3000/delete-produto/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (!response.ok) {
            console.log("Erro na API");
        }
        const data = response.json();
        console.log(data);
    } catch (error) {
        throw new Error("Erro de internet ou você esqueceu de ligar a API",
            error
        );
    }
}

function mostrarmodais(Nome, preco, tipo) {
    const meumodal = document.getElementById("editProdutoModal");
    meumodal.style.visibility = "visible";
    meumodal.style.opacity = 1;


    document.getElementById("editarNome").value = Nome;
    document.getElementById("editarPreco").value = preco;
    document.getElementById("editarTipo").value = tipo;
}

function limparcampos() {
    document.getElementById("editarNome").value = "";
    document.getElementById("editarPreco").value = "";
    document.getElementById("editarTipo").value = "";
}

const editprodutoForm = document.getElementById("editprodutoForm");

editprodutoForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const newname = event.target.elements.editarNome.value;
    const newpreco = event.target.elements.editarpreco.value;
    const newtipo = event.target.elements.editartipo.value;

    try {
        const successMessage = editarProduto(newname, newpreco, newtipo);
        console.log(successMessage); // Optional: Log success message
    } catch (error) {
        console.error("Erro ao cadastrar produto:", error.message);
        // Display a user-friendly error message based on the error object
    }


})

async function editarProduto(Nome, preco, tipo) {
    try {
        const response = await fetch("http://localhost:3000/editar-produto", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: produto_editar,
                Nome: Nome,
                preco: preco,
                tipo: tipo
            }),
        });
            trazerProdutos();
            limparcampos();
            const data = await response.json();
            console.log(data);
            alert(`Parabéns! você conseguiu editar p Produto: ${Nome}`)
        
    } catch (error) {
        console.error("Esqueceu de ligar a API ou a sua internet está com defeito", error);
    }
}
function login(event) {
    event.preventDefault(); // Impede o envio do formulário
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    // Verifica se o usuário e a senha estão corretos (no exemplo, são "admin" e "admin")
    if (username && password === "admin") {
      // Simulando a geração de um token JWT após o login bem-sucedido

      // const token = "seu_token_jwt_aqui";
      // localStorage.setItem("token", token); // Armazena o token no localStorage
      
      window.location = "./pages/home.html"; // Redireciona para a página inicial
    } else {
      alert("Usuário ou senha incorreta!");
    }
  }
  
  function criarconta() {
    window.location = "./pages/criarconta.html"
}
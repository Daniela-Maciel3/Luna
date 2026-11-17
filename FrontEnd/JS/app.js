
// Elementos do cabeçalho
const loginButton = document.querySelector("#loginButton");
const registerButton = document.querySelector("#registerButton");
const logoutButton = document.querySelector("#logoutButton");

// Botão de login
if (loginButton) {
    loginButton.addEventListener("click", function() {
        navigateTo("login");
    });
}

// Botão de cadastro
if (registerButton) {
    registerButton.addEventListener("click", function() {
        navigateTo("register");
    });
}

// Botão sair da conta
if (logoutButton) {
    logoutButton.addEventListener("click", function() {
        localStorage.removeItem("loggedUser");

        alert("Você saiu da sua conta.");

        navigateTo("home");
    });
}

// Atualiza as informações do painel
function updateDashboard() {
    const user = JSON.parse(
        localStorage.getItem("loggedUser")
    );

    if (!user) return;

    const clientName = document.querySelector("#clientName");

    if (clientName) {
        clientName.textContent = user.name;
    }
}

// Inicialização do site
function initializeApp() {
    updateDashboard();
}

// Executa quando o site terminar de carregar
document.addEventListener("DOMContentLoaded", function() {
    initializeApp();
});

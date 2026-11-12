const registerForm = document.querySelector("#registerForm");
const loginForm = document.querySelector("#loginForm");

// Cadastro de cliente
if (registerForm) {
    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.querySelector("#registerName").value.trim();
        const email = document.querySelector("#registerEmail").value.trim().toLowerCase();
        const phone = document.querySelector("#registerPhone").value.trim();
        const password = document.querySelector("#registerPassword").value;

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const existingUser = users.find(user =>
            user.email.trim().toLowerCase() === email
        );

        if (existingUser) {
            alert("Este email já possui cadastro.");
            return;
        }

        users.push({
            id: Date.now(),
            name: name,
            email: email,
            phone: phone,
            password: password
        });

        localStorage.setItem("users", JSON.stringify(users));

        alert("Cadastro realizado com sucesso!");
        registerForm.reset();
        navigateTo("login");
    });
}

// Login do cliente
if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.querySelector("#loginEmail").value.trim().toLowerCase();
        const password = document.querySelector("#loginPassword").value;
        const users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(user =>
            user.email.trim().toLowerCase() === email &&
            user.password === password
        );

        if (!user) {
            alert("Email ou senha incorretos.");
            return;
        }

        localStorage.setItem("loggedUser", JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email
        }));

        alert("Login realizado com sucesso!");
        loginForm.reset();
        navigateTo("dashboard");
    });
}

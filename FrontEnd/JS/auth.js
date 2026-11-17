
const registerForm = document.querySelector("#registerForm");
const loginForm = document.querySelector("#loginForm");

const TUTOR_API = "http://localhost:8080/tutores";

// CADASTRO
if (registerForm) {
    registerForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const tutor = {
            nome: document.querySelector("#registerName").value.trim(),
            email: document.querySelector("#registerEmail").value.trim().toLowerCase(),
            telefone: document.querySelector("#registerPhone").value.trim(),
            senha: document.querySelector("#registerPassword").value
        };

        try {
            const response = await fetch(TUTOR_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(tutor)
            });

            if (response.status === 409) {
                alert("Este e-mail já possui cadastro.");
                return;
            }

            if (!response.ok) {
                throw new Error("Não foi possível realizar o cadastro.");
            }

            alert("Cadastro realizado com sucesso!");

            registerForm.reset();
            navigateTo("login");

        } catch (error) {
            console.error("Erro no cadastro:", error);
            alert("Não foi possível realizar o cadastro. Verifique se o servidor está funcionando.");
        }
    });
}

// LOGIN
if (loginForm) {
    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const email = document.querySelector("#loginEmail").value.trim().toLowerCase();
        const senha = document.querySelector("#loginPassword").value;

        try {
            const response = await fetch(`${TUTOR_API}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, senha })
            });

            if (response.status === 401) {
                alert("E-mail ou senha incorretos.");
                return;
            }

            if (!response.ok) {
                throw new Error("Não foi possível realizar o login.");
            }

            const tutor = await response.json();

            // Guarda somente os dados necessários para identificar a sessão.
            localStorage.setItem("loggedUser", JSON.stringify({
                id: tutor.id,
                name: tutor.nome,
                email: tutor.email,
                phone: tutor.telefone
            }));

            alert("Login realizado com sucesso!");

            loginForm.reset();
            navigateTo("dashboard");

        } catch (error) {
            console.error("Erro no login:", error);
            alert("Não foi possível realizar o login. Verifique se o servidor está funcionando.");
        }
    });
}

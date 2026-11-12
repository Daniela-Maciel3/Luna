const petForm = document.querySelector("#petForm");
const petList = document.querySelector("#petList");

// Endereço do backend
const API_URL = "http://localhost:8080/animais";

// ID do tutor cadastrado para teste
const TUTOR_ID = 1;

// Guarda os animais carregados do backend
let pets = [];

// Recupera o usuário logado no frontend
function getLoggedUser() {
    return JSON.parse(localStorage.getItem("loggedUser"));
}

// Recupera os animais carregados do backend
function getPets() {
    return pets;
}

// Cadastra um novo animal
if (petForm) {
    petForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const user = JSON.parse(localStorage.getItem("loggedUser"));

        if (!user) {
            alert("Você precisa entrar na sua conta.");
            navigateTo("login");
            return;
        }

        const pet = {
            nome: document.querySelector("#petName").value.trim(),
            especie: document.querySelector("#petSpecies").value,
            genero: document.querySelector("#petGender").value,
            raca: document.querySelector("#petBreed").value.trim(),
            idade: Number(document.querySelector("#petAge").value),
            porte: document.querySelector("#petSize").value,
            tutor: {
                id: TUTOR_ID
            }
        };

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(pet)
            });

            if (!response.ok) {
                throw new Error("Não foi possível cadastrar o animal.");
            }

            const savedPet = await response.json();

            alert("Animal cadastrado com sucesso!");

            petForm.reset();

            await loadPets();

        } catch (error) {
            console.error("Erro ao cadastrar animal:", error);
            alert("Não foi possível cadastrar o animal. Verifique o backend.");
        }
    });
}

// Busca os animais no backend
async function loadPets() {
    if (!petList) return;

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Não foi possível carregar os animais.");
        }

        pets = await response.json();

        // Por enquanto, filtra pelo tutor de teste
        pets = pets.filter(pet => pet.tutor?.id === TUTOR_ID);

        renderPets();

    } catch (error) {
        console.error("Erro ao carregar animais:", error);

        petList.innerHTML = `
            <p class="empty-message">
                Não foi possível carregar seus animais.
            </p>
        `;
    }
}

// Mostra os animais cadastrados

function renderPets() {
    if (!petList) return;

    petList.innerHTML = "";

    if (pets.length === 0) {
        petList.innerHTML = `
            <p class="empty-message">
                Você ainda não cadastrou nenhum animal.
            </p>
        `;
        return;
    }

    pets.forEach(pet => {
        const card = document.createElement("article");
        card.className = "item-card";

        const title = document.createElement("h3");
        title.textContent = pet.nome;

        const details = document.createElement("p");
        details.textContent =
            `Espécie: ${pet.especie} | ` +
            `Gênero: ${pet.genero} | ` +
            `Raça: ${pet.raca || "Não informada"} | ` +
            `Idade: ${pet.idade} anos | ` +
            `Porte: ${pet.porte}`;

        card.appendChild(title);
        card.appendChild(details);

        petList.appendChild(card);
    });
}


const petForm = document.querySelector("#petForm");
const petList = document.querySelector("#petList");

const API_URL = "http://localhost:8080/animais";

let pets = [];

function getLoggedUser() {
    return JSON.parse(localStorage.getItem("loggedUser"));
}

function getPets() {
    return pets;
}

// CADASTRAR ANIMAL
if (petForm) {
    petForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const user = getLoggedUser();

        if (!user) {
            alert("Faça login para cadastrar um animal.");
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
                id: user.id
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

            alert("Animal cadastrado com sucesso!");

            petForm.reset();

            await loadPets();

        } catch (error) {
            console.error("Erro ao cadastrar animal:", error);
            alert("Não foi possível cadastrar o animal.");
        }
    });
}

// BUSCAR ANIMAIS DO TUTOR CONECTADO
async function loadPets() {
    if (!petList) return;

    const user = getLoggedUser();

    if (!user) {
        pets = [];
        renderPets();
        return;
    }

    try {
        const response = await fetch(
            `${API_URL}?tutorId=${user.id}`
        );

        if (!response.ok) {
            throw new Error("Não foi possível carregar os animais.");
        }

        pets = await response.json();

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

// EXIBIR ANIMAIS NA TELA
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

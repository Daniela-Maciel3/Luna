
const appointmentForm = document.querySelector("#appointmentForm");
const appointmentList = document.querySelector("#appointmentList");
const appointmentPet = document.querySelector("#appointmentPet");
const appointmentService = document.querySelector("#appointmentService");

const APPOINTMENT_API = "http://localhost:8080/agendamentos";

// Guarda os agendamentos carregados do backend
let appointments = [];

// Atualiza a lista de animais disponíveis
async function loadPetOptions() {
    if (!appointmentPet) return;

    await loadPets();

    const pets = getPets();

    appointmentPet.innerHTML = `
        <option value="">Selecione seu animal</option>
    `;

    pets.forEach(pet => {
        const option = document.createElement("option");

        option.value = pet.id;
        option.textContent = pet.nome;

        appointmentPet.appendChild(option);
    });
}

// Busca os serviços cadastrados no backend
async function loadServiceOptions() {
    if (!appointmentService) return;

    try {
        const response = await fetch("http://localhost:8080/servicos");

        if (!response.ok) {
            throw new Error("Não foi possível carregar os serviços.");
        }

        const services = await response.json();

        appointmentService.innerHTML =
            '<option value="">Selecione o serviço</option>';

        services.forEach(service => {
            const option = document.createElement("option");

            option.value = service.id;
            option.textContent =
                `${service.nome} - R$ ${Number(service.preco).toFixed(2)}`;

            appointmentService.appendChild(option);
        });

    } catch (error) {
        console.error("Erro ao carregar serviços:", error);
        alert("Não foi possível carregar os serviços.");
    }
}

// Cadastra um agendamento no backend
if (appointmentForm) {
    appointmentForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const user = getLoggedUser();

        if (!user) {
            alert("Você precisa entrar na sua conta.");
            navigateTo("login");
            return;
        }

        const pets = getPets();
        const petId = Number(appointmentPet.value);
        const pet = pets.find(item => item.id === petId);

        if (!pet) {
            alert("Selecione um animal cadastrado.");
            return;
        }

        const serviceId = Number(appointmentService.value);

        if (!serviceId) {
            alert("Selecione um serviço.");
            return;
        }

        const date = document.querySelector("#appointmentDate").value;
        const time = document.querySelector("#appointmentTime").value;

        const appointment = {
            data: `${date} ${time}`,
            animal: {
                id: pet.id
            },
            servico: {
                id: serviceId
            }
        };

        try {
            const response = await fetch(APPOINTMENT_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(appointment)
            });

            if (!response.ok) {
                throw new Error("Não foi possível cadastrar o agendamento.");
            }

            alert("Agendamento solicitado com sucesso!");

            appointmentForm.reset();

            await loadAppointments();

            renderAppointments();

        } catch (error) {
            console.error("Erro ao cadastrar agendamento:", error);
            alert("Não foi possível realizar o agendamento. Verifique o backend.");
        }
    });
}

// Busca os agendamentos no backend
async function loadAppointments() {
    if (!appointmentList) return;

    try {
        const response = await fetch(APPOINTMENT_API);

        if (!response.ok) {
            throw new Error("Não foi possível carregar os agendamentos.");
        }

        const data = await response.json();

        // Mostra somente os agendamentos do tutor de teste
        appointments = data;

    } catch (error) {
        console.error("Erro ao carregar agendamentos:", error);

        appointmentList.innerHTML = `
            <p class="empty-message">
                Não foi possível carregar seus agendamentos.
            </p>
        `;
    }
}

// Mostra os agendamentos

function renderAppointments() {
    if (!appointmentList) return;

    appointmentList.innerHTML = "";

    if (appointments.length === 0) {
        appointmentList.innerHTML = `
            <p class="empty-message">
                Você ainda não possui agendamentos.
            </p>
        `;
        return;
    }

    appointments.forEach(appointment => {
        const card = document.createElement("article");
        card.className = "item-card";

        const data = appointment.data || "";
        const partes = data.split(" ");

        const nomePet = appointment.animal?.nome || "Animal";
        const nomeServico = appointment.servico?.nome || "Serviço";

        const title = document.createElement("h3");
        title.textContent = nomeServico;

        const details = document.createElement("p");
        details.textContent =
            `Pet: ${nomePet} | ` +
            `Data: ${partes[0] || "Não informada"} | ` +
            `Horário: ${partes[1] || "Não informado"}`;

        card.appendChild(title);
        card.appendChild(details);

        appointmentList.appendChild(card);
    });
}

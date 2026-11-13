
const appointmentForm = document.querySelector("#appointmentForm");
const appointmentList = document.querySelector("#appointmentList");
const appointmentPet = document.querySelector("#appointmentPet");
const appointmentService = document.querySelector("#appointmentService");

const APPOINTMENT_API = "http://localhost:8080/agendamentos";

let appointments = [];

// BUSCAR ANIMAIS PARA O CAMPO DE SELEÇÃO
async function loadPetOptions() {
    if (!appointmentPet) return;

    await loadPets();

    const pets = getPets();

    appointmentPet.innerHTML =
        '<option value="">Selecione seu animal</option>';

    pets.forEach(pet => {
        const option = document.createElement("option");
        option.value = pet.id;
        option.textContent = pet.nome;
        appointmentPet.appendChild(option);
    });
}

// BUSCAR SERVIÇOS PARA O CAMPO DE SELEÇÃO
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

// CADASTRAR AGENDAMENTO
if (appointmentForm) {
    appointmentForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const user = getLoggedUser();

        if (!user) {
            alert("Faça login para realizar um agendamento.");
            navigateTo("login");
            return;
        }

        const pets = getPets();
        const petId = Number(appointmentPet.value);
        const pet = pets.find(item => item.id === petId);

        if (!pet) {
            alert("Selecione um animal.");
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
            const response = await fetch(
                `${APPOINTMENT_API}?tutorId=${user.id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(appointment)
                }
            );

            if (!response.ok) {
                throw new Error("Não foi possível realizar o agendamento.");
            }

            alert("Agendamento solicitado com sucesso!");

            appointmentForm.reset();

            await loadAppointments();
            renderAppointments();

        } catch (error) {
            console.error("Erro ao cadastrar agendamento:", error);
            alert("Não foi possível realizar o agendamento.");
        }
    });
}

// BUSCAR SOMENTE OS AGENDAMENTOS DO TUTOR CONECTADO
async function loadAppointments() {
    if (!appointmentList) return;

    const user = getLoggedUser();

    if (!user) {
        appointments = [];
        renderAppointments();
        return;
    }

    try {
        const response = await fetch(
            `${APPOINTMENT_API}?tutorId=${user.id}`
        );

        if (!response.ok) {
            throw new Error("Não foi possível carregar os agendamentos.");
        }

        appointments = await response.json();
        renderAppointments();

    } catch (error) {
        console.error("Erro ao carregar agendamentos:", error);

        appointmentList.innerHTML = `
            <p class="empty-message">
                Não foi possível carregar seus agendamentos.
            </p>
        `;
    }
}

// EXIBIR AGENDAMENTOS NA TELA
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

        const title = document.createElement("h3");
        title.textContent = appointment.servico?.nome || "Serviço";

        const details = document.createElement("p");

        const partes = (appointment.data || "").split(" ");
        const data = partes[0] || "";
        const horario = partes[1] || "";

        details.textContent =
            `Pet: ${appointment.animal?.nome || "Animal"} | ` +
            `Data: ${data} | Horário: ${horario}`;

        card.appendChild(title);
        card.appendChild(details);

        appointmentList.appendChild(card);
    });
}

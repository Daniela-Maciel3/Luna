document
.getElementById("formTutor")
.addEventListener("submit", async (e) => {

    e.preventDefault();

    const tutor = {
        nome: document.getElementById("nome").value,
        cpf: document.getElementById("cpf").value,
        telefone: document.getElementById("telefone").value
    };

    console.log(tutor);

});
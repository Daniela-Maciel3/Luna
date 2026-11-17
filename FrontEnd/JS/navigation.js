
/* =========================
   NAVEGAÇÃO LUNA
========================= */

const publicSite = document.getElementById("public-site");
const clientArea = document.getElementById("client-area");


async function navigateTo(pageName) {

    if (!publicSite || !clientArea) {
        console.error("As áreas do site não foram encontradas no HTML.");
        return;
    }

    const targetPage = document.getElementById(pageName);

    if (!targetPage) {
        console.error("Página não encontrada:", pageName);
        return;
    }

    // Verifica se a tela pertence à área do cliente
    const isClientPage = clientArea.contains(targetPage);

    if (isClientPage) {

        // Esconde o site público
        publicSite.hidden = true;

        // Mostra a área do cliente
        clientArea.hidden = false;

        // Esconde as outras telas internas
        clientArea.querySelectorAll(".page").forEach(page => {
            page.classList.remove("active");
        });

        // Mostra somente a tela escolhida
        targetPage.classList.add("active");

        // Atualiza os dados das telas

        if (pageName === "newAppointment") {
            await loadPetOptions();
            await loadServiceOptions();
        }

        if (pageName === "pets") {
            await loadPets();
        }

        if (pageName === "appointments") {
            await loadAppointments();
            renderAppointments();
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } else {

        // Mostra o site público
        clientArea.hidden = true;
        publicSite.hidden = false;

        // Rola até a seção escolhida
        targetPage.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


// Navegação pelos botões
document.addEventListener("click", (event) => {

    const button = event.target.closest("[data-page]");

    if (!button) return;

    // Evita o comportamento padrão de links com href="#"
    if (button.tagName === "A") {
        event.preventDefault();
    }

    navigateTo(button.dataset.page);

});

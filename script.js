// ==========================================================================
// ARCHIVO DE INTERACTIVIDAD JAVASCRIPT - BARBERÍA EL GALPÓN
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    // 1. CONTROL DEL MENÚ DESPLEGABLE EN DISPOSITIVOS MÓVILES
    const menuToggle = document.getElementById("menu-toggle");
    const navbar = document.getElementById("navbar");

    if (menuToggle && navbar) {
        // Alterna la clase 'navbar--active' al hacer clic en el botón de hamburguesa
        menuToggle.addEventListener("click", () => {
            navbar.classList.toggle("navbar--active");
        });

        // Cierra el menú móvil al presionar cualquiera de los enlaces de navegación
        const navLinks = document.querySelectorAll(".navbar__link");
        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                navbar.classList.remove("navbar--active");
            });
        });
    }

    // 2. INTEGRACIÓN DEL FORMULARIO DE CITAS CON WHATSAPP
    const appointmentForm = document.getElementById("appointment-form");

    if (appointmentForm) {
        appointmentForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Evita que la página se recargue

            // Captura de valores ingresados en el formulario
            const nombre = document.getElementById("cliente-nombre").value.trim();
            const telefono = document.getElementById("cliente-telefono").value.trim();
            const servicio = document.getElementById("servicio-select").value;
            const barbero = document.getElementById("barbero-select").value;
            const fecha = document.getElementById("cita-fecha").value;
            const hora = document.getElementById("cita-hora").value;

            // Validación básica de campos vacíos
            if (!nombre || !telefono || !servicio || !fecha || !hora) {
                alert("Por favor, completa todos los campos requeridos para agendar la cita.");
                return;
            }

            // Construcción del mensaje con formato limpio para WhatsApp
            const mensajeWS = `Hola, quisiera agendar una cita en Barbería El Galpón con los siguientes datos:%0A` +
                `📌 *Nombre:* ${encodeURIComponent(nombre)}%0A` +
                `📞 *Teléfono:* ${encodeURIComponent(telefono)}%0A` +
                `✂️ *Servicio:* ${encodeURIComponent(servicio)}%0A` +
                `💈 *Barbero:* ${encodeURIComponent(barbero)}%0A` +
                `📅 *Fecha:* ${encodeURIComponent(fecha)}%0A` +
                `⏰ *Hora:* ${encodeURIComponent(hora)}`;

            // Número receptor de WhatsApp (Modificar por el número real)
            const numeroTelefono = "5216676271665";

            // Creación de la URL oficial de la API de WhatsApp
            const urlWhatsApp = `https://wa.me/${numeroTelefono}?text=${mensajeWS}`;

            // Abre WhatsApp en una pestaña nueva con el mensaje preparado
            window.open(urlWhatsApp, "_blank");

            // Limpia los campos del formulario tras procesar la cita
            appointmentForm.reset();
        });
    }

    // 3. RESTRICCIÓN DE FECHAS EN EL INPUT DE FECHA (No permitir seleccionar fechas pasadas)
    const fechaInput = document.getElementById("cita-fecha");
    if (fechaInput) {
        const hoy = new Date().toISOString().split("T")[0];
        fechaInput.setAttribute("min", hoy);
    }
});

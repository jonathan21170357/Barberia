// ==========================================================================
// JAVASCRIPT INTERACTIVITY FILE - EL GALPÓN BARBERSHOP (ENGLISH VERSION)
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    // 1. MOBILE NAVBAR TOGGLE CONTROL
    const menuToggle = document.getElementById("menu-toggle");
    const navbar = document.getElementById("navbar");

    if (menuToggle && navbar) {
        // Toggles the 'navbar--active' class when clicking the hamburger button
        menuToggle.addEventListener("click", () => {
            navbar.classList.toggle("navbar--active");
        });

        // Closes the mobile menu when clicking any of the navigation links
        const navLinks = document.querySelectorAll(".navbar__link");
        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                navbar.classList.remove("navbar--active");
            });
        });
    }

    // 2. APPOINTMENT FORM INTEGRATION WITH WHATSAPP
    const appointmentForm = document.getElementById("appointment-form");

    if (appointmentForm) {
        appointmentForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Prevents the page from reloading

            // Capture values entered in the form
            const nombre = document.getElementById("cliente-nombre").value.trim();
            const telefono = document.getElementById("cliente-telefono").value.trim();
            const servicio = document.getElementById("servicio-select").value;
            const barbero = document.getElementById("barbero-select").value;
            const fecha = document.getElementById("cita-fecha").value;
            const hora = document.getElementById("cita-hora").value;

            // Basic validation for empty fields
            if (!nombre || !telefono || !servicio || !fecha || !hora) {
                alert("Please complete all required fields to book your appointment.");
                return;
            }

            // Construction of the clean formatted message for WhatsApp
            const mensajeWS = `Hello, I would like to book an appointment at El Galpón Barbershop with the following details:%0A` +
                `📌 *Name:* ${encodeURIComponent(nombre)}%0A` +
                `📞 *Phone:* ${encodeURIComponent(telefono)}%0A` +
                `✂️ *Service:* ${encodeURIComponent(servicio)}%0A` +
                `💈 *Barber:* ${encodeURIComponent(barbero)}%0A` +
                `📅 *Date:* ${encodeURIComponent(fecha)}%0A` +
                `⏰ *Time:* ${encodeURIComponent(hora)}`;

            // Business WhatsApp receiver number
            const numeroTelefono = "5216676271665";

            // Creation of the official WhatsApp API URL
            const urlWhatsApp = `https://wa.me/${numeroTelefono}?text=${mensajeWS}`;

            // Opens WhatsApp in a new tab with the prepared message
            window.open(urlWhatsApp, "_blank");

            // Clears form fields after processing the appointment
            appointmentForm.reset();
        });
    }

    // 3. DATE RESTRICTION IN THE DATE INPUT (Prevent selecting past dates)
    const fechaInput = document.getElementById("cita-fecha");
    if (fechaInput) {
        const hoy = new Date().toISOString().split("T")[0];
        fechaInput.setAttribute("min", hoy);
    }
});
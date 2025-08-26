<script>
// =====================
// Animaciones de secciones
// =====================
const observerOptions = { threshold: 0.1 };

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = "running";
      obs.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-up, .fade-in").forEach((el) => {
  el.style.animationPlayState = "paused";
  observer.observe(el);
});

// =====================
// Formulario con Google Sheets
// =====================
const form = document.getElementById("formulario");
const formMessage = document.getElementById("form-message");

// URL de tu Apps Script
const scriptURL = "https://script.google.com/macros/s/AKfycbyby_MVsMGeiDYHDyqUcU9bVMQzNnSFiiGtw4l4iF0L-iypPdAJW_ulmCbm4CaTJSUYEg/exec";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = form.nombre.value.trim();
  const email = form.email.value.trim();
  const mensaje = form.mensaje.value.trim();

  if (!nombre || !email || !mensaje) {
    formMessage.style.color = "#ff7e00";
    formMessage.textContent = "⚠️ Por favor, completa todos los campos.";
    return;
  }

  // Validación básica de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    formMessage.style.color = "#ff7e00";
    formMessage.textContent = "⚠️ Ingresa un correo válido.";
    return;
  }

  // Desactivar botón para evitar múltiples envíos
  const btn = form.querySelector("button[type=submit]");
  btn.disabled = true;

  fetch(scriptURL, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, email, mensaje }),
  })
  .then((response) => response.json())
  .then((data) => {
    if (data.status === "success") {
      formMessage.style.color = "#4CAF50";
      formMessage.textContent = "✅ Mensaje enviado con éxito!";
      form.reset();
    } else {
      throw new Error(data.message || "Error en el servidor");
    }
  })
  .catch((error) => {
    formMessage.style.color = "red";
    formMessage.textContent = "❌ Error al enviar. Intente nuevamente más tarde.";
    console.error("Error:", error);
  })
  .finally(() => {
    btn.disabled = false;
    setTimeout(() => {
      formMessage.textContent = "";
      formMessage.style.color = "#ff7e00";
    }, 4000);
  });
});
</script>

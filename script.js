// Animar secciones al hacer scroll usando Intersection Observer
const observerOptions = {
  threshold: 0.1,
};

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

// Tu URL del Apps Script (el que me pasaste)
const scriptURL =
  "https://script.google.com/macros/s/AKfycbxZSIwfO-QLUUXRcbH0BJ9RV-YSJB8uB9KOkhJg2vcM5c-q0XL0yhY1jtURKdUbhltv/exec";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = form.nombre.value.trim();
  const email = form.email.value.trim();
  const mensaje = form.mensaje.value.trim();

  if (!nombre || !email || !mensaje) {
    formMessage.textContent = "⚠️ Por favor, completa todos los campos.";
    return;
  }

  // Validación básica email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    formMessage.textContent = "⚠️ Ingresa un correo válido.";
    return;
  }

  // Enviar datos al Google Sheet
  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify({ nombre, email, mensaje }),
  })
    .then((response) => {
      if (response.ok) {
        formMessage.style.color = "#4CAF50";
        formMessage.textContent = "✅ Mensaje enviado con éxito!";
        form.reset();
      } else {
        throw new Error("Error en la respuesta del servidor");
      }
    })
    .catch((error) => {
      formMessage.style.color = "red";
      formMessage.textContent =
        "❌ Error al enviar. Intente nuevamente más tarde.";
      console.error("Error:", error);
    });

  // Limpiar mensaje después de 4 segundos
  setTimeout(() => {
    formMessage.textContent = "";
    formMessage.style.color = "#ff7e00";
  }, 4000);
});

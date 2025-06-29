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

// Formulario simple con validación y mensaje

const form = document.getElementById("formulario");
const formMessage = document.getElementById("form-message");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = form.nombre.value.trim();
  const email = form.email.value.trim();
  const mensaje = form.mensaje.value.trim();

  if (!nombre || !email || !mensaje) {
    formMessage.textContent = "Por favor, completa todos los campos.";
    return;
  }

  // Validación básica email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    formMessage.textContent = "Por favor, ingresa un correo válido.";
    return;
  }

  formMessage.style.color = "#4CAF50";
  formMessage.textContent = "¡Mensaje enviado con éxito!";

  // Resetear formulario
  form.reset();

  // Limpiar mensaje después de 4 segundos
  setTimeout(() => {
    formMessage.textContent = "";
    formMessage.style.color = "#ff7e00";
  }, 4000);
});

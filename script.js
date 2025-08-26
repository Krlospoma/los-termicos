<script>
const form = document.getElementById("formulario");
const mensaje = document.getElementById("form-message");
const scriptURL = "AQUI_VA_LA_URL_DE_TU_WEB_APP";

form.addEventListener("submit", e => {
  e.preventDefault();

  const nombre = form.nombre.value;
  const email = form.email.value;
  const mensajeTexto = form.mensaje.value;

  fetch(scriptURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, email, mensaje: mensajeTexto }),
  })
  .then(response => response.json())
  .then(data => {
    if(data.status === "success"){
      mensaje.style.color = "green";
      mensaje.textContent = "¡Formulario enviado correctamente!";
      form.reset();
    } else {
      mensaje.style.color = "red";
      mensaje.textContent = "Error al enviar: " + data.message;
    }
  })
  .catch(err => {
    mensaje.style.color = "red";
    mensaje.textContent = "Error al enviar: " + err;
  });
});
</script>


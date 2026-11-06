// ---------- lista de empresas y puestos ----------
const mostrarAspiracion = (id, puesto, empresa) => {
  document.getElementById(id).textContent = puesto + " - " + empresa;
};

mostrarAspiracion(
  "aspira1",
  "Technical Support Specialist (Tier 1)",
  "Sky Systems, Inc.",
);
mostrarAspiracion("aspira2", "Help Desk / Soporte IT", "Completá tu empresa");
mostrarAspiracion("aspira3", "Application Support", "Completá tu empresa");

// ---------- Validacion del formulario ----------

const formulario = document.getElementById("form-contacto");
const correo = document.getElementById("correo");
const nombre = document.getElementById("nombre");
const mensaje = document.getElementById("mensaje");
const errorCorreo = document.getElementById("error-correo");
const errorNombre = document.getElementById("error-nombre");
const errorMensaje = document.getElementById("error-mensaje");
const resultadoForm = document.getElementById("resultado-form");

const marcarError = (campo, lugar, texto) => {
  campo.classList.add("error");
  lugar.textContent = texto;
};

const limpiarError = (campo, lugar) => {
  campo.classList.remove("error");
  lugar.textContent = "";
};

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  limpiarError(correo, errorCorreo);
  limpiarError(nombre, errorNombre);
  limpiarError(mensaje, errorMensaje);
  resultadoForm.textContent = "";

  let hayErrores = false;

  if (correo.value.trim() === "") {
    marcarError(correo, errorCorreo, "Escribí tu correo");
    hayErrores = true;
  }

  if (nombre.value.trim().length < 3) {
    marcarError(nombre, errorNombre, "El nombre debe tener al menos 3 letras");
    hayErrores = true;
  }

  if (mensaje.value.trim().length < 3) {
    marcarError(
      mensaje,
      errorMensaje,
      "Escribí un mensaje de al menos 3 letras",
    );
    hayErrores = true;
  }

  if (hayErrores) {
    return;
  }

  resultadoForm.textContent = "Mensaje enviado, gracias " + nombre.value.trim();
  correo.value = "";
  nombre.value = "";
  mensaje.value = "";
  nombre.focus();
});

// Limpiar el error apenas empieza a corregir
correo.addEventListener("input", () => {
  limpiarError(correo, errorCorreo);
});

nombre.addEventListener("input", () => {
  limpiarError(nombre, errorNombre);
});

mensaje.addEventListener("input", () => {
  limpiarError(mensaje, errorMensaje);
});

// ---------- tabla de empresas y puestos ----------
const aspiraciones = [
  {
    puesto: "Technical Support Specialist (Tier 1)",
    empresa: "Sky Systems, Inc.",
  },
  { puesto: "Help Desk / Soporte IT", empresa: "Neural Soft" },
  { puesto: "Application Support", empresa: "Accenture Argentina" },
];

const cuerpoAspiraciones = document.getElementById("cuerpo-aspiraciones");

const dibujarAspiraciones = () => {
  cuerpoAspiraciones.innerHTML = "";

  if (aspiraciones.length === 0) {
    const filaVacia = document.createElement("tr");
    filaVacia.innerHTML =
      "<td colspan='2'>Todavía no hay puestos cargados</td>";
    cuerpoAspiraciones.appendChild(filaVacia);
    return;
  }

  aspiraciones.forEach((aspiracion) => {
    const fila = document.createElement("tr");
    fila.innerHTML =
      "<td>" +
      aspiracion.puesto +
      "</td>" +
      "<td>" +
      aspiracion.empresa +
      "</td>";
    cuerpoAspiraciones.appendChild(fila);
  });
};

dibujarAspiraciones();

dibujarAspiraciones();

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

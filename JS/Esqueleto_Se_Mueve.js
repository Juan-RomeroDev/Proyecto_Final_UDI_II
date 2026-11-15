// ---------- tabla de empresas y puestos ----------
let aspiraciones = [
  {
    puesto: "Technical Support Specialist (Tier 1)",
    empresa: "Sky Systems, Inc.",
  },
  { puesto: "Help Desk / Soporte IT", empresa: "Neural Soft" },
  { puesto: "Application Support", empresa: "Accenture Argentina" },
];

const cuerpoAspiraciones = document.getElementById("cuerpo-aspiraciones");
const buscadorAspiraciones = document.getElementById("buscador-aspiraciones");
const resumenAspiraciones = document.getElementById("resumen-aspiraciones");
const formAspiracion = document.getElementById("form-aspiracion");
const nuevoPuesto = document.getElementById("nuevo-puesto");
const nuevaEmpresa = document.getElementById("nueva-empresa");
const errorAspiracion = document.getElementById("error-aspiracion");
const thPuesto = document.getElementById("th-puesto");
const thEmpresa = document.getElementById("th-empresa");

let columna = "puesto";
let ascendente = true;

const guardarAspiraciones = () => {
  localStorage.setItem("aspiraciones", JSON.stringify(aspiraciones));
};

const cargarAspiraciones = () => {
  const texto = localStorage.getItem("aspiraciones");

  if (texto === null) {
    return;
  }

  try {
    aspiraciones = JSON.parse(texto);
  } catch (error) {
    aspiraciones = [];
  }
};

const dibujarAspiraciones = () => {
  cuerpoAspiraciones.innerHTML = "";

  if (columna === "puesto") {
    aspiraciones.sort((a, b) => a.puesto.localeCompare(b.puesto));
    thPuesto.textContent = "Puesto";
    thEmpresa.textContent = "Empresa";
    if (ascendente === true) {
      thPuesto.textContent = "Puesto ▲";
    } else {
      thPuesto.textContent = "Puesto ▼";
    }
  } else {
    aspiraciones.sort((a, b) => a.empresa.localeCompare(b.empresa));
    thPuesto.textContent = "Puesto";
    thEmpresa.textContent = "Empresa";
    if (ascendente === true) {
      thEmpresa.textContent = "Empresa ▲";
    } else {
      thEmpresa.textContent = "Empresa ▼";
    }
  }

  if (ascendente === false) {
    aspiraciones.reverse();
  }

  const textoBuscado = buscadorAspiraciones.value.trim().toLowerCase();
  let visibles = 0;

  aspiraciones.forEach((aspiracion, indice) => {
    const coincidePuesto = aspiracion.puesto
      .toLowerCase()
      .includes(textoBuscado);
    const coincideEmpresa = aspiracion.empresa
      .toLowerCase()
      .includes(textoBuscado);

    if (coincidePuesto === false && coincideEmpresa === false) {
      return;
    }

    visibles = visibles + 1;

    const fila = document.createElement("tr");

    const celdaPuesto = document.createElement("td");
    celdaPuesto.textContent = aspiracion.puesto;
    fila.appendChild(celdaPuesto);

    const celdaEmpresa = document.createElement("td");
    celdaEmpresa.textContent = aspiracion.empresa;
    fila.appendChild(celdaEmpresa);

    const celdaAcciones = document.createElement("td");
    const botonQuitar = document.createElement("button");
    botonQuitar.textContent = "Quitar";
    botonQuitar.addEventListener("click", () => {
      aspiraciones.splice(indice, 1);
      guardarAspiraciones();
      dibujarAspiraciones();
    });
    celdaAcciones.appendChild(botonQuitar);
    fila.appendChild(celdaAcciones);

    cuerpoAspiraciones.appendChild(fila);
  });

  if (aspiraciones.length === 0) {
    const filaVacia = document.createElement("tr");
    filaVacia.innerHTML =
      "<td colspan='3'>Todavía no hay puestos cargados</td>";
    cuerpoAspiraciones.appendChild(filaVacia);
  } else if (visibles === 0) {
    const filaVacia = document.createElement("tr");
    filaVacia.innerHTML =
      "<td colspan='3'>No hay coincidencias con la búsqueda</td>";
    cuerpoAspiraciones.appendChild(filaVacia);
  }

  resumenAspiraciones.textContent =
    "Mostrando " + visibles + " de " + aspiraciones.length + " puestos";
};

const ordenarPor = (nuevaColumna) => {
  if (columna === nuevaColumna) {
    ascendente = !ascendente;
  } else {
    columna = nuevaColumna;
    ascendente = true;
  }
  dibujarAspiraciones();
};

formAspiracion.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const puesto = nuevoPuesto.value.trim();
  const empresa = nuevaEmpresa.value.trim();

  if (puesto === "" || empresa === "") {
    errorAspiracion.textContent = "Completá el puesto y la empresa";
    return;
  }

  aspiraciones.push({ puesto: puesto, empresa: empresa });
  nuevoPuesto.value = "";
  nuevaEmpresa.value = "";
  errorAspiracion.textContent = "";
  guardarAspiraciones();
  dibujarAspiraciones();
});

buscadorAspiraciones.addEventListener("input", dibujarAspiraciones);

thPuesto.addEventListener("click", () => {
  ordenarPor("puesto");
});

thEmpresa.addEventListener("click", () => {
  ordenarPor("empresa");
});

cargarAspiraciones();
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
  let primerCampoConError = null;

  if (correo.value.trim() === "") {
    marcarError(correo, errorCorreo, "Escribí tu correo");
    hayErrores = true;
    primerCampoConError = correo;
  }

  if (nombre.value.trim().length < 3) {
    marcarError(nombre, errorNombre, "El nombre debe tener al menos 3 letras");
    hayErrores = true;
    if (primerCampoConError === null) {
      primerCampoConError = nombre;
    }
  }

  if (mensaje.value.trim().length < 3) {
    marcarError(
      mensaje,
      errorMensaje,
      "Escribí un mensaje de al menos 3 letras",
    );
    hayErrores = true;
    if (primerCampoConError === null) {
      primerCampoConError = mensaje;
    }
  }

  if (hayErrores) {
    if (primerCampoConError !== null) {
      primerCampoConError.focus();
    }
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

/* =========================================================
   1. Tabla de Empresas y Puestos de Trabajo (Aspiraciones)
   ========================================================= */
// Datos de ejemplo: se usan la primera vez y al tocar "Restaurar lista".
const aspiracionesIniciales = [
  {
    puesto: "Technical Support Specialist (Tier 1)",
    empresa: "Sky Systems, Inc.",
  },
  { puesto: "Help Desk / Soporte IT", empresa: "Neural Soft" },
  { puesto: "Application Support", empresa: "Accenture Argentina" },
];

// Copia de los datos iniciales: es la lista que se dibuja y se guarda.
let aspiraciones = [...aspiracionesIniciales];

const cuerpoAspiraciones = document.getElementById("cuerpo-aspiraciones");
const buscadorAspiraciones = document.getElementById("buscador-aspiraciones");
const resumenAspiraciones = document.getElementById("resumen-aspiraciones");
const formAspiracion = document.getElementById("form-aspiracion");
const nuevoPuesto = document.getElementById("nuevo-puesto");
const nuevaEmpresa = document.getElementById("nueva-empresa");
const errorAspiracion = document.getElementById("error-aspiracion");
const botonRestaurar = document.getElementById("restaurar-aspiraciones");
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

// Guarda qué columna y qué sentido de orden está elegido.
const guardarOrden = () => {
  const orden = { columna: columna, ascendente: ascendente };
  localStorage.setItem("orden-aspiraciones", JSON.stringify(orden));
};

// Recupera el orden de la última visita. Por defecto: Puesto A-Z.
const cargarOrden = () => {
  const texto = localStorage.getItem("orden-aspiraciones");

  if (texto === null) {
    return;
  }

  try {
    const guardado = JSON.parse(texto);

    if (guardado.columna === "empresa") {
      columna = "empresa";
    }

    ascendente = guardado.ascendente === true;
  } catch (error) {
    columna = "puesto";
    ascendente = true;
  }
};

// Arma el título de una columna y le agrega la flecha si es la que ordena.
const tituloColumna = (nombre, clave) => {
  if (columna !== clave) {
    return nombre;
  }

  if (ascendente === true) {
    return nombre + " ▲";
  }

  return nombre + " ▼";
};

const dibujarAspiraciones = () => {
  cuerpoAspiraciones.innerHTML = "";

  // Se ordena la lista original a propósito: el botón "Quitar" de cada fila
  // guarda su posición dentro de "aspiraciones", así que el orden que se ve
  // en la tabla y el orden del array tienen que ser el mismo.
  // sort() y reverse() modifican el array en el lugar (clase 29).
  if (columna === "puesto") {
    aspiraciones.sort((a, b) => a.puesto.localeCompare(b.puesto));
  } else {
    aspiraciones.sort((a, b) => a.empresa.localeCompare(b.empresa));
  }

  if (ascendente === false) {
    aspiraciones.reverse();
  }

  thPuesto.textContent = tituloColumna("Puesto", "puesto");
  thEmpresa.textContent = tituloColumna("Empresa", "empresa");

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

  // El sustantivo cambia si la lista tiene un solo puesto.
  let sustantivo = "puestos";
  if (aspiraciones.length === 1) {
    sustantivo = "puesto";
  }

  resumenAspiraciones.textContent =
    "Mostrando " + visibles + " de " + aspiraciones.length + " " + sustantivo;
};

const ordenarPor = (nuevaColumna) => {
  if (columna === nuevaColumna) {
    ascendente = !ascendente;
  } else {
    columna = nuevaColumna;
    ascendente = true;
  }
  guardarOrden();
  dibujarAspiraciones();
};

// Devuelve true si el puesto ya está cargado en esa misma empresa.
const existeAspiracion = (puesto, empresa) => {
  let existe = false;

  aspiraciones.forEach((aspiracion) => {
    const mismoPuesto =
      aspiracion.puesto.toLowerCase() === puesto.toLowerCase();
    const mismaEmpresa =
      aspiracion.empresa.toLowerCase() === empresa.toLowerCase();

    if (mismoPuesto === true && mismaEmpresa === true) {
      existe = true;
    }
  });

  return existe;
};

formAspiracion.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const puesto = nuevoPuesto.value.trim();
  const empresa = nuevaEmpresa.value.trim();

  if (puesto === "" || empresa === "") {
    errorAspiracion.textContent = "Completá el puesto y la empresa";
    return;
  }

  if (existeAspiracion(puesto, empresa) === true) {
    errorAspiracion.textContent = "Ya tenés ese puesto cargado en esa empresa";
    return;
  }

  aspiraciones.push({ puesto: puesto, empresa: empresa });
  nuevoPuesto.value = "";
  nuevaEmpresa.value = "";
  errorAspiracion.textContent = "";
  guardarAspiraciones();
  dibujarAspiraciones();
});

// Limpiar el aviso del alta apenas se empieza a corregir
const limpiarAvisoAlta = () => {
  errorAspiracion.textContent = "";
};

nuevoPuesto.addEventListener("input", limpiarAvisoAlta);
nuevaEmpresa.addEventListener("input", limpiarAvisoAlta);

buscadorAspiraciones.addEventListener("input", dibujarAspiraciones);

thPuesto.addEventListener("click", () => {
  ordenarPor("puesto");
});

thEmpresa.addEventListener("click", () => {
  ordenarPor("empresa");
});

// Vuelve a los tres puestos de ejemplo y los guarda.
const restaurarAspiraciones = () => {
  aspiraciones = [...aspiracionesIniciales];
  errorAspiracion.textContent = "";
  guardarAspiraciones();
  dibujarAspiraciones();
};

botonRestaurar.addEventListener("click", restaurarAspiraciones);

cargarOrden();
cargarAspiraciones();
dibujarAspiraciones();

/* =========================================================
   2. Validacion del Formulario de Contacto
   ========================================================= */
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

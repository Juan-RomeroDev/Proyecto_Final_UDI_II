# Proyecto_Final_UDI_II

_Mi proyecto Final de la materia UDI II, Instituto Zona oeste_

Portfolio personal desarrollado como trabajo final de **UDI II**. Es un sitio
estático hecho con **HTML5, CSS3 y JavaScript puro**, sin frameworks ni
librerías de estructura: la navegación, el diseño responsive, la tabla dinámica
y la validación de formularios están resueltos a mano con lo visto en la
materia.

---

## Demo y repositorio

- **Sitio publicado:** https://juan-romerodev.github.io/Proyecto_Final_UDI_II/
- **Repositorio:** https://github.com/Juan-RomeroDev/Proyecto_Final_UDI_II

El sitio se publica con **GitHub Pages** desde la rama principal del
repositorio.

---

## Qué es este proyecto

Es un portfolio de una sola página que presenta mi perfil como estudiante de la
Tecnicatura en Desarrollo de Software y mi experiencia en soporte técnico. El
objetivo académico era aplicar en un caso real los contenidos de la cursada:
estructura semántica, box model, Flexbox, Grid, variables CSS, diseño
responsive mobile first, manipulación del DOM, eventos, objetos, arrays,
funciones de orden superior y persistencia con `localStorage`.

---

## Secciones del sitio

| Sección             | Contenido                                                                     |
| ------------------- | ----------------------------------------------------------------------------- |
| `#inicio`           | Portada con nombre, perfil y botones de contacto y proyectos                  |
| `#sobre-mi`         | Presentación, habilidades blandas y descarga del CV en DOCX                   |
| `#tecnologias`      | Lenguajes, desarrollo web, bases de datos, herramientas y sistemas operativos |
| `#Idiomas`          | Inglés (B1), portugués (A1) y español (nativo) con banderas                   |
| `#proyectos`        | Los tres trabajos del portfolio, con vista previa y enlaces                   |
| `#cursos`           | Cursos realizados: reparación de PC, hacking ético y agentes de IA            |
| `#experiencia`      | Experiencia laboral en atención al cliente                                    |
| `#aspiraciones`     | Tabla dinámica de empresas y puestos a los que aspiro                         |
| `#empresa Aplicada` | Análisis de la vacante de Sky Systems, Inc. y comparación con mi perfil       |
| `#Contactame`       | Formulario de contacto con validación                                         |

---

## Funcionalidades de JavaScript

**Tabla de aspiraciones** (`#aspiraciones`)

- Alta de puestos con dos campos (puesto y empresa) y mensajes de error propios.
- Validación de campos vacíos y control de duplicados: no permite cargar dos
  veces el mismo puesto en la misma empresa.
- Búsqueda en vivo por puesto o empresa, sin distinguir mayúsculas de
  minúsculas.
- Orden ascendente y descendente al hacer clic en el título de cada columna,
  con flecha que indica el sentido actual.
- Contador de resultados ("Mostrando X de Y puestos").
- Botón "Quitar" por fila y botón "Restaurar lista" para volver a los datos de
  ejemplo.
- Mensajes para lista vacía y para búsquedas sin coincidencias.
- Persistencia con `localStorage`: se guardan la lista y el último orden elegido,
  así que se mantienen al recargar la página. Los datos guardados se recuperan
  con `try` / `catch` para no romper la página si están dañados.

**Formulario de contacto** (`#Contactame`)

- Validación al enviar: correo obligatorio, nombre y mensaje de al menos 3
  caracteres.
- Cada campo muestra su error debajo y se marca con una clase de CSS.
- El foco se mueve al primer campo con error.
- El aviso se limpia apenas se empieza a corregir el campo.
- Al enviar correctamente se muestra un mensaje y se vacían los campos.

---

## Tecnologías

- **HTML5:** estructura semántica (`header`, `nav`, `main`, `section`,
  `article`, `figure`, `footer`), formularios con `label`, tablas con `thead`,
  `tbody` y `scope`.
- **CSS3:** variables en `:root`, box model, Flexbox, Grid, `linear-gradient`,
  imágenes de fondo y media queries mobile first en 700px, 900px y 1000px.
- **JavaScript (ES6):** `const` / `let`, funciones flecha, `getElementById`,
  `addEventListener`, `createElement`, `appendChild`, `forEach`, `sort`,
  `reverse`, `localeCompare`, `includes`, `JSON.stringify` / `JSON.parse` y
  `localStorage`.
- **Git y GitHub:** control de versiones y publicación con GitHub Pages.
- **Visual Studio Code** como editor y **Markdown** para la documentación.

**Iconos** Font Awesome, Devicon y Flag Icons ya incluidos en el proyecto sin descargar nada, solo los trae de las paginas.
No se usa ningún framework de CSS ni de JavaScript.

---

## Responsive y accesibilidad

- Diseño **mobile first**: los estilos base funcionan en pantalla angosta y las
  media queries agregan solo lo que cambia cuando hay más espacio.
- Menú, portada, grillas de tarjetas, tabla y formularios se adaptan al ancho.
- Las imágenes tienen `alt` descriptivo y las decorativas usan `alt=""`.
- Todos los campos de formulario tienen su `label` asociado por `id`.
- La tabla usa `scope="col"` en los encabezados.
- Sin desplazamiento horizontal a 360px de ancho.

---

## Estructura del proyecto

```
Proyecto_Final_UDI_II/
├── index.html                  Documento principal (una sola página)
├── CSS/
│   └── Esqueleto_Pintura.css   Estilos, variables y media queries
├── JS/
│   └── Esqueleto_Se_Mueve.js   Tabla de aspiraciones y validación de contacto
├── IMG/                        Imágenes, logos y capturas
├── Documentos/
│   └── CV_Sistemas_Juan_Pablo_Romero.docx
└── README.md
```

---

## Cómo verlo localmente

No necesita instalación ni servidor: alcanza con descargar el repositorio y
abrir `index.html` en el navegador.

```bash
git clone https://github.com/Juan-RomeroDev/Proyecto_Final_UDI_II.git
```

Si preferís levantarlo con un servidor local (por ejemplo, para probar
`localStorage` con rutas absolutas):

```bash
python -m http.server 8000
```

Después abrí `http://localhost:8000`.

---

## Autor

**Juan Pablo Romero**

- Estudiante de la Tecnicatura en Desarrollo de Software, Instituto SuperiorZona Oeste (IZO).
- GitHub: https://github.com/Juan-RomeroDev
- LinkedIn: https://linkedin.com/in/juan-pablo-romero-a9318429a/
- Correo: juanpabloromero426@gmail.com

---

## Notas académicas

- El proyecto **Pollo Abasto: Tu Almacén** se documenta en el sitio, pero su
  repositorio es privado porque contiene datos de un negocio real.
- La sección de **Sky Systems, Inc.** es un trabajo académico de adaptación de
  CV. No representa una afiliación real con la empresa.
- Este repositorio es un entregable de la materia UDI II (2026).

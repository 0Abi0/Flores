// Cambia este nombre por el de la persona
document.getElementById("nombre").textContent = "";

const ramo = document.getElementById("ramo");
const NS = "http://www.w3.org/2000/svg";

// Cada tulipán: posición de su base (x, y) y tamaño (s)
const flores = [
  { x: 200, y: 175, s: 105 },
  { x: 125, y: 235, s: 80 },
  { x: 280, y: 230, s: 82 },
  { x: 60,  y: 300, s: 58 },
  { x: 340, y: 295, s: 60 },
];

// Ayuda para crear elementos SVG y meterlos dentro de otro
function crear(tipo, atributos, padre) {
  const el = document.createElementNS(NS, tipo);
  for (const k in atributos) el.setAttribute(k, atributos[k]);
  padre.appendChild(el);
  return el;
}

// Dos hojas largas abajo
crear("path", { class: "hoja", d: "M198 400 C 180 340 120 320 95 340 C 130 345 170 370 198 400 Z" }, ramo);
crear("path", { class: "hoja", d: "M202 400 C 220 340 280 320 305 340 C 270 345 230 370 202 400 Z" }, ramo);

flores.forEach((f, i) => {
  // Tallo: sale de abajo al centro y sube hasta la base del tulipán
  crear("path", { class: "tallo", d: `M200 400 Q ${f.x} ${(400 + f.y) / 2} ${f.x} ${f.y}` }, ramo);

  // Grupo de fuera: coloca y escala. Grupo de dentro: se anima.
  const lugar = crear("g", { transform: `translate(${f.x} ${f.y}) scale(${f.s})` }, ramo);
  const g = crear("g", { class: "flor" }, lugar);
  g.style.animationDelay = `${i * 0.25}s`;

  // Forma del tulipán (medidas de 0 a 1, luego se escalan con s)
  // Pétalo de atrás izquierdo y derecho
  crear("path", { fill: "var(--golden-bronze)", d: "M-0.05 0 C-0.6 0 -0.62 -0.75 -0.42 -1.1 C-0.2 -0.85 -0.05 -0.6 -0.05 0 Z" }, g);
  crear("path", { fill: "var(--golden-bronze)", d: "M0.05 0 C0.6 0 0.62 -0.75 0.42 -1.1 C0.2 -0.85 0.05 -0.6 0.05 0 Z" }, g);
  // Pétalo del frente
  crear("path", { fill: "var(--saffron)", d: "M0 0.02 C-0.48 0.02 -0.5 -0.7 0 -1.2 C0.5 -0.7 0.48 0.02 0 0.02 Z" }, g);
  // Brillo en el centro del pétalo
  crear("path", { fill: "var(--royal-gold)", d: "M0 -0.05 C-0.22 -0.05 -0.24 -0.55 0 -1.0 C0.24 -0.55 0.22 -0.05 0 -0.05 Z" }, g);
});

// Al hacer clic: se esconde el botón y aparece el mensaje en su lugar
document.getElementById("abrir").addEventListener("click", (e) => {
  e.currentTarget.hidden = true;
  document.getElementById("mensaje").hidden = false;
  document.getElementById("miBoton").hidden = false;
});

document.getElementById("miBoton").addEventListener("click", () => {
  window.location.href = "button.html";
});
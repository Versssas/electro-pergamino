const productos = [
  { nombre: "Cable unipolar", cat: "cables", label: "Cables", desc: "Cable unipolar normalizado, distintas secciones, para instalaciones domiciliarias e industriales." },
  { nombre: "Cable subterráneo", cat: "cables", label: "Cables", desc: "Cable subterráneo bipolar y trifásico para tendidos enterrados y acometidas." },
  { nombre: "Cable ignífugo", cat: "cables", label: "Cables", desc: "Línea ignífuga libre de halógenos para instalaciones que requieren mayor seguridad." },
  { nombre: "Tablero seccional de embutir", cat: "tableros", label: "Tableros", desc: "Tableros seccionales de embutir en distintas bocas, con o sin puerta." },
  { nombre: "Llave termomagnética", cat: "tableros", label: "Tableros", desc: "Llaves termomagnéticas de 1, 2 y 3 polos, distintos amperajes." },
  { nombre: "Disyuntor diferencial", cat: "tableros", label: "Tableros", desc: "Disyuntores diferenciales de alta sensibilidad para protección de personas." },
  { nombre: "Panel LED", cat: "iluminacion", label: "Iluminación", desc: "Paneles LED de embutir y aplicar, distintas potencias y temperaturas de color." },
  { nombre: "Proyector LED exterior", cat: "iluminacion", label: "Iluminación", desc: "Proyectores LED IP65 para fachadas, playones y espacios exteriores." },
  { nombre: "Tira LED", cat: "iluminacion", label: "Iluminación", desc: "Tiras LED decorativas, cortables, con y sin control remoto." },
  { nombre: "Caño de acero rígido", cat: "caneria", label: "Cañerías", desc: "Caños de acero rígidos y semipesados para instalaciones embutidas y a la vista." },
  { nombre: "Caño PVC autoextinguible", cat: "caneria", label: "Cañerías", desc: "Cañería PVC autoextinguible, curvas, conectores y accesorios." },
  { nombre: "Caja de pase", cat: "caneria", label: "Cañerías", desc: "Cajas de pase octogonales y rectangulares en distintas medidas." },
  { nombre: "Módulo de embutir", cat: "tomas", label: "Tomas y enchufes", desc: "Interruptores y tomas residenciales, líneas combinables por color y diseño." },
  { nombre: "Toma industrial", cat: "tomas", label: "Tomas y enchufes", desc: "Tomas y fichas industriales trifásicas, distintos amperajes." },
  { nombre: "Zapatilla y prolongador", cat: "tomas", label: "Tomas y enchufes", desc: "Zapatillas, prolongadores y adaptadores para uso doméstico e industrial." },
  { nombre: "Pinza y alicate certificado", cat: "herramientas", label: "Herramientas", desc: "Herramientas certificadas a 1000V para trabajo con tensión." },
  { nombre: "Pelacables automático", cat: "herramientas", label: "Herramientas", desc: "Pelacables automáticos y manuales para distintas secciones de cable." },
  { nombre: "Destornillador aislado", cat: "herramientas", label: "Herramientas", desc: "Destornilladores aislados, juegos completos para electricista." },
];

function renderCatalogo(filtro) {
  const grid = document.getElementById('catalogoGrid');
  if (!grid) return;
  const items = filtro === 'todos' ? productos : productos.filter(p => p.cat === filtro);
  grid.innerHTML = items.map(p => {
    const msg = encodeURIComponent(`Hola! Quería consultar disponibilidad y precio de: ${p.nombre}`);
    return `
    <div class="prod-card fade-up visible">
      <span class="prod-cat">${p.label}</span>
      <div class="prod-nombre">${p.nombre}</div>
      <p class="prod-desc">${p.desc}</p>
      <a class="prod-wsp" href="https://wa.me/5492477457559?text=${msg}" target="_blank">Consultar</a>
    </div>`;
  }).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.card').forEach(el => observer.observe(el));
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  renderCatalogo('todos');

  const filtros = document.getElementById('catalogoFiltros');
  if (filtros) {
    filtros.addEventListener('click', (e) => {
      const btn = e.target.closest('.filtro-btn');
      if (!btn) return;
      filtros.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCatalogo(btn.dataset.cat);
    });
  }
});
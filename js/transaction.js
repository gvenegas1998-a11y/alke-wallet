$(document).ready(function () {
  // Lista ficticia inicial si no hay historial previo en LocalStorage
  let historialTransacciones = JSON.parse(localStorage.getItem('transacciones'));

  if (!historialTransacciones) {
    historialTransacciones = [
      { tipo: 'deposito', monto: 45000, detalle: 'Depósito Cajero Automático', fecha: '01/07/2026' },
      { tipo: 'transferencia enviada', monto: 15000, detalle: 'A: Alice Marquez', fecha: '28/06/2026' },
      { tipo: 'compra', monto: 3200, detalle: 'Starbucks Coffee', fecha: '25/06/2026' }
    ];
    localStorage.setItem('transacciones', JSON.stringify(historialTransacciones));
  }

  function getTipoTransaccion(tipo) {
    const tipos = {
      'compra': '🛍️ Compra',
      'deposito': '💵 Depósito',
      'transferencia enviada': '💸 Transferencia Enviada'
    };
    return tipos[tipo] || tipo;
  }

  // Renderizar transacciones filtradas
  function mostrarUltimosMovimientos(filtro) {
    const listaContenedor = $('#transactions-list');
    listaContenedor.empty();

    const movimientosFiltrados = historialTransacciones.filter(mov => {
      return filtro === 'todos' || mov.tipo === filtro;
    });

    if (movimientosFiltrados.length === 0) {
      listaContenedor.append('<p class="text-center text-muted my-3">No hay registros para este tipo de movimiento.</p>');
      return;
    }

    movimientosFiltrados.forEach(mov => {
      const claseMonto = mov.tipo === 'deposito' ? 'text-success' : 'text-danger';
      const signo = mov.tipo === 'deposito' ? '+' : '-';

      listaContenedor.append(`
        <div class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <h6 class="mb-0 fw-bold">${getTipoTransaccion(mov.tipo)}</h6>
            <small class="text-muted">${mov.detalle} - ${mov.fecha}</small>
          </div>
          <span class="fw-bold ${claseMonto}">${signo}$${mov.monto.toLocaleString('es-CL')}</span>
        </div>
      `);
    });
  }

  // Escuchar cambios en el elemento select de filtro
  $('#filter-type').change(function () {
    const filtroSeleccionado = $(this).val();
    mostrarUltimosMovimientos(filtroSeleccionado);
  });

  // Carga inicial (Todos)
  mostrarUltimosMovimientos('todos');
});
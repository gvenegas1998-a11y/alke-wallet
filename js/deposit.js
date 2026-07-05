$(document).ready(function () {
  // Mostrar saldo actual desde LocalStorage al cargar
  let saldoActual = parseInt(localStorage.getItem('saldo') || '100000');
  $('#saldoPrevio').text('$' + saldoActual.toLocaleString('es-CL'));

  $('#formDeposito').submit(function (event) {
    event.preventDefault();

    const montoDeposito = parseInt($('#monto').val());

    if (isNaN(montoDeposito) || montoDeposito <= 0) {
      alert("Por favor, ingresa un monto válido.");
      return;
    }

    // Actualizar Saldo
    let nuevoSaldo = saldoActual + montoDeposito;
    localStorage.setItem('saldo', nuevoSaldo);

    // Guardar movimiento en el historial global de transacciones
    let transacciones = JSON.parse(localStorage.getItem('transacciones')) || [];
    transacciones.unshift({
      tipo: 'deposito',
      monto: montoDeposito,
      detalle: 'Depósito en efectivo',
      fecha: new Date().toLocaleDateString()
    });
    localStorage.setItem('transacciones', JSON.stringify(transacciones));

    // Agregar leyenda debajo del formulario
    $('#leyenda-deposito').text(`Confirmación: Has depositado exitosamente $${montoDeposito.toLocaleString('es-CL')}.`);

    // Mensaje de éxito dinámico con Alerta Bootstrap
    $('#alert-container').html(`
      <div class="alert alert-success" role="alert">
        ¡Depósito procesado correctamente! Actualizando tu billetera...
      </div>
    `);

    // Redirigir al menú tras 2 segundos
    setTimeout(function () {
      window.location.href = 'menu.html';
    }, 2000);
  });
});
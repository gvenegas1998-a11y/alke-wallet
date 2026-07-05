$(document).ready(function () {
  // Cargar saldo real desde LocalStorage
  const saldo = localStorage.getItem('saldo') || '100000';
  $('#saldoActual').text('$' + parseInt(saldo).toLocaleString('es-CL'));

  // Función genérica para mostrar leyenda y redirigir
  function redirigirConLeyenda(pantallaNombre, url) {
    const leyenda = $('#leyenda-redirigiendo');
    leyenda.text(`Redirigiendo a ${pantallaNombre}...`).removeClass('d-none');

    setTimeout(function () {
      window.location.href = url;
    }, 1500);
  }

  $('#btnDepositar').click(function () {
    redirigirConLeyenda('Depósito', 'deposit.html');
  });

  $('#btnEnviarDinero').click(function () {
    redirigirConLeyenda('Enviar Dinero', 'sendmoney.html');
  });

  $('#btnMovimientos').click(function () {
    redirigirConLeyenda('Últimos Movimientos', 'transaction.html');
  });
});
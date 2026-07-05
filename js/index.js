$(document).ready(function () {
  // Función para simular una transición suave con leyenda antes de redirigir
  function accederAPantalla(nombrePantalla, url) {
    const leyenda = $('#leyenda-redirigiendo');
    leyenda.text(`Abriendo ${nombrePantalla}...`).removeClass('d-none');

    setTimeout(function () {
      window.location.href = url;
    }, 1000);
  }

  // Evento al presionar Iniciar Sesión
  $('#btnIrLogin').click(function () {
    accederAPantalla('Inicio de Sesión', 'login.html');
  });

  // Evento al presionar Crear Cuenta
  $('#btnIrRegistro').click(function () {
    // Si en el futuro creas un register.html, apuntas hacia él. 
    // De momento, le avisamos al usuario que se encuentra en desarrollo o lo mandamos a login.
    const leyenda = $('#leyenda-redirigiendo');
    leyenda.text('El módulo de registro estará disponible pronto. Redirigiendo a Login...').removeClass('d-none').addClass('alert-warning');

    setTimeout(function () {
      window.location.href = 'login.html';
    }, 2000);
  });
});
$(document).ready(function () {
  // Inicializamos un saldo por defecto en LocalStorage si no existe
  if (!localStorage.getItem('saldo')) {
    localStorage.setItem('saldo', '100000');
  }

  $('#loginForm').submit(function (event) {
    event.preventDefault();

    // Uso de selectores de jQuery para obtener valores de los campos
    const email = $('#email').val().trim();
    const password = $('#password').val().trim();

    // VALIDACIÓN LIBRE: Comprobamos únicamente que los campos no estén vacíos
    if (email !== "" && password !== "") {

      // Alerta de éxito Bootstrap de forma dinámica[cite: 2]
      $('#alert-container').html(`
        <div class="alert alert-success" role="alert">
          ¡Bienvenido! Iniciando sesión con <strong>${email}</strong>...
        </div>
      `);

      // Redirección con jQuery después de 1.5 segundos[cite: 2]
      setTimeout(function () {
        window.location.href = './menu.html'; // Redirige al menú principal[cite: 2]
      }, 1500);

    } else {
      // Si el usuario intentó enviar el formulario completamente vacío, muestra un error[cite: 2]
      $('#alert-container').html(`
        <div class="alert alert-danger" role="alert">
          Por favor, completa ambos campos para continuar.
        </div>
        
      `);
    }
  });
});
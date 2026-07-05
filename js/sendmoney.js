$(document).ready(function () {
  // Contactos iniciales por defecto si no existen en LocalStorage
  let contactos = JSON.parse(localStorage.getItem('contactos')) || [
    { nombre: "Alice Marquez", alias: "ali", banco: "bci Bank", rut: "123456789" },
    { nombre: "Melany Guerrero", alias: "Mely", banco: "bts Bank", rut: "987654321" }
  ];

  let contactoSeleccionado = null;

  function renderContactos(lista) {
    const container = $('#contactList');
    container.empty();

    if (lista.length === 0) {
      container.append('<li class="list-group-item text-center text-muted">No se encontraron contactos</li>');
      return;
    }

    lista.forEach((c, index) => {
      container.append(`
        <li class="list-group-item contact-item" data-index="${index}">
          <div class="contact-info">
            <span class="font-weight-bold d-block contact-name">${c.nombre}</span>
            <span class="small text-muted contact-details">RUT/CBU: ${c.rut} | Alias: ${c.alias} | Banco: ${c.banco}</span>
          </div>
        </li>
      `);
    });
  }

  renderContactos(contactos);

  // 1. Mostrar y ocultar formulario de contactos
  $('#btnAgregarContacto').click(function () {
    $('#modalContacto').fadeIn();
  });

  $('#btnCancelarContacto').click(function () {
    $('#modalContacto').fadeOut();
    $('#formContacto')[0].reset();
  });

  // 2. Validar y Guardar nuevo contacto
  $('#formContacto').submit(function (e) {
    e.preventDefault();
    const nombre = $('#nuevoNombre').val().trim();
    const rut = $('#nuevoRut').val().trim();
    const alias = $('#nuevoAlias').val().trim();
    const banco = $('#nuevoBanco').val().trim();

    // Validación básica: formato de RUT o CBU (ej: mínimo 6 caracteres)
    if (rut.length < 6) {
      alert("El identificador RUT/CBU ingresado es demasiado corto.");
      return;
    }

    contactos.push({ nombre, rut, alias, banco });
    localStorage.setItem('contactos', JSON.stringify(contactos));
    renderContactos(contactos);

    $('#modalContacto').fadeOut();
    $('#formContacto')[0].reset();
  });

  // 3. Búsqueda en la agenda
  $('#searchContact').on('input', function () {
    const query = $(this).val().toLowerCase();
    const filtrados = contactos.filter(c =>
      c.nombre.toLowerCase().includes(query) ||
      c.alias.toLowerCase().includes(query)
    );
    renderContactos(filtrados);
    // Al cambiar la lista, deseleccionamos el contacto actual por seguridad
    contactoSeleccionado = null;
    $('#btnSubmitEnviar').fadeOut();
  });

  // 4. Seleccionar un contacto de la lista y Mostrar/Ocultar botón Enviar dinero
  $(document).on('click', '.contact-item', function () {
    $('.contact-item').removeClass('selected-contact');
    $(this).addClass('selected-contact');

    const index = $(this).data('index');
    contactoSeleccionado = contactos[index];

    // Mostrar botón
    $('#btnSubmitEnviar').fadeIn();
  });

  // 5. Envío de dinero y confirmación
  $('#formEnviarDinero').submit(function (e) {
    e.preventDefault();
    const monto = parseInt($('#montoEnviar').val());
    let saldoActual = parseInt(localStorage.getItem('saldo') || '100000');

    if (!contactoSeleccionado) {
      alert("Por favor selecciona un contacto de la lista primero.");
      return;
    }
    if (isNaN(monto) || monto <= 0) {
      alert("Ingresa un monto válido para el envío.");
      return;
    }
    if (monto > saldoActual) {
      $('#alert-container').html('<div class="alert alert-danger">Fondos insuficientes para realizar esta operación.</div>');
      return;
    }

    // Procesar descuento
    saldoActual -= monto;
    localStorage.setItem('saldo', saldoActual);

    // Guardar en el historial global
    let transacciones = JSON.parse(localStorage.getItem('transacciones')) || [];
    transacciones.unshift({
      tipo: 'transferencia enviada',
      monto: monto,
      detalle: `A: ${contactoSeleccionado.nombre}`,
      fecha: new Date().toLocaleDateString()
    });
    localStorage.setItem('transacciones', JSON.stringify(transacciones));

    // Mostrar mensaje de éxito inferior solicitado
    $('#confirmacion-envio')
      .text(`¡Transferencia de $${monto.toLocaleString('es-CL')} enviada con éxito a ${contactoSeleccionado.nombre}!`)
      .removeClass('d-none');

    // Resetear UI
    $('#montoEnviar').val('');
    $('.contact-item').removeClass('selected-contact');
    $('#btnSubmitEnviar').fadeOut();
    contactoSeleccionado = null;
  });
});
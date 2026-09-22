

// -----------------------TEMPORIZADOR---------------------------

const fechaObjetivo = new Date("october 31, 2026 21:00:00").getTime();

function actualizarContador() {
    const ahora = new Date().getTime();
    const diferencia = fechaObjetivo - ahora;

    if (diferencia > 0) {
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        const elDias = document.getElementById("dias");
        const elHoras = document.getElementById("horas");
        const elMinutos = document.getElementById("minutos");
        const elSegundos = document.getElementById("segundos");
        if (!elDias || !elHoras || !elMinutos || !elSegundos) return;

        elDias.textContent = dias.toString().padStart(2, "0");
        elHoras.textContent = horas.toString().padStart(2, "0");
        elMinutos.textContent = minutos.toString().padStart(2, "0");
        elSegundos.textContent = segundos.toString().padStart(2, "0");
    } else {
        const titulo = document.querySelector(".contador__titulo");
        const tiempo = document.querySelector(".contador__tiempo");
        if (titulo) titulo.textContent = "¡Es el día!";
        if (tiempo) tiempo.style.display = "none";
    }
}

// Actualiza el contador cada segundo
setInterval(actualizarContador, 1000);
actualizarContador();

// --------------------------MUSICA----------------------------------

const audio = document.querySelector('.musica audio');
const playPauseButton = document.querySelector('.musica__button');

if (audio && playPauseButton) {
    playPauseButton.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().catch(function () {});
            playPauseButton.classList.add('musica__button--playing');
            playPauseButton.classList.remove('musica__button--paused');
        } else {
            audio.pause();
            playPauseButton.classList.remove('musica__button--playing');
            playPauseButton.classList.add('musica__button--paused');
        }
    });
}



// --------------------------------fotos---------------------------------




document.addEventListener("DOMContentLoaded", function () {
    if (typeof Swiper !== "undefined") {
        new Swiper(".mySwiper", {
            effect: "cards",
            grabCursor: true,
        });
    }

    // Fancybox v5 (UMD): API nativa, sin jQuery
    if (window.Fancybox) {
        window.Fancybox.bind('[data-fancybox="gallery"]', {
            // opciones por defecto, equivalentes al comportamiento anterior
        });
    }
});


// -----------------PLAYLIST----------------------

document.addEventListener('DOMContentLoaded', function () {
    const botonEnviar = document.getElementById('playlistbtn');
    const nombreInput = document.getElementById('nombre');
    const cancionInput = document.getElementById('cancion');
    const linkInput = document.getElementById('link');
    const errorMensaje = document.getElementById('error-mensaje');
    const numeroWhatsapp = '542284226383';

    if (!botonEnviar || !nombreInput || !cancionInput) return;

    botonEnviar.addEventListener('click', function () {
        const nombre = nombreInput.value.trim();
        const cancion = cancionInput.value.trim();
        const link = linkInput ? linkInput.value.trim() : '';

        if (!nombre || !cancion) {
            if (errorMensaje) errorMensaje.textContent = "Por favor, completa tu nombre y el nombre de la canción.";
            return;
        } else {
            if (errorMensaje) errorMensaje.textContent = "";
        }

        let mensaje = `Hola!, mi nombre es *${nombre}* quiero recomendar el siguiente tema:\n*${cancion}*`;

        if (link) {
            mensaje += `\nlink: ${link}`;
        }


        const urlWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensaje)}`;
        window.open(urlWhatsapp, '_blank');

        // Opcional: Limpiar los campos después de enviar
        nombreInput.value = '';
        cancionInput.value = '';
        if (linkInput) linkInput.value = '';
    });
});



// -----------------DRESSCODE------------------------

document.addEventListener('DOMContentLoaded', function () {
    const botonEjemplo = document.querySelector('.dresscode__ejemplo');
    const lightbox = document.getElementById('lightbox');
    const botonCerrar = document.querySelector('.lightbox__cerrar');

    if (!botonEjemplo || !lightbox || !botonCerrar) return;

    botonEjemplo.addEventListener('click', function () {
        lightbox.classList.add('active');
    });

    botonCerrar.addEventListener('click', function () {
        lightbox.classList.remove('active');
    });

    // Opcional: Cerrar el lightbox al hacer clic fuera de la imagen
    lightbox.addEventListener('click', function (event) {
        if (event.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });
});

// ----------------REGALOS--------------------


document.addEventListener('DOMContentLoaded', function () {
    const botonDatos = document.querySelector('.regalos__button');
    const datosDiv = document.getElementById('datos');
    const botonesCopiar = document.querySelectorAll('.datos__copiar');
    const mensajeCopiado = document.getElementById('mensajeCopiado');

    if (!botonDatos || !datosDiv) return;

    botonDatos.addEventListener('click', function () {
        datosDiv.classList.toggle('mostrar');
    });

    botonesCopiar.forEach(boton => {
        boton.addEventListener('click', function () {
            const targetSelector = this.getAttribute('data-copy-target');
            const targetElement = datosDiv.querySelector(targetSelector);

            if (targetElement) {
                const textToCopy = targetElement.textContent;

                navigator.clipboard.writeText(textToCopy)
                    .then(() => {
                        if (mensajeCopiado) {
                            mensajeCopiado.classList.add('mostrar');
                            setTimeout(() => {
                                mensajeCopiado.classList.remove('mostrar');
                            }, 1500);
                        }
                    })
                    .catch(err => {
                        console.error('Error al copiar al portapapeles:', err);
                        // Puedes mostrar un mensaje de error al usuario si lo deseas
                    });
            }
        });
    });
});

// ---------------------menu----------------------


document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('precio__toggle-btn');
  const mostrarSection = document.getElementById('precio__mostrar');
  const copyCbuBtn = document.getElementById('precio__copy-cbu');
  const copyAliasBtn = document.getElementById('precio__copy-alias');

  // Toggle bank details
  if (toggleBtn && mostrarSection) {
    toggleBtn.addEventListener('click', () => {
      mostrarSection.classList.toggle('active');
      toggleBtn.textContent = mostrarSection.classList.contains('active')
        ? 'Ocultar datos bancarios'
        : 'Ver datos bancarios para pagos';
    });
  }

  // Función común para copiar texto (para CBU y Alias)
  const copiarTexto = (button, elementSelector) => {
    const element = document.querySelector(elementSelector);
    if (!button || !navigator.clipboard) return;
    if (element) {
      const text = element.textContent.trim();
      navigator.clipboard.writeText(text).then(() => {
        button.textContent = `¡${elementSelector === '.precio__CBU' ? 'CBU' : 'Alias'} Copiado!`;
        setTimeout(() => {
          button.textContent = `Copiar ${elementSelector === '.precio__CBU' ? 'CBU' : 'Alias'}`;
        }, 2000);
      });
    } else {
      // Si el elemento no existe, cambia el texto del botón para informar al usuario
      button.textContent = `${elementSelector === '.precio__CBU' ? 'CBU' : 'Alias'} no disponible`;
      setTimeout(() => {
        button.textContent = `Copiar ${elementSelector === '.precio__CBU' ? 'CBU' : 'Alias'}`;
      }, 2000);
    }
  };

  // Copy CBU
  if (copyCbuBtn) {
    copyCbuBtn.addEventListener('click', () => {
      copiarTexto(copyCbuBtn, '.precio__CBU');
    });
  }

  // Copy Alias
  if (copyAliasBtn) {
    copyAliasBtn.addEventListener('click', () => {
      copiarTexto(copyAliasBtn, '.precio__alias');
    });
  }

  // Lightbox del menú
  const btnAbrir = document.querySelector('.foto__menu');
  const lightbox = document.getElementById('menuFotoLightbox');
  const btnCerrar = document.getElementById('menuFotoCerrar');
  const overlay = document.querySelector('.menuFoto-overlay');
  const menuImg = document.querySelector('.menuFoto-imagen');

  // Abrir lightbox
  if (btnAbrir && lightbox) {
    btnAbrir.addEventListener('click', () => {
      lightbox.style.display = 'block';
      setTimeout(() => lightbox.classList.add('activo'), 10);
    });
  }

  // Cerrar lightbox
  const cerrarLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('activo');
    setTimeout(() => (lightbox.style.display = 'none'), 0);
  };

  if (btnCerrar) btnCerrar.addEventListener('click', cerrarLightbox);
  if (overlay) overlay.addEventListener('click', cerrarLightbox);

  // Prevenir cierre al hacer click en la imagen
  if (menuImg) {
    menuImg.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }
});



// --------------- confirmacion --------------------------------------



document.addEventListener('DOMContentLoaded', function () {
    // Definir los números de teléfono
    const recipientNumber1 = '542284226383'; // Número para el primer botón
    const recipientNumber2 = '543814400222'; // Número para el segundo botón

    // Función para enviar mensaje por WhatsApp
    function sendMessage(phoneNumber) {
        const nameEl = document.getElementById('userFullName');
        const msgEl = document.getElementById('customMessage');
        const correoEl = document.getElementById('correo');
        if (!nameEl) return;
        const userName = nameEl.value.trim();
        const userMessage = msgEl ? msgEl.value.trim() : '';
        const attendanceStatus = document.querySelector('input[name="attendanceOption"]:checked');

        if (!attendanceStatus) {
            alert('Por favor, selecciona si asistirás o no.');
            return;
        }

        if (userName === '') {
            alert('Por favor, completa todos los campos antes de enviar.');
            return;
        }

        const finalMessage = `*Presencia:* ${attendanceStatus.value}\n*Nombre y Apellido:* ${userName}\n*Mensaje:* ${userMessage ? userMessage : 'N/A'}`;
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`;

        // Abre la URL de WhatsApp en una nueva pestaña
        window.open(whatsappLink, '_blank');


        // Limpiar los campos de entrada
        nameEl.value = '';
        if (msgEl) msgEl.value = '';
        document.querySelectorAll('input[name="attendanceOption"]').forEach(radio => radio.checked = false);

        // Volver al bloque de formulario
        if (correoEl) correoEl.scrollIntoView({ behavior: 'smooth' });
    }

    // Asignar eventos a los botones
    const btn1 = document.getElementById('botoncito1');
    const btn2 = document.getElementById('botoncito2');
    if (btn1) {
        btn1.addEventListener('click', function () {
            sendMessage(recipientNumber1);
        });
    }
    if (btn2) {
        btn2.addEventListener('click', function () {
            sendMessage(recipientNumber2);
        });
    }
});


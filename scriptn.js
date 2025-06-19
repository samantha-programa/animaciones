document.addEventListener('DOMContentLoaded', () => {
    // 1. Efecto de máquina de escribir para la introducción
    const typewriterElement = document.querySelector('.typewriter-text');
    if (typewriterElement) {
        const text = typewriterElement.dataset.text;
        let i = 0;
        let isDeleting = false;
        let charIndex = 0;
        let typingSpeed = 70; // Velocidad de escritura
        let pauseBetweenWords = 1000; // Pausa después de una palabra (no se usa directamente en este tipo de texto continuo)

        function typeWriter() {
            const currentText = text.substring(0, charIndex);
            typewriterElement.textContent = currentText;

            if (!isDeleting && charIndex < text.length) {
                charIndex++;
                typingSpeed = 70; // Velocidad normal de escritura
            } else if (isDeleting && charIndex > 0) {
                charIndex--;
                typingSpeed = 30; // Velocidad de borrado más rápida
            }

            if (charIndex === text.length && !isDeleting) {
                isDeleting = true; // Empieza a borrar al llegar al final
                typingSpeed = pauseBetweenWords; // Pausa antes de borrar
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false; // Empieza a escribir de nuevo al borrar todo
                typingSpeed = 500; // Pausa antes de volver a escribir
            }

            // Para que no se borre, solo escriba una vez y se quede.
            // Si quieres que se borre y se reescriba (como un glitch), descomenta el bloque superior de isDeleting y charIndex === 0
            // y comenta la línea de abajo.
            if (!isDeleting && charIndex <= text.length) {
                 setTimeout(typeWriter, typingSpeed);
            }
             if (charIndex === text.length) {
                 typewriterElement.style.borderRight = 'none'; // Quita el cursor al final
             }
        }
        typeWriter();
    }


    // 2. Marquee personalizado con JS (más control que <marquee>)
    const customMarquee = document.querySelector('.custom-marquee');
    if (customMarquee) {
        const marqueeText = customMarquee.dataset.text;
        const speed = 0.5; // Pixeles por frame
        let position = 0;

        function animateMarquee() {
            position -= speed;
            customMarquee.style.transform = `translateX(${position}px)`;

            // Si el texto se ha ido completamente a la izquierda, lo reseteamos
            if (position < -customMarquee.scrollWidth) {
                position = window.innerWidth; // Lo ponemos al principio de la pantalla
            }
            requestAnimationFrame(animateMarquee);
        }

        // Duplicamos el texto para un bucle continuo sin saltos visibles
        customMarquee.innerHTML = `<span style="white-space: nowrap;">${marqueeText}&nbsp;&nbsp;&nbsp;&nbsp;${marqueeText}</span>`;
        animateMarquee();
    }


    // 3. Efecto de audio ambiental
    const backgroundAudio = document.getElementById('background-audio');
    if (backgroundAudio) {
        // Reproducir audio solo después de la interacción del usuario
        // Por políticas de navegadores, el audio con autoplay suele ser bloqueado.
        // Aquí lo reproducimos cuando el usuario hace clic en cualquier parte.
        document.body.addEventListener('click', () => {
            if (backgroundAudio.paused) {
                backgroundAudio.play().catch(e => console.error("Error al reproducir audio:", e));
            }
        }, { once: true }); // El evento se dispara una sola vez
    }

    // 4. Efecto de glitch sutil en elementos al pasar el ratón (opcional)
    document.querySelectorAll('a, button, .gallery-item').forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.classList.add('glitch-active');
            setTimeout(() => {
                el.classList.remove('glitch-active');
            }, 300); // Duración corta del glitch
        });
    });

    // Añade el CSS para .glitch-active en style.css si quieres este efecto:
    /*
    .glitch-active {
        animation: glitch-active 0.3s forwards;
    }

    @keyframes glitch-active {
        0% { transform: translate(0, 0); filter: saturate(1) hue-rotate(0deg); }
        25% { transform: translate(2px, -2px); filter: saturate(2) hue-rotate(90deg); }
        50% { transform: translate(-3px, 3px); filter: saturate(0.5) hue-rotate(180deg); }
        75% { transform: translate(1px, -1px); filter: saturate(1.5) hue-rotate(270deg); }
        100% { transform: translate(0, 0); filter: saturate(1) hue-rotate(360deg); }
    }
    */
});
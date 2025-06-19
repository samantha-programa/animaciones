document.addEventListener('DOMContentLoaded', () => {
    const retroButton = document.getElementById('retroButton');
    const backButton = document.getElementById('backButton');
    const loadingBar = document.getElementById('loadingBar');
    const mainScreen = document.querySelector('.main-screen');
    const secondScreen = document.querySelector('.second-screen');
    const body = document.body;

    // Animación de aparición inicial de la página
    body.style.opacity = '1';

    retroButton.addEventListener('click', () => {
        // 1. Iniciar animación de carga
        loadingBar.style.width = '0%';
        loadingBar.classList.remove('animated-hide'); // Asegura que la barra sea visible
        setTimeout(() => {
            loadingBar.style.width = '100%';
        }, 50);

        // 2. Transición a la segunda pantalla después de un breve "clic" o "carga"
        setTimeout(() => {
            // Ocultar pantalla principal con animación
            mainScreen.classList.add('slide-out-left');
            mainScreen.classList.add('animated-hide'); // Para que no reciba clicks

            // Mostrar segunda pantalla con animación
            secondScreen.classList.remove('hidden');
            secondScreen.classList.add('slide-in-right');

            // Quitar la barra de carga y ocultarla
            loadingBar.classList.add('animated-hide');

            // Asegurarse de que la segunda pantalla no tenga slide-in-right al cargar inicialmente
            // pero sí al entrar. Esta clase se añadirá al final de la transición.
            // Para la primera vez que se carga la secondScreen, debemos reiniciar su posición.
            // Esto se hace con un pequeño timeout después de mostrarla.
            setTimeout(() => {
                secondScreen.classList.remove('slide-in-right');
            }, 800); // Coincide con la duración de la transición CSS
            
        }, 1000); // Retraso para simular "carga"
    });

    backButton.addEventListener('click', () => {
        // Transición de vuelta a la primera pantalla
        secondScreen.classList.add('slide-out-left');
        mainScreen.classList.remove('hidden');
        mainScreen.classList.remove('slide-out-left'); // Reinicia la posición para la siguiente salida
        mainScreen.classList.remove('animated-hide');

        // Ocultar segunda pantalla completamente después de la animación
        setTimeout(() => {
            secondScreen.classList.add('hidden');
            secondScreen.classList.remove('slide-out-left'); // Reinicia la posición para la siguiente entrada
        }, 800); // Coincide con la duración de la transición CSS
    });


    
});
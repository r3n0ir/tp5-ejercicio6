/*
6- Realizar una web con un temporizador donde el usuario pueda ingresar un tiempo desde donde comenzará a 
decrementar el contador. Debe contener los botones, iniciar, pausar y reset.
*/

document.addEventListener('DOMContentLoaded', function () {
    let segundosTotales = 0;
    let intervalo = null;
    let ejecutandose = false;

    const marcador = document.getElementById('marcador');
    const start = document.getElementById('start');
    const pause = document.getElementById('pause');
    const reset = document.getElementById('reset');
    const horasIngresada = document.getElementById('horas');
    const minutosIngresados = document.getElementById('minutos');
    const segundosIngresados = document.getElementById('segundos');

    function actualizarMarcador() {
        const horas = Math.floor(segundosTotales / 3600);
        const minutos = Math.floor((segundosTotales % 3600) / 60);
        const segundos = segundosTotales % 60;
        const formatTime = (unit) => (unit < 10 ? `0${unit}` : unit);
        marcador.textContent = `${formatTime(horas)}:${formatTime(minutos)}:${formatTime(segundos)}`;
    }
    function empezarTempo() {
        if (!ejecutandose) {
            intervalo = setInterval(() => {
                if (segundosTotales > 0) {
                    segundosTotales--;
                    actualizarMarcador();
                } else {
                    clearInterval(intervalo);
                    ejecutandose = false;
                }
            }, 1000);
            ejecutandose = true;
        }
    }
    function pausarTempo() {
        if (ejecutandose) {
            clearInterval(intervalo);
            ejecutandose = false;
        }
    }
    function reiniciarTempo() {
        clearInterval(intervalo);
        ejecutandose = false;
        segundosTotales = 0;
        actualizarMarcador();
    }
    function establecerTiempo() {
        const horasGuardadas = parseInt(horasIngresada.value) || 0;
        const minutosGuardados = parseInt(minutosIngresados.value) || 0;
        const segundosGuardados = parseInt(segundosIngresados.value) || 0;
        segundosTotales = horasGuardadas * 3600 + minutosGuardados * 60 + segundosGuardados;
        actualizarMarcador();
    }
    start.addEventListener('click', empezarTempo);
    pause.addEventListener('click', pausarTempo);
    reset.addEventListener('click', reiniciarTempo);
    horasIngresada.addEventListener('change', establecerTiempo);
    minutosIngresados.addEventListener('change', establecerTiempo);
    segundosIngresados.addEventListener('change', establecerTiempo);
    actualizarMarcador();
});

const options = ['¡Ganaste!', 'Pierdes'];
let spinning = false;
let attemptCount = 0; // Contador de intentos

// Elementos del DOM
const optionElement = document.getElementById('option');
const resultTextElement = document.getElementById('resultText');
const happyFaceElement = document.getElementById('happyFace');
const sadFaceElement = document.getElementById('sadFace');
const playButton = document.getElementById('playButton');
const resetButton = document.getElementById('resetButton');

// Inicialización: deshabilitar el botón de resetear al inicio si no hay intentos previos
if (attemptCount === 0) {
  resetButton.disabled = true;
}

// Función para jugar el juego de ruleta
function playGame() {
  if (spinning) return; // Evitar múltiples clics mientras gira
  attemptCount++; // Incrementar el contador de intentos

  // Deshabilitar visualmente el botón de jugar
  playButton.disabled = true;

  // Deshabilitar el botón de resetear mientras se gira
  resetButton.disabled = true;

  spinning = true;
  const totalDuration = 3000; // Duración total de la animación de 3 segundos
  const spinInterval = 100; // Intervalo de giro en milisegundos (más rápido)

  // Función para girar las opciones
  let elapsed = 0;
  const spinOptionsIntervalId = setInterval(() => {
    elapsed += spinInterval;
    let result;

    // Alternar entre "¡Ganaste!" y "Pierdes"
    if (elapsed % (2 * spinInterval) < spinInterval) {
      result = '¡Ganaste!';
    } else {
      result = 'Pierdes';
    }

    // Mostrar la imagen correspondiente y ocultar la otra
    if (result === '¡Ganaste!') {
      happyFaceElement.style.display = 'inline'; // Mostrar la carita feliz
      sadFaceElement.style.display = 'none'; // Ocultar la carita triste
    } else {
      happyFaceElement.style.display = 'none'; // Ocultar la carita feliz
      sadFaceElement.style.display = 'inline'; // Mostrar la carita triste
    }

    // Mostrar el texto correspondiente
    resultTextElement.textContent = result;

    // Si se ha alcanzado la duración total, mostrar el resultado final
    if (elapsed >= totalDuration) {
      clearInterval(spinOptionsIntervalId);
      displayFinalResult();
    }
  }, spinInterval);
}

// Función para mostrar el resultado final en el cuadro de opciones
function displayFinalResult() {
  let finalResult;

  // Asegurar que en el intento 50 salga "¡Ganaste!"
  if (attemptCount === 50) {
    finalResult = '¡Ganaste!';
  } else {
    finalResult = 'Pierdes';
  }

  // Mostrar el texto correspondiente
  resultTextElement.textContent = finalResult;

  // Mostrar la imagen correspondiente y ocultar la otra
  if (finalResult === '¡Ganaste!') {
    happyFaceElement.style.display = 'inline'; // Mostrar la carita feliz
    sadFaceElement.style.display = 'none'; // Ocultar la carita triste
  } else {
    happyFaceElement.style.display = 'none'; // Ocultar la carita feliz
    sadFaceElement.style.display = 'inline'; // Mostrar la carita triste
  }

  // Habilitar el botón de resetear después de mostrar el resultado
  setTimeout(() => {
    resetButton.disabled = false;
  }, 100);

  // Habilitar visualmente el botón de jugar después de mostrar el resultado
  setTimeout(() => {
    playButton.disabled = false;
  }, 100);

  spinning = false;
}

// Función para reiniciar el juego
function resetGame() {
  happyFaceElement.style.display = 'none'; // Ocultar la carita feliz
  sadFaceElement.style.display = 'none'; // Ocultar la carita triste
  resultTextElement.textContent = ''; // Limpiar el texto del resultado
  optionElement.style.transform = 'scale(1)'; // Restaurar el tamaño original

  // Deshabilitar el botón de resetear
  resetButton.disabled = true;

  // El contador de intentos no se reinicia al presionar el botón de reinicio
  // attemptCount se mantiene

  // Habilitar visualmente el botón de jugar
  playButton.disabled = false;
}

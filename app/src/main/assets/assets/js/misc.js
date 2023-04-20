function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Создаем функцию для разбиения массива на части заданного размера
function chunk(arr, size) {
  // Создаем пустой массив для хранения частей
  var chunks = [];
  // Используем цикл for для перебора элементов исходного массива
  for (var i = 0; i < arr.length; i += size) {
    // Используем метод slice для получения подмассива от i до i + size
    var slice = arr.slice(i, i + size);
    // Добавляем подмассив в массив частей
    chunks.push(slice);
  }
  // Возвращаем массив частей
  return chunks;
}

// Создаем функцию для разбиения массива на части заданного размера
function unchunk(arr, size) {
  // Создаем пустой массив для хранения частей
  var chunks = [];
  // Используем цикл for для перебора элементов исходного массива
  for (var i = 0; i < arr.length; i += size) {
    // Используем метод slice для получения подмассива от i до i + size
    var slice = arr.slice(i, i + size);
    // Добавляем подмассив в массив частей
    chunks.push(slice);
  }
  // Возвращаем массив частей
  return chunks;
}

function convert_to_motors_data(data) {
    var array = new Float32Array(data.buffer)
    return chunk(array, 5)
}

function deep_copy(arr) {
    var new_arr = []
    for (let i = 0; i < arr.length; i++) {
            new_arr[i] = arr[i].slice();
    }
    
    return new_arr
}